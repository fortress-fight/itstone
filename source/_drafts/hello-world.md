---
title: Hello HEXO
abbrlink: 4a17b156
# layout: 布局
date: 2019-06-26
# updated: 更新日期	文件更新日期
comments: true
tags:
    - HEXO
    - NEXT
    - BLOG
categories:
    - [BLOG, HEXO]
# photos:
#   - /images/webpack.png
---

Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

<!-- more -->

## Quick Start

### Create a new post

```bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

```bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

```bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

```bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/deployment.html)

## NEXT

**[文档](https://theme-next.org/)**

### 标签

[Tag Plugins](https://theme-next.org/docs/tag-plugins/)

**块**

```md
{% note [class] [no-icon] %}
Any content (support inline tags too.io).
{% endnote %}

[class] : default | primary | success | info | warning | danger.

[no-icon] : Disable icon in note.

All parameters are optional.
```

示例：

**块**

{% note default %}

#### Default Header

Welcome to [Hexo!](https://hexo.io)
{% endnote %}

**引入外部文件**

```md
{% include_code index js index.js %}
```

示例：

{% include_code index js index.js %}

**引用块**

```md
{% centerquote %}Something{% endcenterquote %}

<!-- Tag Alias -->

{% cq %}Something{% endcq %}
```

示例：

{% cq %}Elegant in code, simple in core{% endcq %}

**图片**

```md
{% fullimage /url [@lazy], [alt], [title], [size] %}

<!-- Tag Alias -->

{% fi /url [@lazy], [alt], [title], [size] %}

/url : Relative path to image URL.

[@lazy] : Load image only when user scroll to it.

Dependencies: https://github.com/theme-next/theme-next-jquery-lazyload
[alt] : Alternate text (for search engines).

[title] : Tooltip at mouseover.

[size] : Size of image in any ratio (%, px, em).

All parameters except /url are optional.
```

示例：

```md
{% fi https://d33wubrfki0l68.cloudfront.net/e2ecd9e90ca2a56af8d7be434b7fdc39cbd454c9/da9b7/images/docs/github.png, github, Title Text, 200px %}
```

{% fi https://d33wubrfki0l68.cloudfront.net/e2ecd9e90ca2a56af8d7be434b7fdc39cbd454c9/da9b7/images/docs/github.png, github, Title Text, 200px %}

**按钮**

```md
{% button url, text, icon [class], [title] %}

<!-- Tag Alias -->

{% btn url, text, icon [class], [title] %}

url : Absolute or relative path to URL.

text : Button text. Required if no icon specified.

icon : FontAwesome icon name (without 'fa-' at the begining). Required if no text specified.

[class] : FontAwesome class(es): fa-fw | fa-lg | fa-2x | fa-3x | fa-4x | fa-5x
Optional parameter.

[title] : Tooltip at mouseover.
Optional parameter.
```

示例：

```md
{% btn #, Text & Large Icon & Title, home fa-fw fa-lg, Title %}</p>
```

{% btn #, Text & Large Icon & Title, home fa-fw fa-lg, Title %}</p>

**选项卡**

```md
{% tabs Unique name, [index] %}

<!-- tab [Tab caption] [@icon] -->

Any content (support inline tags too).

<!-- endtab -->

{% endtabs %}

Unique name : Unique name of tabs block tag without comma.
Will be used in #id's as prefix for each tab with their index numbers.
If there are whitespaces in name, for generate #id all whitespaces will replaced by dashes.
Only for current url of post/page must be unique!

[index] : Index number of active tab.
If not specified, first tab (1) will be selected.
If index is -1, no tab will be selected. It's will be something like spoiler.
Optional parameter.

[Tab caption] : Caption of current tab.
If not caption specified, unique name with tab index suffix will be used as caption of tab.
If not caption specified, but specified icon, caption will empty.
Optional parameter.

[@icon] : FontAwesome icon name (without 'fa-' at the begining).
Can be specified with or without space; e.g. 'Tab caption @icon' similar to 'Tab caption@icon'.
Optional parameter.
```

示例：

```md
{% tabs Sixth unique name, 2 %}

<!-- tab Solution 1@text-width -->

**This is Tab 1.**

<!-- endtab -->

<!-- tab Solution 2 @amazon -->

**This is Tab 2.**

<!-- endtab -->

<!-- tab Solution 3@bold -->

**This is Tab 3.**

<!-- endtab -->

{% endtabs %}
```

{% tabs Sixth unique name, 2 %}

<!-- tab Solution 1@text-width -->

**This is Tab 1.**

<!-- endtab -->

<!-- tab Solution 2 @amazon -->

**This is Tab 2.**

<!-- endtab -->

<!-- tab Solution 3@bold -->

**This is Tab 3.**

<!-- endtab -->

{% endtabs %}

**Video**

```md
{% video https://example.com/sample.mp4 %}
```

示例：

{% video https://example.com/sample.mp4 %}

**Pic Group**

```md
{% grouppicture [group]-[layout] %}{% endgrouppicture %}
{% gp [group]-[layout] %}{% endgp %}

[group] : Total number of pictures to add in the group.

[layout] : Default picture under the group to show.
```

{% grouppicture 6-6 %}
![](https://d33wubrfki0l68.cloudfront.net/e2ecd9e90ca2a56af8d7be434b7fdc39cbd454c9/da9b7/images/docs/github.png)
![](https://d33wubrfki0l68.cloudfront.net/e2ecd9e90ca2a56af8d7be434b7fdc39cbd454c9/da9b7/images/docs/github.png)
![](https://d33wubrfki0l68.cloudfront.net/e2ecd9e90ca2a56af8d7be434b7fdc39cbd454c9/da9b7/images/docs/github.png)
![](https://d33wubrfki0l68.cloudfront.net/e2ecd9e90ca2a56af8d7be434b7fdc39cbd454c9/da9b7/images/docs/github.png)
![](https://d33wubrfki0l68.cloudfront.net/e2ecd9e90ca2a56af8d7be434b7fdc39cbd454c9/da9b7/images/docs/github.png)
![](https://d33wubrfki0l68.cloudfront.net/e2ecd9e90ca2a56af8d7be434b7fdc39cbd454c9/da9b7/images/docs/github.png)
{% endgrouppicture %}
