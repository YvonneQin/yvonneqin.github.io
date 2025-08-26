#!/bin/bash

# Update password protection in all HTML files
echo "Updating password protection in HTML files..."

# Function to update a single file
update_file() {
    local file="$1"
    echo "Processing: $file"
    
    # Remove the old password script block
    sed -i '' '/<SCRIPT language=JavaScript>/,/<\/SCRIPT>/d' "$file"
    
    # Add the new component script import before </head>
    sed -i '' '/<\/head>/i\
  <script src="js/components/password-protection.js"></script>' "$file"
    
    # Add the component usage after <body
    sed -i '' '/<body[^>]*>/a\
  <password-protection></password-protection>' "$file"
}

# Update main project files
update_file "project_Construct.html"
update_file "project_DCT.html"
update_file "project_MM.html"
update_file "project_Redcity.html"
update_file "project_Law.html"
update_file "project_Askbob.html"
update_file "project_POC.html"
update_file "project_Gradute.html"
update_file "project_COE.html"
update_file "my_insight.html"

echo "Password protection update completed!"
