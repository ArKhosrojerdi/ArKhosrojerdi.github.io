set -e

npm run build

#cd dist

git add dist && git commit -m "change dist file"
git subtree push --prefix dist origin gh-pages --force

cd -