# Step 4 - open Search Console URL Inspection for priority pages (manual indexing)
# Google does not allow bulk Request indexing via API for standard web pages.
# Usage: powershell -File scripts/request-indexing.ps1

$Property = "https://precifarm.com/"
$EncodedProperty = [uri]::EscapeDataString($Property)

$priorityUrls = @(
  "https://precifarm.com/evs",
  "https://precifarm.com/charging/home",
  "https://precifarm.com/hub",
  "https://precifarm.com/locations/ev-charging-nairobi",
  "https://precifarm.com/locations/ev-charging-kisumu",
  "https://precifarm.com/guides/home-ev-charging-cost-kenya",
  "https://precifarm.com/guides/ev-charger-installation-kenya",
  "https://precifarm.com/guides/ev-charging-vs-petrol-kenya"
)

Write-Host "Step 4 - Request indexing in Search Console" -ForegroundColor Cyan
Write-Host "For each URL: open link, Test live URL, Request indexing" -ForegroundColor Gray
Write-Host ""

foreach ($url in $priorityUrls) {
  $encodedUrl = [uri]::EscapeDataString($url)
  $inspect = 'https://search.google.com/search-console/inspect?resource_id=' + $EncodedProperty + '&url=' + $encodedUrl
  Write-Host $url -ForegroundColor White
  Write-Host ('  ' + $inspect) -ForegroundColor DarkGray
  Write-Host ""
}

Write-Host "Sitemaps (step 2 if not done):" -ForegroundColor Cyan
Write-Host ('  https://search.google.com/search-console/sitemaps?resource_id=' + $EncodedProperty)
Write-Host '  Enter: sitemap.xml'
