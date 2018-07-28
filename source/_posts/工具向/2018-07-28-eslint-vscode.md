---
title: eslint-vscode
tags:
  - eslint
  - vscode
folder:
  - 待分类
abbrlink: 1fc951c9
category:
  - JavaScript--工具向
date: 2018-07-28 00:26:33
---


******

<!-- more -->

## ESLint 在 vscode 上的使用

首先安装 ESLint 扩展，如果只是刚刚接触到 ESLint 可以查看  {% post_link eslint-使用 %}

建议前置安装：

```cli
    npm install standard --global
    npm install babel-eslint --global
    npm install --save-dev eslint-plugin-html
    npm install -g eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
```

参考：

- [vscode-eslit doc](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

建议 .eslintrc.js：

```js
    module.exports = {
        root: true,
        parser: 'babel-eslint',
        parserOptions: {
            sourceType: 'module',
            ecmaVersion: 6
        },
        env: {
            es6: true,
            browser: true,
            node: true
        },
        plugins: [
            'eslint-plugin-html'
        ],
        extends: ['standard'],
        rules: {}
    }
```

## ESLint 扩展配置项

1. `eslint.enable`：启用/禁用eslint。默认情况下启用。
2. `eslint.provideLintTask`：扩展是否提供lint任务来lint整个工作区文件夹。
3. `eslint.packageManager`：控制用于解析ESLint库的包管理器。如果全局解析ESLint库，则这只会产生影响。有效值为"npm"或"yarn"。
4. `eslint.options`：用于配置如何使用ESLint CLI Engine API启动eslint的选项。默认为空选项包。指向自定义.eslintrc.json文件的示例是：

    ```json
        {
            "eslint.options": { "configFile": "C:/mydirectory/.eslintrc.json" }
        }
    ```
5. `eslint.run`：运行linter onSave或者onType，默认是onType。
6. `eslint.autoFixOnSave`： 启用保存时自动修复。请注意，自动修复的保存仅当VS代码的files.autoSave要么是off，onFocusChange或onWindowChange。它无法使用afterDelay。
7. `eslint.nodePath`：例如，如果无法检测到已安装的ESLint包，请使用此设置/myGlobalNodePackages/node_modules。
8. `eslint.validate`： 一组语言标识符指定要验证的文件。有点像"eslint.validate": [ "javascript", "javascriptreact", "html" ]。如果缺少该设置，则默认为["javascript", "javascriptreact"]。您还可以控制哪些插件应该提供自动修复支持。为此，只需在validate设置中使用属性language而autoFix不是简单提供对象文字string。一个例子是：

    ```js
        "eslint.validate": [ "javascript", "javascriptreact", { "language": "html", "autoFix": true } ]
    ```
9. `eslint.workingDirectories`：要使用的工作目录的数组。ESLint解析相对于工作目录的配置文件。此新设置允许用户控制哪个工作目录用于哪些文件。请考虑以下设置：

## ESLint 命令

1. `Create '.eslintrc.json' file`：创建一个新.eslintrc.json文件。
2. `Fix all auto-fixable problems`：将ESLint自动修复解决方案应用于所有可修复的问题。
3. `Disable ESLint for this Workspace`：禁用此工作空间的ESLint扩展。
4. `Enable ESLint for this Workspace`：为此工作空间启用ESLint扩展。
