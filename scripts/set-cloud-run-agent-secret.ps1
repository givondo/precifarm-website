# Mount DEEPSEEK_API_KEY on Cloud Run from website/.env.local (one-time or rotate).
# Usage: powershell -ExecutionPolicy Bypass -File scripts/set-cloud-run-agent-secret.ps1

$ErrorActionPreference = "Stop"
$Project = "skilled-orbit-460722-h9"
$Region = "europe-west1"
$Service = "precifarm-website"
$SecretId = "precifarm-deepseek-api-key"
$EnvFile = Join-Path $PSScriptRoot ".." ".env.local"

if (-not (Test-Path $EnvFile)) {
  Write-Error "Missing $EnvFile — set DEEPSEEK_API_KEY=... then re-run."
}

$keyLine = Get-Content $EnvFile | Where-Object { $_ -match '^\s*DEEPSEEK_API_KEY=(.+)$' } | Select-Object -First 1
if (-not $keyLine) {
  Write-Error "DEEPSEEK_API_KEY not set in .env.local"
}

$key = ($keyLine -replace '^\s*DEEPSEEK_API_KEY=', '').Trim().Trim('"').Trim("'")
if ([string]::IsNullOrWhiteSpace($key)) {
  Write-Error "DEEPSEEK_API_KEY is empty in .env.local"
}

$gcloud = Join-Path $env:LOCALAPPDATA "Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
if (-not (Test-Path $gcloud)) {
  Write-Error "gcloud not found. Install Google Cloud SDK."
}

$secretExists = & $gcloud secrets describe $SecretId --project $Project 2>$null
if ($LASTEXITCODE -ne 0) {
  $key | & $gcloud secrets create $SecretId --project $Project --data-file=-
} else {
  $key | & $gcloud secrets versions add $SecretId --project $Project --data-file=-
}

& $gcloud run services update $Service --region $Region --project $Project `
  --set-secrets="DEEPSEEK_API_KEY=${SecretId}:latest" `
  --update-env-vars="AGENT_MODEL=deepseek-v4-flash"

Write-Host "Cloud Run $Service updated with DEEPSEEK_API_KEY secret." -ForegroundColor Green
