@echo off
echo Syncing local changes to GitHub...
git add .
git commit -m "Auto-sync: %date% %time%"
git push origin main
echo.
echo Sync Complete! Your live site will update in 1 minute.
pause
