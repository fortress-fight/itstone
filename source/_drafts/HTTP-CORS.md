---
title: HTTP-CORS
date: 2018-07-11 18:19:18
tags: 
    - CORS
categories:
    - HTTP
---

******
<!-- more -->

# HTTP 访问控制 (CORS)

******

参考：

1. [MDN -- HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
2. [阮一峰 -- 跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)

## 概述

当一个资源从与该资源本身所在的服务器**不同的域或者端口**请求一个资源时，资源就会发一个**跨域请求**

出于安全的原因，浏览器**限制从脚本内**发起的跨域 HTTP 请求，或者拦截跨域请求结果，例如 XMLHttpRequest [[1]](#xmlhttprequest) 和 Fetch [[2]](#fetch) API 遵循同源策略，也就是说使用这些 API 和 Web 应用程序只能从加载应用程序的同一个域请求 HTTP 资源，除非使用 CORS 头文件

CORS (crose-origin sharing standard) -- 跨域资源共享

CORS 机制允许 Web 应用服务器进行跨域访问控制，从而使跨域数据传输得意安全进行，浏览器允许在 API 容器中使用 CORS，以降低跨域 HTTP 请求带来的风险；

CORS 使用场景:

- 由 XMLHttpRequest 和 Fetch 发起的跨域 HTTP 请求
- Web 字体引用
- 使用 drawImage 的 canvas 绘制
- 样式表
- Scripts(未处理的异常)

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。 规范要求可能对服务器数据数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求）浏览器必须首先使用 OPTIONS 方法发送一个预检请求，从而或者服务端是否允许跨域请求，服务端允许后，才能发起 HTTP 请求，并在预检请求的返回中，服务单也可以通知客户端，是否需要携带身份凭证

> [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) <span id='xmlhttprequest'></span> ： 是一个 API，它为客户端提供了在客户端和服务器之间传输数据的功能。它提供了一个通过 URL 来获取数据的简单方式，并且不会使整个页面刷新。这使得网页只更新一部分页面而不会打扰到用户。XMLHttpRequest 在 AJAX 中被大量使用。
> [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch) <span id='#fetch'></span> API 提供了一个 JavaScript接口，用于访问和操纵HTTP管道的部分，例如请求和响应。它还提供了一个全局 fetch()方法，该方法提供了一种简单，合理的方式来跨网络异步获取资源。

## 简单请求

简单请求是指：不会触发 CORS 预检请求的请求，Fetch 定义了 CORS，简单请求概念不适用于它

简单请求条件：

- 使用 GET/HEAD（获取请求头信息）/POST -- [http方法](#httpMethods)
- Fetch 规范定义了 CORS 安全的首部字段集合，无人为设置的其他首部字段
    - Accept (请求头用来告知客户端可以处理的内容类型，这种内容类型用 [MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) 类型来表示)
    - Accept-Language (请求头允许客户端声明它可以理解的自然语言，浏览器会基于其用户界面语言来为这个请求头设置合适的值)
    - Content-Language (是一个 entity header （实体消息首部），用来说明访问者希望采用的语言或语言组合，这样的话用户就可以根据自己偏好的语言来定制不同的内容。)
    - Content-Type (实体头部用于指示资源的MIME类型 media type 。在请求中 (如POST 或 PUT)，客户端告诉服务器实际发送的数据类型。)DPR
    - Downlink
    - Save-Data
    - Viewport-Width
    - Width
- Content-Type 的值仅限于下列三者之一：
    - text/plain
    - multipart/form-data
    - application/x-www-form-urlencoded
- 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。
- 请求中没有使用 ReadableStream（Fetch API 的 ReadableStream 接口标识了一个可读的二进制数据流） 对象。

> 注意: 这些跨域请求与浏览器发出的其他跨域请求并无二致。如果服务器未返回正确的响应首部，则请求方不会收到任何数据。因此，那些不允许跨域请求的网站无需为这一新的 HTTP 访问控制特性担心。

### 简单请求示例：

假如站点 `http://foo.example` 的网页应用想要访问 `http://bar.other` 的资源。`http://foo.example` 的网页中可能包含类似于下面的 JavaScript 代码：

```js
    var invocation = new XMLHttpRequest();
    var url = 'http://bar.other/resources/public-data/';
    
    function callOtherDomain() {
        if(invocation) {    
            invocation.open('GET', url, true);
            invocation.onreadystatechange = handler;
            invocation.send(); 
        }
    }
```

请求报文：

```http
    GET /resources/public-data/ HTTP/1.1
    Host: bar.other
    User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.1b3pre) Gecko/20081130 Minefield/3.1b3pre
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
    Accept-Language: en-us,en;q=0.5
    Accept-Encoding: gzip,deflate
    Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
    Connection: keep-alive
    Referer: http://foo.example/examples/access-control/simpleXSInvocation.html
    Origin: http://foo.example
```

- Origin -- 表明请求来源

响应报文：

```http
    HTTP/1.1 200 OK
    Date: Mon, 01 Dec 2008 00:23:53 GMT
    Server: Apache/2.0.61 
    Access-Control-Allow-Origin: *
    Keep-Alive: timeout=2, max=100
    Connection: Keep-Alive
    Transfer-Encoding: chunked
    Content-Type: application/xml

    [XML Data]
```

- Access-Control-Allow-Origin -- 表明资源可以被哪些外域访问。

通过请求报文的 Origin 和响应报文中的 Access-Control-Allow-Origin 结合就能完成最简单的访问控制；

## 预检请求

当请求不满足简单请求的条件时，就会需要预检请求，预检请求要求必须使用 OPTIONS 方法发起一个预检请求到服务端，用于获知服务器是否允许该实际请求。"预检请求"可以避免跨域请求对服务器的用户数据产生影响；

### 预检请求示例：

发送请求：

```js
    var invocation = new XMLHttpRequest();
    var url = 'http://bar.other/resources/post-here/';
    var body = '<?xml version="1.0"?><person><name>Arun</name></person>';
        
    function callOtherDomain(){
        if(invocation) {
            invocation.open('POST', url, true);
            invocation.setRequestHeader('X-PINGOTHER', 'pingpong');
            invocation.setRequestHeader('Content-Type', 'application/xml');
            invocation.onreadystatechange = handler;
            invocation.send(body); 
        }
    }
```

![预检测请求](http://i1.bvimg.com/650755/cc10ac2d4c9c023a.png)

由于请求中携带自定义首部字段以及请求的 Content-Type 为 application/xml 因此，该请求需要首先发起 '预检请求'

## 补充

- HTTP 方法 <span id='#httpMethods'></span>：
    - GET
    - POST
    - HEAD
    - OPTIONS (用于获取目的资源所支持的通信选项)
    - PUT (用于新增资源或者使用请求中的有效负载替换目标资源的表现形式，与 POST 的不同在于，PUT 调用一次和连续调用多次是等价的，而使用 POST 的联系调用可能会重复提交)
    - [TRACE](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/TRACE) (实行了向目标资源的沿路径的消息环回测试)
    - PATCH  用于对资源进行部分修改。
    - DELETE 用于删除指定的资源
    - CONNECT 可以开启一个客户端与所请求资源之间的双向沟通的通道。它可以用来创建隧道（tunnel）。