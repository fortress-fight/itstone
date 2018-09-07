---
title: Git-基础使用
tags:
  - git
folder:
  - Git
category:
  - git
abbrlink: fe54e2c7
date: 2018-09-05 12:39:29
---

---

<!-- more -->

## Git-基础使用

Git 的基础使用包含：

-   初始化仓库
-   开始/停止跟踪（track）文件
-   暂存（stage）文件
-   提交（commit）文件
-   忽略指定文件
-   撤销错误操作
-   浏览项目历史版本
-   比较不同提交之间的差异
-   推送到远程仓库
-   从远程仓库拉取

## 初始化仓库

初始化仓库有两种形式：1. 从现有目录中初始化仓库 2. 从现有仓库中克隆

### 从现有目录中初始化仓库

在项目目录下运行：

-   `git init`
    改命令会初始化 git 仓库，在目录中生成一个 `.git` 的子目录，这个子目录中包含有你初始化的 Git 仓库中的必须要的文件。

### 从现有仓库中克隆

如果需要克隆远程现有的仓库：

-   `git clone <url> [<String|fileName>]`

    url -- git 远程仓库地址
    fileName -- 如果没有将会引用仓库名称作为目录名

### 文件的状态

本地目录中的文件只存在两种状态：1. 以跟踪（纳入版本控制中的文件）2. 未跟踪（未纳入版本控制中的文件）

以跟踪又可以划分为:

-   暂存
-   已修改
-   已提交

编辑过文件之后，由于自上次提交后你对它们做了修改，Git 就将它们标记未已修改的文件。

-   `git status`
    检测文件处于什么状态，`Untricked file` 为未追踪的文件列表；`Changes to be committed` 为已暂存但是未提交的文件列表；`Changes not staged for commit` 为已经追踪并且文件已经修改的文件列表

    如果希望状态输出简单一些可以使用：`git status -s`

    `??` 表示文件未跟踪
    `A` 表示文件已暂存
    `M` 左表示文件已修改并暂存 右表示已修改但是未暂存
    ``

-   `git add <fileName>`
    开始追踪文件文件，`git add .` 将会对所有文件进行跟踪

-   `git commit`
    将暂存区内的文件提交到提交区域（将会打开文本编辑用于输入提交说明），文件状态变为已提交，建议在提交前，查看 `status`；
    如果希望快速提交可以：`git commit -m <String|Message>`

    -   `git commit -v` 可以将修改的信息放到文本中作为提示

        提交后它会告诉你，当前是在哪个分支（master）提交的，本次提交的完整 SHA-1 校验和是什么（463dc4f），以及在本次提交中，有多少文件修订过，多少行添加和删改过。

        ```bash
            [master 04da3f4] commit project
            1 file changed, 3 insertions(+)
        ```

    -   `git commit -a` Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤：
    
    -   `git commit --amend` 如果在提交完成后，发现存在一些已修改的文件由于没有放入暂存区，导致没有一起提交，可以使用下面的方法来补充提交：
        ```bash
            git add <forgot fileName>
            git commit --amend
        ```
        这样只会存在一次提交，第二次提交会把第一次提交覆盖

### 忽略文件

`.gitignore` 我们可以在根目录下创建文件 `.gitignore` 用于表示忽略规则

规则：

1.  `*.[oa]` 忽略以 o 或者 a 结尾的文件
2.  空行和 `#` 开头的行都会被忽略
3.  匹配模式可以以（/）开头防止递归。
4.  匹配模式可以以（/）结尾指定目录。
5.  要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

所谓的 glob 模式是指 shell 所使用的简化了的正则表达式。 星号（\_）匹配零个或多个任意字符；[abc] 匹配任何一个列在方括号中的字符（这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）；问号（?）只匹配一个任意字符；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如 [0-9] 表示匹配所有 0 到 9 的数字）。 使用两个星号（\_) 表示匹配任意中间目录，比如`a/**/z` 可以匹配 a/z, a/b/z 或 `a/b/c/z`等。

## 文件相关操作

### 文件修改了什么

如果你想知道已追踪的文件修改了什么，可以使用 `git diff`

1.  比较本地与暂存区之前的不同 -- `git diff`
2.  比较暂存区文件在提交的时候将会添加在提交里的内容 -- `git diff --staged` | `git diff --cached`

