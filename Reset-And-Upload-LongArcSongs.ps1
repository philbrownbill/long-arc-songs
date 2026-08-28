[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$ProjectFolder = $PSScriptRoot
$RepositoryUrl = "https://philbrownbill@github.com/philbrownbill/long-arc-songs.git"
$Branch = "main"

Set-Location -LiteralPath $ProjectFolder

if (-not (Test-Path -LiteralPath "package.json") -or -not (Test-Path -LiteralPath "app/page.tsx")) {
    throw "Run this script from inside the extracted Long-Arc-Songs-GitHub website folder."
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "Git is not installed or is not on PATH. Install Git for Windows, reopen PowerShell, and run this script again."
}

Write-Host "This will reset only the local Git history in:" -ForegroundColor Yellow
Write-Host $ProjectFolder
Write-Host "The website files will not be deleted, and the GitHub repository is currently empty."
$Confirmation = Read-Host "Type RESET to continue"
if ($Confirmation -cne "RESET") {
    Write-Host "Cancelled. Nothing was changed."
    exit 0
}

$GitFolder = Join-Path $ProjectFolder ".git"
if (Test-Path -LiteralPath $GitFolder) {
    Remove-Item -LiteralPath $GitFolder -Recurse -Force
}

git init
if ($LASTEXITCODE -ne 0) { throw "git init failed." }

git branch -M $Branch
git config --local user.name "Phil Brownbill"
git config --local user.email "254126641+philbrownbill@users.noreply.github.com"
git config --local credential.https://github.com.username "philbrownbill"
git remote add origin $RepositoryUrl

git add --all
if ($LASTEXITCODE -ne 0) { throw "Could not stage the website files." }

git commit -m "Add Long Arc Songs website"
if ($LASTEXITCODE -ne 0) { throw "Could not create the website commit." }

Write-Host ""
Write-Host "Git will now connect as the personal account: philbrownbill" -ForegroundColor Cyan
Write-Host "If a browser opens, make sure philbrownbill is selected before approving access." -ForegroundColor Yellow
git push -u origin $Branch

if ($LASTEXITCODE -ne 0) {
    throw "The push failed. Do not choose your work GitHub account. Sign into GitHub as philbrownbill, then run this script again."
}

Write-Host ""
Write-Host "Upload complete:" -ForegroundColor Green
Write-Host "https://github.com/philbrownbill/long-arc-songs"
