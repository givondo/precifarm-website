# Mount the agent API key on Cloud Run from website/.env.local (one-time or rotate).
# Prefers OPENROUTER_API_KEY; falls back to DEEPSEEK_API_KEY.
# Usage: powershell -ExecutionPolicy Bypass -File scripts/set-cloud-run-agent-secret.ps1

$ErrorActionPreference = "Stop"
$Project = "skilled-orbit-460722-h9"
$Region = "europe-west1"
$Service = "precifarm-website"
$EnvFile = Join-Path (Join-Path $PSScriptRoot "..") ".env.local"

if (-not (Test-Path $EnvFile)) {
  Write-Error "Missing $EnvFile - set OPENROUTER_API_KEY=... then re-run."
}

function Read-EnvValue([string]$Name) {
  $line = Get-Content $EnvFile | Where-Object { $_ -match "^\s*$Name=(.+)$" } | Select-Object -First 1
  if (-not $line) { return $null }
  $value = ($line -replace "^\s*$Name=", '').Trim().Trim('"').Trim("'")
  if ([string]::IsNullOrWhiteSpace($value)) { return $null }
  return $value
}

$key = Read-EnvValue "OPENROUTER_API_KEY"
if ($key) {
  $EnvName = "OPENROUTER_API_KEY"
  $SecretId = "precifarm-openrouter-api-key"
  $Model = "deepseek/deepseek-v4-flash"
} else {
  $key = Read-EnvValue "DEEPSEEK_API_KEY"
  if (-not $key) { Write-Error "Neither OPENROUTER_API_KEY nor DEEPSEEK_API_KEY is set in .env.local" }
  $EnvName = "DEEPSEEK_API_KEY"
  $SecretId = "precifarm-deepseek-api-key"
  $Model = "deepseek-v4-flash"
}

$gcloud = Join-Path $env:LOCALAPPDATA "Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
if (-not (Test-Path $gcloud)) {
  Write-Error "gcloud not found. Install Google Cloud SDK."
}

$tmp = [IO.Path]::GetTempFileName()
try {
  [IO.File]::WriteAllText($tmp, $key)

  $ErrorActionPreference = "Continue"
  & $gcloud secrets describe $SecretId --project $Project 2>$null | Out-Null
  $exists = ($LASTEXITCODE -eq 0)
  $ErrorActionPreference = "Stop"

  if ($exists) {
    & $gcloud secrets versions add $SecretId --project $Project --data-file="$tmp"
  } else {
    & $gcloud secrets create $SecretId --project $Project --replication-policy=automatic --data-file="$tmp"
  }
} finally {
  Remove-Item $tmp -Force -ErrorAction SilentlyContinue
}

$projectNumber = & $gcloud projects describe $Project --format="value(projectNumber)"
& $gcloud secrets add-iam-policy-binding $SecretId --project $Project `
  --member="serviceAccount:$projectNumber-compute@developer.gserviceaccount.com" `
  --role="roles/secretmanager.secretAccessor" | Out-Null

& $gcloud run services update $Service --region $Region --project $Project `
  --update-secrets="${EnvName}=${SecretId}:latest" `
  --update-env-vars="AGENT_MODEL=$Model"

Write-Host "Cloud Run $Service updated with $EnvName secret ($SecretId), model $Model." -ForegroundColor Green
