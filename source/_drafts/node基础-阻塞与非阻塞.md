---
title: node基础-阻塞与非阻塞
abbrlink: a7c29d9
date: 2018-01-02 23:38:52
tags:
---

node基础-阻塞与非阻塞

<!-- more -->

# Node 中的基本概念

******

## 共享状态的并发

在 Node 中，会一直维持一个长期运行的进程

```js 基础概念/learn01.js
    let http = require('http'),
        i = 0;

    http.createServer(function () {
        console.log(i++);
    }).listen(3030);
```

这里我们起了一个简易的服务器，当我们每一次访问 `localhost:3030` 的时候，都将输出 `i++` 的结果；这时因为 Node 中采用了一个长期的进程，无需每次刷新，作用域中变量的状态将会保留；而在 PHP 中，每一次访问服务器，服务器都会开启一个新的进程处理，也就是 i 始终为 0；

> 由于 Node 共享状态的原因，一定要小心修改当前内存中的变量（状态）

******

## 阻塞

Node 是具备事件轮询的特性的，以 `setTimeout` 为例：

```js 基础概念/learn01.js--02
    console.log(0);
    setTimeout(() => {
        
        console.log(1);
    }, 1000);

    console.log(2);
```

输出：`0, 1, 2` 

事件轮询意味着，Node 将会先注册事件，然后不停的询问内核这个事件是否已经分发，当事件被分发后就会执行响应的回调行为，而在等待的过程中程序将会继续进行。这种方式叫做回调；

当然如果仅仅是 `setTimeout` 并不会对 Node 有实质性的提升，在 `http` 和 `net` 这些原生模块中的 IO 部分也都采用了事件轮询的技术；Node 使用事件轮询，触发一个和文件描述符相关的通知；
文件描述符是存放对打开的文件、socket、管道等的引用。当 Node 接受到从浏览器发来的 HTTP 请求，底层的 TCP 链接就会分配一个文件描述符，随后如果客户端向服务器发送数据，Node 就会收到该文件描述符上的通知，然后触发回调函数；

******

## 单线程

Node 本身是单线程的

```js 基础概念/learn01.js--03
    // 03

    let stat = + new Date();

    setTimeout(() => {
        console.log(stat - (+new Date()));
        for (var i = 0; i < 1000000000; i++) {};
    }, 200);
    setTimeout(() => {
        console.log(stat - (+new Date()));
    }, 400);
```

输出 `222, 740`

这里两个回调只相差 200 ms，但是回调函数的执行时间相差了 418 ms；这个是因为 `for` 阻塞了线程；

******

## 高并发

Node 本身是单线程非阻塞，所以 Node 中的并发数通常为 1； 一般是通过调用堆栈来完成执行；

```js 基础概念/learn01.js

    // 04
    
    let http = require('http');

    http.createServer(function () {
        console.log(1);
        a()
    }).listen(3030);
    function a () {
        console.log(2);
        b();
    }
    function b () {
        console.log(3)
    }
```

输出：`1,2,3`

如果调用栈执行非常快的情况下，同一个时刻你无需处理多个请求；在执行的时候，我们只需要告诉内核需要做什么事情，然后继续处理下一个请求；而内核会在做完以后通知我们执行回调函数；

******

## 错误处理

在 Node 中，共享状态， 也就是说如果某个回调函数发生错误将会导致整个进程崩溃，所以在 Node 中，错误处理是件十分重要的事情；

```js 基础概念/learn01.js 
    // 05

    let http = require('http'), i = 0;
    http.createServer(function () {
        i++;
        a();
    }).listen(3030)

    function a () {
        console.log(i);
        if (i > 2) {
            throw new Error('错误')
        }
    }
```

当第三次访问服务器的时候，将会抛出错误并导致进程崩溃；

### 错误处理方法

1. uncatchException

    ```js 基础概念/learn01.js
        // 06

        let http = require('http'), i = 0, process=require('process');
        http.createServer(function () {
            i++;
            a();
        }).listen(3030)

        function a () {
            console.log(i);
            if (i > 1) {
                throw new Error('错误')
            }
        }

        process.on('uncaughtException', function (err) {
            console.log(err);
        })
    ```

2. error 事件
3. 绝大多数 Node 异步的 API 接受的回调函数，第一个参数就是错误对象或者 null

    ```js 基础概念/learn01.js
        // 07

        let fs = require('fs');
        fs.readFile('./ceshi.js', function (err, data) {
            if (err) return console.error(err); // { Error: ENOENT: no such file or directory, open './ceshi.js' errno: -2, code: 'ENOENT', syscall: 'open', path: './ceshi.js' }
            console.log(data);
        })
    ```

### 堆栈追踪

```js 基础概念/learn01.js
    // 08

    let http = require('http');

    http.createServer(function () {
        console.log(1);
        a()
    }).listen(3030);
    function a () {
        console.log(2);
        b();
    }
    function b () {
        throw new Error('错误');
        console.log(3);
    }
```

访问服务器的时候，将会排除错误；并且能够看到追踪的信息；但是如果存在时间轮询，我们将不能得到有价值的堆栈信息，所以在 Node 中，我们需要每一步都要对错误信息处理；一旦遗漏将会很难调试；

```js 基础概念/learn01.js
    // 09

    let http = require('http');

    http.createServer(function () {
        console.log(1);
        a()
    }).listen(3030);
    function a () {
        console.log(2);
        b();
    }
    function b () {
        setTimeout(() => {
            throw new Error('错误');   
        });
        console.log(3);
    }
```
