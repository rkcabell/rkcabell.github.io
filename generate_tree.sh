#!/bin/bash

# Function to simulate 'tree' command
function pseudo_tree() {
    local directory=$1
    local indent=$2

    # Get a list of all entries in the directory except '.' and '..'
    local entries=($(ls -A1 "$directory" | grep -vE '^\.|^_site/?$')) # Exclude dirs starting with '.' and the _site/ dir
    local total=${#entries[@]}
    local count=0

    # echo "Debug: Listing entries in $directory" >> debug.txt
    # for entry in "${entries[@]}"; do
    #     echo "Debug: $entry" >> debug.txt
    # done

    # Loop through all entries
    for entry in "${entries[@]}"; do
        ((count++))
        local cur_path="$directory/$entry"
        # Determine if this is the last entry to format it with └── or ├──
        if [ $count -eq $total ]; then
            local branch_char="└──"
        else
            local branch_char="├──"
        fi

        # Check if the current entry is a directory
        if [ -d "$cur_path" ]; then
            # Print the directory with a trailing slash
            echo "${indent}${branch_char} $entry/" >> tree.txt
            # Recurse into the directory with increased indentation
            local new_indent="${indent}│   "
            if [ $count -eq $total ]; then
                new_indent="${indent}    "
            fi
            pseudo_tree "$cur_path" "$new_indent"
        else
            # Print the file entry
            echo "${indent}${branch_char} $entry" >> tree.txt
        fi
    done
}

# Main execution starts here

# Check if tree.txt exists and delete it if it does
[ -f tree.txt ] && rm tree.txt

# Start recursion from the current directory
echo "Directory structure of $(pwd):" > tree.txt
pseudo_tree "." ""  # Call the function with root directory and no initial indentation

# Notify user of completion
echo "Directory tree has been saved to tree.txt"
