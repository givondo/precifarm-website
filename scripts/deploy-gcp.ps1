# Deploy precifarm-website to Cloud Run via Cloud Build
# Usage: npm run deploy:gcp
# Requires: gcloud CLI, authenticated, project configured

$ErrorActionPreference = "Stop"

$GCLOUD = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
if (-not (Test-Path $GCLOUD)) {
  Write-Error "gcloud not found. Install: https://cloud.google.com/sdk/docs/install"
}

$PROJECT = & $GCLOUD config get-value project 2>$null
if (-not $PROJECT) {
  Write-Error "No GCP project set. Run: gcloud config set project YOUR_PROJECT_ID"
}

Write-Host "Building and deploying precifarm-website to project $PROJECT..." -ForegroundColor Cyan
& $GCLOUD builds submit --config cloudbuild.yaml --project $PROJECT

if ($LASTEXITCODE -ne 0) {
  Write-Error "Deploy failed."
}

$URL = & $GCLOUD run services describe precifarm-website `
  --region europe-west1 --project $PROJECT --format="value(status.url)" 2>$null

Write-Host ""
Write-Host "Deploy complete." -ForegroundColor Green
if ($URL) {
  Write-Host "Service URL: $URL"
  Write-Host "Production:  https://precifarm.com"
}
