# Ship precifarm.com: commit, check, push to GitHub, merge to main, host the hero video,
# deploy to Cloud Run and smoke-test the live site.
#
# Usage (from the website folder):
#   npm run ship
#   powershell -ExecutionPolicy Bypass -File scripts/ship.ps1 -Message "Homepage refresh"
#
# Options:
#   -Message "text"   Commit message for any uncommitted changes (asked for if needed)
#   -SkipChecks       Skip lint, type check, unit tests and build
#   -GitHubOnly       Push and merge to main, but do not deploy
#   -NoMerge          Push the current branch only; deploy is skipped unless already on main
#   -Yes              Do not ask for the DEPLOY confirmation

param(
  [string]$Message = "",
  [switch]$SkipChecks,
  [switch]$GitHubOnly,
  [switch]$NoMerge,
  [switch]$Yes
)

# Continue, not Stop: Windows PowerShell 5.1 turns harmless stderr from git and gcloud into
# errors under Stop. Every step checks its exit code instead.
$ErrorActionPreference = "Continue"

$Project = "skilled-orbit-460722-h9"
$Region  = "europe-west1"
$Service = "precifarm-website"
$Live    = "https://precifarm.com"
$Root    = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $Root

function Step($text) { Write-Host ""; Write-Host "==> $text" -ForegroundColor Cyan }
function Ok($text)   { Write-Host "    $text" -ForegroundColor Green }
function Fail($text) { Write-Host ""; Write-Host "STOPPED: $text" -ForegroundColor Red; exit 1 }

function Run([string]$exe, [string[]]$argv, [string]$what) {
  & $exe @argv
  if ($LASTEXITCODE -ne 0) { Fail "$what failed (exit $LASTEXITCODE)." }
}

# ---------------------------------------------------------------- tools
Step "Checking tools"
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Fail "git is not installed." }
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { Fail "Node.js and npm are not installed." }

$GCLOUD = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
if (-not (Test-Path $GCLOUD)) {
  $cmd = Get-Command gcloud -ErrorAction SilentlyContinue
  if ($cmd) { $GCLOUD = $cmd.Source } else { $GCLOUD = $null }
}
if (-not $GitHubOnly) {
  if (-not $GCLOUD) { Fail "gcloud not found. Install the Google Cloud SDK, then run: gcloud auth login" }
  $account = & $GCLOUD auth list --filter="status:ACTIVE" --format="value(account)" 2>$null
  if (-not $account) { Fail "gcloud is not signed in. Run: gcloud auth login" }
  Ok "gcloud signed in as $account"
}
Ok "git and npm found"

if (-not (git config user.email)) { git config user.email "david.givondoh@gmail.com" }
if (-not (git config user.name))  { git config user.name "Sayia David Givondo" }

# ---------------------------------------------------------------- commit
Step "Committing local changes"
$branch = (git rev-parse --abbrev-ref HEAD).Trim()
$dirty = git status --porcelain
if ($dirty) {
  git status --short
  if (-not $Message) { $Message = Read-Host "Commit message" }
  if (-not $Message) { Fail "A commit message is needed for the changes above." }
  Run git @("add", "-A") "git add"
  Run git @("commit", "-m", $Message) "git commit"
  Ok "Committed on $branch"
} else {
  Ok "Nothing to commit on $branch"
}

# ---------------------------------------------------------------- checks
if (-not $SkipChecks) {
  Step "Quality checks"
  if (-not (Test-Path "node_modules")) { Run npm @("ci") "npm ci" }
  if (Test-Path ".next") {
    Write-Host "Clearing the old Next.js build cache (.next)"
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    if (Test-Path ".next") { Fail "Could not clear .next. Stop the localhost dev server (Ctrl+C in its window) and run again." }
  }
  Run npm @("run", "lint") "Lint"
  Run npm @("run", "typecheck") "Type check"
  Run npm @("test") "Unit tests"
  Run npm @("run", "build") "Production build"
  Ok "Lint, types, tests and build pass"
} else {
  Step "Quality checks skipped (-SkipChecks)"
}

# ---------------------------------------------------------------- GitHub
Step "Pushing to GitHub"
Run git @("fetch", "origin") "git fetch"
Run git @("push", "-u", "origin", $branch) "Push $branch"
Ok "Pushed $branch"

if ($branch -ne "main" -and -not $NoMerge) {
  Step "Merging $branch into main"
  Run git @("checkout", "main") "Checkout main"
  Run git @("pull", "--ff-only", "origin", "main") "Update main"
  Run git @("merge", "--no-ff", $branch, "-m", "Merge branch '$branch'") "Merge $branch"
  Run git @("push", "origin", "main") "Push main"
  $branch = "main"
  Ok "main is up to date on GitHub (an open pull request for the branch closes as merged)"
}

if ($GitHubOnly) { Write-Host ""; Write-Host "Done: GitHub updated, no deploy (-GitHubOnly)." -ForegroundColor Green; exit 0 }
if ($branch -ne "main") { Write-Host ""; Write-Host "Done: $branch pushed. Deploys run from main only." -ForegroundColor Yellow; exit 0 }
if (git status --porcelain) { Fail "The working tree is not clean; commit or stash before deploying." }

