# BLOG

## 基本操作

1.  `hexo server` -- 开启服务
2.  `hexo server --draft` -- 开启服务包含 `draft` 文件

3.  `hexo clean` -- 清理文件
4.  `hexo deploy post [name]` -- 部署

5.  `set HEXO_ALGOLIA_INDEXING_KEY=7a6e78ad559af4c8edc847db370b42a6` / `export HEXO_ALGOLIA_INDEXING_KEY=7a6e78ad559af4c8edc847db370b42a6` `hexo algolia` -- 关联搜索

6.  `open -a iTerm ./` 使用 iTerm 打开路径文件

7.  hexo new draft "ES6 基础-类"

8.  发布文章 `hexo generate --deploy` (只是进行编译执行 `hexo generate`)

## 部署方式

1.  页面文件部署到 git master 分支上
2.  构建文件部署到 git hexo 分支上

## 迁移

如果需要在新的电脑上部署

1.  git clone 下载
2.  切到 hexo 分支
3.  `cnpm i -g hexo-cli`
4.  `cnpm i`

## 问题：

1.  git 和 Win 合作以后一直问题不断

    在 `hexo d` 的时候出现问题，类似为：

    ```bash
        error: open(".........."): Permission denied
        error: unable to index file archives/2018/08/index.html
        fatal: adding files failed
        FATAL Something's wrong. Maybe you can find the solution here: http://hexo.io/docs/troubleshooting.html
        Error: error: open("archives/2018/08/index.html"): Permission denied
        error: unable to index file archives/2018/08/index.html
        fatal: adding files failed

            at ChildProcess.<anonymous> (C:\Users\dream\Desktop\MyProject\itstone\node_modules\_hexo-util@0.6.3@hexo-util\lib\spawn.js:37:17)
            at emitTwo (events.js:106:13)
            at ChildProcess.emit (events.js:191:7)
            at ChildProcess.cp.emit (C:\Users\dream\Desktop\MyProject\itstone\node_modules\_cross-spawn@4.0.2@cross-spawn\lib\enoent.js:40:29)
            at maybeClose (internal/child_process.js:891:16)
            at Process.ChildProcess._handle.onexit (internal/child_process.js:226:5)
    ```

    可能是因为 win 修改了一些东西导致，首先要更新 git : `https://github.com/git-for-windows/git/releases` 
    如果没有解决，使用 `git remote show origin` 查看地址，有没有错误，然后重新建立 git 凭证

    如果还没有解决，更新 `hexo-deployer-git` -- `npm install git+ssh://git@github.com:hexojs/hexo-deployer-git.git --save` 
    
    `hexo-deployer-git` 地址：`https://github.com/hexojs/hexo-deployer-git`