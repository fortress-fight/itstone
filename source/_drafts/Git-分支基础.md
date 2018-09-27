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

1.  `git branch [String]` -- 创建分支，如果没有添加 `branch name` 将会列出所有分支；
2.  `git branch -d <branch name>` 删除分支，如果遇到未合并的分支，将会删除失败，可以使用参数 `-D` 来删除；
3.  `git branch -v` 查看每一个分支的最后一次提交；
4.  `git branch --merged` 与 `git branch --no-merged` 这两个有用的选项可以过滤这个列表中已经合并或尚未合并到当前分支的分支。

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

3.  `git checkout -b <branch name>` 新建并切换到新的分支

    该命令相当于：

    `git branch <branch name>`
    `git checkout <branch name>`

4.  `git merge <branch name>` 合并分支

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

### 分支使用场景

1.  为实现某个新的需求，创建一个分支。然后在这个分支上开展工作。

    ```bash
        git checkout -b iss53
    ```
    ![创建新的分支](https://git-scm.com/book/en/v2/images/basic-branching-2.png)

2.  突然接到一个电话说有个很严重的问题需要紧急修补。

    有了 Git 的帮助，你不必把这个紧急问题和 iss53 的修改混在一起，你也不需要花大力气来还原关于 53# 问题的修改，然后再添加关于这个紧急问题的修改，最后将这个修改提交到线上分支。 你所要做的仅仅是切换回 master 分支。

    ```bash
        git commit -a -m 'added a new footer [issue 53]'
        git checkout master
    ```
    ![在新的分支上提交](https://git-scm.com/book/en/v2/images/basic-branching-3.png)

    这个时候，你的工作目录和你在开始 #53 问题之前一模一样，现在你可以专心修复紧急问题了。 请牢记：当你切换分支的时候，Git 会重置你的工作目录，使其看起来像回到了你在那个分支上最后一次提交的样子。 Git 会自动添加、删除、修改文件以确保此时你的工作目录和这个分支最后一次提交时的样子一模一样。

3.  切换到你的线上分支（production branch）。为这个紧急任务新建一个分支，并在其中修复它。在测试通过之后，切换回线上分支，然后合并这个修补分支，最后将改动推送到线上分支。切换回你最初工作的分支上，继续工作。

    -   接下来，你要修复这个紧急问题。 让我们建立一个针对该紧急问题的分支（hotfix branch），在该分支上工作直到问题解决：

        ```bash
            git checkout -b hotfix
        ```

        修复完成后，提交这次修改 `git commit -a -m 'fixed the broken email address'`

        ![修复分支](https://git-scm.com/book/en/v2/images/basic-branching-4.png)

    -   你可以运行你的测试，确保你的修改是正确的，然后将其 **合并回你的 master 分支来部署到线上**。 你可以使用 git merge 命令来达到上述目的：

        ```bash
            git checkout master
            git merge hotfix
            Updating f42c576..3a0874c
            Fast-forward
            index.html | 2 ++
            1 file changed, 2 insertions(+)
        ```
        
        `fast-forward`: 由于当前 master 分支所指向的提交是你当前提交（有关 hotfix 的提交）的直接上游，所以 Git 只是简单的将指针向前移动。 换句话说，当你试图合并两个分支时，如果顺着一个分支走下去能够到达另一个分支，那么 Git 在合并两者的时候，**只会简单的将指针向前推进**（指针右移），因为这种情况下的合并操作没有需要解决的分歧——这就叫做 “快进（fast-forward）”。

        现在，最新的修改已经在 master 分支所指向的提交快照中，你可以着手发布该修复了。

        ![发布修复](https://git-scm.com/book/en/v2/images/basic-branching-5.png)

    -   关于这个紧急问题的解决方案发布之后，你准备回到被打断之前时的工作中。 然而，**你应该先删除 hotfix 分支**，因为你已经不再需要它了 —— master 分支已经指向了同一个位置。 你可以使用带 -d 选项的 git branch 命令来删除分支：

        ```bash
            git branch -d hotfix
            Deleted branch hotfix (3a0874c).
        ```

    -   现在你可以切换回你正在工作的分支继续你的工作

        ```bash
            git checkout iss53
            Switched to branch "iss53"
            vim index.html
            git commit -a -m 'finished the new footer [issue 53]'
            [iss53 ad82d7a] finished the new footer [issue 53]
            1 file changed, 1 insertion(+)
        ```

        ![继续分支工作](https://git-scm.com/book/en/v2/images/basic-branching-6.png)

4.  功能分支完成，我们需要将该分支合并到主分支（master）上

    ```bash
        git checkout master
        Switched to branch 'master'
        git merge iss53
        Merge made by the 'recursive' strategy.
        index.html |    1 +
        1 file changed, 1 insertion(+)
    ```

    ![三方合并之前](https://git-scm.com/book/en/v2/images/basic-merging-1.png)

    这和你之前合并 hotfix 分支的时候看起来有一点不一样。 在这种情况下，你的开发历史从一个更早的地方开始分叉开来（diverged）。 因为，master 分支所在提交并不是 iss53 分支所在提交的直接祖先，Git 不得不做一些额外的工作。 **出现这种情况的时候，Git 会使用两个分支的末端所指的快照（C4 和 C5）以及这两个分支的工作祖先（C2），做一个简单的三方合并**。这个被称作一次合并提交，它的特别之处在于他有不止一个父提交。

    ![三方合并](https://git-scm.com/book/en/v2/images/basic-merging-2.png)

    既然你的修改已经合并进来了，你已经不再需要 iss53 分支了。 现在你可以在任务追踪系统中关闭此项任务，并删除这个分支。 `git branch -d iss53`

    注：有时候合并操作不会如此顺利。 如果你在两个不同的分支中，对同一个文件的同一个部分进行了不同的修改，Git 就没法干净的合并它们。 如果你对 #53 问题的修改和有关 hotfix 的修改都涉及到同一个文件的同一处，在合并它们的时候就会产生合并冲突：

### 遇到冲突时的分支合并

当合并遇到冲突时，Git 就没有办法干净的合并。 Git 会暂停下来，等待你去解决合并产生的冲突。 你可以在合并冲突后的任意时刻使用 git status 命令来查看那些因包含合并冲突而处于未合并（unmerged）状态的文件；

任何因包含合并冲突而有待解决的文件，都会以未合并状态标识出来。 Git 会在有冲突的文件中加入标准的冲突解决标记，这样你可以打开这些包含冲突的文件然后手动解决冲突。 出现冲突的文件会包含一些特殊区段，看起来像下面这个样子：

```bash
    <<<<<<< HEAD:index.html
    <div id="footer">contact : email.support@github.com</div>
    =======
    <div id="footer">
    please contact us at support@github.com
    </div>
    >>>>>>> iss53:index.html
```

为了解决冲突，你必须选择使用由 ======= 分割的两部分中的一个，或者你也可以自行合并这些内容。 

上述的冲突解决方案仅保留了其中一个分支的修改，并且 <<<<<<< , ======= , 和 >>>>>>> 这些行被完全删除了。 在你解决了所有文件里的冲突之后，**对每个文件使用 git add 命令来将其标记为冲突已解决。 一旦暂存这些原本有冲突的文件，Git 就会将它们标记为冲突已解决**。

如果你想使用图形化工具来解决冲突，你可以运行 `git mergetool`，该命令会为你启动一个合适的可视化合并工具，并带领你一步一步解决这些冲突：

等你退出合并工具之后，Git 会询问刚才的合并是否成功。 如果你回答是，Git 会暂存那些文件以表明冲突已解决： 你可以再次运行 `git status` 来确认所有的合并冲突都已被解决。

如果你对结果感到满意，并且确定之前有冲突的的文件都已经暂存了，这时你可以输入 `git commit` 来完成合并提交。

## 分支开发工作流

常见的利用分支进行开发的 **工作流程**。而正是由于分支管理的便捷，才衍生出这些典型的工作模式。

### 长期分支

在整个项目开发周期的不同阶段，创建多个开放的分支；你可以定期地把某些特性分支合并入其他分支中。

`master` 分支 -- 保留完全稳定的代码——有可能仅仅是已经发布或即将发布的代码
`develop` `topic` 平行分支 -- 被用来做后续开发或者测试稳定性，这些分支不必保持绝对稳定，但是一旦达到稳定状态，它们就可以被合并入 master 分支了。
`proposed` 建议更新分支 -- 它可能因包含一些不成熟的内容而不能进入 next 或者 master 分支。 这么做的目的是使你的分支具有不同级别的稳定性；当它们具有一定程度的稳定性后，再把它们合并入具有更高级别稳定性的分支中。 
短期分支 -- 短期分支能够通过所有测试，并且不会引入更多 bug 之后，就可以合并入主干分支中，等待下一次的发布。

![流水线](https://git-scm.com/book/en/v2/images/lr-branches-2.png)

### 特性分支

特性分支对任何规模的项目都适用。 特性分支是一种短期分支，它被用来实现单一特性或其相关工作。 在 Git 中一天之内多次创建、使用、合并、删除分支都很常见。

因为你的工作被分散到不同的流水线中，在不同的流水线中每个分支都仅与其目标特性相关，因此，在做代码审查之类的工作的时候就能更加容易地看出你做了哪些改动。 你可以把做出的改动在特性分支中保留几分钟、几天甚至几个月，等它们成熟之后再合并，而不用在乎它们建立的顺序或工作进度。

示例：

1.  你在 master 分支上工作到 C1，这时为了解决一个问题而新建 iss91 分支，在 iss91 分支上工作到 C4，然而对于那个问题你又有了新的想法，于是你再新建一个 iss91v2 分支试图用另一种方法解决那个问题，接着你回到 master 分支工作了一会儿，你又冒出了一个不太确定的想法，你便在 C10 的时候新建一个 dumbidea 分支，并在上面做些实验。 你的提交历史看起来像下面这个样子：

    ![多个特性分支的提交历史](https://git-scm.com/book/en/v2/images/topic-branches-1.png)

2.  现在，我们假设两件事情：你决定使用第二个方案来解决那个问题，即使用在 iss91v2 分支中方案；另外，你将 dumbidea 分支拿给你的同事看过之后，结果发现这是个惊人之举。 这时你可以抛弃 iss91 分支（即丢弃 C5 和 C6 提交），然后把另外两个分支合并入主干分支。 最终你的提交历史看起来像下面这个样子：

    ![alt](https://git-scm.com/book/en/v2/images/topic-branches-2.png)
    