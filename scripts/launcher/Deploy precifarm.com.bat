@echo off
rem Double-click to deploy precifarm.com (GitHub, then live on Google Cloud).
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Deploy-Precifarm.ps1" %*
