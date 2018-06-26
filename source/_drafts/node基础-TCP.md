---
title: node基础-TCP
abbrlink: 1a0b1640
date: 2018-04-15 17:42:51
tags:
  - node 基础
  - node 抄书
categories:
  - node
---

<!-- more -->

# TCP

TCP 是一个面向连接的传输控制协议协议，它保证了两台计算机之间数据传输的可靠性和顺序，也就是说 TCP 是一种传输层协议，可以让你将数据从一台计算机完整有序的传输给另一台计算机了；

我们现在使用的 HTTP 协议是基于 TCP 协议的。当传输一个页面的 HTML 文件的时候，我们当然需要保证数据的完成和有序传输；

NodeJs 这个框架就是为了网络应用开发所设计的。目前，网络应用都是利用 TCP/IP 协议进行通讯的。在 NodeJs 中 HTTP 服务器就是构建与 Node TCP 服务器之上的。从编程角度来说，也就是 Node 中的 `http.Server` 继承自 `net.Server` (net 是 TCP 模块)；

除了 Web 浏览器和服务器（HTTP）之外，很多我们日常使用的如：邮件客户端，聊天程序以及远程 shell 都是基于 TCP 协议的；

## TCP 特性

TCP 的首要特性就是它是面向连接的；

1. 面向连接的通信和保证顺序的传递

    TCP 可以将客户端和服务端的通信看作是一个连接或者数据流；

    作为 TCP 协议的基础 IP 协议是基于数据包的传输，这些数据包是独立进行传输的，送达的顺序也是无序的；这些数据包不属于任何的数据流或者连接。而 TCP 能够让数据包送达的时是有序的；

    当 TCP 连接内进行数据传输的时候，传送的 IP 数据报包含了表示该连接以及数据流顺序的信息，假设一条消息分割为四个部分，当服务器从连接 A 收到第一部分和第四部分后，他就会知道还需要等待数据报中的其余部分；

2. 面向字节

    TCP 对于字符以及字符编码是无知的，所以 TCP 允许数据以 ASCII 字符（一个字符一个字节）或者 Unicode （每个字符四个字节）进行传输；正因为 TCP 对于消息的格式没有严格的约束，所以 TCP 具有很好的灵活性；

3. 可靠性

    由于 TCP 是基于底层不可靠的服务，所以，它必须基于确认和超时实现一系列的机制来达到可靠性的要求；

    当数据发送出去以后，发送方就会等待一个确认消息，表示数据包已经收到简短的确认消息，如果超时了还未收到确认消息。发送方就会对数据进行重发；

4. 流控制

    要是两台互相通信的计算机中，有一台速度远快于另一台，就会导致两点之间传输数据失衡；在 TCP 中使用流控制的方式来确保，两点之间的传输数据的平衡，一面发送方压垮接收方；

5. 拥堵控制

    TCP 有一种内置的机制能够控制数据包的延迟率以及丢包率不会太高，以此保证服务的质量；

    具体表现在：TCP 会通过控制数据包的传输速率来避免拥堵的情况；

## Telnet

Telnet 是一个早期的网络协议，为了提供双向的虚拟终端。在 SSH 出现前它作为一种控制远程计算机的方式使用；
它是 TCP 协议的上层协议；

MAC 下安装 Telnet: `brew install telnet`

在 telnet 客户端中发送数据时，客户端如果发现服务器使用的不是 Telnet，这时服务端不会关闭连接或者显示错误，它会自动降级到底层的纯 TCP 模式；

现在我们使用 telnet 去访问 Web 服务端；

1. 在命令行输入 ： `telnet`  进入 telnet 客户端；
2. 创建一个简单的服务器, 并启动；

    ```js
        require('http').createServer(function (req, res) {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end('<h1>Hello world</h1>');
        }).listen(3000);
    ```
    
3. 使用 telnet 建立链接

    ```telnet
        telnet 127.0.0.1 3000
    ```

    返回

    ```telnet
        telnet> telnet 127.0.0.1 3000
        Trying 127.0.0.1...
        Connected to localhost.
        Escape character is '^]'.
    ```

    这时虽然建立了连接，但是服务端的 `Hello World` 消息并没有到客户端，原因在于，要往 TCP 连接中写数据，必须创建一个 HTTP 请求；

