# NEXUS Ecosystem Setup Script
# One-command orchestration for complete NEXUS ecosystem setup

param(
    [string]$Owner = "",
    [string]$BasePath = "NEXUS",
    [string]$CommitMessage = "Initial commit: NEXUS ecosystem setup",
    [switch]$SkipGeneration = $false,
    [switch]$SkipRepositories = $false,
    [switch]$SkipPush = $false,
    [switch]$DryRun = $false,
    [switch]$Public = $true
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

class NEXUSOrchestrator {
    [string]$Owner
    [string]$BasePath
    [string]$CommitMessage
    [bool]$SkipGeneration
    [bool]$SkipRepositories
    [bool]$SkipPush
    [bool]$DryRun
    [bool]$Public
    [hashtable]$Report
    [datetime]$StartTime
    
    NEXUSOrchestrator([string]$owner, [string]$basePath, [string]$commitMessage, 
                      [bool]$skipGen, [bool]$skipRepos, [bool]$skipPush, [bool]$dryRun, [bool]$public) {
        $this.Owner = $owner
        $this.BasePath = $basePath
        $this.CommitMessage = $commitMessage
        $this.SkipGeneration = $skipGen
        $this.SkipRepositories = $skipRepos
        $this.SkipPush = $skipPush
        $this.DryRun = $dryRun
        $this.Public = $public
        $this.StartTime = Get-Date
        $this.Report = @{
            GenerationSuccess = $false
            RepositoriesSuccess = $false
            PushSuccess = $false
            Duration = 0
            Errors = @()
        }
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
    
    [void]DisplayBanner() {
        Write-Host @"

╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║           NEXUS ECOSYSTEM SETUP ORCHESTRATION                  ║
║                                                                ║
║   Automated GitHub Ecosystem Creation & Configuration          ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

"@ -ForegroundColor Cyan
    }
    
    [void]DisplayConfiguration() {
        $this.Log("Configuration:", "STAGE")
        Write-Host "  • Base Path: $($this.BasePath)"
        Write-Host "  • GitHub Owner: $($this.Owner)"
        Write-Host "  • Visibility: $(if ($this.Public) { 'Public' } else { 'Private' })"
        Write-Host "  • Skip Generation: $($this.SkipGeneration)"
        Write-Host "  • Skip Repositories: $($this.SkipRepositories)"
        Write-Host "  • Skip Push: $($this.SkipPush)"
        Write-Host "  • Dry Run: $($this.DryRun)"
        Write-Host ""
    }
    
    [bool]ValidateEnvironment() {
        $this.Log("Validating environment...", "STAGE")
        
        # Check Python
        try {
            $pythonVersion = python --version 2>&1
            $this.Log("Python found: $pythonVersion")
        }
        catch {
            $this.Log("Python not found. Please install Python 3.8+", "ERROR")
            $this.Report.Errors += "Python not found"
            return $false
        }
        
        # Check GitHub CLI
        try {
            $ghVersion = gh --version
            $this.Log("GitHub CLI found: $ghVersion")
        }
        catch {
            $this.Log("GitHub CLI not found. Please install from https://cli.github.com", "ERROR")
            $this.Report.Errors += "GitHub CLI not found"
            return $false
        }
        
        # Check Git
        try {
            $gitVersion = git --version
            $this.Log("Git found: $gitVersion")
        }
        catch {
            $this.Log("Git not found. Please install Git", "ERROR")
            $this.Report.Errors += "Git not found"
            return $false
        }
        
        $this.Log("Environment validation successful", "SUCCESS")
        return $true
    }
    
    [bool]GenerateStructure() {
        if ($this.SkipGeneration) {
            $this.Log("Skipping generation step", "WARNING")
            return $true
        }
        
        try {
            $this.Log("Generating NEXUS structure...", "STAGE")
            
            if ($this.DryRun) {
                $this.Log("DRY RUN: Would generate Python script")
                return $true
            }
            
            # Check if generate_nexus.py exists
            $scriptPath = Join-Path (Get-Location) "generate_nexus.py"
            if (-not (Test-Path $scriptPath)) {
                $this.Log("generate_nexus.py not found in current directory", "ERROR")
                $this.Report.Errors += "generate_nexus.py not found"
                return $false
            }
            
            # Run Python generation script
            $output = python $scriptPath 2>&1
            $this.Log("$output")
            
            if ($LASTEXITCODE -ne 0) {
                $this.Log("Generation script failed with exit code $LASTEXITCODE", "ERROR")
                $this.Report.Errors += "Generation script failed"
                return $false
            }
            
            # Verify structure was created
            if (-not (Test-Path $this.BasePath)) {
                $this.Log("Generated structure directory not found", "ERROR")
                $this.Report.Errors += "Generated structure not verified"
                return $false
            }
            
            $this.Log("Structure generation successful", "SUCCESS")
            $this.Report.GenerationSuccess = $true
            return $true
        }
        catch {
            $this.Log("Structure generation failed: $_", "ERROR")
            $this.Report.Errors += "Generation error: $_"
            return $false
        }
    }
    
    [bool]CreateRepositories() {
        if ($this.SkipRepositories) {
            $this.Log("Skipping repository creation step", "WARNING")
            return $true
        }
        
        try {
            $this.Log("Creating GitHub repositories...", "STAGE")
            
            $scriptPath = Join-Path (Get-Location) "create_repositories.ps1"
            if (-not (Test-Path $scriptPath)) {
                $this.Log("create_repositories.ps1 not found", "ERROR")
                $this.Report.Errors += "create_repositories.ps1 not found"
                return $false
            }
            
            # Build parameters
            $params = @(
                "-Owner", $this.Owner
                "-BasePath", $this.BasePath
            )
            
            if ($this.Public) { $params += "-Public" }
            if ($this.DryRun) { $params += "-DryRun" }
            
            # Run script
            & $scriptPath @params
            
            if ($LASTEXITCODE -ne 0) {
                $this.Log("Repository creation failed", "ERROR")
                $this.Report.Errors += "Repository creation script failed"
                return $false
            }
            
            $this.Log("Repository creation successful", "SUCCESS")
            $this.Report.RepositoriesSuccess = $true
            return $true
        }
        catch {
            $this.Log("Repository creation failed: $_", "ERROR")
            $this.Report.Errors += "Repository creation error: $_"
            return $false
        }
    }
    
    [bool]PushRepositories() {
        if ($this.SkipPush) {
            $this.Log("Skipping push step", "WARNING")
            return $true
        }
        
        try {
            $this.Log("Pushing repositories to GitHub...", "STAGE")
            
            $scriptPath = Join-Path (Get-Location) "push_all.ps1"
            if (-not (Test-Path $scriptPath)) {
                $this.Log("push_all.ps1 not found", "ERROR")
                $this.Report.Errors += "push_all.ps1 not found"
                return $false
            }
            
            # Build parameters
            $params = @(
                "-BasePath", $this.BasePath
                "-CommitMessage", $this.CommitMessage
            )
            
            if ($this.DryRun) { $params += "-DryRun" }
            
            # Run script
            & $scriptPath @params
            
            if ($LASTEXITCODE -ne 0) {
                $this.Log("Push operation failed", "ERROR")
                $this.Report.Errors += "Push script failed"
                return $false
            }
            
            $this.Log("Push operation successful", "SUCCESS")
            $this.Report.PushSuccess = $true
            return $true
        }
        catch {
            $this.Log("Push operation failed: $_", "ERROR")
            $this.Report.Errors += "Push error: $_"
            return $false
        }
    }
    
    [void]VerifySetup() {
        $this.Log("Verifying NEXUS setup...", "STAGE")
        
        # Check directories created
        $repoCount = @(Get-ChildItem $this.BasePath -Directory -ErrorAction SilentlyContinue).Count
        $this.Log("Found $repoCount repositories")
        
        # Check for required files
        $requiredRepos = @("01-Web", "02-AI", "03-Agentic-AI", "04-Automation", "05-Data", 
                          "06-Cybersecurity", "07-DevOps", "08-Cloud", "09-SaaS", "10-Business",
                          "11-Research", "12-Portfolio", "13-Shared-Templates", "99-Archive")
        
        $foundRepos = 0
        foreach ($repo in $requiredRepos) {
            $repoPath = Join-Path $this.BasePath $repo
            if (Test-Path $repoPath) {
                $foundRepos++
            }
        }
        
        $this.Log("Verified $foundRepos of $($requiredRepos.Count) repositories exist")
        
        if ($foundRepos -eq $requiredRepos.Count) {
            $this.Log("Verification successful", "SUCCESS")
        }
    }
    
    [void]DisplayFinalReport() {
        $duration = [math]::Round(((Get-Date) - $this.StartTime).TotalSeconds, 2)
        $this.Report.Duration = $duration
        
        Write-Host @"

╔════════════════════════════════════════════════════════════════╗
║              NEXUS SETUP COMPLETION REPORT                     ║
╚════════════════════════════════════════════════════════════════╝

📊 OPERATION STATUS:
  • Structure Generation: $(if ($this.Report.GenerationSuccess) { "✅ SUCCESS" } else { "❌ FAILED" })
  • Repository Creation: $(if ($this.Report.RepositoriesSuccess) { "✅ SUCCESS" } else { "❌ FAILED" })
  • Push to GitHub: $(if ($this.Report.PushSuccess) { "✅ SUCCESS" } else { "❌ FAILED" })

⏱️  DURATION: $($this.Report.Duration) seconds

"@
        
     if ($this.Report.Errors.Count -gt 0) {
            Write-Host "⚠️  ERRORS ENCOUNTERED:" -ForegroundColor Yellow
            foreach ($errMessage in $this.Report.Errors) {
                Write-Host "  • $errMessage" -ForegroundColor Red
            }
            Write-Host ""
        }
        
        Write-Host @"
📋 NEXT STEPS:
  1. Verify repositories in GitHub
  2. Clone repositories locally with: git clone https://github.com/USERNAME/01-Web
  3. Start adding projects to respective categories
  4. Update documentation and roadmaps
  5. Configure CI/CD pipelines

🎯 CONFIGURATION:
  • Owner: $($this.Owner)
  • Base Path: $(Resolve-Path $this.BasePath -ErrorAction SilentlyContinue)
  • Visibility: $(if ($this.Public) { 'Public' } else { 'Private' })

╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║        🚀 NEXUS ECOSYSTEM SUCCESSFULLY INITIALIZED! 🚀         ║
║                                                                ║
║        Your automated GitHub ecosystem is ready for use.       ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

"@ -ForegroundColor Green
    }
    
    [void]Execute() {
        try {
            $this.DisplayBanner()
            $this.DisplayConfiguration()
            
            if (-not $this.ValidateEnvironment()) {
                throw "Environment validation failed"
            }
            
            $this.Log("Starting NEXUS ecosystem setup...", "STAGE")
            
            if (-not $this.GenerateStructure()) {
                if (-not $this.SkipGeneration) {
                    throw "Structure generation failed"
                }
            }
            
            if (-not $this.CreateRepositories()) {
                if (-not $this.SkipRepositories) {
                    throw "Repository creation failed"
                }
            }
            
            if (-not $this.PushRepositories()) {
                if (-not $this.SkipPush) {
                    throw "Push operation failed"
                }
            }
            
            $this.VerifySetup()
            $this.DisplayFinalReport()
        }
        catch {
            $this.Log("Setup failed: $_", "ERROR")
            $this.Report.Errors += $_
            $this.DisplayFinalReport()
            exit 1
        }
    }
}

function Main {
    # Validate Owner parameter
    if (-not $Owner) {
        $Owner = Read-Host "Enter GitHub username or organization"
        if (-not $Owner) {
            Write-Host "GitHub owner is required" -ForegroundColor Red
            exit 1
        }
    }
    
    $orchestrator = [NEXUSOrchestrator]::new(
        $Owner,
        $BasePath,
        $CommitMessage,
        $SkipGeneration,
        $SkipRepositories,
        $SkipPush,
        $DryRun,
        $Public
    )
    
    $orchestrator.Execute()
}

Main