# =====================================================================================
#  Precifarm website: A to Z release
#  GitHub (push and merge to main) and live on Google Cloud Run (precifarm.com)
#
#  Run:   right-click > Run with PowerShell
#    or:  powershell -ExecutionPolicy Bypass -File "Precifarm-Deploy-AtoZ.ps1"
#
#  A  Settings              H  Pull the release branch
#  B  Log file              I  Install packages
#  C  Tools (git, Node,     J  Quality checks (lint, types, tests, build)
#     Google Cloud SDK)     K  Push to GitHub, merge to main
#  D  Google Cloud sign-in  L  Hero video on Cloud Storage
#  E  Project and APIs      M  Confirm (type DEPLOY)
#  F  Find or clone repo    N  Build and deploy on Cloud Run
#  G  Local changes         O  Smoke test the live site
#                           Z  Summary and rollback command
#
#  Options:
#    -GitHubOnly    stop after K (no deploy)
#    -SkipChecks    skip J
#    -Yes           no questions (local changes are set aside, deploy without DEPLOY prompt)
#    -Message "x"   commit message if you choose to include local changes
#    -RepoPath "x"  website repo folder if it is somewhere unusual
#    -NoPause       do not wait for Enter at the end
# =====================================================================================

param(
  [string]$Message = "",
  [string]$RepoPath = "",
  [string]$Branch = "ui-modernisation/phase-a-b",
  [string]$VideoDir = "$env:USERPROFILE\Desktop\Precifarm Engineering\07 Website\Hero video v7",
  [switch]$GitHubOnly,
  [switch]$SkipChecks,
  [switch]$Yes,
  [switch]$NoPause
)

# Continue, not Stop: Windows PowerShell 5.1 treats ordinary stderr from git, npm and
# gcloud as errors under Stop. Every step checks its own exit code instead.
$ErrorActionPreference = "Continue"
$ProgressPreference = "SilentlyContinue"

# ------------------------------------------------------------------------------ A
$Project   = "skilled-orbit-460722-h9"
$Region    = "europe-west1"
$Service   = "precifarm-website"
$Bucket    = "precifarm-public-media-skilled-orbit"
$Remote    = "https://github.com/givondo/precifarm-website.git"
$Live      = "https://precifarm.com"
$Started   = Get-Date

function Step($id, $text) { Write-Host ""; Write-Host "[$id] $text" -ForegroundColor Cyan }
function Ok($text)   { Write-Host "    $text" -ForegroundColor Green }
function Note($text) { Write-Host "    $text" -ForegroundColor Yellow }
function Done($code) {
  try { Stop-Transcript | Out-Null } catch {}
  if (-not $NoPause) { Write-Host ""; Read-Host "Press Enter to close" | Out-Null }
  exit $code
}
function Fail($text) {
  Write-Host ""
  Write-Host "STOPPED: $text" -ForegroundColor Red
  Write-Host "Log: $script:LogFile"
  Done 1
}
function Run([string]$exe, [string[]]$argv, [string]$what) {
  & $exe @argv
  if ($LASTEXITCODE -ne 0) { Fail "$what failed (exit $LASTEXITCODE)." }
}
function Refresh-Path {
  $env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")
}

# ------------------------------------------------------------------------------ B
$LogDir = Join-Path $PSScriptRoot "deploy-logs"
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null
$script:LogFile = Join-Path $LogDir ("deploy-" + (Get-Date -Format "yyyy-MM-dd_HHmm") + ".log")
try { Start-Transcript -Path $script:LogFile | Out-Null } catch {}
Write-Host "Precifarm website release, $($Started.ToString('d MMM yyyy HH:mm'))" -ForegroundColor White
Write-Host "Log: $script:LogFile"

# ------------------------------------------------------------------------------ C
Step "C" "Checking tools"

function Ensure-Tool($cmd, $wingetId, $label) {
  if (Get-Command $cmd -ErrorAction SilentlyContinue) { Ok "$label found"; return }
  if (-not (Get-Command winget -ErrorAction SilentlyContinue)) { Fail "$label is missing and winget is not available. Install $label, then run again." }
  Note "$label missing; installing with winget"
  winget install -e --id $wingetId --accept-source-agreements --accept-package-agreements --silent
  Refresh-Path
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) { Fail "$label installed but not on PATH yet. Close this window and run the script again." }
  Ok "$label installed"
}

Ensure-Tool "git" "Git.Git" "Git"
Ensure-Tool "node" "OpenJS.NodeJS.LTS" "Node.js"

$nodeMajor = [int]((node --version).TrimStart("v").Split(".")[0])
if ($nodeMajor -lt 20) { Fail "Node.js $nodeMajor is too old; version 20 or newer is needed (winget upgrade OpenJS.NodeJS.LTS)." }
Ok "Node.js version $nodeMajor"

