# Specify your master branch name that you want to merge to your branch
mergeBranchName=$1

# The commit message
commitMess=$2

# Push current working dir to remote to make sure your branch is cleaned
git add .
git commit -am "$commitMess"
git push

# Wait for the github action to trigger
echo "Waiting for github action to trigger..."
sleep 3

# Get new code from master branch
git fetch origin $mergeBranchName:$mergeBranchName
git pull origin $mergeBranchName

# Merge and check if there is merge conflict
git merge --no-edit --no-ff $mergeBranchName
exitcode=$?

# Wait for the github action to trigger
echo "Waiting to merge $mergeBranchName to current branch..."
sleep 2

if [ $exitcode -eq 0 ]; then
   git add .
   git commit -am "Merge $mergeBranchName successfully without conflict, $commitMess"
   echo "Merge $mergeBranchName successfully without conflict, $commitMess"
   git push
else
    # Promp for user input
    echo "Merge conflicts, solved? If yes, type 'y' to continue or anything else to abort: "
    while read input; do
    # Check for user input if they already fixed conflicts
        if [ "$input" == "y" ]; then
            git add .
            git commit -am"Merge branch $mergeBranchName after fixing conflict, $commitMess"
            git push
            echo "Merge branch $mergeBranchName after fixing conflict, $commitMess" 
            exit 0
        fi
        echo "Conflicts have not been resolved, abort"
        git merge --abort
        exit 1
    done
fi