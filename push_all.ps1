# NEXUS Repository Push Script
# Commits and pushes all repositories to GitHub

param(
    [string]$BasePath = "NEXUS",
    [string]$CommitMessage = "Initial commit: NEXUS ecosystem setup",
    [string]$Branch = "main",
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

class RepositoryPusher {
    [string]$BasePath
    [string]$CommitMessage
    [string]$Branch
    [bool]$DryRun
    [array]$PushedRepos
    [array]$SkippedRepos
    [array]$FailedRepos
    [int]$TotalCommits
    [int]$TotalFiles
    
    RepositoryPusher([string]$basePath, [string]$commitMessage, [string]$branch, [bool]$dryRun) {
        $this.BasePath = $basePath
        $this.CommitMessage = $commitMessage
        $this.Branch = $branch
        $this.DryRun = $dryRun
        $this.PushedRepos = @()
        $this.SkippedRepos = @()
        $this.FailedRepos = @()
        $this.TotalCommits = 0
        $this.TotalFiles = 0
    }
    
    [void]Log([string]$Message, [string]$Level = "INFO") {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $color = switch ($Level) {
            "ERROR" { "Red" }
            "SUCCESS" { "Green" }
            "WARNING" { "Yellow" }
            "INFO" { "Cyan" }
            "DEBUG" { "Gray" }
            default { "White" }
        }
        Write-Host "[$timestamp] [$Level] $Message" -ForegroundColor $color
    }
    
    [bool]CheckRepository([string]$RepoPath) {
        if (-not (Test-Path $RepoPath)) {
            return $false
        }
        
        if (-not (Test-Path (Join-Path $RepoPath ".git"))) {
            return $false
        }
        
        return $true
    }
    
    [void]CommitRepository([string]$RepoPath, [string]$RepoName) {
        try {
            Push-Location $RepoPath
            
            # Check for changes
            $status = git status --porcelain
            if (-not $status) {
                $this.Log "No changes to commit in $RepoName", "DEBUG")
                $this.SkippedRepos += $RepoName
                Pop-Location
                return
            }
            
            # Count files
            $fileCount = @($status).Count
            $this.TotalFiles += $fileCount
            
            $this.Log "Changes detected in $RepoName : $fileCount files"
            
            if ($this.DryRun) {
                $this.Log "DRY RUN: Would commit $fileCount files in $RepoName"
            }
            else {
                # Stage all changes
                git add .
                $this.Log "Staged all changes in $RepoName"
                
                # Commit
                git commit -m $this.CommitMessage
                $this.Log "Committed changes in $RepoName"
                
                # Get current branch
                $currentBranch = git rev-parse --abbrev-ref HEAD
                
                # Create/switch to main branch if needed
                if ($currentBranch -ne $this.Branch) {
                    try {
                        git checkout $this.Branch
                    }
                    catch {
                        git checkout -b $this.Branch
                    }
                }
                
                # Push
                git push -u origin $this.Branch
                $this.Log "Pushed $RepoName to origin/$($this.Branch)", "SUCCESS")
                $this.PushedRepos += $RepoName
                $this.TotalCommits++
            }
            
            Pop-Location
        }
        catch {
            $this.Log "Failed to process $RepoName : $_", "ERROR")
            $this.FailedRepos += @{ Name = $RepoName; Error = $_.Exception.Message }
            Pop-Location
        }
    }
    
    [void]PushAllRepositories() {
        $this.Log "Starting push operation..."
        
        $repositories = @(
            "01-Web", "02-AI", "03-Agentic-AI", "04-Automation",
            "05-Data", "06-Cybersecurity", "07-DevOps", "08-Cloud",
            "09-SaaS", "10-Business", "11-Research", "12-Portfolio",
            "13-Shared-Templates", "99-Archive"
        )
        
        $total = $repositories.Count
        $current = 0
        
        foreach ($repoName in $repositories) {
            $current++
            $percent = [math]::Round(($current / $total) * 100)
            Write-Host "[$percent%] Processing $current/$total repositories..." -ForegroundColor Cyan
            
            $repoPath = Join-Path $this.BasePath $repoName
            
            if (-not $this.CheckRepository($repoPath)) {
                $this.Log "Repository not found or not initialized: $repoName", "WARNING")
                $this.SkippedRepos += $repoName
                continue
            }
            
            $this.CommitRepository $repoPath $repoName
        }
        
        $this.Log "Push operation completed!", "SUCCESS")
    }
    
    [void]GenerateReport() {
        $totalPushed = $this.PushedRepos.Count
        $totalSkipped = $this.SkippedRepos.Count
        $totalFailed = $this.FailedRepos.Count
        
        $report = @"

╔══════════════════════════════════════════════════════════════╗
║       NEXUS REPOSITORY PUSH REPORT                           ║
╚══════════════════════════════════════════════════════════════╝

📊 STATISTICS:
  • Repositories Pushed: $totalPushed
  • Repositories Skipped: $totalSkipped
  • Repositories Failed: $totalFailed
  • Total Commits: $($this.TotalCommits)
  • Total Files Changed: $($this.TotalFiles)

✅ PUSHED:
"@
        foreach ($repo in $this.PushedRepos) {
            $report += "`n  • $repo"
        }
        
        if ($this.SkippedRepos.Count -gt 0) {
            $report += "`n`n⏭️  SKIPPED:"
            foreach ($repo in $this.SkippedRepos) {
                $report += "`n  • $repo"
            }
        }
        
        if ($this.FailedRepos.Count -gt 0) {
            $report += "`n`n❌ FAILED:"
            foreach ($repo in $this.FailedRepos) {
                $report += "`n  • $($repo.Name): $($repo.Error)"
            }
        }
        
        $report += "`n`n╔══════════════════════════════════════════════════════════════╗"
        $report += "`n║ All repositories have been pushed to GitHub!                 ║"
        $report += "`n╚══════════════════════════════════════════════════════════════╝`n"
        
        Write-Host $report
    }
}

function Main {
    try {
        Write-Host @"

╔══════════════════════════════════════════════════════════════╗
║   NEXUS Repository Push Script                               ║
║   Commit and push all repositories to GitHub                 ║
╚══════════════════════════════════════════════════════════════╝

"@
        
        $pusher = [RepositoryPusher]::new($BasePath, $CommitMessage, $Branch, $DryRun)
        
        $pusher.PushAllRepositories()
        $pusher.GenerateReport()
    }
    catch {
        Write-Host "FATAL ERROR: $_" -ForegroundColor Red
        exit 1
    }
}

Main