$GCLOUD = $null
foreach ($p in @(
    "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd",
    "${env:ProgramFiles(x86)}\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd",
    "$env:ProgramFiles\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd")) {
  if ($p -and (Test-Path $p)) { $GCLOUD = $p; break }
}
if (-not $GCLOUD) {
  $c = Get-Command gcloud -ErrorAction SilentlyContinue
  if ($c) { $GCLOUD = $c.Source }
}
if (-not $GCLOUD -and -not $GitHubOnly) {
  Ensure-Tool "gcloud" "Google.CloudSDK" "Google Cloud SDK"
  $GCLOUD = (Get-Command gcloud).Source
}
if ($GCLOUD) { Ok "Google Cloud SDK found" }

# ------------------------------------------------------------------------------ D
if (-not $GitHubOnly) {
  Step "D" "Google Cloud sign-in"
  $account = & $GCLOUD auth list --filter="status:ACTIVE" --format="value(account)" 2>$null
  if (-not $account) {
    Note "Not signed in. A browser window will open; sign in with the Google account that owns precifarm.com."
    & $GCLOUD auth login
    $account = & $GCLOUD auth list --filter="status:ACTIVE" --format="value(account)" 2>$null
    if (-not $account) { Fail "Google Cloud sign-in did not complete." }
  }
  Ok "Signed in as $account"

  # ---------------------------------------------------------------------------- E
  Step "E" "Project and services"
  & $GCLOUD config set project $Project 2>$null | Out-Null
  $enabled = & $GCLOUD services list --enabled --project $Project --format="value(config.name)" 2>$null
  if (-not $enabled) { Fail "Cannot read project $Project. Check this account has access to it." }
  $needed = @("run.googleapis.com", "cloudbuild.googleapis.com", "artifactregistry.googleapis.com", "storage.googleapis.com")
  $off = @($needed | Where-Object { $enabled -notcontains $_ })
  if ($off.Count -gt 0) {
    Note "Enabling: $($off -join ', ')"
    Run $GCLOUD (@("services", "enable") + $off + @("--project", $Project)) "Enable services"
  }
  Ok "Project $Project ready"
}

# ------------------------------------------------------------------------------ F
Step "F" "Finding the website repo"
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
    $url = git -C $c remote get-url origin 2>$null
    if ($url -match "precifarm-website") { $repo = $c; break }
  }
}
if (-not $repo) {
  $repo = "$env:USERPROFILE\Dev\precifarm-website"
  Note "Not found; cloning into $repo"
  New-Item -ItemType Directory -Force -Path (Split-Path $repo) | Out-Null
  Run git @("clone", $Remote, $repo) "git clone"
}
Set-Location $repo
Ok $repo

# ------------------------------------------------------------------------------ G
Step "G" "Local changes"
Run git @("fetch", "origin", "--prune") "git fetch"
$dirty = git status --porcelain
$commitLocal = $false
if ($dirty) {
  git status --short
  $choice = "S"
  if (-not $Yes) {
    Write-Host ""
    Write-Host "    These files differ from GitHub. What should happen to them?"
    Write-Host "      C = commit them into this release"
    Write-Host "      S = set them aside (git stash, nothing is lost)"
    Write-Host "      Q = quit"
    $choice = (Read-Host "    C, S or Q").ToUpper()
  }
  switch ($choice) {
    "C" { $commitLocal = $true; Ok "Will commit them after updating the branch" }
    "S" {
      $label = "before deploy " + (Get-Date -Format "yyyy-MM-dd HH:mm")
      Run git @("stash", "push", "--include-untracked", "-m", $label) "git stash"
      Ok "Set aside as '$label' (bring back with: git stash pop)"
    }
    default { Write-Host "Quit. Nothing was changed."; Done 0 }
  }
} else {
  Ok "Working tree clean"
}

