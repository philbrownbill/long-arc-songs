$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot

Write-Host "Long Arc Songs - GitHub Pages publisher" -ForegroundColor Cyan

$expectedRemote = "github.com/philbrownbill/long-arc-songs"
$requiredFiles = @("index.html", "pages.css", "pages.js", ".nojekyll")

if (-not (Test-Path ".git")) {
    throw "Please copy these files into your Long-Arc-Songs-GitHub folder, then run this script from that folder."
}

$remote = git remote get-url origin
if ($LASTEXITCODE -ne 0 -or $remote -notlike "*$expectedRemote*") {
    throw "This does not appear to be the philbrownbill/long-arc-songs repository. No changes were made."
}

foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        throw "Required file missing: $file"
    }
}

git add -- index.html pages.css pages.js .nojekyll Publish-GitHub-Pages.ps1
if ($LASTEXITCODE -ne 0) { throw "Git could not prepare the Pages files." }

git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "The GitHub Pages files are already uploaded." -ForegroundColor Yellow
} else {
    git commit -m "Publish Long Arc Songs on GitHub Pages"
    if ($LASTEXITCODE -ne 0) { throw "Git could not save the Pages update." }

    git push origin main
    if ($LASTEXITCODE -ne 0) { throw "GitHub upload failed. Please copy the red error text back into ChatGPT." }
}

Write-Host ""
Write-Host "Upload complete. GitHub may take a few minutes to publish:" -ForegroundColor Green
Write-Host "https://philbrownbill.github.io/long-arc-songs/" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to close"
