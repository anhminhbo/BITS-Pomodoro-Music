# Specify your master branch name that you want to merge to your branch
#
branchName=$1

# The commit message
commitMess=$2

# Save current working dir
git stash

# Get new code from master branch
git fetch origin $branchName:$branchName
git pull origin $branchName

# Merge and check if there is merge conflict
git merge --no-edit --no-ff $branchName
git stash apply

exitcode=$?


if [ $exitcode -eq 0 ]; then
   echo "Merge success"
   git push

else
    # Promp for user input
    echo "Merge conflict, solved? If yes, type 'y' to continue: "
    while read input; do
    # Check for user input if they already fixed conflicts
        if [ "$input" -eq "y" ]; then
            git commit -am"merge $branchName after fixing conflict"
            git push
            exit 0
        fi
        echo "Conflicts have not been resolved, abort"
        git merge --abort
    done
fi