# ------------------------------------------------------------------------------ H
Step "H" "Getting the release branch"
$current = (git rev-parse --abbrev-ref HEAD).Trim()
$hasRemoteBranch = git ls-remote --heads origin $Branch
if (-not $hasRemoteBranch) {
  Note "$Branch is not on GitHub (already merged); releasing main"
  $Branch = "main"
}
if ($commitLocal) {
  # Keep the edits: commit them on the branch they were made on, then bring that branch up to date.
  if (-not $Message) { $Message = Read-Host "    Commit message" }
  if (-not $Message) { Fail "A commit message is needed." }
  Run git @("add", "-A") "git add"
  Run git @("commit", "-m", $Message) "git commit"
  if ($current -ne $Branch) {
    Run git @("checkout", $Branch) "Checkout $Branch"
    Run git @("pull", "--ff-only", "origin", $Branch) "Update $Branch"
    Run git @("merge", "--no-ff", $current, "-m", "Merge local changes from $current") "Merge local changes"
  } else {
    Run git @("pull", "--no-rebase", "origin", $Branch) "Update $Branch"
  }
} else {
  if ($current -ne $Branch) {
    git checkout $Branch 2>$null
    if ($LASTEXITCODE -ne 0) { Run git @("checkout", "-b", $Branch, "origin/$Branch") "Checkout $Branch" }
  }
  Run git @("pull", "--ff-only", "origin", $Branch) "Update $Branch"
}
Ok "On $Branch at $((git rev-parse --short HEAD).Trim())"

# Self-update: the copy of this script in the repo is the source of truth. If the code just
# pulled carries a newer version, replace this file with it and restart, so fixes made on
# GitHub always reach this laptop.
$repoCopy = Join-Path $repo "scripts\launcher\Precifarm-Deploy-AtoZ.ps1"
if (-not $env:PRECIFARM_DEPLOY_CHILD -and (Test-Path $repoCopy) -and $PSCommandPath) {
  if ((Get-FileHash $repoCopy).Hash -ne (Get-FileHash $PSCommandPath).Hash) {
    Note "Newer release script found in the repo; updating this copy and restarting"
    Copy-Item $repoCopy $PSCommandPath -Force
    $childArgs = @()
    if ($GitHubOnly) { $childArgs += "-GitHubOnly" }
    if ($SkipChecks) { $childArgs += "-SkipChecks" }
    if ($Yes)        { $childArgs += "-Yes" }
    if ($NoPause)    { $childArgs += "-NoPause" }
    if ($Message)    { $childArgs += @("-Message", $Message) }
    $childArgs += @("-RepoPath", $repo)
    try { Stop-Transcript | Out-Null } catch {}
    $env:PRECIFARM_DEPLOY_CHILD = "1"
    & powershell -NoProfile -ExecutionPolicy Bypass -File $PSCommandPath @childArgs
    exit $LASTEXITCODE
  }
}

# ------------------------------------------------------------------------------ I
Step "I" "Packages"
$lock = Get-Item "package-lock.json"
$installed = "node_modules\.package-lock.json"
if (-not (Test-Path $installed) -or ((Get-Item $installed).LastWriteTime -lt $lock.LastWriteTime)) {
  Note "Installing packages (npm ci)"
  Run npm @("ci", "--no-audit", "--no-fund") "npm ci"
}
Ok "Packages up to date"

# ------------------------------------------------------------------------------ J
if ($SkipChecks) {
  Step "J" "Quality checks skipped (-SkipChecks)"
} else {
  Step "J" "Quality checks"
  if (Test-Path ".next") {
    Note "Clearing the old Next.js build cache (.next)"
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
    if (Test-Path ".next") { Fail "Could not clear .next. Stop the localhost dev server (Ctrl+C in its window) and run again." }
  }
  Run npm @("run", "lint") "Lint"
  Run npm @("run", "typecheck") "Type check"
  Run npm @("test") "Unit tests"
  Run npm @("run", "build") "Production build"
  Ok "Lint, types, tests and build pass"
}

# ------------------------------------------------------------------------------ K
Step "K" "GitHub"
Run git @("push", "-u", "origin", $Branch) "Push $Branch"
if ($Branch -ne "main") {
  Run git @("checkout", "main") "Checkout main"
  Run git @("pull", "--ff-only", "origin", "main") "Update main"
  Run git @("merge", "--no-ff", $Branch, "-m", "Merge branch '$Branch'") "Merge $Branch into main"
  Run git @("push", "origin", "main") "Push main"
  Ok "Merged $Branch into main (its pull request closes as merged)"
} else {
  Ok "main pushed"
}
$commit = (git rev-parse --short HEAD).Trim()

if ($GitHubOnly) {
  Write-Host ""
  Write-Host "GitHub updated: main is at $commit. No deploy (-GitHubOnly)." -ForegroundColor Green
  Done 0
}
if (git status --porcelain) { Fail "Working tree is not clean after the merge; deploy stopped." }
$ignore = if (Test-Path ".gcloudignore") { Get-Content ".gcloudignore" -Raw } else { "" }
if ($ignore -notmatch "(?m)^\.env\*") { Fail ".gcloudignore does not exclude .env files; deploy stopped so secrets are not uploaded." }

