@echo off
echo Deploying KBC+ Frontend to Surge...
echo.
echo Note: This will deploy only the frontend files.
echo The PHP backend functionality will not work on Surge.
echo.
cd surge-build
surge . your-site-name.surge.sh
pause
