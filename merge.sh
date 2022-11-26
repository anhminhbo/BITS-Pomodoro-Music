commitMess=$1
branchName=$2
# 
git add .
git commit -m"$commitMess"
git push

git switch minh-dev
git fetch -p
git pull

git switch $branchName
git merge minh-dev
git push