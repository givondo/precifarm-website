# Copy Precifarm_* hero_transparent exports into website/public/images/renders/
# Usage:
#   .\scripts\sync-product-renders.ps1 -SourceDir "C:\path\to\export\folder"
#   .\scripts\sync-product-renders.ps1 -ZipPath "C:\Users\DAVID\Desktop\Precifarm Designs\Precifarm_Product_Images.zip"

param(
  [string]$SourceDir,
  [string]$ZipPath
)

if (-not $SourceDir -and -not $ZipPath) {
  throw "Provide -SourceDir or -ZipPath"
}

if ($ZipPath) {
  $extract = Join-Path $env:TEMP "precifarm-product-renders"
  if (Test-Path $extract) { Remove-Item $extract -Recurse -Force }
  New-Item -ItemType Directory -Force -Path $extract | Out-Null
  Expand-Archive -LiteralPath $ZipPath -DestinationPath $extract -Force
  $SourceDir = $extract
}

$ErrorActionPreference = "Stop"
$dest = Join-Path $PSScriptRoot "..\public\images\renders"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$pairs = @(
  @("pulse-7kw-hero.png", "*Precifarm_01_Pulse_7kW_hero_transparent*"),
  @("depot-22kw-hero.png", "*Precifarm_02_PulsePlus_22kW_hero_transparent*"),
  @("boda-hub-hero.png", "*Precifarm_03_Boda_Hub_hero_transparent*"),
  @("boda-hub-front.png", "*Precifarm_03_Boda_Hub_front_transparent*"),
  @("boda-hub-hero-studio.png", "*Precifarm_03_Boda_Hub_hero_studio*"),
  @("corridor-forecourt-hero.png", "*Precifarm_04_Corridor_Forecourt_hero_transparent*"),
  @("corridor-dispenser-hero.png", "*Precifarm_05_Corridor_Dispenser_hero_transparent*"),
  @("corridor-power-cabinet-hero.png", "*Precifarm_06_Corridor_Power_Cabinet_hero_transparent*"),
  @("energy-module-em256-hero.png", "*Precifarm_07_Energy_Module_EM-256_hero_transparent*"),
  @("p1-go-hero.png", "*Precifarm_08_P1_Go_hero_transparent*"),
  @("p1-go-solar-hero.png", "*Precifarm_09_P1_Go_with_Solar_Panel_hero_transparent*"),
  @("p2-home-hero.png", "*Precifarm_10_P2_Home_hero_transparent*"),
  @("mini-stack-hero.png", "*Precifarm_11_Mini_Stack_hero_transparent*"),
  @("commercial-cabinet-hero.png", "*Precifarm_12_C215_Commercial_Cabinet_hero_transparent*"),
  @("energy-storage-family-hero.png", "*Precifarm_13_Energy_Storage_Family_hero_transparent*")
)

foreach ($pair in $pairs) {
  $out = Join-Path $dest $pair[0]
  $file = Get-ChildItem -Path $SourceDir -Filter $pair[1] -File | Select-Object -First 1
  if (-not $file) {
    Write-Warning "Missing: $($pair[1])"
    continue
  }
  Copy-Item -LiteralPath $file.FullName -Destination $out -Force
  Write-Host "Synced $($pair[0])"
}

Write-Host "Done. Files in $dest"
