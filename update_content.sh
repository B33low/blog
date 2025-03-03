#!/bin/bash
cd "$(dirname "$0")"
git submodule update --remote --merge
git add src/content
git commit -m "Updated blog content from Obsidian"
git push
