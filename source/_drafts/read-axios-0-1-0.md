---
title: read-axios-0.1.0
date: 2018-07-29 22:39:44
floder: axios-源码阅读
tags:
    - r-code
    - axios
category:
    - r-code
---

基于 Promise 的 HTTP 客户端工具，可以用于浏览器和 node.js

<!-- more -->

## Axios 简介

随着框架的流行，操作 DOM 的行为已经被框架自行处理了；在框架里 jQuery 已经不再是制作页面时必不可少的工具了，人们渐渐的想摆脱 jQuery ，寻找更加利于工程化的工具了。比如在方法操作上，我们选用 `Lodash`，在 `XMLHttpRequest` 的封装上，我们可以采用 `Axios`

`Axios` 是基于 Promise 的 HTTP 客户端工具，可以用于浏览器端和基于 Node 的服务端

### 特点

-   支持 ES6 的 `promise` 语法
-   拦截请求和响应
-   转换请求和响应数据
-   取消请求
-   自动转换 JSON 格式
-   客户端支持防范 XSRF

> 浏览器支持主流浏览器以及 IE8 及以上

## Axios 0.1.0

我们从 `Axios 0.1.0` 开始学习
