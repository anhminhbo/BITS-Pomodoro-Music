# Specify your master branch name that you want to merge to your branch
branchName=$1

# The commit message
commitMess=$2

git fetch -p
git pull origin $branchName

# Merge and check if there is merge conflict
git merge $branchName
exitcode=$?


if [ $exitcode -eq 0 ]; then
   echo "Merge success"
#    git add .
#    git commit -am"$commitMess"
#    git push

else
   echo "Merge conflict, fix before push"
fi