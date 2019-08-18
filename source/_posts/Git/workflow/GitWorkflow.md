---
title: GitWorkflow
tags:
    - git
    - git工作流
categories:
    - - Git
abbrlink: edd825ca
date: 2019-08-18 18:38:18
---

{% note default %}

-   Git 分支管理：`github flow`
-   快速编写合理的 `.gitignore`
-   利用 `commitizen` 使用正规的 Git-Commit 规范
-   利用 `commitlint` `husky` 进行校验

{% endnote %}

<!-- more -->

---

## 介绍

**选择合适的 Git 分支管理方式**

Git 是目前最流行的源代码管理工具，常见的 Git 云平台有：GitHub、Bitbucket 和 GitLab 或者私有的 Git 仓库

在使用 Git 时通常会遇到一个问题：采用何种分支管理方式，对不同的分支进行管理。其实 Git 分支管理并没有普遍使用的最佳做法，而是只有对每个团队和项目而言最合适的做法。通常来说 **使用多个分支将会带来额外的管理和维护的开销。但是多个分支对于项目的团队合作，新功能开发和发布管理都具有一定的好处。** 不同的团队可以根据团队人员组成和意愿、项目发布的周期等因素选择最合适的策略，找到最适合团队的管理方式

{% note info %}
**太长不看步骤：**

