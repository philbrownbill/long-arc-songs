[CmdletBinding()]
param(
    [string]$RepositoryUrl = "https://github.com/philbrownbill/long-arc-songs.git",
    [string]$Branch = "main"
)

$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "Git is not installed or is not on PATH. Install Git for Windows from https://git-scm.com/download/win, reopen PowerShell, and run this script again."
}

Write-Host "Preparing the Long Arc Songs website repository..." -ForegroundColor Cyan

if (-not (Test-Path -LiteralPath ".git")) {
    git init
    if ($LASTEXITCODE -ne 0) { throw "git init failed." }
}

git branch -M $Branch
if ($LASTEXITCODE -ne 0) { throw "Could not create the $Branch branch." }

$originExists = git remote 2>$null | Select-String -SimpleMatch "origin"
if ($originExists) {
    git remote set-url origin $RepositoryUrl
} else {
    git remote add origin $RepositoryUrl
}
if ($LASTEXITCODE -ne 0) { throw "Could not configure the GitHub repository." }

git add --all
if ($LASTEXITCODE -ne 0) { throw "Could not stage the website files." }

git diff --cached --quiet
if ($LASTEXITCODE -eq 1) {
    git commit -m "Add Long Arc Songs website"
    if ($LASTEXITCODE -ne 0) {
        throw "The commit failed. If Git asks for your name or email, run: git config --global user.name 'Phil Brownbill' and git config --global user.email 'YOUR_EMAIL', then rerun this script."
    }
} elseif ($LASTEXITCODE -ne 0) {
    throw "Could not inspect the staged files."
} else {
    Write-Host "There are no new changes to commit." -ForegroundColor Yellow
}

Write-Host "Pushing to $RepositoryUrl..." -ForegroundColor Cyan
git push -u origin $Branch
if ($LASTEXITCODE -ne 0) {
    throw "The push failed. Complete any GitHub sign-in window, confirm that you can write to the repository, and run the script again."
}

Write-Host ""
Write-Host "Upload complete:" -ForegroundColor Green
Write-Host "https://github.com/philbrownbill/long-arc-songs"
