# Submit sitemap and request indexing hints via Google Search Console API
# Prerequisites:
#   1. Site verified in Search Console for david.givondoh@gmail.com (or your account)
#   2. searchconsole.googleapis.com enabled on GCP project
# Usage: powershell -File scripts/submit-search-console.ps1

$ErrorActionPreference = "Stop"

$SiteUrl = "https://precifarm.com/"
$SitemapUrl = "https://precifarm.com/sitemap.xml"

$GCLOUD = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
if (-not (Test-Path $GCLOUD)) {
  Write-Error "gcloud not found."
}

$WebmastersScopes = "openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/webmasters"

function Get-AccessToken {
  param([switch]$ForceAdc)
  if (-not $ForceAdc) {
    $t = & $GCLOUD auth print-access-token 2>$null
    if ($LASTEXITCODE -eq 0 -and $t) { return $t.Trim() }
  }
  $t = & $GCLOUD auth application-default print-access-token 2>$null
  if ($LASTEXITCODE -eq 0 -and $t) { return $t.Trim() }
  return $null
}

function Ensure-SearchConsoleAuth {
  Write-Host "Checking gcloud auth (Search Console / webmasters scope)..." -ForegroundColor Cyan
  $token = Get-AccessToken
  if (-not $token) {
    Write-Host "Opening browser for gcloud auth login..." -ForegroundColor Yellow
    & $GCLOUD auth login --brief 2>&1 | Out-Null
    $token = Get-AccessToken
  }
  if (-not $token) {
    Write-Error "Auth failed. Run: gcloud auth login"
  }

  $headers = @{ Authorization = "Bearer $token" }
  try {
    Invoke-RestMethod -Uri "https://www.googleapis.com/webmasters/v3/sites" -Headers $headers -Method Get | Out-Null
    return $token
  } catch {
    if ($_.Exception.Response.StatusCode.value__ -ne 403) { throw }
  }

  Write-Host "403 Forbidden - need webmasters OAuth scope. Opening browser again..." -ForegroundColor Yellow
  $prevEap = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  & $GCLOUD auth application-default login --scopes=$WebmastersScopes 2>&1 | Out-Null
  $ErrorActionPreference = $prevEap
  if ($LASTEXITCODE -ne 0) {
    Write-Error @"
Search Console API auth failed. Run manually:
  gcloud auth application-default login --scopes=$WebmastersScopes
Then re-run: npm run seo:search-console
"@
  }

  $token = Get-AccessToken -ForceAdc
  if (-not $token) { Write-Error "Could not obtain access token after ADC login." }
  return $token
}

function Show-ManualSitemapFallback {
  Write-Host ""
  Write-Host "Manual sitemap submit (Search Console UI):" -ForegroundColor Yellow
  Write-Host "  1. Open https://search.google.com/search-console"
  Write-Host "  2. Select property precifarm.com (or https://precifarm.com/)"
  Write-Host "  3. Sitemaps -> Add new sitemap -> enter: sitemap.xml"
  Write-Host "  Direct: https://search.google.com/search-console/sitemaps"
}

$token = Ensure-SearchConsoleAuth

$headers = @{
  Authorization = "Bearer $token"
  "Content-Type" = "application/json"
}

Write-Host "Listing verified sites..." -ForegroundColor Cyan
try {
  $sites = Invoke-RestMethod -Uri "https://www.googleapis.com/webmasters/v3/sites" -Headers $headers -Method Get
  $sites.siteEntry | ForEach-Object { Write-Host "  - $($_.siteUrl)" }
} catch {
  Write-Warning "Could not list sites: $($_.Exception.Message)"
  Write-Host ""
  Write-Host "Check:" -ForegroundColor Yellow
  Write-Host "  - Property verified at https://search.google.com/search-console"
  Write-Host "  - searchconsole.googleapis.com enabled on GCP project"
  Write-Host "  - Logged in as the Search Console owner (david.givondoh@gmail.com)"
  Show-ManualSitemapFallback
  exit 1
}

$hasProperty = $sites.siteEntry | Where-Object { $_.siteUrl -eq $SiteUrl -or $_.siteUrl -eq "sc-domain:precifarm.com" }
if (-not $hasProperty) {
  Write-Warning "Property not found for $SiteUrl or sc-domain:precifarm.com"
  Write-Host ""
  Write-Host "Step 1 - Add and verify the domain:" -ForegroundColor Yellow
  Write-Host "  https://search.google.com/search-console/welcome"
  Write-Host "  Recommended: Domain property precifarm.com (covers www + api subdomains)"
  exit 1
}

$property = ($hasProperty | Select-Object -First 1).siteUrl
Write-Host "Step 1 complete - verified property: $property" -ForegroundColor Green

Write-Host "Step 2 - Submitting sitemap: $SitemapUrl" -ForegroundColor Cyan
try {
  $EncodedSitemap = [uri]::EscapeDataString($SitemapUrl)
  $submitUri = "https://www.googleapis.com/webmasters/v3/sites/$([uri]::EscapeDataString($property))/sitemaps/$EncodedSitemap"
  Invoke-RestMethod -Uri $submitUri -Headers $headers -Method Put -Body "{}" | Out-Null
  Write-Host "Sitemap submitted." -ForegroundColor Green
} catch {
  Write-Warning "Sitemap submit: $($_.Exception.Message)"
  Show-ManualSitemapFallback
}

# Step 4 - priority URLs (includes /evs from SEO roadmap)
$priorityUrls = @(
  "https://precifarm.com/evs",
  "https://precifarm.com/charging/private-house",
  "https://precifarm.com/network",
  "https://precifarm.com/",
  "https://precifarm.com/guides",
  "https://precifarm.com/training"
)

Write-Host ""
Write-Host "Step 4 - URL Inspection (index status):" -ForegroundColor Cyan
foreach ($url in $priorityUrls) {
  try {
    $body = @{
      inspectionUrl = $url
      siteUrl = $property
    } | ConvertTo-Json
    $inspect = Invoke-RestMethod `
      -Uri "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect" `
      -Headers $headers `
      -Method Post `
      -Body $body
    $verdict = $inspect.inspectionResult.indexStatusResult.verdict
    $coverage = $inspect.inspectionResult.indexStatusResult.coverageState
    Write-Host "  $url" -ForegroundColor White
    Write-Host "    verdict: $verdict | coverage: $coverage" -ForegroundColor Gray
  } catch {
    Write-Host "  $url - inspect failed: $($_.Exception.Message)" -ForegroundColor Yellow
  }
}

Write-Host ""
Write-Host "Request indexing manually (Search Console UI - API cannot bulk-request for standard pages):" -ForegroundColor Cyan
Write-Host "  https://search.google.com/search-console?resource_id=$([uri]::EscapeDataString($property))"
Write-Host ""
foreach ($url in $priorityUrls[0..2]) {
  Write-Host "  URL Inspection -> Request indexing -> $url"
}

Write-Host ""
Write-Host "Sitemaps report:" -ForegroundColor Cyan
Write-Host "  https://search.google.com/search-console/sitemaps?resource_id=$([uri]::EscapeDataString($property))"

Write-Host ""
Write-Host "Step 5 - Monitor SEO health weekly:" -ForegroundColor Cyan
Write-Host "  https://precifarm.com/api/seo/health"
