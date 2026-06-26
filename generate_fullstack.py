import os

# Define the root folder name
root_folder = "full-stack"

# Define the subfolder architecture
structure = {
    "front-end": [
        "HTML", "CSS", "JavaScript", "Bootstrap", 
        "React.js", "TypeScript", "Vue.js", "Angular", "TailwindCSS"
    ],
    "back-end": [
        "Java", "Python", "Ruby on Rails", "Node.js", "PHP", "Go", "C-Sharp"
    ],
    "database": [
        "SQL", "MongoDB", "PostgreSQL", "Redis", "Firebase"
    ]
}

def create_structure():
    print(f"Creating folder structure under '{root_folder}'...")
    for main_category, sub_folders in structure.items():
        for folder in sub_folders:
            # Construct the full directory path
            path = os.path.join(root_folder, main_category, folder)
            os.makedirs(path, exist_ok=True)
            
            # Git doesn't track empty folders, so we create a placeholder .gitkeep file
            keep_file = os.path.join(path, ".gitkeep")
            with open(keep_file, "w") as f:
                f.write(f"# Placeholder for {folder}")
                
    print("✅ Folder structure created successfully with .gitkeep placeholders!")

if __name__ == "__main__":
    create_structure()