4. 建立 HTTP 请求

    在终端输入 `GET / HTTP/1.1` 然后按两下空格（注意空格）

    ```telnet
        GET / HTTP/1.1
    ```

    这时服务器端的响应就出现了；

    ```telnet
        telnet> telnet 127.0.0.1 3000
        Trying 127.0.0.1...
        Connected to localhost.
        Escape character is '^]'.
        GET / HTTP/1.1

        HTTP/1.1 200 OK
        Content-Type: text/html
        Date: Mon, 16 Apr 2018 23:26:23 GMT
        Connection: keep-alive
        Transfer-Encoding: chunked

        14
        <h1>Hello world</h1>
        0
    ```

5. 总结

    1. 建立一个 TCP 链接 `telnet 127.0.0.1 3000`;
    2. 创建一个 HTTP 请求 `GET / HTTP/1.1`
    3. 接收到 HTTP 响应
    4. 到达的数据和 NodeJs 中写的一样，先写了 `Content-Type` 的响应头，然后是响应体。最后所有的信息都按序到达

## 基于 TCP 的聊天程序

需求：

1. 成功链接到服务器后，服务器会显示欢迎信息，并要求输入用户名。同时反馈有多少客户端连接到了当前服务器
2. 输入用户名，并回车，就认为成功接上服务器
3. 连接后，通过输入信息按下回车键，来和其它客户端进行通信

在 Telnet 中输入的任何信息，都会被立刻发送到服务器，按回车键知识输入了 `\n` 字符，在 Node 服务端，通过 `\n` 来判断信息是否已经完全到达

### 创建模块

```npm
    cnpm init
```

### 创建 Node 服务

```js
    const net = require('net');

    let server = net.createServer(function (conn) {
        console.log('\033[90m  new connection!\033[39m');
    });

    server.listen(3000, function () {
        console.log('\003[96m  server listening on *:3000\033[39m');
    });
```

当 telnet 连接到 Node 服务端的时候，将会执行 `createServer` 中的回调函数，其中参数 `conn` 就是 Node 中的一个常见实例：Stream，这里它传递的是 `net.Stream` 该对象即可读有可写；

`listen` 可以将服务器绑定到某个端口上，其中的回调函数，是在建立服务的时候执行；

### 建立链接

需求：一旦建立链接就向客户端回写欢迎语和当前连接数

修改 index.js

```js
    const net = require('net');

    let count = 0;

    let server = net.createServer(function (conn) {
        console.log('\033[90m  new connection! \033[39m');
        conn.write(
                '\n > welcome to \033[92m node-chat\033[39m!'
                + '\n > '+ count +' other people are connected at this time'
                + '\n > please write your name and press enter:'
        );

        conn.on('close', function () {
            count--;
        });
        count++;
    });

    server.listen(3000, function () {
        console.log('\003[96m  server listening on *:3000\033[39m');
    });
```

在 Node 中，当底层套接字关闭的时候，Node 会触发 close 事件，Node 中的 `end` & `close` 都是和连接终止相关的事件；

当你关闭 `telnet` 的时候，它会发送一个 `FIN` 的包给数据库，告诉数据库，连接终止；
当发生错误的时候(触发 error 回调)，服务端不会接收到 `FIN`, 导致 end 事件不会执行，但是会执行 close 事件

### data 事件处理用户输入

监听 data 事件，和 Node 中其他的 API 一样，net.Stream 也是一个 EventEmitter；

```js
    const net = require('net');

    let count = 0;

    let server = net.createServer(function (conn) {
        console.log('\033[90m  new connection! \033[39m');
        conn.write(
            '\n > welcome to \033[92m node-chat\033[39m!'
            + '\n > '+ count +' other people are connected at this time'
            + '\n > please write your name and press enter:'
        );

        conn.on('close', function () {
            count--;
        });
        conn.on('data', function (data) {
            console.log(data);
        });
        count++;
    });

    server.listen(3000, function () {
        console.log('\003[96m  server listening on *:3000\033[39m');
    });
```

我们通过 `console.log(data)` 将用户输入打印出来；

Node 启动服务器，然后使用 telnet 连接服务器，输入：`hi`; 服务端将会输出：`<Buffer 68 69 0d 0a>`;

可以看到这里我们接收到的是一个 Buffer 格式的数据，这时因为 TCP 是面向字节的协议；在 Node 中我们有多种选择可以获取字符串格式的数据，这里他们通过调用 Buffer 对象上的 `.toString('utf8')` 的方式来获取 `utf8` 格式的编码；

```js
    ...
    conn.on('data', function (data) {
        console.log(data.toString('utf8'));
    });
    ...
```

如果需要一直使用 utf8 的编码格式输出，可以使用 `net.Stream#setEncoding` 的方法来设置编码；

```js
    ...
    let server = net.createServer(function (conn) {
        ...
        conn.setEncoding('utf8');
        ...
        conn.on('data', function (data) {
            console.log(data);
        });
    });
```

