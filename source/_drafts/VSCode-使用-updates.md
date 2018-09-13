---
title: VSCode-使用-updates
folder: 速查表
tags:
  - vscode
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

您现在可以package.json在悬停的文件中运行npm脚本，如下所示，也可以从上下文菜单中运行。

### 打开文件夹URI

暂不做介绍

### 支持 TypeScript 3.0

暂不做介绍

### 调试

暂不做介绍

### 语言

1.  快速修复

    使用适用于JavaScript和TypeScript的全新快速修复功能修复闪存中的错误。将光标移动到可修复的错误（例如未使用的变量），然后使用灯泡或按Ctrl +触发快速修复。如果其中一个可用的快速修复可以应用于当前文件中的多个错误，您将在文件代码操作中看到一个新的修复全部

2.  基于文件名自动导入

    JavaScript和TypeScript的自动导入现在支持根据文件名导入默认导出的对象：

...

### VS Vue.js的代码调试

现在有一个 Vue.js [调试](https://github.com/Microsoft/vscode-recipes/tree/master/vuejs-cli)，可以帮助为使用流行的Vue.js框架的应用程序配置Chrome调试器。

### 新命令

`SHIFT + ALT + 1` -- 将编辑器移动到第一组k
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

现在，您可以启用使用特定操作系统的快捷键isLinux，isMac和isWindows一个键绑定的内when子句：

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

1.  `@import` 现在可以使用CSS，SCSS和Less的路径完成。SCSS部分也 `@import` 被处理。

2.  跳转到CSS链接的定义 现在跳转到CSS，SCSS和Less的定义 `@import` 和 `url()` 链接。

### HTML 语言

HTML格式化程序已更新为JS Beautifier的 1.8.1版。

1.  `HTML` 格式化程序 `html.format.wrapAttributes:aligned-multiple` 将在达到最大行长度时包装属性，并将所有包装行与第一个属性对齐