---
title: Git-分支基础
date: 2018-09-26 11:44:36
tags:
    - git
folder:
    - Git
category:
    - git
---

---
<!-- more -->

## Git-分支基础

使用分支可以把工作从开发主线上分离开来，以免影响开发主线。Git 鼓励在工作流程中频繁地使用分支与合并。 理解和精通这一特性，你便会意识到 Git 是如此的强大而又独特，并且从此真正改变你的开发方式。

由于 Git 的分支实质上仅是包含所指对象校验和（长度为 40 的 SHA-1 值字符串）的文件，所以它的创建和销毁都异常高效。 创建一个新分支就相当于往一个文件中写入 41 个字节（40 个字符和 1 个换行符），如此的简单能不快吗？

这与过去大多数版本控制系统形成了鲜明的对比，它们在创建分支时，将所有的项目文件都复制一遍，并保存到一个特定的目录。 完成这样繁琐的过程通常需要好几秒钟，有时甚至需要好几分钟。所需时间的长短，完全取决于项目的规模。而在 Git 中，任何规模的项目都能在瞬间创建新分支。 同时，由于每次提交都会记录父对象，所以寻找恰当的合并基础（译注：即共同祖先）也是同样的简单和高效。 这些高效的特性使得 Git 鼓励开发人员频繁地创建和使用分支。

接下来，让我们看看你为什么应该这样做。

### 分支简介

暂存操作会为每一个文件计算校验和，然后会把当前版本的 **文件快照** 保存到 Git 仓库中（Git 使用 blob 对象来保存它们），最终会把校验和加入到暂存区域等待提交；

当使用 `git commit` 进行提交操作时，Git 会先计算每一个子目录的 **校验和**，然后在 Git 仓库中这些校验和保存为 **树对象**。随后 Git 便会创建一个 **提交对象**。该对象包含一个指向暂存内容快照的指针、作者的姓名邮箱、提交时输入的信息以及指向它的父对象的指针。这样，Git 就可以在需要的时候重现此次保存的快照。

在一次提交过程中，会创建：blob 对象（保存着文件快照）、树对象（记录着目录结构和 blob 对象索引）以及一个提交对象（包含着指向树对象的指针和所有提交信息）

![Git 仓库对象](https://git-scm.com/book/en/v2/images/commit-and-tree.png)

在做些修改后再次提交，那么这次产生的提交对象会包含一个指向上次提交对象（父对象）的指针。

![提交对象及其父对象](https://git-scm.com/book/en/v2/images/commits-and-parents.png)

#### Git-master分支

Git 的分支，其实本质上仅仅是指向提交对象的可变指针。 Git 的默认分支名字是 master。 在多次提交操作之后，你其实已经有一个指向最后那个提交对象的 master 分支。 它会在每次的提交操作中自动向前移动。

Git 的 “master” 分支并不是一个特殊分支。 它就跟其它分支完全没有区别。 之所以几乎每一个仓库都有 master 分支，是因为 git init 命令默认创建它，并且大多数人都懒得去改动它。

### 分支创建

分支创建只是为你创建了一个可以移动的新的指针

1.  `git branch [String]` -- 创建分支

![分支](https://git-scm.com/book/en/v2/images/two-branches.png)

### HEAD 分支

它是一个指针，指向当前所在的本地分支（译注：将 HEAD 想象为当前分支的别名）。 在本例中，你仍然在 master 分支上。 因为 git branch 命令仅仅 创建 一个新分支，并不会自动切换到新分支中去。

![HEAD](https://git-scm.com/book/en/v2/images/head-to-master.png)

1.  `git log --oneline --decorate` -- 查看各个分支当前所指的对象

    ```bash
        $ git log --oneline --decorate
        f30ab (HEAD, master, testing) add feature #32 - ability to add new
        34ac2 fixed bug #1328 - stack overflow under certain conditions
        98ca9 initial commit of my project
    ```

2.  `git checkout testing` -- 切换分支

    ![checkout](https://git-scm.com/book/en/v2/images/head-to-testing.png)

    切换分支，具体执行了两个操作：1. 使得 HEAD 指向切换的分支。2. 将工作目录 **恢复成切换分支所指向的快照内容。** 也就是说，你现在做修改的话，项目将始于一个较旧的版本。 本质上来讲，这就是忽略 testing 分支所做的修改，以便于向另一个方向进行开发。

> 在切换分支时，一定要注意你工作目录里的文件会被改变。 如果是切换到一个较旧的分支，你的工作目录会恢复到该分支最后一次提交时的样子。 如果 Git 不能干净利落地完成这个任务，它将禁止切换分支。

使用介绍：

-   `git commit -a -m 'made a change'`

    ![移动分支](https://git-scm.com/book/en/v2/images/advance-testing.png)

    如图所示，你的 testing 分支向前移动了，但是 master 分支却没有，它仍然指向运行 git checkout 时所指的对象。 这就有意思了，现在我们切换回 master 分支看看：

-   `git checkout master`

    ![切换分支](https://git-scm.com/book/en/v2/images/checkout-master.png)

-   `git commit -a -m 'made other changes'`

    ![分叉分支](https://git-scm.com/book/en/v2/images/advance-master.png)

-   `git log --oneline --decorate --graph --all`

    ```bash
        $ git log --oneline --decorate --graph --all
        * c2b9e (HEAD, master) made other changes
        | * 87ab2 (testing) made a change
        |/
        * f30ab add feature #32 - ability to add new formats to the
        * 34ac2 fixed bug #1328 - stack overflow under certain conditions
        * 98ca9 initial commit of my project
    ```

