# CaliaNova
## Latest Update
If you want to change the latest update page, then open _config.yml

```
lastPage: 2
```


and change the line to whatever page number you want.

## Adding Chapter
1. Click _archive folder
2. Create new md file in _archive, named chapter_<number>.md
- ex. if it's chapter 2, name it chapter_2.md

a. Paste in and change <number> to the chapter number 
```
---
layout: chapter
title: Chapter <number>
chapter_folder: chapter_<number>
---

{% include comic.html chapter_folder=page.chapter_folder %}
```

3. Go back to main menu and click on assets folder
4. Click create new file name it chapter_<number>/temp.txt
- ex. if it's chapter 2, name it chapter_2/test.txt
5. Click add files and add in files
6. delete test.txt


## Adding Pages
1. Click on assets folder
2. Click add files and add in files
