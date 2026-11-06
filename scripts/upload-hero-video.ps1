# Upload the homepage hero video (pitch film v9, Keep Kenya Moving) to the public GCS media bucket.
#
# Source of truth: GitHub givondo/kenya-ebus-ecosystem, branch media/hero-v9, with SHA256SUMS.txt.
# Every file is checked against that manifest before upload, and read back from the bucket and
# checked again after upload. A local -Dir is optional and gets the same checks.
#
# Why: on 4 Nov 2026 a damaged local copy of precifarm-pitch-v9-web.mp4 was uploaded unchecked. It had
# a corrupt frame at 1:36, so desktop browsers stopped playing at about 1:35. Objects are served with
# an immutable one-year cache, so a fixed file goes up under a new name (-r2) instead of overwriting.
#
# Usage: powershell -ExecutionPolicy Bypass -File scripts/upload-hero-video.ps1 [-Dir <folder>]

param(
  [string]$Dir = ""
)

$ErrorActionPreference = "Stop"

$GCLOUD = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
if (-not (Test-Path $GCLOUD)) { $GCLOUD = "gcloud" }

$PROJECT = "skilled-orbit-460722-h9"
$BUCKET = "precifarm-public-media-skilled-orbit"

# Source file name on media/hero-v9 => published object (prefix/name). Keep in step with lib/brand-messaging.ts.
$FILES = [ordered]@{
  "precifarm-pitch-v9-web.mp4"    = @{ Object = "videos/precifarm-pitch-v9-web-r2.mp4"; Type = "video/mp4" }
  "precifarm-pitch-v9-mobile.mp4" = @{ Object = "videos/precifarm-pitch-v9-mobile.mp4"; Type = "video/mp4" }
  "precifarm-pitch-v9-poster.jpg" = @{ Object = "images/precifarm-pitch-v9-poster.jpg"; Type = "image/jpeg" }
}

$tmp = Join-Path $env:TEMP ("pf-hero-v9-" + (Get-Date -Format "yyyyMMdd-HHmmss"))
Write-Host "Fetching the hero files and checksums from GitHub (media/hero-v9) ..." -ForegroundColor Cyan
git -c core.autocrlf=false clone -q --depth 1 --single-branch --branch media/hero-v9 https://github.com/givondo/kenya-ebus-ecosystem.git $tmp
if ($LASTEXITCODE -ne 0) { Write-Error "Could not download the hero video from GitHub." }

$expected = @{}
foreach ($line in Get-Content (Join-Path $tmp "SHA256SUMS.txt")) {
  if (-not $line.Trim()) { continue }
  $hash, $name = $line -split '\s+', 2
  $expected[$name.TrimStart('*').Trim()] = $hash.Trim()
}

if (-not $Dir) { $Dir = $tmp }

function Test-Hash($Path, $Name) {
  if (-not $expected.ContainsKey($Name)) { Write-Error "No checksum listed for $Name in SHA256SUMS.txt" }
  $actual = (Get-FileHash -Algorithm SHA256 -LiteralPath $Path).Hash
  return ($actual -ieq $expected[$Name])
}

foreach ($name in $FILES.Keys) {
  $local = Join-Path $Dir $name
  if (-not (Test-Path $local)) { Write-Error "Not found: $local" }
  if (-not (Test-Hash $local $name)) { Write-Error "Checksum mismatch before upload: $local is damaged. Use the GitHub copy (omit -Dir)." }
}
Write-Host "All files match SHA256SUMS.txt." -ForegroundColor Green

$check = Join-Path $tmp "readback"
New-Item -ItemType Directory -Force -Path $check | Out-Null

foreach ($name in $FILES.Keys) {
  $local = Join-Path $Dir $name
  $object = $FILES[$name].Object
  $type = $FILES[$name].Type
  Write-Host "Uploading $name -> $object ..." -ForegroundColor Cyan
  & $GCLOUD storage cp $local "gs://$BUCKET/$object" `
    "--cache-control=public, max-age=31536000, immutable" `
    "--content-type=$type" `
    "--project=$PROJECT"
  if ($LASTEXITCODE -ne 0) { Write-Error "Upload failed for $name" }

  $back = Join-Path $check $name
  & $GCLOUD storage cp "gs://$BUCKET/$object" $back "--project=$PROJECT"
  if ($LASTEXITCODE -ne 0) { Write-Error "Could not read back $object" }
  if (-not (Test-Hash $back $name)) { Write-Error "Checksum mismatch after upload: gs://$BUCKET/$object is damaged." }
  Write-Host "Verified https://storage.googleapis.com/$BUCKET/$object" -ForegroundColor Green
}
