# Deploy precifarm.com: GitHub, then live on Google Cloud.
# Double-click "Deploy precifarm.com.bat" or run:
#   powershell -ExecutionPolicy Bypass -File "Deploy-Precifarm.ps1"
#
# It finds (or clones) the website repo, gets the latest release branch, then runs
# scripts/ship.ps1 in the repo: checks, push and merge to main, hero video upload,
# Cloud Run deploy after you type DEPLOY, and a live smoke test.
#
# Options are passed through to ship.ps1: -GitHubOnly, -SkipChecks, -Yes, -Message "text"

param(
  [string]$RepoPath = "",
  [string]$Branch = "ui-modernisation/phase-a-b",
  [Parameter(ValueFromRemainingArguments = $true)] $ShipArgs
)

$ErrorActionPreference = "Continue"
$Remote = "https://github.com/givondo/precifarm-website.git"

function Step($t) { Write-Host ""; Write-Host "==> $t" -ForegroundColor Cyan }
function Fail($t) { Write-Host ""; Write-Host "STOPPED: $t" -ForegroundColor Red; Read-Host "Press Enter to close"; exit 1 }

if (-not (Get-Command git -ErrorAction SilentlyContinue)) { Fail "git is not installed." }
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { Fail "Node.js is not installed." }

# ------------------------------------------------------------ find the repo
Step "Finding the website repo"
$candidates = @(
  $RepoPath,
  "$env:USERPROFILE\Desktop\kenya-ebus-ecosystem\website",
  "$env:USERPROFILE\Dev\kenya-ebus-ecosystem\website",
  "$env:USERPROFILE\Documents\kenya-ebus-ecosystem\website",
  "$env:USERPROFILE\Desktop\precifarm-website",
  "$env:USERPROFILE\Dev\precifarm-website"
) | Where-Object { $_ }

$repo = $null
foreach ($c in $candidates) {
  if (Test-Path (Join-Path $c ".git")) {
    $url = (git -C $c remote get-url origin 2>$null)
    if ($url -match "precifarm-website") { $repo = $c; break }
  }
}
if (-not $repo) {
  $repo = "$env:USERPROFILE\Dev\precifarm-website"
  Write-Host "    Not found; cloning into $repo"
  New-Item -ItemType Directory -Force -Path (Split-Path $repo) | Out-Null
  git clone $Remote $repo
  if ($LASTEXITCODE -ne 0) { Fail "Could not clone $Remote" }
}
Write-Host "    $repo" -ForegroundColor Green
Set-Location $repo

# ------------------------------------------------------------ get the release branch
Step "Getting the latest code from GitHub"
git fetch origin --prune
if ($LASTEXITCODE -ne 0) { Fail "git fetch failed. Check your internet connection." }

if (git status --porcelain) {
  $label = "before deploy " + (Get-Date -Format "yyyy-MM-dd HH:mm")
  git stash push --include-untracked -m $label | Out-Null
  Write-Host "    Your uncommitted local changes were set aside (git stash: '$label')." -ForegroundColor Yellow
  Write-Host "    Bring them back later with: git stash pop" -ForegroundColor Yellow
}

$remoteBranch = git ls-remote --heads origin $Branch
if ($remoteBranch) {
  git checkout $Branch 2>$null
  if ($LASTEXITCODE -ne 0) { git checkout -b $Branch "origin/$Branch" }
  git pull --ff-only origin $Branch
  if ($LASTEXITCODE -ne 0) { Fail "Could not update $Branch (local history differs from GitHub)." }
} else {
  Write-Host "    $Branch is not on GitHub (already merged); deploying main." -ForegroundColor Yellow
  git checkout main
  git pull --ff-only origin main
  if ($LASTEXITCODE -ne 0) { Fail "Could not update main." }
}

if (-not (Test-Path "scripts\ship.ps1")) { Fail "scripts\ship.ps1 is missing on this branch." }
if (-not (Test-Path "node_modules")) {
  Step "Installing packages (first run only)"
  npm ci
  if ($LASTEXITCODE -ne 0) { Fail "npm ci failed." }
}

# ------------------------------------------------------------ ship
& powershell -ExecutionPolicy Bypass -File "scripts\ship.ps1" @ShipArgs
$code = $LASTEXITCODE
Write-Host ""
Read-Host "Press Enter to close"
exit $code
