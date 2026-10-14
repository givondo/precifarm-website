# Upload homepage hero MP4 to public GCS media bucket.
# Usage: powershell -File scripts/upload-hero-video.ps1 [-SourcePath "C:\path\to\video.mp4"]

param(
  [string]$SourcePath = "C:\Users\DAVID\Desktop\Precifarm Designs\Precifarm_Ad_v2_MASTER.mp4"
)

$ErrorActionPreference = "Stop"

$GCLOUD = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
if (-not (Test-Path $GCLOUD)) {
  Write-Error "gcloud not found. Install: https://cloud.google.com/sdk/docs/install"
}

$PROJECT = "skilled-orbit-460722-h9"
$BUCKET = "precifarm-public-media-skilled-orbit"
$OBJECT = "videos/precifarm-ad-v2-master.mp4"

if (-not (Test-Path $SourcePath)) {
  Write-Error "Source video not found: $SourcePath"
}

Write-Host "Uploading hero video to gs://$BUCKET/$OBJECT ..." -ForegroundColor Cyan
& $GCLOUD storage cp $SourcePath "gs://$BUCKET/$OBJECT" `
  --cache-control="public, max-age=31536000, immutable" `
  --content-type="video/mp4" `
  --project=$PROJECT

if ($LASTEXITCODE -ne 0) {
  Write-Error "Upload failed."
}

$PUBLIC_URL = "https://storage.googleapis.com/$BUCKET/$OBJECT"
Write-Host ""
Write-Host "Video URL:" -ForegroundColor Green
Write-Host $PUBLIC_URL

$POSTER = Join-Path $PSScriptRoot "..\public\images\home-hero-video-wallpaper.jpg"
if (Test-Path $POSTER) {
  Write-Host "Uploading poster wallpaper..." -ForegroundColor Cyan
  & $GCLOUD storage cp $POSTER "gs://$BUCKET/images/home-hero-video-wallpaper.jpg" `
    --cache-control="public, max-age=31536000, immutable" `
    --content-type="image/jpeg" `
    --project=$PROJECT
  Write-Host "Poster URL:" -ForegroundColor Green
  Write-Host "https://storage.googleapis.com/$BUCKET/images/home-hero-video-wallpaper.jpg"
}
