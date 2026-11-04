# Replaced by Precifarm-Deploy-AtoZ.ps1 in this folder. This forwards to it.
& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "Precifarm-Deploy-AtoZ.ps1") @args
exit $LASTEXITCODE