1. 没有 `git flow` 的请先安装：[git flow](https://github.com/petervanderdoes/gitflow-avh/wiki#installing-git-flow)
2. 初始化 `git flow init -d`
3. `commitizen` 安装

    - `npm install -g commitizen cz-conventional-changelog cz-customizable`
    - `~/.czrc` 添加 `{"path": "cz-conventional-changelog"}`
    - 如果需要自定义适配器：

        - 指定适配器为`cz-customizable`，然后将指定的适配器文件(`.cz-config.js`)放到 `~` 目录下
        - 自用的`.cz-config.js` [适配器文件](https://github.com/fortress-fight/itstone/blob/master/.cz-config.js)

    - 使用 `git cz` 代替 `git commit` 进行提交

4. `commitlint` `husky` 安装

    `npm install -D @commitlint/config-conventional @commitlint/cli husky @commitlint/config-angular`

    - 配置

        `echo module.exports = {extends: ['@commitlint/config-conventional']} > commitlint.config.js`

    - 使用自定义 commitlint

        如果在安装 `commitizen` 时，使用了自定义的配置，我们需要对 `commitlint` 添加自定义的校验。

        - 自用 `commitlint.config.js` [自定义配置文件](https://github.com/fortress-fight/itstone/blob/master/commitlint.config.js)

{% endnote %}

## 分支管理

1. 单主干

    所有团队成员都在单个主干分支（master）上进行开发。当需要发布时，先考虑使用标签（tag），即 tag 某个 commit 来作为发布的版本。如果仅靠 tag 不能满足要求，则从主干分支创建发布分支。bug 修复在主干分支中进行，再 cherry-pick 到发布分支。

    ![20190429112954.png](https://www.ibm.com/developerworks/cn/java/j-lo-git-mange/img001.png)

    优点：由于分支所带来的额外开销非常小。开发人员不需要频繁在不同的分支之间切换。
    缺点：由于所有开发人员都在同一个分支上工作，团队需要合理的分工和充分的沟通来保证不同开发人员的代码尽可能少的发生冲突。持续集成和自动化测试是必要的，用来及时发现主干分支中的 bug。

2. GitHub flow

    [GitHub flow](http://scottchacon.com/2011/08/31/github-flow.html) 是 GitHub 所使用的一种简单的流程。该流程只使用两类分支，并依托于 GitHub 的 pull request 功能。

    在 GitHub flow 中，

    - master：分支中包含稳定的代码。该分支已经或即将被部署到生产环境。master 分支的作用是提供一个稳定可靠的代码基础。任何开发人员都不允许把未测试或未审查的代码直接提交到 master 分支。
    -
    - 对代码的任何修改，包括 bug 修复、hotfix、新功能开发等都在单独的分支中进行。不管是一行代码的小改动，还是需要几个星期开发的新功能，都采用同样的方式来管理。当需要进行修改时，**从 master 分支创建一个新的分支。新分支的名称应该简单清晰地描述该分支的作用。所有相关的代码修改都在新分支中进行。开发人员可以自由地提交代码和 push 到远程仓库。**

    - 当新分支中的代码全部完成之后，通过 GitHub 提交一个新的 pull request。团队中的其他人员会对代码进行审查，提出相关的修改意见。由持续集成服务器（如 Jenkins）对新分支进行自动化测试。当代码通过自动化测试和代码审查之后，该分支的代码被合并到 master 分支。再从 master 分支部署到生产环境。

    ![20190429113510.png](https://www.ibm.com/developerworks/cn/java/j-lo-git-mange/img002.png)

    优点：非常简单实用。开发人员需要注意的事项非常少，很容易形成习惯。
    缺点：GitHub flow 要求项目有完善的自动化测试、持续集成和部署等相关的基础设施。每个新分支都需要测试和部署，如果这些不能自动化进行，会增加开发人员的工作量，导致无法有效地实施该流程。这种分支实践也要求团队有代码审查的相应流程。

3. git-flow

    [git-flow](https://nvie.com/posts/a-successful-git-branching-model/) 应该是目前流传最广的 Git 分支管理实践。git-flow 围绕的核心概念是版本发布（release）。因此 git-flow 适用于有较长版本发布周期的项目。虽然目前推崇的做法是持续集成和随时发布。有的项目甚至可以一天发布很多次。随时发布对于 SaaS 服务类的项目来说是很适合的。不过仍然有很大数量的项目的发布周期是几个星期甚至几个月。较长的发布周期可能是由于非技术相关的因素造成的，比如人员限制、管理层决策和市场营销策略等。

    git-flow 流程中包含了 5 类分支：

    1. master: 可以部署到生产环境的代码
    2. develop: 包含的是下个版本需要发布的内容，当 develop 分支集成了足够的新功能和 Bug 修复代码之后，通过一个发布流程来完成新版本的发布。发布完成后，develop 分支的代码将会被合并到 master 分支中。
    3. feature: 新功能分支
    4. release: 发布分支（当你认为现在在 “develop” 分支的代码已经是一个成熟的 release 版本时，这意味着：第一，它包括所有新的功能和必要的修复；第二，它已经被彻底的测试过了。如果上述两点都满足，那就是时候开始生成一个新的 release 了。release 分支是使用版本号命名的。）
    5. hotfix: 修复分支

    其中新功能分支（feature）、发布分支（release）和 hotfix 只在需要时从 develop 或 master 分支创建。在完成之后合并到 develop 或 master 分支。合并完成之后该分支被删除。这几类分支的名称应该遵循一定的命名规范，以方便开发人员识别。

    | 分支类型 | 命名规范   | 创建自  | 合并到            | 说明                            |
    | -------- | ---------- | ------- | ----------------- | ------------------------------- |
    | feature  | feature/\* | develop | develop           | 新功能                          |
    | release  | release/\* | develop | develop 和 master | 一次新版本的发布                |
    | hotfix   | hotfix/\*  | master  | develop 和 master | 生产环境中发现的紧急 bug 的修复 |

    当需要开发一个新的功能的时候，基本流程：

    1. 从 develop 分支创建一个新的 feature 分支，如 feature/my-awesome-feature。
    2. 在该 feature 分支上进行开发，提交代码，push 到远程仓库
    3. 当代码完成之后，合并到 develop 分支并删除当前分支的 feature 分支

    在进行版本发布和 hotfix 时也有类似的流程。当需要发布新版本时，采用的是如下的流程：

    1. 从 develop 分支创建一个新的 release 分支，如 release/1.4。
    2. 把 release 分支部署到持续集成服务器上进行测试。测试包括自动化集成测试和手动的用户接受测试。
    3. 对于测试中发现的问题，直接在 release 分支上提交修改。完成修改之后再次部署和测试。
    4. 当 release 分支中的代码通过测试之后，把 release 分支合并到 develop 和 master 分支，并在 master 分支上添加相应的 tag。

    缺点：git-flow 相关的流程比较繁琐和难以记忆，在实践中一般使用[辅助脚本](https://github.com/nvie/gitflow)来完成相关的工作。

    > 对于使用 Apache Maven 的项目来说，Atlassian 的 JGit-Flow 是一个更好的 git-flow 实现。

### 建议：

每个开发团队都应该根据团队自身和项目的特点来选择最适合的分支实践。

1. 如果发布周期较长，则 git-flow 是最好的选择。git-flow 可以很好地解决新功能开发、版本发布、生产系统维护等问题；如果发布周期较短，则 TBD 和 GitHub flow 都是不错的选择。
2. GitHub flow 的特色在于集成了 pull request 和代码审查。如果项目已经使用 GitHub，则 GitHub flow 是最佳的选择。
3. GitHub flow 和 TBD 对持续集成和自动化测试等基础设施有比较高的要求。如果相关的基础设施不完善，则不建议使用。

### (git-flow)[https://github.com/petervanderdoes/gitflow-avh] 使用介绍

1. 安装：https://github.com/petervanderdoes/gitflow-avh/wiki#installing-git-flow
2. 初始化：`git flow init [-d]`
    - 将以交互方式提示您，您希望将哪些分支用作开发和生产分支，以及您希望如何命名前缀。你可以简单地按任何一个问题上的 Return 来接受（理智的）默认建议。`-d` 标志将接受所有默认值。
3. 分支操作:

    ```cmd
    # 列出 feature 分支
    git flow feature
    # 开启一个 feature 分支
    git flow feature start <name> [<base>]
    # 完成一个 feature 分支 1️⃣
    git flow feature finish <name>
    # 删除一个 feature 分支 -- 这将自动删除远程分支。
    git flow feature delete <name>
    # push / pull 一个 feature 分支到远程分支
    git flow feature publish <name>
    git flow feature track <name>

    # 列出 release 分支
    git flow release
    # 开启一个 release 分支
    git flow release start <release> [<base>]
    # 完成一个 release 分支 2️⃣
    git flow release finish <release>
    # 删除一个 release 分支
    git flow release delete <release>

    # 列出 hotfix 分支
    git flow hotfix
    # 开启一个 hotfix 分支
    git flow hotfix start <hotfix> [<base>]
    # 完成一个 hotfix 分支
    git flow hotfix finish <hotfix>
    # 删除一个 hotfix 分支
    git flow hotfix delete <hotfix>
    # 发布一个 hotfix 分支 3️⃣
    git flow hotfix publish <name>
    # 拉取 hotfix 分支
    git pull
    git checkout hotfix/<name>
    ```

    1️⃣ `feature finish` 将会把我们的工作整合到 `develop` 分支中，之后 `git-flow` 会进行清理操作，他会删除这个当下已经完成的功能分支，并切换到 `develop` 分支下。
    2️⃣ `release finish` 首先会拉取远程仓库，以保证目前是最新的版本，然后将内容合并到 `master` 和 `develop` 两个分支中。为了便于识别和做历史参考，release 提交会被标记上这个 release 的名字，最后清理操作，版本分支会被删除，并且回到 `develop` 分支上。
    3️⃣ `hotfix finish` 完成后的改动将会被合并到 `master` 和 `develop` 分支中，并会把这个 `hotfix` 标记起来以便参考，最后这个 `hotfix` 分支将会删除，然后回到 `develop` 分支上

> git-flow 可以使用的分支有：feature | bugfix | release | hotfix | support

## .gitignore

我们可以使用 [gitignore](https://docs.gitignore.io/install/command-line) 在命令行上生成对应变成语言的 `.gitignore` 文件，但是如果你涉猎的语言并不多的话，建议可以使用自定义代码段的方式来完成这项工作。以前端与 VSCode 为例：

```json .gitignore
{
    "git_ignore": {
        "prefix": "!",
        "body": [
            "### https: //raw.github.com/github/gitignore/967cd6479319efde70a6fa44fa1bfa02020f2357/Node.gitignore",

            "# Logs",
            "logs",
            "*.log",
            "npm-debug.log*",
            "yarn-debug.log*",
            "yarn-error.log*",

            "# Runtime data",
            "pids",
            "*.pid",
            "*.seed",
            "*.pid.lock",

            "# Directory for instrumented libs generated by jscoverage/JSCover",
            "lib-cov",

            "# Coverage directory used by tools like istanbul",
            "coverage",

            "# nyc test coverage",
            ".nyc_output",

            "# Grunt intermediate storage (Creating plugins - Grunt: The JavaScript Task Runner)",
            ".grunt",

            "# Bower dependency directory (Bower)",
            "bower_components",

            "# node-waf configuration",
            ".lock-wscript",

            "# Compiled binary addons (Node.js v10.7.0 Documentation)",
            "build/Release",

            "# Dependency directories",
            "node_modules/",
            "jspm_packages/",

            "# TypeScript v1 declaration files",
            "typings/",

            "# Optional npm cache directory",
            ".npm",

            "# Optional eslint cache",
            ".eslintcache",

            "# Optional REPL history",
            ".node_repl_history",

            "# Output of 'npm pack'",
            "*.tgz",

            "# Yarn Integrity file",
            ".yarn-integrity",

            "# dotenv environment variables file",
            ".env",

            "# parcel-bundler cache (Parcel)",
            ".cache",

            "# next.js build output",
            ".next",

            "# nuxt.js build output",
            ".nuxt",

            "# vuepress build output",
            ".vuepress/dist",

            "# Serverless directories",
            ".serverless"
        ]
    }
}
```

## Git Commit 规范

使用较合理的 Git Commit 规范，可以生成更易读的消息。目前使用较多的提交规范是：[Angular Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)

### Commit 格式

```shell git-commit
# 头部信息：类型、范围、主题
<type>(<scope>):<subject>
# 换行
<blank_line>
# 正文
<body>
# 换行
<blank_line>
# 底部信息
<footer>
```

> 提交信息中，每一行最多不能超过 100 个字符。这样会更利于 GitHub 阅读

### Revert

如果恢复了之前的提交，则提交信息中应该是以：`revert:` 开头然后恢复的提交的标头。并在正文中注明：`This reverts commit <hash>.` 其中 hash 表示是被还原掉的 SHA

### Type

header 的 Type 必须是以下几种类型之一

-   feat: A new feature
-   fix: A bug fix
-   docs: Documentation only changes
-   style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
-   refactor: A code change that neither fixes a bug nor adds a feature (重构)
-   perf: A code change that improves performance (改进性能)
-   test: Adding missing or correcting existing tests
-   chore: Changes to the build process or auxiliary tools and libraries such as documentation generation (构建工具等辅助工具的修改)

### Scope

可选项，指明修改的范围，如函数名、类名等，如果修改多处地方可以使用 `*`

### Subject

对修改的简短描述，有以下几点要求

-   使用命令式语气，例如： "change" not "changed" nor "changes"
-   不要首字符大写
-   不要使用句号结尾

### body

对 subject 中的描述进一步的说明，并且和修改前进行对比说明

### footer

一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

可以查看 angular 的详细介绍 -- [angular-commit](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)

## 使用 commitizen 、commitlint 、husky 规范 commit message

我们在了解 git commit 规范以后，我们还希望能投通过工具来帮助我们更好的实施规范。

-   [commitizen/cz-cli](http://commitizen.github.io/cz-cli/) 配合 [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) 可以通过交互的方式帮助我们生成符合规范的 commit message;
-   [commitlint](https://commitlint.js.org/#/) 配合 [config-angular](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-angular) 以及 [husky](https://github.com/typicode/husky#readme) 可以帮助我们使用 angular 提交规范 lint commit messages;

### 使用 commitizen

1. 全局安装：

    - `npm install -g commitizen cz-conventional-changelog`
    - 指定适配器 `echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc`
    - 使用 `git cz` 替换使用 `git commit`

2. 项目安装：

    - npm install -D commitizen cz-conventional-changelog
    - 指定适配器：

        ```json
        "script": {
            ...,
            "commit": "git-cz",
        },
        "config": {
            "commitizen": {
            "path": "cz-conventional-changelog"
            }
        }
        ```

    - 使用 `npm run commit` 进行提交

    > 如果全局安装过 commitizen, 那么在对应的项目中执行 git cz or npm run commit 都可以.

3. 自定义适配器

    如果需要自定义一套规范，我们可以使用：[cz-customizable](https://github.com/leonardoanalista/cz-customizable) 编写自己的规范

    - `npm i -g cz-customizable` 或者 `npm i -D cz-customizable`
    - 指定适配器

        ```json
        // 全局：~/.czrc`
        { "path": "cz-customizable" }
        // 项目：packages
        "config": {
            "commitizen": {
            "path": "node_modules/cz-customizable"
            }
        }
        ```

    - 在 `~/` 或项目目录下创建 .cz-config.js 文件, 维护你想要的格式:

    > 示例：
    > [leohxj/.cz-config.js](https://link.zhihu.com/?target=https%3A//gist.github.com/leohxj/7bc928f60bfa46a3856ddf7c0f91ab98) > [GoogleChrome Lightouse cz-config](https://github.com/GoogleChrome/lighthouse/blob/master/.cz-config.js)

### 使用 commitlint 校验提交

1. 添加 commitlint 支持

    - `npm install -g @commitlint/cli`
    - `npm i -D @commitlint/config-conventional`
    - `echo module.exports = {extends: ['@commitlint/config-conventional']} > commitlint.config.js` 配置文件，或者在 package 中添加字段：

        ```json
        "commitlint": {
            "extends": [
                "@commitlint/config-conventional"
            ]
        }
        ```

    测试：`echo foo: bar | commitlint` 输出

    ![20190515100137.png](http://resources.ffstone.top/resource/image/20190515100137.png)

2. 添加 husky（帮助使用 git 钩子的工具）校验提交信息 [git hook](https://git-scm.com/docs/githooks) 提供了各种钩子

    - `npm install husky --save-dev`
    - 配置 `package.json`
        ```json
        // package.json
        {
            "husky": {
                "hooks": {
                    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
                }
            }
        }
        ```
        测试：`git commit -m "foo: this will fail"`
        ![20190515102750.png](http://resources.ffstone.top/resource/image/20190515102750.png)

3. 配合 [config-angular](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-angular)
   使用 angular 规范

    - `npm install --save-dev @commitlint/config-angular @commitlint/cli`
    - 修改 `package.json` 或者在当前目录下创建 `.cz-config.js` 文件

        ```json
          "commitlint": {
              "extends": [
              "@commitlint/config-angular"
              ]
          }
        ```

        ```js
        module.exports = {
            extends: ["@commitlint/config-angular"]
        };
        ```

## 使用 standard-version 进行版本格式管理

在严格使用 commit 规范后，我们可以通过使用 [standard-version](https://github.com/conventional-changelog/standard-version) 来对发布进行版本号管理。

### Semver(语义化版本号) 规范

Semver 规范规定了版本号如何表示，如何增加，如何进行比较，不同的版本号意味着什么。

版本格式：`主版本号.次版本号.修订号`

-   主版本号（major）：当你做了不兼容的 API 修改。
-   次版本号（minor）：当你做了向下兼容的功能性新增，可以理解为 Feature 版本。
-   修订号（patch）：当你做了向下兼容的问题修正，可以理解为 Bug fix 版本。

> 先行版本号及版本编译信息可以加到 “主版本号.次版本号.修订号” 的后面，作为延伸

示例：

![React_的版本发布日志](http://resources.ffstone.top/resource/image/React_的版本发布日志)

Semver 规范中使用:

-   `alpha`: 内部测试
-   `beta`: 公测版本
-   `rc`: 正式版本的候选版本

在发布 npm 包的时候，npm 提供了 `npm version` 来帮助我们使用 `semver` 规范中使用

-   升级补丁版本号：`npm version patch`
-   升级小版本号：`npm version minor`
-   升级大版本号：`npm version major`

### standard-version

`standard-version` 是类似于 `npm version` 的工具

### 使用方法

-   `npm i --save-dev standard-version` 或者 `npm i -g standard-version`

-   `git checkout master`
-   `git pull origin master`
-   `standard-version`
    -   修改 `package.json` 等文件里面的版本号
    -   使用 `legacy-changelog` 更新 CHANGELOG.md
    -   提交 `package.json` 和 CHANGELOG.md
    -   标记新版本
-   `git push --follow-tags origin master`

### 配置

-   在您的 `package.json` 中设置字段 `standard-version`。
-   创建一个 `.versionrc` 或 `.versionrc.json`。

[具体配置项](https://github.com/conventional-changelog/conventional-changelog-config-spec/tree/master/versions/2.0.0#type)

### CLI

`standard-version --first-release`

### 参数

-   `--first-release` 第一次提交
-   `--prerelease` 预发布

    例如：当前版本是：`1.0.0`，使用命令 `standard-version --prerelease` 会生成新的版本号：`1.0.1-0`。如果希望添加说明可以：`standard-version --prerelease [des?]`

-   `--release-as [version|standard-name|null]` 指定发布版本 例如：`standard-version --release-as minor` | `standard-version --release-as 1.1.0`
-   `--no-verify` 跳过 `git-hooks` 检测
-   `--dry-run`: 允许查看即将运行的命令，但是不会执行
-   `-t <des:string>`: 前置修饰

### 声明周期

`standard-version` 支持生命周期脚本。这些允许您在发布期间执行自己的补充命令。以下钩子可用并按记录顺序执行：

-   `prerelease`：在发生任何事情之前执行 如果 prerelease 脚本返回非零退出代码，则将中止版本控制，但它对该进程没有其他影响。
-   `prebump/postbump`：在版本修改之前和之后执行。如果 prebump 脚本返回版本＃，则将使用它而不是计算的版本 standard-version。
-   `prechangelog/postchangelog`：在生成 CHANGELOG 之前和之后执行。
-   `precommit/postcommit`：在提交步骤之前和之后调用。
-   `pretag/posttag`：在标记步骤之前和之后调用。

```json
{
    "standard-version": {
        "scripts": {
            "prebump ": "echo 9.9.9"
        }
    }
}
```

我们还可以通过 `skip` 字段跳过制定的生命周期：

```json
{
    "standard-version": {
        "skip": {
            "changelog": true
        }
    }
}
```

## 参考文章

-   [Git 分支管理最佳实践](https://www.ibm.com/developerworks/cn/java/j-lo-git-mange/index.html)
-   [為你自己學 Git](https://gitbook.tw/)
-   [git-flow 的工作流程](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow#)
-   [gitflow-avh](https://github.com/petervanderdoes/gitflow-avh)
-   [gitignore](https://docs.gitignore.io/install/command-line)
-   [优雅的提交你的 Git Commit Message](https://zhuanlan.zhihu.com/p/34223150)
-   [Angular Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
-   [Angular 提交规范约束工具 -- Commitizen](https://github.com/commitizen/cz-cli)
-   [commitlint](https://commitlint.js.org/#/)
-   [husky](https://github.com/typicode/husky#readme)
-   [git hook](https://git-scm.com/docs/githooks)
-   [standard-version-简介](https://juejin.im/entry/5b97cea65188255c7f5e96a4#standard-version-%E7%AE%80%E4%BB%8B)
-   [Semver(语义化版本号)扫盲](https://juejin.im/post/5ad413ba6fb9a028b5485866)
-   [conventionalcommits\_约定规范](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)
