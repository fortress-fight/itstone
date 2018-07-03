---
title: VSCode 使用
abbrlink: b84c37ec
date: 2018-01-02 00:12:23
tags:
---

记录 VSCode 的使用历程

<!-- more -->

# VSCode

[中文文档](https://jeasonstudio.gitbooks.io/vscode-cn-doc/content/md/%E5%AE%9A%E5%88%B6%E5%8C%96/%E7%94%A8%E6%88%B7%E5%AE%9A%E4%B9%89%E4%BB%A3%E7%A0%81%E6%AE%B5.html) 
[英文文档](https://code.visualstudio.com/docs)

## 实用插件

名称 | 说明 | 备注
---|----|---
BetterComments | 高亮代码注释 [详细介绍](#vsPlug1) | 
[Polacode](https://marketplace.visualstudio.com/items?itemName=pnp.polacode) | 帮助生成漂亮的代码截图的 VSCode 扩展 | 
[debugger-for-chrome](https://github.com/Microsoft/vscode-chrome-debug)  用于在Google Chrome浏览器或其他支持Chrome开发工具协议的目标中调试JavaScript代码 [详细介绍](#debugger-chrome) | 

### 插件的详细介绍

#### <span id="vsPlug1">BetterComments</span>

![BetterComments](http://i1.bvimg.com/650755/f37a89614bc89cc4.png)

#### <span id='debugger-chrome'>debugger-for-chrome</span>

> 用于在Google Chrome浏览器或其他支持Chrome开发工具协议的目标中调试JavaScript代码

1. 安装
2. 使用方式
    在需要调试的文件下，按 F5 将会启用调试功能；在启用后将会使用项目根目录中的 `.vscode/launch.json` 文件来配置, 如果不存在将会主动创建一个；
3. launch.json

    默认的 launch.json 如下：

    ```json launch.json
        {
            // 使用 IntelliSense 了解相关属性。 
            // 悬停以查看现有属性的描述。
            // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
            "version": "0.2.0",
            "configurations": [
                {
                    "type": "chrome",
                    "request": "launch",
                    "name": "Launch Chrome against localhost",
                    "url": "http://localhost:8080",
                    "webRoot": "${workspaceFolder}"
                }
            ]
        }    
    ```

    配置项 | 描述
    ----|---
    type | 配置类型
    request | 请求配置类型：launch -- 启用 attach -- 附加
    name | 配置名称
    url | 地址，如果存在将会附加上，不存在就启用
    webRoot | 根目录 ${workspaceFolder} 指活动文件的路径

4. launch 模式
    配置 `"request": "launch"` 。
    该模式下需要指定 file 或 url 通知 Chrome 浏览器对本地文件或 URL 的引用。如果您使用 url ，请设置 webRoot 为从中提供文件的目录。这可以是绝对路径或路径使用 `${workspaceFolder}`（在代码中打开的文件夹）。webRoot是用来解析URL（如“ http：//localhost/app.js ”）到磁盘上的文件（如/Users/me/project/app.js），所以要小心，它的设置正确。

    使用时 `"request": "attach"`，必须启用启用了远程调试的 Chrome，才能将扩展程序附加到Chrome：

## VSCode 使用技巧

名称 | 说明 | 备注
---|----|---
snippets | 添加用户代码片段 | [官网说明](https://code.visualstudio.com/docs/editor/userdefinedsnippets) [介绍](#snippets)

1. <span id='snippets'></span> snippets

    在使用时发现使用 tab 键，会产生缩进而不是进入下一个输入点，排查问题后发现是快捷键设置里除了问题，新的 tab 命令覆盖了 snippets 的命令，清除后问题得到了解决；
    
## MySetting

```json
    {
        "workbench.iconTheme":"vscode-icons", 
        "gitProjectManager.baseProjectsFolders":[
            "J:/", 
            "G:/AppServ/www/work", 
            "G:/AppServ/www/mayun"
        ], 
        "gitProjectManager.ignoredFolders":["node_modules"], 
        "editor.fontSize":16, 
        "markdownlint.config": {
            "MD013":false, 
            "MD033":false, 
            "MD029":false, 
            "MD009":false, 
            "MD007":false
        }, 
        "window.zoomLevel": 0, 
        "markdown.preview.scrollEditorWithPreview":false, 
        "emmet.useNewEmmet":false, 
        "workbench.colorTheme": "Atom One Dark", 
        "files.exclude": {
            "**/.git":true, 
            "**/.svn":true, 
            "**/.hg":true, 
            "**/CVS":true, 
            "**/.DS_Store":true, 
            "**/node_modules/":true, 
            "**/*.zip": true
        },
        "jshint.options": {
            "esversion": 6,
            "-W030": false,
        },
        "files.associations": {
            "*.uemo": "sass",
            "*.wpy": "vue"
        },
        "editor.fontFamily": "'monaco', '.萍方-简', Consolas, 'Courier New', monospace",
        "csscomb.formatOnSave": true,
        "csscomb.useLatestCore": true,
        "eslint.options": {
            "parserOptions": {
                "ecmaVersion": 7,
                "es6": true,
                "sourceType": "module"
            }
        },
        "editor.tabCompletion": true,
        "editor.quickSuggestions": {
            "other": true,
            "comments": true,
            "strings": true
        },
        "csscomb.preset": {
            // Set space after {.
            "space-after-opening-brace":"/n", 
            "space-before-opening-brace":"/n", 
            // Set space between declarations 
            "space-between-declarations":"/n", 
            // Set space after combinator ">"
            "space-after-combinator":0, 
            // Set space before }.
            "space-before-closing-brace":"/n", 
            // 选择器之间
            "space-after-selector-delimiter":0  
        }, 
        "csscomb.ignoreFilesOnSave":[
            "*/**"
        ],
        "editor.multiCursorModifier": "ctrlCmd",
        "element-helper.version": "2.3",
        "emmet.showAbbreviationSuggestions": true,
        "emmet.showExpandedAbbreviation": "always",
        "emmet.includeLanguages": {
            "vue-html": "html",
            "vue": "html"
        },
        "emmet.syntaxProfiles": {
            "vue-html": "html",
            "vue": "html"
        },
        "vetur.validation.template": false,
        "typescript.check.npmIsInstalled": false,
        "clock.dateFormat": "yyyy-mm-dd HH:MM:ss",
        "workbench.sideBar.location": "left",
        "workbench.panel.location": "bottom",
        "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
        "instantmarkdown.autoOpenBrowser": false,
        "prettier.eslintIntegration": true,
        "gitlens.keymap": "alternate",
        "gitlens.advanced.messages": {
            "suppressCommitHasNoPreviousCommitWarning": false,
            "suppressCommitNotFoundWarning": false,
            "suppressFileNotUnderSourceControlWarning": false,
            "suppressGitVersionWarning": false,
            "suppressLineUncommittedWarning": false,
            "suppressNoRepositoryWarning": false,
            "suppressResultsExplorerNotice": false,
            "suppressShowKeyBindingsNotice": true
        },
        "gitlens.historyExplorer.enabled": true,
        "files.defaultLanguage": "markdown",
        "prettier.tabWidth": 4,
        "editor.snippetSuggestions": "top",
        "editor.detectIndentation": false
    }

```

## MyShortcuts

```js
// 将键绑定放入此文件中以覆盖默认值
[
    {
        "key": "alt+h alt+b",
        "command": "editor.action.joinLines"
    },
    {
        "key": "tab",
        "command": "closeReferenceSearchEditor",
        "when": "inReferenceSearchEditor && !config.editor.stablePeek"
    },
    {
        "key": "escape",
        "command": "-closeReferenceSearchEditor",
        "when": "inReferenceSearchEditor && !config.editor.stablePeek"
    },
    {
        "key": "tab",
        "command": "-editor.emmet.action.expandAbbreviation",
        "when": "config.emmet.triggerExpansionOnTab && editorTextFocus && !config.emmet.useNewEmmet && !editorHasMultipleSelections && !editorHasSelection && !editorReadonly && !editorTabMovesFocus"
    },
    {
        "key": "alt+f",
        "command": "workbench.action.terminal.focus"
    },
    {
        "key": "alt+t",
        "command": "workbench.action.quickOpenTerm"
    },
    {
        "key": "alt+oem_period",
        "command": "editor.emmet.action.nextEditPoint"
    },
    {
        "key": "alt+oem_comma",
        "command": "editor.emmet.action.prevEditPoint"
    },
    {
        "key": "f7",
        "command": "-editor.action.diffReview.next",
        "when": "isInDiffEditor"
    }
]
```