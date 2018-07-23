---
title: npm
abbrlink: a1345b2b
date: 2018-07-22 22:12:54
tags:
    - 工程化
    - npm
category:
    - 工程化
---

******

<!-- more -->

# NPM

`Node Package Manager` 简称 [NPM](npmjs.com) ，是 Node 默认的，由 JavaScript 编写的软件包管理工具

## NPM 的使用

[NPMDOC](https://docs.npmjs.com/)

查找 | 安装 | 卸载 | 更新 | package.json

### 查找

我们可以在 NPM 官网搜索需要使用的代码包，输入搜索词后，我们可以看到包裹的相关排名。NPM 分析器安装三个方面对包进行排序：`Optimal` (综合) | `Popularity` (最受欢迎) | Quality (质量) | Maintainance (维护) 在查找到我们需要的安装包后，我们进入了安装包的页面；

在安装包的页面上我们可以看到作者对包的相关介绍、该包所有依赖的项以及该包的版本说明；

### 安装

1. NPM 安装
    NPM 是用Node.js编写的，所以你需要安装Node.js才能使用npm。您可以通过Node.js网站安装npm，

2. 本地包安装
    如果安装的包是需要用于文件依赖的，那么我们需要使用 `npm install <package_name>` 命令，进行本地安装；
    安装完成后，将会产生 `node_module` 文件夹，用于存放安装的包文件。

    如果当前目录中没有 `package.json` 文件，npm 将会默认安装最新版本的包。如果存在 `package.json` 文件，将会根据文件中指定的规则进行安装 [版本规则计算器](https://semver.npmjs.com/)；

    简单的说文件版本：

    ```md
        补丁发布：1.0或1.0.x或~1.0.4 (~ 是指安装的时候安装 1.0.x 下最新的包版本)
        次要版本：1或1.x或^1.0.4 (^ 是指安装 1.x 下最新的包版本)
        主要版本：*或x (* 安装最新的版本)
    ```

3. 全局安装
    如果要将程序包用作命令行工具，请在全局安装它。这样，无论哪个目录是最新的，它都可以工作。使用命令 `npm install -g <package>`

### NPM 包卸载

    我们可以通过命令 `npm uninstall <package_name>` 的方式删除一个 npm 包，如果需要在 package.json 中移除这个包，我们需要使用 `npm uninstall --save` 如果移除的是 `devdependence` 里的包，需要使用 `npm uninstall --save-dev` 的方式进行卸载

### package.json

    管理本地安装的 npm 包的最佳方法是创建一个 package.json文件。

    一个package.json文件包含：
    - 列出项目所依赖的包。
    - 允许您使用语义版本控制规则指定项目可以使用的包的版本。
    - 使您的构建可重现，因此更容易与其他开发人员共享。

    创建一个 package.json
    - `npm init`
        - 如果需要直接使用默认设置可以使用 `npm init --yes`
        
    一个默认的 package.json 通常包含以下信息：

    ```json

        {
            "name": "my_package",
            "description": "",
            "version": "1.0.0",
            "main": "index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1"
            },
            "repository": {
                "type": "git",
                "url": "https://github.com/ashleygwilliams/my_package.git"
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
            "bugs": {
                "url": "https://github.com/ashleygwilliams/my_package/issues"
            },
            "homepage": "https://github.com/ashleygwilliams/my_package"
        }

    ```
    
    如果需要自定义问答方式，以及默认的字段可以通过 `.npm-init.js` 进行设置，由于这里仅仅是对 npm 的介绍，暂不涉及到这些方面；

    指定依赖项
    - "dependencies"：您的应用程序在生产中需要这些包。
    - "devDependencies"：这些包仅用于开发和测试。

    我们通过 `npm install <package_name>` 的方式进行安装：

    - "npm install <package_name> [--save-prod]" -- 添加到生产环境依赖（dependencies）列表中
    - "npm install <package_name> [--save-dev]" -- 添加到开发环境依赖（devdependencies) 列表中

### NPM 包更新

    我们可以通过命令 `npm outdated` 来查看已经安装的（过时的） npm 包的版本状态；通过 `npm update` 对版本进行升级

    `npm update [-g] [<pkg>...]` 此命令将**更新**列出到最新版本（由tag配置指定）的所有软件包。

    它还将安装缺少的包。与安装软件包的所有命令一样，该--dev标志也将devDependencies被处理。

    如果-g指定了该标志，则此命令将更新全局安装的软件包。如果需要更新一级的包，可以通过如下命令：`npm outdated -g --depth=0`

    如果未指定包名，则将更新指定位置（全局或本地）中的所有包。

## NPM CLI