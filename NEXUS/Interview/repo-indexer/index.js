const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Your massive list of resources categorized logically
const resourceMap = {
    "01-Roadmaps-and-Handbooks": [
        "https://github.com/nilbuild/developer-roadmap",
        "https://github.com/yangshun/tech-interview-handbook",
        "https://github.com/microsoft/Web-Dev-For-Beginners",
        "https://github.com/jordan-cutler/path-to-senior-engineer-handbook",
        "https://github.com/EbookFoundation/free-programming-books"
    ],
    "02-System-Design": [
        "https://github.com/donnemartin/system-design-primer",
        "https://github.com/ashishps1/awesome-system-design-resources"
    ],
    "03-DSA-Sheets-and-Patterns": [
        "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z",
        "https://takeuforward.org/dsa/strivers-sde-sheet-top-coding-interview-problems",
        "https://leetcode.com/discuss/post/460599/blind-75-leetcode-questions-by-krishnade-9xev/",
        "https://neetcode.io/practice/practice/coreSkills",
        "https://450dsa.com/",
        "https://github.com/seanprashad/leetcode-patterns",
        "https://github.com/ashishps1/awesome-leetcode-resources",
        "https://leetcode.com/problem-list/dynamic-programming/"
    ],
    "04-Company-Wise-Questions": [
        "https://company-wise-leetcode-farneet.netlify.app/",
        "https://github.com/hxu296/leetcode-company-wise-problems-2022",
        "https://github.com/krishnadey30/LeetCode-Questions-CompanyWise",
        "https://github.com/Codechef-WCE-Chapter/30-Days-6-Companies",
        "https://github.com/karthikreddy-7/TCS-NQT-CODING-SHEET",
        "https://github.com/ombharatiya/FAANG-Coding-Interview-Questions",
        "https://github.com/liquidslr/interview-company-wise-problems",
        "https://github.com/snehasishroy/leetcode-companywise-interview-questions",
        "https://leetcode.com/problemset/all/?topicSlugs=company-tag&",
        "https://www.geeksforgeeks.org/gfg-academy/company-preparation/"
    ],
    "05-Core-CS-and-Math": [
        "https://github.com/ossu/computer-science",
        "https://github.com/DataExpert-io/data-engineer-handbook",
        "https://cses.fi/problemset",
        "https://github.com/jwasham/coding-interview-university",
        "https://github.com/careercup/CtCI-6th-Edition",
        "https://github.com/TheAlgorithms",
        "https://www.interviewbit.com/",
        "https://www.hackerrank.com/interview/interview-preparation-kit",
        "https://codeforces.com/problemset",
        "https://github.com/exajobs/coding-interview-collection"
    ]
};

// Helper to extract repo owner and name from a GitHub URL
function parseGitHubUrl(url) {
    if (!url.includes('github.com')) return null;
    const parts = url.replace('https://github.com/', '').split('/');
    if (parts.length >= 2) {
        return { owner: parts[0], repo: parts[1].split('#')[0].split('?')[0] };
    }
    return null;
}

async function buildDashboard() {
    console.log("🚀 Starting extraction and structure generation...");

    for (const [folderName, urls] of Object.entries(resourceMap)) {
        const folderPath = path.join(__dirname, folderName);
        
        // Ensure folder exists
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        let readmeContent = `# ${folderName.replace(/^\d+-/, '').replace(/-/g, ' ')}\n\n`;
        readmeContent += `This folder contains curated resources and code tracking for **${folderName}**.\n\n## Tracked Links\n`;

        for (const url of urls) {
            const repoInfo = parseGitHubUrl(url);
            
            if (repoInfo) {
                try {
                    // Fetch real-time info from GitHub API instead of brittle scraping
                    const response = await axios.get(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`);
                    const repoData = response.data;
                    
                    readmeContent += `*   **[${repoData.full_name}](${url})** - ⭐ ${repoData.stargazers_count} stars\n`;
                    readmeContent += `    > ${repoData.description || 'No description provided.'}\n\n`;
                    
                    console.log(`✅ Extracted data for: ${repoData.full_name}`);
                } catch (error) {
                    // Fallback if API rate limits you or link is broken
                    readmeContent += `*   **[${repoInfo.repo}](${url})** (GitHub Repository)\n`;
                }
            } else {
                // External website processing (LeetCode, NeetCode, etc.)
                const domain = new URL(url).hostname.replace('www.', '');
                readmeContent += `*   **[External Resource Hub - ${domain}](${url})**\n\n`;
            }
        }

        // Write individual sub-READMEs
        fs.writeFileSync(path.join(folderPath, 'README.md'), readmeContent);
    }

    // Generate Global Main README Dashboard
    let mainReadme = `# Core Engineering & Interview Dashboard\n\nAutomated study roadmap and code repository framework.\n\n## Quick Index Navigation\n`;
    Object.keys(resourceMap).forEach(folder => {
        mainReadme += `*   **[${folder.replace(/^\d+-/, '').replace(/-/g, ' ')}](./${folder})**\n`;
    });

    fs.writeFileSync(path.join(__dirname, 'README.md'), mainReadme);
    console.log("\n🎉 Generation Complete! Check your new structured directories.");
}

buildDashboard();