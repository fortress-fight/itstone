# BLOG

## 基本操作

1.  `hexo server` -- 开启服务
2.  `hexo server --draft` -- 开启服务包含 `draft` 文件

3.  `hexo clean` -- 清理文件
4.  `hexo deploy post [name]` -- 部署

5.  `export HEXO_ALGOLIA_INDEXING_KEY=7a6e78ad559af4c8edc847db370b42a6` `hexo algolia` -- 关联搜索

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