# ------------------------------------------------------------------------------ L
Step "L" "Hero video"
$copy = Get-Content "lib\brand-messaging.ts" -Raw
$videoUrls = @([regex]::Matches($copy, 'https://storage\.googleapis\.com/[^"\s]+\.mp4') | ForEach-Object { $_.Value } | Sort-Object -Unique)

function Test-Url($url) {
  try { $r = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop; return ($r.StatusCode -eq 200) }
  catch { return $false }
}

foreach ($u in $videoUrls) {
  if (Test-Url $u) { Ok "Hosted: $(Split-Path $u -Leaf)"; continue }
  $name = Split-Path $u -Leaf
  $local = Join-Path $VideoDir $name
  if (-not (Test-Path $local)) { Fail "$name is not hosted and not found in $VideoDir" }
  Note "Uploading $name"
  Run $GCLOUD @("storage", "cp", $local, "gs://$Bucket/videos/$name",
    "--cache-control=public, max-age=31536000, immutable", "--content-type=video/mp4", "--project=$Project") "Upload $name"
  if (-not (Test-Url $u)) { Fail "$name uploaded but not publicly reachable. Check the bucket allows public read." }
  Ok "Hosted: $name"
}
if ($videoUrls.Count -eq 0) { Note "No hosted video URLs found in lib\brand-messaging.ts" }

# ------------------------------------------------------------------------------ M
$previous = & $GCLOUD run services describe $Service --region $Region --project $Project --format="value(status.latestReadyRevisionName)" 2>$null
Step "M" "Ready to publish commit $commit to $Live"
if ($previous) { Write-Host "    Live now: revision $previous" }
if (-not $Yes) {
  $answer = Read-Host "    Type DEPLOY to publish"
  if ($answer -ne "DEPLOY") { Note "Deploy cancelled. GitHub is updated."; Done 0 }
}

# ------------------------------------------------------------------------------ N
Step "N" "Building and deploying on Google Cloud (about 5 to 10 minutes)"
Run $GCLOUD @("builds", "submit", "--config", "cloudbuild.yaml", "--project", $Project) "Cloud Build"
$revision = & $GCLOUD run services describe $Service --region $Region --project $Project --format="value(status.latestReadyRevisionName)" 2>$null
Ok "Live revision: $revision"

# ------------------------------------------------------------------------------ O
Step "O" "Smoke test"
function Get-Page($path) {
  for ($i = 1; $i -le 4; $i++) {
    try { return Invoke-WebRequest -Uri "$Live$($path)?v=$commit" -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop }
    catch { Start-Sleep -Seconds 10 }
  }
  return $null
}
function Final-Path($resp) {
  if ($resp.BaseResponse.ResponseUri) { return $resp.BaseResponse.ResponseUri.AbsolutePath }
  return $resp.BaseResponse.RequestMessage.RequestUri.AbsolutePath
}

$failed = 0
foreach ($c in @(
    @{ Path = "/";                  Expect = "Powering every electric journey" },
    @{ Path = "/charging/home";     Expect = "Pulse" },
    @{ Path = "/charging/corridor"; Expect = "ARC Corridor" },
    @{ Path = "/charging/boda-hub"; Expect = "Boda Hub" },
    @{ Path = "/agent";             Expect = "Precifarm Agent" },
    @{ Path = "/contact";           Expect = "Contact" })) {
  $r = Get-Page $c.Path
  if ($r -and $r.StatusCode -eq 200 -and $r.Content -match [regex]::Escape($c.Expect)) { Ok "$($c.Path)" }
  else { Write-Host "    $($c.Path) FAILED (expected '$($c.Expect)')" -ForegroundColor Red; $failed++ }
}
foreach ($rd in @(@{ From = "/book"; To = "/charging" }, @{ From = "/ai"; To = "/agent" })) {
  $r = Get-Page $rd.From
  if ($r -and (Final-Path $r) -eq $rd.To) { Ok "$($rd.From) redirects to $($rd.To)" }
  else { Write-Host "    $($rd.From) did not redirect to $($rd.To)" -ForegroundColor Red; $failed++ }
}

# ------------------------------------------------------------------------------ Z
$mins = [math]::Round(((Get-Date) - $Started).TotalMinutes, 1)
Write-Host ""
if ($failed -gt 0) {
  Write-Host "[Z] Deployed, but $failed check(s) failed. Look at $Live now." -ForegroundColor Red
} else {
  Write-Host "[Z] Live: $Live is serving commit $commit (revision $revision) after $mins min." -ForegroundColor Green
}
if ($previous) {
  Write-Host "    Roll back with:"
  Write-Host "    gcloud run services update-traffic $Service --to-revisions=$previous=100 --region $Region --project $Project"
}
Write-Host "    Log: $script:LogFile"
if ($failed -gt 0) { Done 1 } else { Done 0 }
