---
title: vscode 使用
abbrlink: b84c37ec
date: 2018-01-02 00:12:23
tags:
---

记录 VSCode 的使用历程

<!-- more -->

# VSCode

## 实用插件

名称  描述
[debugger-for-chrome](https://github.com/Microsoft/vscode-chrome-debug)  用于在Google Chrome浏览器或其他支持Chrome开发工具协议的目标中调试JavaScript代码

### debugger-for-chrome

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

    1. 