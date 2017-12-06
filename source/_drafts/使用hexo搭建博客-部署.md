---
title: 使用hexo搭建博客-部署
date: 2017-12-07 02:34:58
tags:
---

## 部署

### 迁移到 GitHub

在安装的过程中 hexo 会要求安装到一个空的文件夹中 （hexo init）所以不是建立在一个 git 仓库中，通过部署的插件，我们可以将页面发布到 git page 上；这里存在一个问题：我们如果换电脑了，如果能够继续编辑？

首先 我们还是希望利用 git 将本地代码托管，这时我的思路是：

1. 在 gitPage 所在仓库上进行分支管理，其中 master 存放发布页面。 hexo 存放 本地编辑相关文件
2. 首先在本地文件中使用 `git init`
3. 本地仓库创建分支 -- hexo
4. 使用 `git add .` `git -m "init hexo"`
5. 关联远程仓库 `git remote add origin 仓库名称`
6. `git push origin hexo` 

REAMDME.md

如何保留 GitHub 中的 README.md

首先在 source 下重建一个 README.md 但是如果仅仅如此，这个 md 文件将会被 rend;

在根下的 _config.yml 搜索 `skip_render`: 字段，修改为 `skip_render`: README.md