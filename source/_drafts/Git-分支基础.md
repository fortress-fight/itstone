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

#### Git-master 分支

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

为了解决冲突，你必须选择使用由 `=======` 分割的两部分中的一个，或者你也可以自行合并这些内容。

上述的冲突解决方案仅保留了其中一个分支的修改，并且 `<<<<<<<` , `=======` , 和 `>>>>>>>` 这些行被完全删除了。 在你解决了所有文件里的冲突之后，**对每个文件使用 git add 命令来将其标记为冲突已解决。 一旦暂存这些原本有冲突的文件，Git 就会将它们标记为冲突已解决**。

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

## 远程分支

远程引用是对远程仓库的引用。

1.  `git ls-remote <remote-name>` 来显示的获取远程引用的完整列表
2.  `git remote show <remote>` 获取远程分支的更多信息

远程跟踪分支：

远程跟踪分支是远程分支状态的引用，它们是你不能移动的本地分支。它们以 [remote-name]/[branch-name] 的形式命令。例如：`'origin/master'` ; 有本地分支 `change`，对应的远程分支就是 `origin/change`

> 远程仓库 `origin` 与分支名字 `master` 一样，在 Git 中并没有任何特殊的含义。都是在 `git init` 默认起始分支名字。`origin` 是当你运行 `git clone` 时默认的远程仓库名字，如果你运行 `git clone -o other` 那默认的远程分支就是 `other/master`

