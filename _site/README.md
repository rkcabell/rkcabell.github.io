# Personal Portfolio

## How it works

Professional visitors will be linked to rkcabell.github.io/professional/

Personal visitors will be linked to https://rkcabell.github.io/

There is a link to the professional side from the personal side

There is no way to enter the personal side from the professional side without changing the URL

Either side can view the projects

The audience split is enforced by URL paths, not query strings

### To locally execute local jekyll website

```yml
1. bundle exec jekyll serve --livereload --trace --port 4001
2. jekyll serve --livereload --incremental --port 4001
```

### Scripts

- check.py || Runs exportnotion.sh and contains Notion API Tokens
- exportnotion.sh || exports notion page
- generate_tree.sh || generates file tree of the website, cleans it, and saves it to base directory
- randomize_cats.py || randomizes the order of cat pics
- rename_files.py || randomizes all file names, then renames them to BASE1, BASE2, BASE3, etc. (run with no args)
- populate_galleries.py || generates yml file with links to images of a gallery (set modes variable before running) (acts on thumbnails for art, images for cat)
- populate_wiki.py || processes yaml and wiki data
- process_wiki.py || Wiki .txt -> .json -> .yaml
- renotion.py || get all page IDs from notion project and export as markdown, placing in proper website folder
- test.sh || Notion API Test
- thumbify.bat || Turn images into thumbnails with watermark using Imagemagick

### Steps to creating a gallery page

0. TODO: Lowercase
1. run /scripts/new_gallery.py
2. provide title for gallery (one word)
3. add image to folder
4. continue with script
