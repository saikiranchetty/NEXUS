#!/usr/bin/env python3
"""
NEXUS Ecosystem Generator
Automatically creates folder structure and documentation files
"""

import os
import sys
from pathlib import Path
from datetime import datetime
import json

class NEXUSGenerator:
    def __init__(self, root_path="NEXUS"):
        self.root_path = Path(root_path)
        self.created_dirs = []
        self.created_files = []
        self.skipped_files = []
        self.start_time = datetime.now()
        
    def log(self, message, level="INFO"):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [{level}] {message}")
    
    def create_directory(self, path):
        """Create directory if it doesn't exist"""
        try:
            path.mkdir(parents=True, exist_ok=True)
            if not str(path) in self.created_dirs:
                self.created_dirs.append(str(path))
            return True
        except Exception as e:
            self.log(f"Failed to create directory {path}: {e}", "ERROR")
            return False
    
    def create_file(self, path, content=""):
        """Create file if it doesn't exist"""
        try:
            path = Path(path)
            if path.exists():
                self.skipped_files.append(str(path))
                return False
            
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding='utf-8')
            self.created_files.append(str(path))
            return True
        except Exception as e:
            self.log(f"Failed to create file {path}: {e}", "ERROR")
            return False
    
    def create_gitkeep(self, path):
        """Create .gitkeep file"""
        gitkeep_path = Path(path) / ".gitkeep"
        if not gitkeep_path.exists():
            gitkeep_path.write_text("")
            self.created_files.append(str(gitkeep_path))
    
    def generate_readme(self, repo_name, categories):
        """Generate README content"""
        category_list = "\n".join([f"- {cat}" for cat in categories])
        content = f"""# {repo_name}

## Overview

Repository for {repo_name} projects and resources.

## Categories

{category_list}

## Directory Structure

```
{repo_name}/
├── docs/                  # Documentation
├── architecture/          # Architecture diagrams and specs
├── frontend/              # Frontend code
├── backend/               # Backend code
├── database/              # Database schemas and migrations
├── infrastructure/        # Infrastructure as Code
├── automation/            # Automation scripts
├── prompts/               # AI prompts and templates
├── scripts/               # Utility scripts
├── tests/                 # Test suites
├── assets/                # Assets and resources
├── deployment/            # Deployment configurations
└── README.md              # This file
```

## Getting Started

1. Clone the repository
2. Follow the setup instructions in each project folder
3. Check `CONTRIBUTING.md` for contribution guidelines

## Documentation

- [Contributing](CONTRIBUTING.md) - Contribution guidelines
- [Security](SECURITY.md) - Security policy
- [Changelog](CHANGELOG.md) - Version history
- [Roadmap](ROADMAP.md) - Future plans

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Security

For security issues, please see [SECURITY.md](SECURITY.md) instead of using the issue tracker.

---

**Last Updated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
        return content
    
    def generate_license(self):
        """Generate MIT License"""
        return """MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""
    
    def generate_contributing(self):
        """Generate CONTRIBUTING.md"""
        return """# Contributing

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Support the community

## How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Commit Messages

Use clear and descriptive commit messages:
- `feat: Add new feature`
- `fix: Resolve issue`
- `docs: Update documentation`
- `refactor: Improve code structure`
- `test: Add tests`

## Pull Request Process

1. Update documentation
2. Add tests if applicable
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

## Reporting Issues

- Use the issue tracker
- Provide clear description
- Include steps to reproduce
- Specify environment details

## Questions?

Feel free to ask questions in discussions or create an issue.

---

**Thank you for contributing!**
"""
    
    def generate_security(self):
        """Generate SECURITY.md"""
        return """# Security Policy

## Reporting Security Vulnerabilities

**Do not** open public issues for security vulnerabilities.

Please email security concerns to the maintainers privately. We will:
1. Acknowledge receipt within 48 hours
2. Provide status updates every 5 days
3. Release a fix and security advisory

## Supported Versions

| Version | Supported          |
|---------|-------------------|
| Latest  | ✅ Yes             |
| Previous| ⚠️  Limited support|
| Older   | ❌ No              |

## Security Best Practices

- Keep dependencies updated
- Use strong authentication
- Never commit secrets
- Follow OWASP guidelines
- Validate all inputs
- Use HTTPS for connections

## Security Headers

When deploying, implement:
- Content-Security-Policy
- X-Content-Type-Options
- X-Frame-Options
- Strict-Transport-Security

## Data Protection

- Encrypt sensitive data
- Follow GDPR/privacy laws
- Implement proper access controls
- Regular security audits

---

**Last Updated:** """ + datetime.now().strftime('%Y-%m-%d') + """
"""
    
    def generate_changelog(self):
        """Generate CHANGELOG.md"""
        return """# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup
- Core infrastructure

### Changed
- Project structure

### Fixed
- None yet

### Deprecated
- None yet

### Removed
- None yet

### Security
- None yet

## [1.0.0] - """ + datetime.now().strftime('%Y-%m-%d') + """

### Added
- Initial release
- Project initialized

---

For more details, check the commit history.
"""
    
    def generate_roadmap(self):
        """Generate ROADMAP.md"""
        return """# Roadmap

## Vision

Long-term vision and strategic direction for this project.

## Current Phase

### Q2 2026
- [ ] Foundation establishment
- [ ] Core features implementation
- [ ] Documentation completion
- [ ] Initial release

### Q3 2026
- [ ] Feature expansion
- [ ] Performance optimization
- [ ] Community building
- [ ] Security hardening

### Q4 2026
- [ ] Advanced features
- [ ] Scalability improvements
- [ ] Enterprise support
- [ ] Major version release

## Planned Features

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
- [ ] Feature 4

## Priorities

1. **High** - Core functionality
2. **Medium** - Enhancements
3. **Low** - Nice to have

## How to Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to reaching these goals.

## Feedback

Your feedback is valuable! Please:
- Open issues for feature requests
- Participate in discussions
- Share use cases

---

**Last Updated:** """ + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + """
"""
    
    def generate_gitignore(self):
        """Generate .gitignore"""
        return """# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Node
node_modules/
npm-debug.log
yarn-error.log
.npm

# Database
*.db
*.sqlite
*.sqlite3

# Logs
*.log
logs/

# Environment variables
.env
.env.local
.env.*.local

# Secrets
secrets/
*.pem
*.key
*.cert

# Build outputs
dist/
build/
*.o
*.a

# OS
Thumbs.db
.DS_Store

# Project specific
.cache/
temp/
tmp/
*.bak
*.backup
"""
    
    def generate_project_readme(self, project_name):
        """Generate project-specific README"""
        return f"""# {project_name}

## Description

Brief description of {project_name}.

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

```bash
# Installation steps
pip install -r requirements.txt
```

## Usage

```bash
# Usage examples
python main.py
```

## Project Structure

```
{project_name}/
├── docs/              # Documentation
├── src/               # Source code
├── tests/             # Tests
└── README.md
```

## Contributing

See [../CONTRIBUTING.md](../CONTRIBUTING.md)

## License

See [../LICENSE](../LICENSE)

---

**Created:** {datetime.now().strftime('%Y-%m-%d')}
"""
    
    def generate_nexus_structure(self):
        """Generate complete NEXUS structure"""
        self.log("Starting NEXUS ecosystem generation...")
        
        repositories = [
            ("01-Web", ["Static-Websites", "Dynamic-Websites", "Frontend-Applications", 
                       "Backend-Applications", "FullStack-Applications", "Ecommerce", 
                       "CRM", "ERP", "Dashboards", "Landing-Pages", "Portfolio-Websites", "Web-Tools"]),
            ("02-AI", ["Chatbots", "RAG-Systems", "AI-Assistants", "Computer-Vision", 
                      "NLP", "Fine-Tuning", "MultiModal", "AI-Products", "AI-Projects"]),
            ("03-Agentic-AI", ["Single-Agent", "Multi-Agent", "Browser-Agents", "Coding-Agents", 
                              "Research-Agents", "Recruiting-Agents", "Sales-Agents", "Agent-Platforms"]),
            ("04-Automation", ["Browser-Automation", "Workflow-Automation", "Desktop-Automation", 
                              "Email-Automation", "Social-Media-Automation", "WhatsApp-Automation", 
                              "Telegram-Automation", "RPA", "AI-Automation"]),
            ("05-Data", ["Databases", "Data-Science", "Analytics", "ETL", 
                        "Data-Engineering", "Visualization", "Data-Projects"]),
            ("06-Cybersecurity", ["Web-Security", "API-Security", "OSINT", "Bug-Bounty", 
                                 "Ethical-Hacking", "Linux", "Digital-Forensics", "Security-Projects"]),
            ("07-DevOps", ["Git", "GitHub", "CI-CD", "Docker", "Kubernetes", 
                          "Terraform", "Monitoring", "Logging", "Infrastructure", "DevOps-Projects"]),
            ("08-Cloud", ["AWS", "Azure", "GCP", "Multi-Cloud", 
                         "Serverless", "Cloud-Security", "Cloud-Architecture"]),
            ("09-SaaS", ["CRM", "HRMS", "Inventory", "Finance", 
                        "Education", "Healthcare", "Analytics", "AI-SaaS"]),
            ("10-Business", ["SaaS-Ideas", "Product-Ideas", "Marketing", "Sales", 
                            "Growth", "Investments", "Revenue-Models", "Startup-Research"]),
            ("11-Research", ["Whitepapers", "Experiments", "Innovation", 
                            "Architecture-Reviews", "Case-Studies", "Research-Projects"]),
            ("12-Portfolio", ["Featured-Projects", "Achievements", "Certifications", 
                             "Blogs", "Resume", "Showcase"]),
            ("13-Shared-Templates", ["README-Templates", "Project-Templates", "Architecture-Templates", 
                                    "Documentation-Templates", "Prompt-Templates", "Resume-Templates", 
                                    "Proposal-Templates", "Checklists"]),
            ("99-Archive", ["Deprecated", "Legacy-Projects", "Experiments"]),
        ]
        
        project_folders = ["docs", "architecture", "frontend", "backend", "database", 
                          "infrastructure", "automation", "prompts", "scripts", 
                          "tests", "assets", "deployment"]
        
        repo_files = {
            "README.md": None,  # Generated per repo
            "LICENSE": self.generate_license(),
            "CONTRIBUTING.md": self.generate_contributing(),
            "SECURITY.md": self.generate_security(),
            "CHANGELOG.md": self.generate_changelog(),
            "ROADMAP.md": self.generate_roadmap(),
            ".gitignore": self.generate_gitignore(),
        }
        
        # Create root directory
        self.create_directory(self.root_path)
        self.log(f"Created root directory: {self.root_path}")
        
        # Generate each repository
        for repo_name, categories in repositories:
            repo_path = self.root_path / repo_name
            self.create_directory(repo_path)
            self.log(f"Creating repository: {repo_name}")
            
            # Create repository-level files
            readme_content = self.generate_readme(repo_name, categories)
            self.create_file(repo_path / "README.md", readme_content)
            
            for file_name, content in repo_files.items():
                if file_name != "README.md":
                    self.create_file(repo_path / file_name, content)
            
            self.create_gitkeep(repo_path)
            
            # Create category folders
            for category in categories:
                category_path = repo_path / category
                self.create_directory(category_path)
                
                # Create project folders
                for folder in project_folders:
                    folder_path = category_path / folder
                    self.create_directory(folder_path)
                    self.create_gitkeep(folder_path)
                
                # Create project README
                project_readme_content = self.generate_project_readme(category)
                self.create_file(category_path / "README.md", project_readme_content)
        
        self.log("NEXUS ecosystem generation completed!")
    
    def display_tree(self, path, prefix="", max_depth=3, current_depth=0):
        """Display folder tree structure"""
        if current_depth >= max_depth:
            return
        
        try:
            items = sorted(Path(path).iterdir())
            dirs = [item for item in items if item.is_dir() and not item.name.startswith('.')]
            files = [item for item in items if item.is_file() and not item.name.startswith('.')]
            
            # Show directories
            for i, item in enumerate(dirs):
                is_last_dir = (i == len(dirs) - 1) and len(files) == 0
                print(f"{prefix}{'└── ' if is_last_dir else '├── '}{item.name}/")
                new_prefix = prefix + ("    " if is_last_dir else "│   ")
                self.display_tree(item, new_prefix, max_depth, current_depth + 1)
            
            # Show files
            for i, item in enumerate(files):
                is_last = i == len(files) - 1
                print(f"{prefix}{'└── ' if is_last else '├── '}{item.name}")
        
        except Exception as e:
            self.log(f"Error displaying tree: {e}", "ERROR")
    
    def generate_report(self):
        """Generate completion report"""
        elapsed = (datetime.now() - self.start_time).total_seconds()
        
        report = f"""
╔══════════════════════════════════════════════════════════════╗
║         NEXUS ECOSYSTEM GENERATION REPORT                    ║
╚══════════════════════════════════════════════════════════════╝

📊 STATISTICS:
  • Directories Created: {len(self.created_dirs)}
  • Files Created: {len(self.created_files)}
  • Files Skipped: {len(self.skipped_files)}
  • Total Time: {elapsed:.2f} seconds

📁 ROOT PATH: {self.root_path.absolute()}

✅ COMPLETED:
  • Repository structure initialized
  • Template files generated
  • Documentation files created
  • .gitkeep files placed
  • All categories created

🚀 NEXT STEPS:
  1. Run: powershell create_repositories.ps1
  2. Configure GitHub credentials
  3. Run: powershell setup_nexus.ps1
  4. Verify repositories in GitHub

📋 DIRECTORY TREE (Preview):
"""
        print(report)
        self.display_tree(self.root_path, max_depth=2)
        
        print("""
╔══════════════════════════════════════════════════════════════╗
║ Generation Complete! Ready for GitHub setup.                 ║
╚══════════════════════════════════════════════════════════════╝
""")
    
    def verify_structure(self):
        """Verify generated structure"""
        self.log("Verifying structure...")
        
        # Check root exists
        if not self.root_path.exists():
            self.log(f"Root path does not exist: {self.root_path}", "ERROR")
            return False
        
        # Count repositories
        repo_dirs = [d for d in self.root_path.iterdir() if d.is_dir()]
        self.log(f"Verified {len(repo_dirs)} repositories")
        
        return True

def main():
    try:
        generator = NEXUSGenerator("NEXUS")
        generator.generate_nexus_structure()
        generator.verify_structure()
        generator.generate_report()
        return 0
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1

if __name__ == "__main__":
    sys.exit(main())