![clone](https://git-scm.com/book/en/v2/images/remote-branches-1.png)

1.  `git fetch <remote-name>` 查找 `remote-name` 是哪一个服务器，从中抓取本地没有的数据，并且更新本地数据库，移动 `origin/master` 指针指向新的、更新后的位置

    当抓取到新的远程跟踪分支时，本地不会自动生成一份可编辑的副本（拷贝）。 换一句话说，这种情况下，不会有一个新的分支 - 只有一个不可以修改的 `remote-name/branch-name` 指针。

    然后运行 `git merge <remote-name>/<branch-name>` 将这些工作合并到当前所在的分支。 或者 `git checkout -b <branch-name> <remote-name>/<branch-name>` 创建一个新的本地工作分支，并且起点位于 `<remote-name>/<branch-name>`

    git 提供了一个便捷的操作方式：

    `git checkout --track <remote-name>/<branch-name>` 该命令会创建一个 `<branch-name>` 的分支，并且跟踪对应的远程分支

    -   如果希望设置/修改已有的本地分支跟踪一个刚刚拉取下来的远程分支：`git branch -u <remote-name>/<branch-name>`
    -   在设置好上游分支后，可以通过 `@{u}` 来表示远程分支，例如：`git push @{u}`

2.  `git pull` 拉取本地分支

    从一个远程跟踪分支检出一个本地分支会自动创建一个叫做 **跟踪分支**（有时候也叫做 “上游分支”）。 跟踪分支是与远程分支有直接关系的本地分支。 如果在一个跟踪分支上输入 `git pull`，**Git 能自动地识别去哪个服务器上抓取、合并到哪个分支**。

    `git pull` 在大多数情况下是 `git fetch` & `git merge`
    
3.  `git branch -vv` 将所有的本地分支列出来并且包含更多的信息、

    ```bash
        $ git branch -vv
        iss53     7e424c3 [origin/iss53: ahead 2] forgot the brackets
        master    1ae2a45 [origin/master] deploying index fix
        * serverfix f8674d9 [teamone/server-fix-good: ahead 3, behind 1] this should do it
        testing   5ea463a trying something new
    ```
    
    `ahead` -- 意味着本地分支有两个没有推送
    `behind` -- 意味着远程有一次提交没有合并到本地

### 推送

当你想要公开分享一个分支时，需要将其推送到有写入权限的远程仓库上。 本地的分支并不会自动与远程仓库同步 - 你必须显式地推送想要分享的分支

1.  `git push <remote-name> <branch-name>` 推送到远程分支

    ```bash
        $ git push origin serverfix
        Counting objects: 24, done.
        Delta compression using up to 8 threads.
        Compressing objects: 100% (15/15), done.
        Writing objects: 100% (24/24), 1.91 KiB | 0 bytes/s, done.
        Total 24 (delta 2), reused 0 (delta 0)
        To https://github.com/schacon/simplegit
        * [new branch]      serverfix -> serverfix
    ```

    这里有些工作被简化了。 Git 自动将 `serverfix` 分支名字展开为 `refs/heads/serverfix:refs/heads/serverfix`，可以通过这种格式来推送本地分支到一个命名不相同的远程分支。 如果并不想让远程仓库上的分支叫做 `serverfix`，可以运行 `git push origin serverfix:awesomebranch` 来将本地的 `serverfix` 分支推送到远程仓库上的 `awesomebranch` 分支。

### 密码

推送到远程分支需要输入远程仓库的密码，如果希望避免每次输入密码：

如果你正在使用 `HTTPS URL` 来推送，Git 服务器会询问用户名与密码。 默认情况下它会在终端中提示服务器是否允许你进行推送。

如果不想在每一次推送时都输入用户名与密码，你可以设置一个 “credential cache”。 最简单的方式就是将其保存在内存中几分钟，可以简单地运行 `git config --global credential.helper cache` 来设置它，或者使用凭证储存

### 删除远程分支

1.  `gti push <remote-name> --delete <branch-name>` 将会在服务器上移除这个分支，Git 服务器会在保留数据一段时间直到垃圾回收运行。

## rebase

在 Git 中整合来自不同分支的修改有两种方式：`merge` & `rebase`

`rebase` 命令和 `merge` 不同：

-   `merge` 它会把两个分支的最新快照（C3 和 C4）以及二者最近的共同祖先（C2）进行三方合并，`合并的结果是生成一个新的快照（并提交）`。
-   `rebase` 将会把提交到某一分支上的所有修改都 **移到另一分支上**，它的原理是首先找到这两个分支（当前分支和变基操作的目标基础分支）的最近的共同祖先，然后对比当前分支相对于该祖先的历次提交，**提取相应的修改并存为临时文件**，然后将当前分支指向目标基底 C3, 最后以此将之前 **另存为临时文件的修改依序应用到目标分支上**。
-   `rebase` 和 `merge` 两种整合方法的最终结果没有任何区别，但是 `rebase` 使得提交历史更加整洁， 你在查看一个经过变基的分支的历史记录时会发现，尽管实际的开发工作是并行的，但它们看上去就像是串行的一样，提交历史是一条直线没有分叉。

使用 `rebase` 是为了确保在向远程分支推手时能保证提交历史的整洁，在向其他人维护的项目贡献代码时，可以现在自己的分支里进行开发，当开发完成后现将你的代码变基到目标分支上，然后在向主项提交修改。这样维护者就不再需要进行整合工作，只要快速合并就可以了

### rebase 的使用

-   基础使用

    ![初始项目](https://git-scm.com/book/en/v2/images/basic-rebase-1.png)

    ```bash
        git checkout experiment
        git rebase master
    ```

    ![合并分支](https://git-scm.com/book/en/v2/images/basic-rebase-3.png)

    ```bash
        git checkout master
        git merge experiment
    ```

-   复杂的合并情况

    ![初始项目](https://git-scm.com/book/en/v2/images/interesting-rebase-1.png)

    1.  你希望将 client 中的修改合并到主分支并发布，但暂时并不想合并 server 中的修改，因为它们还需要经过更全面的测试。

        `git rebase --onto master server client` -- 取出 `client` 分支，找出处于 `client` 分支和 `server` 分支的共同祖先之后的修改，然后把它们在 `master` 分支上

        ![复杂变基](https://git-scm.com/book/en/v2/images/interesting-rebase-2.png)

    2.  然后快速合并 master 分支
    
        ```bash
            git checkout master
            git merge client
        ```

        ![合并](https://git-scm.com/book/en/v2/images/interesting-rebase-3.png)

    3.  变基 `server` 分支

        ```bash
            git rebase master server
        ```

        ![变基](https://git-scm.com/book/en/v2/images/interesting-rebase-4.png)

    4.  快速合并 `master` 分支 删除无用的分支

        ```bash
            git checkout master
            git merge server
            git branch -d client
            git branch -d server
        ```

        ![最终的提交历史](https://git-scm.com/book/en/v2/images/interesting-rebase-5.png)
        
## 变基的风险

紧记：**不要对在你的仓库外有副本的分支执行变基。**

变基操作的实质是丢弃一些现有的提交，然后相应地新建一些内容一样但实际上不同的提交。 如果你已经将提交推送至某个仓库，而其他人也已经从该仓库拉取提交并进行了后续工作，此时，如果你用 git rebase 命令重新整理了提交并再次推送（覆盖了之前操作的情况下）这样就会丢失原来的提交，并且产生新的变基分支，你的同伴因此将不得不再次将他们手头的工作与你的提交进行整合，如果接下来你还要拉取并整合他们修改过的提交，事情就会变得一团糟。

在这种情况下，我们还可以利用变基分支，`git rebase teamone/master` 或者使用 `git pull --rebase` Git 会：

1.  检查哪些提交是我们的分支上独有的
2.  检查其中哪些提交不是合并操作的结果
3.  检查哪些提交在对方覆盖更新时并没有被纳入目标分支
4.  把查到的这些提交应用在 teamone/master 上面

这样可以找回部分提交的分支; 但是建议不要对在你的仓库外有副本的分支执行变基。

## 变基 && 合并

有一种观点认为，仓库的提交历史即是 **记录实际发生过什么**。 它是针对历史的文档，本身就有价值，不能乱改。 从这个角度看来，改变提交历史是一种亵渎，你使用_谎言_掩盖了实际发生过的事情。 如果由合并产生的提交历史是一团糟怎么办？ 既然事实就是如此，那么这些痕迹就应该被保留下来，让后人能够查阅。

另一种观点则正好相反，他们认为提交历史是 **项目过程中发生的事**。 没人会出版一本书的第一版草稿，软件维护手册也是需要反复修订才能方便使用。 持这一观点的人会使用 rebase 及 filter-branch 等工具来编写故事，怎么方便后来的读者就怎么写。

现在，让我们回到之前的问题上来，到底合并还是变基好？希望你能明白，这并没有一个简单的答案。 Git 是一个非常强大的工具，它允许你对提交历史做许多事情，但每个团队、每个项目对此的需求并不相同。 既然你已经分别学习了两者的用法，相信你能够根据实际情况作出明智的选择。

总的原则是，**只对尚未推送或分享给别人的本地修改执行变基操作清理历史，从不对已推送至别处的提交执行变基操作**，这样，你才能享受到两种方式带来的便利。