# Specify your master branch name that you want to merge to your branch
mergeBranchName=$1

# The commit message
commitMess=$2

# # Push current working dir to remote to make sure your branch is cleaned
# git add .
# git commit -am "$commitMess"
# git push

# Save current working dir
git stash

# Get new code from master branch
git fetch origin $mergeBranchName:$mergeBranchName
git pull origin $mergeBranchName

# Merge and check if there is merge conflict
git merge --no-edit --no-ff $mergeBranchName
git stash pop
exitcode=$?

if [ $exitcode -eq 0 ]; then
    git add .
   git commit -am"Merge $mergeBranchName successfully without conflict, $commitMess"
   git push
else
    # Promp for user input
    echo "Merge conflicts, solved? If yes, type 'y' to continue or anything else to abort: "
    while read input; do
    # Check for user input if they already fixed conflicts
        if [ "$input" == "y" ]; then
            git stash pop
            git add .
            git commit -am"Merge branch $mergeBranchName after fixing conflict, $commitMess"
            git push
            # Clear all stashes
            git stash clear 
            exit 0
        fi
        echo "Conflicts have not been resolved, abort"
        git merge --abort
        # Clear all stashes
        git stash clear 
        exit 1
    done
fi