---
title: 使用 MAC 随记
abbrlink: fa53a8ca
date: 2017-12-09 17:18:09
tags: 
- 随笔
- MAC
categories:
- 随笔
- MAC
---

从 win 转入 ios 的过程并不是特别的顺利，但是随着时间的推移后，渐渐的发现一些使用技巧以及一些能够提高效率的软件。苦于个人记性差忘性大，常常要浪费很长的时间去回忆，耽误了不少时间；许久之后，我决定记录我的使用过程；

个人使用 随时更新；

<!-- more -->

## Mac 软件

### Homebrew (brew)

[官网](https://brew.sh/index_zh-cn.html)

```cmd shell 安装 brew 命令
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

简介：使用 Homebrew 安装 Apple 没有预装但 你需要的东西。（主要是各种依赖）

******

## 写作相关

### 目录树

在网上见到在文章中直接引入了目录树，初始还以为是作者手敲的......

其实在命令行中通过 `tree` 就可以将文件以目录树的形式进行展示；

{% blockquote %}
**Mac 用户** 可以通过 `brew install tree` 进行扩展
{% endblockquote %}

如果中文乱码可以使用 `tree -N`

[tree文档](http://mama.indstate.edu/users/ice/tree/tree.1.html)

- 常用参数

命令 | 参数 | 解释
---|----|--释
-L 级别 | 目录树的深度
-o 文件名 | 将输出的树形结构到指定文件
-I 路径 | 将排除指定路径后，进行遍历
-d | 仅仅显示路径
-f | 在每一个文件或者目录之前显示完整的相对路径名称
-C | 对文件和目录清单上着色
-n | 不着色
-P | 只显示符合
-s | 显示大小
-N | 显示原始字符