# ---------------------------------------------------------------- hero video
Step "Checking the hero video is hosted"
$copy = Get-Content (Join-Path $Root "lib\brand-messaging.ts") -Raw
$videoUrls = [regex]::Matches($copy, 'https://storage\.googleapis\.com/[^"\s]+\.mp4') | ForEach-Object { $_.Value } | Sort-Object -Unique

function Test-Url($url) {
  try { $r = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop; return ($r.StatusCode -eq 200) }
  catch { return $false }
}

$missing = @($videoUrls | Where-Object { -not (Test-Url $_) })
if ($missing.Count -gt 0) {
  Write-Host "    Not hosted yet:" -ForegroundColor Yellow
  $missing | ForEach-Object { Write-Host "      $_" }
  $upload = Join-Path $PSScriptRoot "upload-hero-video.ps1"
  & powershell -ExecutionPolicy Bypass -File $upload
  if ($LASTEXITCODE -ne 0) { Fail "Hero video upload failed." }
  $missing = @($videoUrls | Where-Object { -not (Test-Url $_) })
  if ($missing.Count -gt 0) { Fail "Hero video still not reachable: $($missing -join ', ')" }
}
Ok "Hero video reachable ($($videoUrls.Count) files)"

# ---------------------------------------------------------------- deploy
$commit = (git rev-parse --short HEAD).Trim()
$previous = & $GCLOUD run services describe $Service --region $Region --project $Project --format="value(status.latestReadyRevisionName)" 2>$null

Step "Ready to deploy commit $commit to $Live"
if ($previous) { Write-Host "    Current live revision: $previous" }
if (-not $Yes) {
  $answer = Read-Host "Type DEPLOY to publish to precifarm.com"
  if ($answer -ne "DEPLOY") { Write-Host "Deploy cancelled. GitHub is updated." -ForegroundColor Yellow; exit 0 }
}

Step "Building and deploying on Google Cloud (5 to 10 minutes)"
Run $GCLOUD @("builds", "submit", "--config", "cloudbuild.yaml", "--project", $Project) "Cloud Build"
$revision = & $GCLOUD run services describe $Service --region $Region --project $Project --format="value(status.latestReadyRevisionName)" 2>$null
Ok "Live revision: $revision"

# ---------------------------------------------------------------- smoke test
Step "Smoke-testing $Live"

function Get-Page($path) {
  for ($i = 1; $i -le 3; $i++) {
    try { return Invoke-WebRequest -Uri "$Live$($path)?v=$commit" -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop }
    catch { Start-Sleep -Seconds 10 }
  }
  return $null
}

function Final-Url($resp) {
  if ($resp.BaseResponse.ResponseUri) { return $resp.BaseResponse.ResponseUri.AbsolutePath }
  return $resp.BaseResponse.RequestMessage.RequestUri.AbsolutePath
}

$checks = @(
  @{ Path = "/";                  Expect = "Powering the shift to electric transport" },
  @{ Path = "/charging/corridor"; Expect = "ARC Corridor" },
  @{ Path = "/agent";             Expect = "Precifarm Agent" },
  @{ Path = "/charging/home";     Expect = "Pulse" }
)
$failed = 0
foreach ($c in $checks) {
  $r = Get-Page $c.Path
  if ($r -and $r.StatusCode -eq 200 -and $r.Content -match [regex]::Escape($c.Expect)) { Ok "$($c.Path) OK" }
  else { Write-Host "    $($c.Path) FAILED (expected '$($c.Expect)')" -ForegroundColor Red; $failed++ }
}
# Read the Location header directly: Windows PowerShell 5.1 does not follow the 308
# permanent redirects Next.js sends, so following the redirect is not a fair test.
function Get-RedirectPath($path) {
  $req = [System.Net.HttpWebRequest]::Create("$Live$path")
  $req.AllowAutoRedirect = $false
  try { $resp = $req.GetResponse() } catch [System.Net.WebException] { $resp = $_.Exception.Response }
  if (-not $resp) { return $null }
  $loc = $resp.Headers["Location"]
  $resp.Close()
  if (-not $loc) { return $null }
  return ([Uri]::new([Uri]"$Live$path", $loc)).AbsolutePath
}
foreach ($rd in @(@{ From = "/book"; To = "/charging" }, @{ From = "/ai"; To = "/agent" })) {
  if ((Get-RedirectPath $rd.From) -eq $rd.To) { Ok "$($rd.From) redirects to $($rd.To)" }
  else { Write-Host "    $($rd.From) did not redirect to $($rd.To)" -ForegroundColor Red; $failed++ }
}

Write-Host ""
if ($failed -gt 0) {
  Write-Host "Deployed, but $failed smoke check(s) failed. Check $Live now." -ForegroundColor Red
  if ($previous) {
    Write-Host "To roll back to the previous revision:" -ForegroundColor Yellow
    Write-Host "  gcloud run services update-traffic $Service --to-revisions=$previous=100 --region $Region --project $Project"
  }
  exit 1
}
Write-Host "Live: $Live is serving commit $commit (revision $revision)." -ForegroundColor Green
if ($previous) { Write-Host "Roll back if needed: gcloud run services update-traffic $Service --to-revisions=$previous=100 --region $Region --project $Project" }