### 状态以及记录链接情况

此前定义的计数器称为状态，两个不同链接的用户需要修改同一个状态变量，这在 Node 中称为**共享状态并发**
为了能够向其他进来的客户端发送和广播消息，该状态需要追踪到底是谁进来了；
当客户端链接成功并且输入昵称后，我们需要记录设置了昵称的用户；为此我们需要添加一个新的状态变量：`users` 以及存放昵称的变量 `nickname`;

```js
    const net = require('net');

    let count = 0,
        users = {};

    let server = net.createServer(function (conn) {
        console.log('\033[90m  new connection! \033[39m');
        conn.setEncoding('utf8');

        let nickname;
        
        conn.write(
            '\n > welcome to \033[92m node-chat\033[39m!'
            + '\n > '+ count +' other people are connected at this time'
            + '\n > please write your name and press enter:'
        );

        conn.on('close', function () {
            count--;
        });
        conn.on('data', function (data) {
            // 这是因为 Node 通过换行符来判断信息是否结束，在存放信息的时候，我们需要去除换行符；
            data = data.replace('\r\n', '');
            console.log(data);
            console.log(data.toString('utf8'));

            if(!nickname) {
                if (users[data]) {
                    conn.write('\033[93m> nickname already in use. try again:\033[39m ');
                    return;
                } else {
                    nickname = data;
                    users[nickname] = conn;

                    for(var i in users) {
                        
                        // 将加入的信息在所有的面板中提示
                        users[i].write('\033[90m > ' + nickname + ' joined the room\033[39m\n');
                    }
                }
            }        
        });
        count++;
    });

    server.listen(3000, function () {
        console.log('\003[96m  server listening on *:3000\033[39m');
    });
```

然后我们创建多个链接，当出现新的昵称的时候，将会把消息发送给所有用户；
在成功输入昵称后，我们需要做的就是发送、接收聊天信息；

```js
    else {
        for (var i in users) {
            if (i != nickname) {
                users[i].write('\033[96m > ' + nickname + ':\033[39m ' + data + '\n');
            }
        }
    }
```

注：这里有个问题没有解决，不能输入中文信息

目前我们还存在一个事情需要处理 -- 当有人断开连接的时候，我们就需要清除 users 数组中对应的元素：

```js
    conn.on('close', function () {
        count--;
        delete users[nickname];
    });
```

当用户断开时，我们可能还需要通知其他用户，这部分和注册的行为一样都是需要给所有用户广播消息，所以可以将这部分的逻辑抽象出来；

```js
    const net = require('net');

    let count = 0,
        users = {};

    let server = net.createServer(function (conn) {
        console.log('\033[90m  new connection! \033[39m');
        conn.setEncoding('utf8');

        let nickname;
        
        conn.write(
            '\n > welcome to \033[92m node-chat\033[39m!'
            + '\n > '+ count +' other people are connected at this time'
            + '\n > please write your name and press enter:'
        );

        conn.on('close', function () {
            count--;
            delete users[nickname];
            broadcast('\033[90m > ' + nickname + ' left the room\033[39m\n');
        });

        function broadcast (msg, exceptMyself) {
            for(var i in users) {
                if (!exceptMyself || i != nickname) {
                    users[i].write(msg);
                }
            }
        }

        conn.on('data', function (data) {
            // 这是因为 Node 通过换行符来判断信息是否结束，在存放信息的时候，我们需要去除换行符；
            data = data.replace('\r\n', '');
            console.log(data);
            console.log(data.toString('utf8'));

            if(!nickname) {
                if (users[data]) {
                    conn.write('\033[93m> nickname already in use. try again:\033[39m ');
                    return;
                } else {
                    nickname = data;
                    users[nickname] = conn;

                    for(var i in users) {

                        // 将加入的信息在所有的面板中提示
                        // users[i].write('\033[90m > ' + nickname + ' joined the room\033[39m\n');
                        broadcast('\033[90m > ' + nickname + ' joined the room\033[39m\n');
                    }
                }
            } else {
                for (var i in users) {
                    if (i != nickname) {
                        users[i].write('\033[96m > ' + nickname + ':\033[39m ' + data + '\n');
                    }
                }
            }
        });
        
        count++;
    });

    server.listen(3000, function () {
        console.log('\003[96m  server listening on *:3000\033[39m');
    });

```

## 基于 NodeJS 的客服建议客户端


```js
const net = require('net');

var client = net.connect(3000, '127.0.0.1', function () {});

client.setEncoding('utf8');

client.on('connect', function () {
    client.write('NICK mynick\r\n');
});
