# Upload homepage hero MP4 variants to public GCS media bucket.
# Run scripts/compress-hero-video.mjs first (or pass -SourcePath master).
# Usage: powershell -File scripts/upload-hero-video.ps1

param(
  [string]$SourcePath = "",
  [string]$WebPath = "",
  [string]$MobilePath = ""
)

$ErrorActionPreference = "Stop"

$GCLOUD = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
if (-not (Test-Path $GCLOUD)) {
  Write-Error "gcloud not found. Install: https://cloud.google.com/sdk/docs/install"
}

$PROJECT = "skilled-orbit-460722-h9"
$BUCKET = "precifarm-public-media-skilled-orbit"
$Root = Join-Path $PSScriptRoot ".."
$VideosDir = Join-Path $Root "public\videos"

if (-not $WebPath) { $WebPath = Join-Path $VideosDir "precifarm-ad-v2-web.mp4" }
if (-not $MobilePath) { $MobilePath = Join-Path $VideosDir "precifarm-ad-v2-mobile.mp4" }
if (-not $SourcePath) {
  $SourcePath = "C:\Users\DAVID\Desktop\Precifarm Designs\Precifarm_Ad_v2_MASTER.mp4"
}

function Upload-Video($LocalPath, $ObjectName) {
  if (-not (Test-Path $LocalPath)) {
    Write-Error "Video not found: $LocalPath (run node scripts/compress-hero-video.mjs first)"
  }
  Write-Host "Uploading $ObjectName ..." -ForegroundColor Cyan
  & $GCLOUD storage cp $LocalPath "gs://$BUCKET/videos/$ObjectName" `
    --cache-control="public, max-age=31536000, immutable" `
    --content-type="video/mp4" `
    --project=$PROJECT
  if ($LASTEXITCODE -ne 0) { Write-Error "Upload failed for $ObjectName" }
  Write-Host "https://storage.googleapis.com/$BUCKET/videos/$ObjectName" -ForegroundColor Green
}

if ((Test-Path $WebPath) -and (Test-Path $MobilePath)) {
  Upload-Video $WebPath "precifarm-ad-v2-web.mp4"
  Upload-Video $MobilePath "precifarm-ad-v2-mobile.mp4"
} elseif (Test-Path $SourcePath) {
  Write-Host "Compressed variants missing - uploading master as legacy object..." -ForegroundColor Yellow
  Upload-Video $SourcePath "precifarm-ad-v2-master.mp4"
} else {
  Write-Error "No video files found. Compress locally or provide -SourcePath."
}

$POSTER = Join-Path $Root "public\images\home-hero-video-wallpaper.jpg"
if (Test-Path $POSTER) {
  Write-Host "Uploading poster..." -ForegroundColor Cyan
  & $GCLOUD storage cp $POSTER "gs://$BUCKET/images/home-hero-video-wallpaper.jpg" `
    --cache-control="public, max-age=31536000, immutable" `
    --content-type="image/jpeg" `
    --project=$PROJECT
  Write-Host "https://storage.googleapis.com/$BUCKET/images/home-hero-video-wallpaper.jpg" -ForegroundColor Green
}
