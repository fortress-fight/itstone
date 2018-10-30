---
title: CSS-Grid
tags:
  - CSS
  - Grid
category:
  - CSS
floder: CSS
abbrlink: cc10d1b4
date: 2018-09-13 16:47:45
---

---

<!-- more -->

## Grid 基础知识

1.  定义一个容器元素：`display: grid`;
2.  设置列和行的大小：`grid-template-columns`，`grid-template-rows`;
3.  然后将其子元素融入到网格，`grid-column` 和 `grid-row`。
  
与flexbox类似，网格项的源顺序无关紧要。您的CSS可以按任何顺序放置它们，这使得使用媒体查询重新排列网格非常容易。

截至2017年3月，大多数浏览器都提供原生的，没有前缀的CSS Grid支持：Chrome（包括Android），Firefox，Safari（包括iOS）和Opera。另一方面，Internet Explorer 10和11支持它，但它是一种具有过时语法的旧实现。

概念：

1.  容器元素（display: grid）：它是所有网格项的直接父级。在此示例中container是网格容器。 
2.  网格项：网格容器的子节点（例如直接后代）
3.  网格线：构成网格结构的分界线。它们可以是垂直（“列网格线”）或水平（“行网格线”），并且位于行或列的任一侧。
4.  行 / 列
5.  单元格
6.  网格区域：四个网格线包围的总空间

## Grid 属性

### leason1

1.  容器属性

    -   `display: grid | inline-grid;`
    -   `grid-template-columns: [[列名称]] <列宽> [[列名称]] <列宽> [[列名称]] <列宽>` `grid-template-rows:[[行名称]] <行高> [[行名称]] <行高> [[行名称]] <行高>` 可以控制每行 / 列的尺寸，以及对网格线命名
    -   `grid-template-columns: repeat(<num>, <宽度> [[名称]]);`

2.  网格属性

    -   grid-column-start: <number> | <name> | span <number> | span <name> | auto
    -   grid-column-end: <number> | <name> | span <number> | span <name> | auto
    -   grid-row-start: <number> | <name> | span <number> | span <name> | auto
    -   grid-row-end: <number> | <name> | span <number> | span <name> | auto

    name: 线名称 number: 数字

