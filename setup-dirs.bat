@echo off
setlocal enabledelayedexpansion

REM Navigate to the script directory
cd /d "c:\Users\zeind\OneDrive\Desktop\Now"

REM Create all required directories
echo Creating directory structure...
mkdir src\types 2>nul
if exist src\types echo. ✓ Created: src\types

mkdir src\data 2>nul
if exist src\data echo. ✓ Created: src\data

mkdir src\app 2>nul
if exist src\app echo. ✓ Created: src\app

mkdir src\components\layout 2>nul
if exist src\components\layout echo. ✓ Created: src\components\layout

mkdir src\components\home 2>nul
if exist src\components\home echo. ✓ Created: src\components\home

mkdir src\components\ui 2>nul
if exist src\components\ui echo. ✓ Created: src\components\ui

mkdir src\components\icons 2>nul
if exist src\components\icons echo. ✓ Created: src\components\icons

echo.
echo Directory structure created!
echo.
echo --- Verification: Directory Structure ---
echo.
tree src /F 2>nul || dir /s src

endlocal