### 文件变化

1.  删除

    实现 git 能操作的是已经追踪的文件：

    -   `git rm`
        该命令用于删除 git 的文件跟踪;

        先在本地进行删除，然后使用命令 `git rm`，然后提交 `git commit`，这样就解除了文件的跟踪
        假如我们存在已经跟踪文件 `del.md`，如果该文件已经在暂存区中需要使用强制删除 `git rm -f del.md` 这样会在接触跟踪的同时，删除本地文件。如果希望保留本地文件可以使用 `git rm --cached del.md`;

    -   因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开。在使用 \* 的时候需要 `\` 转义

2.  移动/重命名

    git 不会记录文件移动，如果在本地移动文件，相当于删除了旧文件并添加了新的文件，所以需要使用命令：

    -   `git mv <filename> <filename>`
        相当于：
        `mv <filename> <filename>`
        `git rm <filename>`
        `git add <filename>`

## 提交历史

-   `git log`
    默认不用任何参数的话，git log 会按提交时间列出所有的更新，最近的更新排在最上面。（使用 `q` 退出查看状态）

    ```bash
        commit 3764fa65c5170004a5cccab5f10dbaa461d31e50 (HEAD -> master)
        Author: ******
        Date:   Wed Sep 5 14:25:32 2018 +0800

            mv.md
    ```

    正如你所看到的，这个命令会列出每个提交的 SHA-1 校验和、作者的名字和电子邮件地址、提交时间以及提交说明。

    [git log 参数](#gitLog)

## Git 撤销操作

### 取消暂存的文件

1.  `git reset HEAD <file>` 将暂存区的文件移除，避免提交

    `git reset HEAD --hrad` 可能会覆盖掉本地的修改

### 取消本地的修改

将修改的本地文件还原成上次提交时（暂存）的样子

1.  `git checkout -- <fileName>`

    撤销的时候，将会先查找暂存区是否存在该文件，如果存在就还原成暂存区文件，如果暂存区没有就还原成为上次提交的样子。总之就是撤销本次修改
    
    >   git checkout -- [file] 是一个危险的命令，这很重要。 **你对那个文件做的任何修改都会消失** - 你只是拷贝了另一个文件来覆盖它。 除非你确实清楚不想要那个文件了，否则不要使用这个命令。

## Git 打标签

Git 可以给历史中的某一个提交打上标签，以示重要。 比较有代表性的是人们会使用这个功能来标记发布结点（v1.0 等等）。 

### 打标签

1.  `git tag <标签>`
    轻量标签本质上是将提交校验和存储到一个文件中 - 没有保存任何其他信息。 创建轻量标签，不需要使用 -a、-s 或 -m 选项，只需要提供标签名字：

2.  `git tag -a <标签> -m "<注释>"`
    附注标签是存储在 Git 数据库中的一个完整对象。 它们是可以被校验的；其中包含打标签者的名字、电子邮件地址、日期时间；还有一个标签信息；并且可以使用 GNU Privacy Guard （GPG）签名与验证。 通常建议创建附注标签，这样你可以拥有以上所有信息；

3.  `git tag -d <tag name>`
    删除标签

### 查看标签

1.  `git tag` 列出 Git 中的标签
2.  `git tag -l '<String|筛选条件>'`
3.  `git show` 可以看到标签信息与对应的提交信息

### 补打标签

1.  `git tag -a <标签> <commit hash> -m "<注释>"`
    要在那个提交上打标签，你需要在命令的末尾指定提交的校验和（或部分校验和）:

### 共享标签

1.  `git push origin <tag name>`
    默认情况下，git push 命令并不会传送标签到远程仓库服务器上。 在创建完标签后你必须显式地推送标签到共享服务器上。 这个过程就像共享远程分支一样 - 你可以运行 git push origin [tagname]。

2.  `git push origin --tags`
    如果想要一次性推送很多标签，也可以使用带有 --tags 选项的 git push 命令。 这将会把所有不在远程仓库服务器上的标签全部传送到那里。
    
### 检出标签

1.  `git checkout -b [branchname] [tagname]`
    在特定的标签上创建一个新分支：

## Git 别名

Git 并不会在你输入部分命令时自动推断出你想要的命令。 如果不想每次都输入完整的 Git 命令，可以通过 git config 文件来轻松地为每一个命令设置一个别名。 这里有一些例子你可以试试：

示例：

```bash
    git config --global alias.ci commit
