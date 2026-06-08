# NEXUS Repository Creation Script
# Provisions GitHub repositories for the NEXUS ecosystem

param(
    [string]$Owner = "",
    [string]$BasePath = "NEXUS",
    [switch]$Public = $true,
    [switch]$DryRun = $false
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

class RepositoryCreator {
    [string]$Owner
    [string]$BasePath
    [bool]$Public
    [bool]$DryRun
    [array]$CreatedRepos
    [array]$SkippedRepos
    [array]$FailedRepos
    
    RepositoryCreator([string]$owner, [string]$basePath, [bool]$public, [bool]$dryRun) {
        $this.Owner = $owner
        $this.BasePath = $basePath
        $this.Public = $public
        $this.DryRun = $dryRun
        $this.CreatedRepos = @()
        $this.SkippedRepos = @()
        $this.FailedRepos = @()
    }
    
    [void]Log([string]$Message, [string]$Level = "INFO") {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $color = switch ($Level) {
            "ERROR" { "Red" }
            "SUCCESS" { "Green" }
            "WARNING" { "Yellow" }
            "INFO" { "Cyan" }
            "STAGE" { "Magenta" }
            default { "White" }
        }
        Write-Host "[$timestamp] [$Level] $Message" -ForegroundColor $color
    }
    
    [bool]CheckAuth() {
        try {
            $authStatus = gh auth status 2>&1
            if ($authStatus -match "Logged in to github.com") {
                return $true
            }
            return $false
        } catch {
            return $false
        }
    }
    
    [void]CreateAllRepositories() {
        $this.Log("Starting repository provisioning...", "STAGE")
        
        if (-not (Test-Path $this.BasePath)) {
            throw "Base path not found: $($this.BasePath)"
        }
        
        # If Owner is missing, automatically get it from authenticated gh cli
        if (-not $this.Owner) {
            try {
                $this.Owner = (gh api user -q ".login").Trim()
                $this.Log("Automatically detected GitHub owner: $($this.Owner)")
            } catch {
                throw "Owner parameter is required and could not be fetched automatically."
            }
        }
        
        $visibility = if ($this.Public) { "--public" } else { "--private" }
        $this.Log("Target visibility: $visibility")
        
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
            Write-Host "[$percent%] Processing $current/$total repositories... ($repoName)" -ForegroundColor Cyan
            
            $repoPath = Join-Path $this.BasePath $repoName
            
            if (-not (Test-Path $repoPath)) {
                $this.Log("Local folder not found, skipping: $repoName", "WARNING")
                $this.SkippedRepos += $repoName
                continue
            }
            
            # Check if repo already exists on GitHub
            $repoExists = $false
            try {
                $null = gh repo view "$($this.Owner)/$repoName" 2>&1
                $repoExists = $true
            } catch {
                $repoExists = $false
            }
            
            if ($repoExists) {
                $this.Log("Repository already exists on GitHub: $repoName", "WARNING")
                $this.SkippedRepos += $repoName
            } else {
                try {
                    if ($this.DryRun) {
                        $this.Log("DRY RUN: Would create $visibility repository '$repoName'", "INFO")
                        $this.CreatedRepos += $repoName
                    } else {
                        $this.Log("Creating $visibility repository: $repoName", "INFO")
                        # Provision the repository via GitHub CLI
                        gh repo create "$($this.Owner)/$repoName" $visibility --source="$repoPath" --description "NEXUS Ecosystem Component: $repoName"
                        $this.Log("Successfully created: $repoName", "SUCCESS")
                        $this.CreatedRepos += $repoName
                    }
                } catch {
                    $this.Log("Failed to create $repoName: $_", "ERROR")
                    $this.FailedRepos += @{ Name = $repoName; Error = $_.Exception.Message }
                }
            }
        }
    }
    
    [void]GenerateReport() {
        $totalCreated = $this.CreatedRepos.Count
        $totalSkipped = $this.SkippedRepos.Count
        $totalFailed = $this.FailedRepos.Count
        
        $report = @"

╔══════════════════════════════════════════════════════════════╗
║       NEXUS REPOSITORY PROVISIONING REPORT                   ║
╚══════════════════════════════════════════════════════════════╝

📊 STATISTICS:
  • Repositories Created: $totalCreated
  • Repositories Skipped: $totalSkipped (Already exist or missing locally)
  • Repositories Failed: $totalFailed

✅ CREATED:
"@
        foreach ($repo in $this.CreatedRepos) {
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
        $report += "`n║ Repository provisioning phase complete!                      ║"
        $report += "`n╚══════════════════════════════════════════════════════════════╝`n"
        
        Write-Host $report
    }
}

function Main {
    try {
        Write-Host @"

╔══════════════════════════════════════════════════════════════╗
║   NEXUS Repository Creation Script                           ║
║   Provisions GitHub repositories for the NEXUS ecosystem     ║
╚══════════════════════════════════════════════════════════════╝

"@
        
        $creator = [RepositoryCreator]::new($Owner, $BasePath, $Public, $DryRun)
        
        if (-not $creator.CheckAuth()) {
            throw "GitHub CLI is not authenticated. Please run 'gh auth login' first."
        }
        
        $creator.CreateAllRepositories()
        $creator.GenerateReport()
    }
    catch {
        Write-Host "FATAL ERROR: $_" -ForegroundColor Red
        exit 1
    }
}

Main