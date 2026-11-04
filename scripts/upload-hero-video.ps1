# Upload the homepage hero video (pitch film v9, Keep Kenya Moving) to the public GCS media bucket.
# Looks for the files in Desktop\Precifarm Pitch v9 (made by pf-get-v9.ps1 or pf-a-to-z-v9.ps1);
# if they are not there, downloads them from GitHub (givondo/kenya-ebus-ecosystem, branch media/hero-v9)
# and checks them against SHA256SUMS.txt.
# Usage: powershell -ExecutionPolicy Bypass -File scripts/upload-hero-video.ps1

param(
  [string]$Dir = (Join-Path ([Environment]::GetFolderPath("Desktop")) "Precifarm Pitch v9")
)

$ErrorActionPreference = "Stop"

$GCLOUD = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
if (-not (Test-Path $GCLOUD)) { $GCLOUD = "gcloud" }

$PROJECT = "skilled-orbit-460722-h9"
$BUCKET = "precifarm-public-media-skilled-orbit"
$FILES = @("precifarm-pitch-v9-web.mp4", "precifarm-pitch-v9-mobile.mp4", "precifarm-pitch-v9-poster.jpg")

$missing = @($FILES | Where-Object { -not (Test-Path (Join-Path $Dir $_)) })
if ($missing.Count -gt 0) {
  $tmp = Join-Path $env:TEMP ("pf-hero-v9-" + (Get-Date -Format "yyyyMMdd-HHmmss"))
  Write-Host "Hero files not in $Dir; downloading from GitHub (media/hero-v9) ..." -ForegroundColor Cyan
  git -c core.autocrlf=false clone -q --depth 1 --single-branch --branch media/hero-v9 https://github.com/givondo/kenya-ebus-ecosystem.git $tmp
  if ($LASTEXITCODE -ne 0) { Write-Error "Could not download the hero video from GitHub." }
  foreach ($line in Get-Content (Join-Path $tmp "SHA256SUMS.txt")) {
    $hash, $name = $line -split '\s+', 2
    $name = $name.TrimStart('*').Trim()
    if ($FILES -notcontains $name) { continue }
    if ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $tmp $name)).Hash -ine $hash) { Write-Error "Checksum mismatch: $name" }
  }
  $Dir = $tmp
}

function Upload($Name, $Prefix, $Type) {
  $Local = Join-Path $Dir $Name
  if (-not (Test-Path $Local)) { Write-Error "Not found: $Local" }
  Write-Host "Uploading $Name ..." -ForegroundColor Cyan
  & $GCLOUD storage cp $Local "gs://$BUCKET/$Prefix/$Name" `
    --cache-control="public, max-age=31536000, immutable" `
    --content-type=$Type `
    --project=$PROJECT
  if ($LASTEXITCODE -ne 0) { Write-Error "Upload failed for $Name" }
  Write-Host "https://storage.googleapis.com/$BUCKET/$Prefix/$Name" -ForegroundColor Green
}

Upload "precifarm-pitch-v9-web.mp4" "videos" "video/mp4"
Upload "precifarm-pitch-v9-mobile.mp4" "videos" "video/mp4"
Upload "precifarm-pitch-v9-poster.jpg" "images" "image/jpeg"