```

这意味着，当要输入 git commit 时，只需要输入 git ci。 随着你继续不断地使用 Git，可能也会经常使用其他命令，所以创建别名时不要犹豫。

```bash
git config --global alias.unstage 'reset HEAD --'
```

这会使下面的两个命令等价：

```bash
git unstage fileA
git reset HEAD -- fileA
```

你可能想要执行外部命令，而不是一个 Git 子命令。 如果是那样的话，可以在命令前面加入 ! 符号。 例如：`git config --global alias.visual '!gitk'`
    
## 补充

### <span id='#gitLog'>git log 参数</span>

git log 有许多选项可以帮助你搜寻你所要找的提交， 接下来我们介绍些最常用的。

1.  `git log -<num>` -- 用于显示提交的个数
2.  `git log -p` -- 用于显示每次提交的内容差异

    ```bash
        commit 3764fa65c5170004a5cccab5f10dbaa461d31e50 (HEAD -> master)
        Author: ******
        Date:   Wed Sep 5 14:25:32 2018 +0800

            mv.md

        diff --git a/del.md b/mv.md
        similarity index 100%
        rename from del.md
        rename to mv.md
    ```

3.  `git log --status` -- 每次提交的简略的统计信息

    ```bash
        commit 3764fa65c5170004a5cccab5f10dbaa461d31e50 (HEAD -> master)
        Author: ******
        Date:   Wed Sep 5 14:25:32 2018 +0800

            mv.md

        del.md => mv.md | 0
        1 file changed, 0 insertions(+), 0 deletions(-)
    ```

4.  `git log --shortstat` -- 只显示 --stat 中最后的行数修改添加移除统计。

5.  `git log --name-only` 仅在提交信息后显示已修改的文件清单。
6.  `git log --name-status` 显示新增、修改、删除的文件清单。
7.  `git log --abbrev-commit` 仅显示 SHA-1 的前几个字符，而非所有的 40 个字符。
8.  `git log --relative-date` 使用较短的相对时间显示（比如，“2 weeks ago”）。
9.  `git log --pretty` -- 这个选项可以指定使用不同于默认格式的方式展示提交历史

    这个选项有一些内建的子选项供你使用:

    -   `git log --pretty=oneline`
    -   `git log --pretty=short`
    -   `git log --pretty=full`
    -   `git log --pretty=fuller`
    -   `git log --pretty=formate` 使用占位符如：`git log --pretty=formate:"%h - %s"`

        | 选项 | 说明                             |
        | ---- | -------------------------------- |
        | %H   | 提交对象（commit）的完整哈希字串 |
        | %h | 提交对象的简短哈希字串
        | %T | 树对象（tree）的完整哈希字串
        | %t | 树对象的简短哈希字串
        | %P | 父对象（parent）的完整哈希字串
        | %p | 父对象的简短哈希字串
        | %an | 作者（author）的名字
        | %ae | 作者的电子邮件地址
        | %ad | 作者修订日期（可以用 --date= 选项定制格式）
        | %ar | 作者修订日期，按多久以前的方式显示
        | %cn | 提交者（committer）的名字
        | %ce | 提交者的电子邮件地址
        | %cd | 提交日期
        | %cr | 提交日期，按多久以前的方式显示
        | %s | 提交说明

10.  `git log --graph` 这个选项添加了一些 ASCII 字符串来形象地展示你的分支、合并历史：
11.  `git log <filename>`  查看某些文件或者目录的历史提交

#### 筛选输出

| 选项                                    | 说明                |
|---------------------------------------|-------------------|
| -(n)                                  | 仅显示最近的 n 条提交      |
| --since="<timer>", --after="<timer>"  | 仅显示指定时间之后的提交。     |
| --until="<timer>", --before="<timer>" | 仅显示指定时间之前的提交。     |
| --author="<authorName>"               | 仅显示指定作者相关的提交。     |
| --committer="<committerName>"         | 仅显示指定提交者相关的提交。    |
| --grep="<String>"                     | 仅显示含指定关键字的提交      |
| -S="<Sting>"                          | 仅显示添加或移除了某个关键字的提交 |
