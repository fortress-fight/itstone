---
title: VSCode-使用-updates
tags:
  - vscode
folder:
  - 待分类
category:
  - 速查表
abbrlink: 695d375b
date: 2018-08-19 10:46:43
---


熟练掌握一个编辑器，是十分重要的

![vscode-icon](resources.ffstone.top/resource/image/vscode-icon.jpg)

---

<!-- more -->

## 2018-07 (1.26)

### Breadcrumbs -- 文件面包屑

Breadcrumbs 允许在符合和文件之间快读导航，可以通过 `视图 => Toggle Breadcrumbs` 或者设置 `breadcrumbs.enabled` 开启关闭

![vscode-Breadcrumbs](https://code.visualstudio.com/assets/updates/1_26/breadcrumbs_active.gif)

使用：

1.  `breadcrumbs.filePath` -- 文件路径 / `breadcrumbs.symbolPath` -- 符合路径 可以设置是否开启
2.  `Ctrl + shift + ..` 打开面包屑的最后一个元素
3.  再展开下拉后，可以输入关键字进行搜索

### 问题面板快速修复

您现在可以从“问题”面板中应用“快速修复”。当您悬停或选择问题条目时，会显示指示快速修复的灯泡。可以通过单击灯泡或打开问题条目的上下文菜单来应用快速修复。

![vscode-问题面板快速修复](https://code.visualstudio.com/assets/updates/1_26/quickfix-problems.gif)

### 网格

我们在引入网格编辑器布局的最后一个里程碑期间丢失的一个功能是，当您关注它们并且它们处于最小化状态时，编辑器会自动最大化。此功能现在像以前一样工作：

![vscode-grid](https://code.visualstudio.com/assets/updates/1_26/grid-maximize.gif)

使用：

1.  视图：Maximize Editor Group（workbench.action.minimizeOtherEditors）最大化活动编辑器
2.  视图：Reset Editor Group Sizes（workbench.action.evenEditorWidths）重置所有编辑器大小。

### 复制相对路径

之前只能复制文件的绝对路径，现在可以复制相对路径了

使用：

1.  在目录栏选中文件 / 文件夹
2.  `Shift + Alt + C` 可以绝对路径复制到剪贴板。
3.  `Ctrl + K` / `Ctrl + Alt + C` 复制相对于工作区文件夹根目录的文件路径。

### 自定义视图：文件资源装饰

显示文件资源的自定义视图现在将显示文件修饰（Git，问题）。您可以使用设置禁用它们`explorer.decorations.colors`和`explorer.decorations.badges`它禁用它们在文件管理器，打开编辑器和自定义视图。

### 从 package.json 运行 npm 脚本

您现在可以 package.json 在悬停的文件中运行 npm 脚本，如下所示，也可以从上下文菜单中运行。

### 打开文件夹 URI

暂不做介绍

### 支持 TypeScript 3.0

暂不做介绍

### 调试

暂不做介绍

### 语言

1.  快速修复

    使用适用于 JavaScript 和 TypeScript 的全新快速修复功能修复闪存中的错误。将光标移动到可修复的错误（例如未使用的变量），然后使用灯泡或按 Ctrl +触发快速修复。如果其中一个可用的快速修复可以应用于当前文件中的多个错误，您将在文件代码操作中看到一个新的修复全部

2.  基于文件名自动导入

    JavaScript 和 TypeScript 的自动导入现在支持根据文件名导入默认导出的对象：

...

### VS Vue.js 的代码调试

现在有一个 Vue.js [调试](https://github.com/Microsoft/vscode-recipes/tree/master/vuejs-cli)，可以帮助为使用流行的 Vue.js 框架的应用程序配置 Chrome 调试器。

### 新命令

`SHIFT + ALT + 1` -- 将编辑器移动到第一组 k
`Shift + 向下` -- 列表/树中的多选：向下扩展选择
`Shift + 向上` -- 列表/树中的多选：向上扩展选择

## 2018-09-11 (1.27)

### 编辑器

1.  将 GUI 设置编辑器作为默认，如果需要修改 JSON 可以使用 **打开设置(JSON)** 的方式，或者通过 `workbench.settings.editor` 修改默认行为

2.  Window 和 Linux 上的自定义标题栏和菜单，我们可以设置：`window.titleBarStyle:custom` 这样菜单栏可以根据 theme 进行适配。我们还可以通过设置：`window.menuBarVisibility:toggle` 来设置菜单栏的展示条件

### breadcrumbs

1.  运行焦点命令 `Ctrl + Shift +;` 时会自动启用面包屑。

### 新的终端菜单

1.  '任务' 菜单已重命名为 '终端'，并添加了一些集成终端的条目

### 特定于平台的键绑定

现在，您可以启用使用特定操作系统的快捷键 isLinux，isMac 和 isWindows 一个键绑定的内 when 子句：

```json
{
  "key": "ctrl+o",
  "command": "workbench.action.files.openFolder",
  "when": "!isMac"
},
{
  "key": "cmd+o",
  "command": "workbench.action.files.openFolder",
  "when": "isMac"
}
```

### 其他：

1.  从外部删除/重命名时，文件不再关闭 `workbench.editor.closeOnFileDelete`

### 编辑

1.  自动关闭和周围的字符，如：`[]`, `{}` -- `editor.autoClosingBrackets`

### CSS 语言

1.  `@import` 现在可以使用 CSS，SCSS 和 Less 的路径完成。SCSS 部分也 `@import` 被处理。

2.  跳转到 CSS 链接的定义 现在跳转到 CSS，SCSS 和 Less 的定义 `@import` 和 `url()` 链接。

### HTML 语言

HTML 格式化程序已更新为 JS Beautifier 的 1.8.1 版。

1.  `HTML` 格式化程序 `html.format.wrapAttributes:aligned-multiple` 将在达到最大行长度时包装属性，并将所有包装行与第一个属性对齐

## 2018-09 1.28

### 基础升级

1.  每种文件类型的文件图标

    在 macOS 和 Windows 上，VS Code 注册为众所周知的文件类型的默认编辑器。VS Code 现在为某些常见的 VS Code 文件类型提供 **自定义图标**。当图标的大小配置为中到大时，这些图标将显示在 OS 资源管理器中。对于小图标大小，我们决定将 VS Code 徽标保留为图标。

2.  snippet (用户代码片段)

    现在，片段可以作为项目的范围并与您的团队共享。只需使用 **首选项：配置用户代码段** 命令或 **\*.code-snippets** 在.vscode 文件夹中创建文件。项目片段的工作方式与其他片段类似，它们显示在 IntelliSense 和 Insert Snippet 操作中，现在它们具有自己的类别。

    片段现在也支持多个前缀

    ```json
    {
        "prefix": ["header", "stub", "copyright"],
        "body": "Copyright. Foo Corp 2028",
        "description": "Adds copyright...",
        "scope": "javascript,typescript"
    }
    ```

### Setting

1.  Quick Open

    `search.quickOpen.includeHistory` 允许您控制最近打开的文件是否应该是 Quick Open 文件选择器的一部分。默认情况下，最近打开的文件将显示在搜索的顶部，以及下面工作区中的其他文件。如果您不希望在顶部看到最近打开的文件，可以将此设置更改为 false。

2.  删除文件时禁用系统删除

    如果在移动到操作系统垃圾箱时从资源管理器中删除文件时遇到问题，您现在可以设置 `files.enableTrash` 为 false 在删除时从不使用操作系统垃圾箱。这样做将更改文件资源管理器上的删除操作和键绑定，以绕过操作系统垃圾箱并永久删除。在删除发生之前，您仍会看到提示。

3.  重新打开文件时不要恢复视图状态

    即使在文件关闭后，VS Code 也始终记住文件的视图状态（光标位置，折叠部分等）。现在有一个新设置 `workbench.editor.restoreViewState`可以在文件关闭时删除此视图状态。这使您可以在重新打开文件后始终从文件顶部开始。

4.  补全

    `"editor.tabCompletion": "on"` 按 Tab 键将完成任何前缀，而不仅仅是片段。此外，按 Tab 键将插入下一个建议，Shift + Tab 将插入上一个建议

5.  智能感知

    `"editor.suggest.localityBonus": true` 现在可以根据它们与光标的距离对建议进行排序.

### 命令

1.  Close Editor -- 允许您关闭所有编辑器组中当前活动的文件。
2.  Focus on -- 将焦点放到自定义视图上。
3.  Go to Last Edit Location -- 以快速导航到已编辑文件中的最后一个位置。默认键联结是按 **Ctrl + K 按 Ctrl + Q**
4.  Save without Formatting -- 可用于保存文件而不触发任何保存参与者（例如，格式化程序，删除尾随空格，最终换行符）。默认键绑定是 **Ctrl + KS** 。编辑正常项目之外的文件时，这非常有用，这些文件可能具有不同的格式约定。

### Git 集成

1.  更好地处理删除冲突

    当暂存已有冲突的文件的时候，将会提示你是否保留

2.  分支验证规则

    您现在可以控制分支名称验证如何与强大的工作 `git.branchValidationRegex` 和 `git.branchWhitespaceChar` 设置。有关详细信息，请参见 [示例](https://github.com/Microsoft/vscode/issues/50241) 。

3.  stash

    以下 `git stash apply` 命令现在在全局命令选项板中显示：Git：Apply Stash ...，Git：Apply Latest Stash。

4.  `git.alwaysShowStagedChangesResourceGroup`

    是否始终在 SCM 视图中显示暂存修改的部分

### edite

1.  重命名导入路径

    ![重命名导入路径](https://code.visualstudio.com/assets/updates/1_28/ts-rename-import.gif)

2.  转换为异步功能

    JavaScript和TypeScript 的新转换为异步函数建议重写了使用.thenPromise链接的函数，async并且await：

    ![转换为异步功能](https://code.visualstudio.com/assets/updates/1_28/ts-convert-to-async.gif)

### 新快捷键

| 键                 | 命令                                      | 命令ID                                      |
| ------------------ | ----------------------------------------- | ------------------------------------------- |
| Ctrl + K Ctrl + Q. | 导航到编辑的最后一个位置                  | workbench.action.navigateToLastEditLocation |
| 按Ctrl + KS        | 保存文件而不运行保存参与者（格式化程序等) |                                             |
