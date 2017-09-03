#!/usr/bin/env bash
GIT_DEPLOY_REPO=$(git config remote.origin.url)

# setup known hosts
if [ ! -d "~/.ssh" ]; then
  mkdir -p ~/.ssh
fi
ssh-keyscan github.com >> ~/.ssh/known_hosts

# deploy
cd build && $(npm bin)/rimraf .git
git config --global user.email arthur791004@gmail.com && \
git config --global user.name "Arthur" && \
git init && \
git add . && \
git commit -m "Deploy to GitHub Pages" && \
git push --force "${GIT_DEPLOY_REPO}" master:gh-pages
