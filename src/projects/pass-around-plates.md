---
title: Pass Around Plates
order: 2
headline: Turned 190 recipes from an old family blog into a clean, searchable site the family can update themselves.
summary: Scripts pulled every post off the blog, standardized the measurements, and checked that no ingredient amount changed along the way.
thumb: pass-around-plates-home.jpg
thumbAlt: "The recipe site's home page: category filters on the left and a grid of recipe cards with photos"
stack:
  - Python (BeautifulSoup, Pillow)
  - Plain JavaScript
  - GitHub Pages
  - GitHub API
live: https://jacksonsearle.github.io/pass-around-plates/
code: https://github.com/JacksonSearle/pass-around-plates
---

## The problem

My family's recipes lived on an old blog. They were posted by different people over the years, each written in its own style, with measurements written in different ways. Finding a recipe meant scrolling through posts, and adding one meant knowing how to use the blog.

## The result

A website with 190 recipes imported from the blog, each in the same layout: ingredients, numbered steps, tips, and who it came from. You can search by name or ingredient, filter by category or person, and print any recipe. Every recipe links back to its original post. Family members add and edit recipes on the site itself, and it's live today.

No ingredient amounts were changed in the move. An automatic check confirmed that every number in each cleaned-up ingredient list also appears in the original post.

{% shot "pass-around-plates-recipe.jpg", "A single recipe page: ingredient checklist, numbered instructions, tips, and buttons to print, open the original post, or edit" %}

## How it works

1. **Collect every post.** A script reads the whole blog through its public feed and saves each post's text, author, labels and photos.
2. **Put each recipe into one structure.** Claude, an AI model, rewrote every post into the same fields: ingredients, steps, tips and notes.
3. **Standardize the measurements.** A second script rewrites units into one style, such as tsp, Tbsp, cups, oz, lb and °F.
4. **Check the AI's work.** Before a recipe is accepted, the build compares its ingredient list with the original post and flags any number that doesn't appear there, so the rewrite can't change an amount.
5. **Let the family maintain it.** The site has a form for adding, editing and deleting recipes. Saving writes directly to the site's data, and only family members with an access key can do it.
