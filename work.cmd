@echo off
rem Launcher for scripts\work.ps1 so it runs even where PowerShell scripts are blocked.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\work.ps1" %*
