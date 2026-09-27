# Work cycle for editing this project from more than one computer.
#   .\work start             get the newest changes before editing anything
#   .\work finish "message"  save your changes and upload them to GitHub
#   .\work publish           send the finished dev work to the live site
# See docs/WORK-CYCLE.md for the full routine.
param(
  [Parameter(Position = 0)][ValidateSet('start', 'finish', 'publish', 'status')][string]$Command = 'status',
  [Parameter(Position = 1)][string]$Message,
  [switch]$SkipChecks
)

$projectRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
Set-Location $projectRoot

$workBranch = 'dev'
$prodBranch = 'rebuild/react-vite'

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  $env:Path = "$env:ProgramFiles\Git\cmd;$env:Path"
}

function Stop-Work([string]$text) {
  Write-Host "`n$text" -ForegroundColor Red
  exit 1
}

function Invoke-Git {
  git @args
  if ($LASTEXITCODE -ne 0) { Stop-Work "Stopped: 'git $args' failed. Nothing else was changed." }
}

function Test-Git {
  git @args 2>$null | Out-Null
  return $LASTEXITCODE -eq 0
}

function Get-Changes { git status --porcelain }

function Stop-OnConflict {
  Stop-Work @"
Stopped: your changes and the GitHub changes edit the same lines.
Files marked 'both modified' below need fixing:
$(git status --short | Out-String)
Open each file, keep the right version between the <<<<<<< and >>>>>>> markers, then run:
  git add <file>
  git rebase --continue
Or ask Claude Code to resolve the conflict for you.
"@
}

$remote = git remote | Where-Object { (git remote get-url $_) -match 'Alekk301/A-level-study-hub' } | Select-Object -First 1
if (-not $remote) { Stop-Work 'Stopped: no GitHub remote for Alekk301/A-level-study-hub was found.' }

if (Test-Path (Join-Path $projectRoot '.git\rebase-merge')) {
  Stop-OnConflict
}

switch ($Command) {
  'status' {
    Invoke-Git fetch --quiet $remote
    Invoke-Git status --short --branch
    Write-Host "`nUse: .\work start | .\work finish `"message`" | .\work publish"
  }

  'start' {
    if (Get-Changes) {
      Stop-Work @"
Stopped: this computer has unsaved changes from last time:
$(git status --short | Out-String)
Run  .\work finish "describe the changes"  first, then  .\work start  again.
"@
    }

    Write-Host "Getting the newest changes from GitHub..."
    Invoke-Git fetch --prune --quiet $remote

    if (Test-Git rev-parse --verify --quiet "refs/heads/$workBranch") {
      Invoke-Git switch --quiet $workBranch
    } elseif (Test-Git rev-parse --verify --quiet "refs/remotes/$remote/$workBranch") {
      Invoke-Git switch --quiet --track "$remote/$workBranch"
    } else {
      Invoke-Git switch --quiet -c $workBranch "$remote/$prodBranch"
    }

    if (Test-Git rev-parse --verify --quiet "refs/remotes/$remote/$workBranch") {
      git pull --rebase --quiet $remote $workBranch
      if ($LASTEXITCODE -ne 0) { Stop-OnConflict }
    }

    # Bring in anything that reached the live site another way (e.g. a merged pull request).
    $prodAhead = git rev-list --count "HEAD..$remote/$prodBranch"
    if ([int]$prodAhead -gt 0) {
      Write-Host "Merging $prodAhead new commit(s) from $prodBranch..."
      git merge --no-edit --quiet "$remote/$prodBranch"
      if ($LASTEXITCODE -ne 0) {
        Stop-Work "Stopped: merging $prodBranch into $workBranch hit a conflict. Fix the files listed by 'git status', then 'git add' them and 'git commit'."
      }
    }

    Write-Host "`nUp to date. Latest changes:" -ForegroundColor Green
    git log --oneline -5
    Write-Host "`nYou're on '$workBranch'. Edit away, then run  .\work finish `"message`"  when done."
  }

  'finish' {
    $branch = git branch --show-current
    if ($branch -ne $workBranch) {
      Stop-Work "Stopped: you're on '$branch', not '$workBranch'. Run  .\work start  first."
    }

    if (Get-Changes) {
      if (-not $Message) { $Message = Read-Host 'Describe what you changed' }
      if (-not $Message) { Stop-Work 'Stopped: a description is needed to save your changes.' }
      Invoke-Git add -A
      Invoke-Git commit --quiet -m $Message
    }

    Invoke-Git fetch --quiet $remote
    if (Test-Git rev-parse --verify --quiet "refs/remotes/$remote/$workBranch") {
      git pull --rebase --quiet $remote $workBranch
      if ($LASTEXITCODE -ne 0) { Stop-OnConflict }
      $unpushed = git rev-list --count "$remote/$workBranch..HEAD"
      if ([int]$unpushed -eq 0) {
        Write-Host "`nNothing new to save. GitHub already has everything." -ForegroundColor Green
        exit 0
      }
    }

    Write-Host "Uploading to GitHub..."
    Invoke-Git push --quiet -u $remote $workBranch
    Write-Host "`nSaved to GitHub. It's safe to switch computers." -ForegroundColor Green
    Write-Host "Vercel will build a preview of '$workBranch'. Run  .\work publish  when it's ready to go live."
  }

  'publish' {
    if (Get-Changes) { Stop-Work 'Stopped: you have unsaved changes. Run  .\work finish "message"  first.' }
    if ((git branch --show-current) -ne $workBranch) { Stop-Work "Stopped: run this from '$workBranch'." }

    Invoke-Git fetch --quiet $remote
    if ((git rev-parse HEAD) -ne (git rev-parse "$remote/$workBranch")) {
      Stop-Work 'Stopped: this computer and GitHub differ. Run  .\work start  (or finish) first.'
    }
    if ([int](git rev-list --count "$remote/$prodBranch..HEAD") -eq 0) {
      Write-Host 'Nothing to publish. The live site already has everything on dev.' -ForegroundColor Green
      exit 0
    }

    if (-not $SkipChecks) {
      if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        Stop-Work 'Stopped: Node.js/npm is needed for the pre-publish checks. Install Node.js 22.13+, or rerun with -SkipChecks at your own risk.'
      }
      foreach ($check in 'data:validate', 'lint', 'test') {
        Write-Host "Running npm run $check..."
        npm run $check
        if ($LASTEXITCODE -ne 0) { Stop-Work "Stopped: 'npm run $check' failed, so nothing was published." }
      }
    }

    Write-Host "Publishing to $prodBranch (the live site)..."
    if (Test-Git rev-parse --verify --quiet "refs/heads/$prodBranch") {
      Invoke-Git switch --quiet $prodBranch
    } else {
      Invoke-Git switch --quiet --track "$remote/$prodBranch"
    }
    Invoke-Git merge --ff-only --quiet "$remote/$prodBranch"
    git merge --no-edit --quiet $workBranch
    if ($LASTEXITCODE -ne 0) {
      git merge --abort
      git switch --quiet $workBranch
      Stop-Work "Stopped: $workBranch conflicts with $prodBranch. Run  .\work start  to merge them on dev first."
    }
    Invoke-Git push --quiet $remote $prodBranch
    Invoke-Git switch --quiet $workBranch
    Invoke-Git merge --ff-only --quiet $prodBranch
    Invoke-Git push --quiet $remote $workBranch

    Write-Host "`nPublished. Vercel is deploying https://a-level-study-hub.vercel.app/" -ForegroundColor Green
    Write-Host 'Check the deployment in Vercel, and update docs/HANDOFF.md if anything changed.'
  }
}
