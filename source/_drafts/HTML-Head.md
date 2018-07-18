---
title: HTML-Head
date: 2018-07-17 22:09:14
tags: 
    - HTML
    - HEAD
categories:
    - HTML
---

HTML-Head 里面都有什么

******

<!-- more -->

# HTML-HEAD

介绍 HTML 中 HEAD 内的元素标签

参考：
> [gethead](https://gethead.info/);
> [中文：gethead](https://github.com/Amery2010/HEAD)
> [MDN-meta](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)

## 最小推荐

```html
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--
        上面两个 meta 标签需要在其余 head 元素之前，以确保正确的文档呈现
    -->
    <title>Document</title>
```

- `viewport` 提供了有关视口初始大小的提示，**仅供移动设备使用**
    content 内的值：
    Value  可能的值  描述
    width  一个正整数或者字符串`device-width`  以像素为单位，定义viewport（视口）的宽度
    height  一个正整数或者字符串`device-height`  以像素为单位，定义 viewport（视口）的高度
    initial-scale  一个 0.0 到 10.0 之间的正整数  定义设备宽度（纵向模式下的设备宽度或者横向模式下的设备宽度）与事后大小之间的缩放比例
    maximum-scale  一个 0.0 到 10.0 之间的正整数  定义缩放的最大值，它必须大于或者等于 `minimum-scale` 的值，不然会导致不确定的行为发生
    minimum-scale  一个 0.0 到 10.0 之间的正整数  定义缩放的最小值，它必须小于或者等于 `minimum-scale` 的值，不然会导致不确定的行为发生
    user-scalable  一个布尔值  用户是否能够放大或者缩小网页

    例如：设置 viewport 为 1280，则在移动设备上，你所观察到的页面宽度和电脑上 1280px 保持一致，内部元素（不能在 HTML 上设置宽为 1280px）将会将会以 1280 为基准展现在页面上。当屏幕的实际宽度（指屏幕的分辨率）大于1280像素时，浏览器将扩大视图（而非放大），以适合屏幕： 

    要注意的是：在手机上使用 `position:fixed` 的元素将不会随缩放发生位置变化，可以通过使用 JQuery 重新赋值 `offset` 为本身的 `offset` 即可，在其他的文章中做过介绍

> virtual viewport 即：“layout viewport 布局视口”（固定位置）和“视觉视口”（用户实际看到的）。
> [MDN-viewport](https://developer.mozilla.org/zh-CN/docs/Mobile/Viewport_meta_tag)

## 网页元素

有效的 `head` 元素包括 `meta` `link` `title` `style` `script` `noscript` 和 `base`

这些元素提供了如何通过如浏览器、搜索引擎、网络爬虫等网络技术来感知和呈现文档信息

```html
    <!-- 设置此文档的字符编码，以便 UTF-8 范围中的所有字符（如 emoji）都能正确显示 -->
    <meta charset="utf-8">

    <!-- 设置文档标题 -->
    <title>页面标题</title>

    <!-- 设置文档中所有相对链接的基础链接 -->
    <base href="https://example.com/page.html">

    <!-- 链接一个外部 CSS 文件 -->
    <link rel="stylesheet" href="styles.css">

    <!-- 用于文档内的 CSS -->
    <style>
    /* ... */
    </style>

    <!-- JavaScript & No-JavaScript 标签 -->
    <script>
    // function(s) go here
    </script>
    <noscript>
    <!--无 JS 时显示-->
    </noscript>
```

## Meta 标签

```html
    <!--
    以上 2 个 meta 标签 *必须* 放在 head 之前，以确保正确的文档呈现；
    其他任何 head 元素 *必须* 在这些标签之后。
    † 如果你的项目需要支持 Internet Explorer 11 之前的版本，请使用 content="ie-edge" 标签。
    -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- 允许控制资源从何处加载。在 <head> 中尽可能地靠前放置，因为该标签仅适用于在其之后声明的资源。-->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'">

    <!-- Web 应用的名称（仅当网站被用作为一个应用时才使用）-->
    <meta name="application-name" content="应用名称">

    <!-- Chrome、Firefox OS 和 Opera 的主题颜色 -->
    <meta name="theme-color" content="#4285f4">

    <!-- 针对页面的简短描述（限制 150 字符）-->
    <!-- 此内容*可能*被用作搜索引擎结果的一部分。 -->
    <meta name="description" content="一个页面描述">

    <!-- 控制搜索引擎的抓取和索引行为 -->
    <meta name="robots" content="index,follow"><!-- 所有搜索引擎 -->
    <meta name="googlebot" content="index,follow"><!-- 仅对 Google 有效 -->

    <!-- 告诉 Google 不显示网站链接的搜索框 -->
    <meta name="google" content="nositelinkssearchbox">

    <!-- 告诉 Google 不提供此页面的翻译 -->
    <meta name="google" content="notranslate">

    <!-- 验证网址所有权 -->
    <meta name="google-site-verification" content="verification_token"><!-- Google Search Console -->
    <meta name="yandex-verification" content="verification_token"><!-- Yandex Webmasters -->
    <meta name="msvalidate.01" content="verification_token"><!-- Bing Webmaster Center -->
    <meta name="alexaVerifyID" content="verification_token"><!-- Alexa Console -->
    <meta name="p:domain_verify" content="code from pinterest"><!-- Pinterest Console -->
    <meta name="norton-safeweb-site-verification" content="norton code"><!-- Norton Safe Web -->

    <!-- 确定用于构建页面的软件（如 - WordPress、Dreamweaver）-->
    <meta name="generator" content="program">

    <!-- 关于你的网站主题的简短描述 -->
    <meta name="subject" content="你的网站主题">

    <!-- 基于网站内容给出一般的年龄分级 -->
    <meta name="rating" content="General">

    <!-- 允许控制 referrer 信息如何传递 -->
    <meta name="referrer" content="no-referrer">

    <!-- 禁用自动检测和格式化可能的电话号码 -->
    <meta name="format-detection" content="telephone=no">

    <!-- 通过设置为 "off" 完全退出 DNS 预取 -->
    <meta http-equiv="x-dns-prefetch-control" content="off">

    <!-- 在客户端存储 cookie，web 浏览器的客户端识别 -->
    <meta http-equiv="set-cookie" content="name=value; expires=date; path=url">

    <!-- 指定要显示在一个特定框架中的页面 -->
    <meta http-equiv="Window-Target" content="_value">

    <!-- 地理标签 -->
    <meta name="ICBM" content="latitude, longitude">
    <meta name="geo.position" content="latitude;longitude">
    <meta name="geo.region" content="country[-state]"><!-- 国家代码 (ISO 3166-1): 强制性, 州代码 (ISO 3166-2): 可选; 如 content="US" / content="US-NY" -->
    <meta name="geo.placename" content="city/town"><!-- 如 content="New York City" -->
```

其中值得注意的有：

1. 搜索引擎相关

```html

    <!-- 针对页面的简短描述（限制 150 字符）-->
    <!-- 此内容*可能*被用作搜索引擎结果的一部分。 -->
    <meta name="description" content="一个页面描述">


    <!-- 控制搜索引擎的抓取和索引行为 -->
    <meta name="robots" content="index,follow"><!-- 所有搜索引擎 -->
    <meta name="googlebot" content="index,follow"><!-- 仅对 Google 有效 -->

```