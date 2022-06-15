#!/usr/bin/env sh

git remote set-url origin git@github.com:jameygleason/custom-elements.git
git push origin
git remote set-url origin git@gitlab.com:jameygleason/custom-elements.git
git push origin