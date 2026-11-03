# Upload the homepage hero video (v7) to the public GCS media bucket.
# The web (1080p) and mobile (720p) files are made from Precifarm_Pitch_v7_HQ.mp4
# and kept in Desktop\Precifarm Engineering\07 Website\Hero video v7.
# Usage: powershell -ExecutionPolicy Bypass -File scripts/upload-hero-video.ps1

param(
  [string]$Dir = "$env:USERPROFILE\Desktop\Precifarm Engineering\07 Website\Hero video v7"
)

$ErrorActionPreference = "Stop"

$GCLOUD = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
if (-not (Test-Path $GCLOUD)) { $GCLOUD = "gcloud" }

$PROJECT = "skilled-orbit-460722-h9"
$BUCKET = "precifarm-public-media-skilled-orbit"

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

Upload "precifarm-pitch-v7-web.mp4" "videos" "video/mp4"
Upload "precifarm-pitch-v7-mobile.mp4" "videos" "video/mp4"
Upload "precifarm-pitch-v7-poster.jpg" "images" "image/jpeg"
