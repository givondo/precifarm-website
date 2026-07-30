# Submit sitemap and request indexing hints via Google Search Console API
# Prerequisites:
#   1. Site verified in Search Console for david.givondoh@gmail.com (or your account)
#   2. searchconsole.googleapis.com enabled on GCP project
# Usage: powershell -File scripts/submit-search-console.ps1

$ErrorActionPreference = "Stop"

$SiteUrl = "https://precifarm.com/"
$SitemapUrl = "https://precifarm.com/sitemap.xml"
$EncodedSite = [uri]::EscapeDataString($SiteUrl)
$EncodedSitemap = [uri]::EscapeDataString($SitemapUrl)

$GCLOUD = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
if (-not (Test-Path $GCLOUD)) {
  Write-Error "gcloud not found."
}

Write-Host "Authenticating for Search Console (browser may open)..." -ForegroundColor Cyan
& $GCLOUD auth login --brief --scopes="openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/webmasters" 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Error "Auth failed. Run manually:`ngcloud auth login --scopes=https://www.googleapis.com/auth/webmasters"
}

$token = & $GCLOUD auth print-access-token 2>&1

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
  Write-Host "Verify https://precifarm.com in Search Console first:" -ForegroundColor Yellow
  Write-Host "  https://search.google.com/search-console/welcome"
  exit 1
}

$hasProperty = $sites.siteEntry | Where-Object { $_.siteUrl -eq $SiteUrl -or $_.siteUrl -eq "sc-domain:precifarm.com" }
if (-not $hasProperty) {
  Write-Warning "Property not found for $SiteUrl"
  Write-Host "Add and verify the domain in Search Console, then re-run."
  exit 1
}

$property = ($hasProperty | Select-Object -First 1).siteUrl
Write-Host "Using property: $property" -ForegroundColor Green

Write-Host "Submitting sitemap: $SitemapUrl" -ForegroundColor Cyan
try {
  $submitUri = "https://www.googleapis.com/webmasters/v3/sites/$([uri]::EscapeDataString($property))/sitemaps/$EncodedSitemap"
  Invoke-RestMethod -Uri $submitUri -Headers $headers -Method Put -Body "{}" | Out-Null
  Write-Host "Sitemap submitted." -ForegroundColor Green
} catch {
  Write-Warning "Sitemap submit: $($_.Exception.Message)"
}

# Priority URLs to inspect (manual step reminder — Indexing API needs separate setup)
$priorityUrls = @(
  "https://precifarm.com/",
  "https://precifarm.com/training",
  "https://precifarm.com/charging/private-house",
  "https://precifarm.com/network",
  "https://precifarm.com/guides",
  "https://precifarm.com/faq",
  "https://precifarm.com/locations"
)

Write-Host ""
Write-Host "Request indexing for priority URLs in Search Console:" -ForegroundColor Cyan
Write-Host "  https://search.google.com/search-console?resource_id=$([uri]::EscapeDataString($property))"
Write-Host ""
foreach ($url in $priorityUrls) {
  Write-Host "  URL Inspection -> $url"
}

Write-Host ""
Write-Host "Or use Sitemaps report:" -ForegroundColor Cyan
Write-Host "  https://search.google.com/search-console/sitemaps?resource_id=$([uri]::EscapeDataString($property))"
