# 八九闲谈 -- 个人博客

该博客使用 HEXO 配合 NEXT 主题，进行搭建的

## HEXO

**主题**：[Next](https://github.com/theme-next/hexo-theme-next) (由于网站没有更新，最新文档请查看 GitHub)

**插件**：

| 插件                                                             | 描述                                       | 重要                     |
| ---------------------------------------------------------------- | ------------------------------------------ | ------------------------ |
| [hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink)          | 为 hexo 的每个帖子自动创建一个且唯一的链接 | ⭐️️️️⭐️⭐️️️️⭐️⭐️️️️ |
| [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git) | Git deployer plugin for Hexo.              | ⭐️️️️⭐️⭐️️️️⭐️⭐️️️️ |

## 自定义 HEXO 以供自己使用

我将该博客使用的基础配置放在了 `hexo-template` 分支下，如果需要单独使用该博客的基本配置可以使用 `hexo-template` 分支进行创建。

**设置 GIT**

修改 `./_config.yml`

-   deploy 字段上设置自己的信息，可参考 [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)
-   url 字段以及 root 字段，设置访问路径，不然将会导致部署后的页面引用的静态文件路径出现错误。可参考 [hexo \_config.yml 配置](https://hexo.io/zh-cn/docs/configuration.html#%E7%BD%91%E5%9D%80)

**设置 social**

修改 `./themes/next/_config.yml` 中的 social 字段，添加上自己的联系方式

**设置 algolia**

这里使用的是 algolia 提供的搜索服务，具体使用方式可以参考 [algolia](https://github.com/theme-next/hexo-theme-next/blob/5067852e5f5ba4883064716b530c664ec0feeafc/docs/zh-CN/ALGOLIA-SEARCH.md)

修改

-   `./_config.yml` 中的 `algolia` 字段的 `applicationID`
-   `./themes/next/_config.yml` 中的 `algolia` 字段的 `enable` 为 true

**添加评论功能**

添加评论功能可以参考： [评论系统](https://theme-next.iissnan.com/third-party-services.html#livere)
如果需要禁止某篇文章的评论，可以在文章上设置：`comments: false` 字段

## 参考

-   [Easy Hexo](https://easyhexo.com/)
