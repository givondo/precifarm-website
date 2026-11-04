@echo off
rem Double-click: A to Z release of precifarm.com (GitHub, then live on Google Cloud).
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Precifarm-Deploy-AtoZ.ps1" %*
