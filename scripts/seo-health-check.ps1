# Weekly SEO health check for precifarm.com
# Usage: powershell -ExecutionPolicy Bypass -File scripts/seo-health-check.ps1

$ErrorActionPreference = "Stop"
$HealthUrl = "https://precifarm.com/api/seo/health"

Write-Host "Fetching $HealthUrl ..." -ForegroundColor Cyan
$report = Invoke-RestMethod -Uri $HealthUrl -Method Get

Write-Host ""
Write-Host "Status:       $($report.status)" -ForegroundColor $(if ($report.status -eq "ok") { "Green" } else { "Red" })
Write-Host "Errors:       $($report.errorCount)"
Write-Host "Warnings:     $($report.warningCount)"
Write-Host "Info issues:  $($report.issueCount)"
Write-Host "Checked at:   $($report.checkedAt)"

if ($report.errorCount -gt 0) {
  Write-Host ""
  Write-Host "Errors:" -ForegroundColor Red
  $report.issues | Where-Object { $_.severity -eq "error" } | ForEach-Object {
    Write-Host "  $($_.path): $($_.message)"
  }
  exit 1
}

if ($report.warningCount -gt 0) {
  Write-Host ""
  Write-Host "Warnings:" -ForegroundColor Yellow
  $report.issues | Where-Object { $_.severity -eq "warning" } | ForEach-Object {
    Write-Host "  $($_.path): $($_.message)"
  }
}

Write-Host ""
Write-Host "Step 5 OK - re-run weekly or add to Cloud Scheduler." -ForegroundColor Green
