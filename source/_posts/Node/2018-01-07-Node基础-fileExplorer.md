---
title: Node基础-fileExplorer
tags:
  - node 基础
  - node 抄书
categories:
  - node
folder: node
abbrlink: a3519ede
photos: ./xmind/Node/Node-基础示例.png
date: 2018-01-07 18:29:15
---

一个简单的命令行文件浏览器

<!-- more -->

******

{% img '/xmind/Node/Node-基础示例.detail.png' %}

******

# Node基础示例：fileExplorer

## 需求

1. 程序运行后显示当前目录下的列表
2. 选择某个文件后，程序需要显示该文件的信息，如果是一个目录需要显示这个目录下的信息
3. 执行接受后退出

******

## 基础知识

### process

process 作为全局变量可以直接使用；

1. process.cwd

    我们知道 `__dirname` 获得的是执行文件所在目录，而 `process.cwd()` 获取的则是程序运行的当前工作目录；
node 还提供了 `process.chdir` 用于改变工作目录

2. process.env

    Node 允许通过 process.env 变量访问 shell 环境下的变量
    示例：

    ```node
        > NODE_ENV="production"
        > process.evn.NODE_ENV  
        'production'
        > process.env.SHELL 
        '/bin/bash'
    ```

3. process.exit()

    退出进程 -- process.exit(1) 当进程出现错误的时候可以通过 这个方法退出进程，建议提供一个 1 的退出代码
    我们知道 Node 存在事件机制, 我们可以通过建立退出事件，在指定的时候进行触发

    ```js
        process.on('SKILL', function () {
            // 执行
        });

        // 触发
        process.emit('SKILL')
        
    ```

4. process.argv

    `process.argv` 包含了所有 Node 程序运行时的参数值；第一个参数是 node 路径，第二个参数是执行文件的路径， 第三个参数是命令行后紧跟着的参数

    ```js index.js
        console.log(process.argv);
    ```

    ```CLI CLI
        node index.js --text hello
        [ '/usr/local/bin/node', '/Users/fufei/Documents/GITHUB/samplecode/Node/Node应用/file-explorer/index.js',  '--text',  'hello' ]
    ```

### fs 模块

对于文件的操作，我们需要引入 fs 模块

```js
    /**
     * Module dependencies
     */

    let fs = require('fs');
```

fs 模块是唯一一个同时提供同步和异步 API 的模块；

以读取文件为例：

```js
    // 同步版本 直接返回 file
    console.log(fs.readdirSync(__dirname)); // [ 'index.js', 'package.json' ]

    // 异步版本 需要提供回调函数
    fs.readdir(__dirname, function (err, file) {
        // err 如果没有错误将会是 null
        console.log(file) // [ 'index.js', 'package.json' ]
    });
```

1. readdir
    `fs.readdir(process.cwd(), function (err, files))`
    其中 files 是由文件名构成的数组；err 为错误对象，如果没有错误，值为 `null`

2. stat
    `fs.stat(__dirname + '/' + filename, function (err, stat) {})`
    stat 是获取文件或者路径的元数据, 在回调中存在一个错误对象，和一个 stat 对象;
    stat 对象具有一些常用方法：`isDirectory()` 用于判断当前路径是一个文件还是一个文件夹

3. createReadStream
    （当前示例中不会使用）
    `fs.createReadStream` 方法允许为一个文件创建一个可读的 stream 对象
    fs 模块允许你通过 `stream` API 来对数据进行读写操作，与 `readFile` 以及 `writeFile` 方法不同，他对内存的分配不是一次完成的；
    一次性完成将会一次性分配很大的内存，所以处理大文件更好的方式应该是一次只读取一块内容，以 行尾符 ‘\n' 来进行切割，然后再逐个的分析

    示例：

    ```js

        // 这个示例需要等到 整个文件读取完毕，载入到 RAM 可用的情况下才会触发
        fs.readFile('./text/text1.txt', function (err, contents){
            console.log(contents);
        });

        // 这个是一次读取一块
        let example = fs.createReadStream('./text/text1.txt');
        example.on('data', function (chunk) {
            console.log(chunk);
        });

        example.on('end', function (chunk) {
            console.log('end')
        });

    ```
    
### 流

全局对象 -- process 中包含了 3 个 流对象

1. `stdout` 标准输出
2. `stdin` 标准输入
3. `stderr` 标准错误

其中 `stdin` 是个可读流，而其余两个都是可写流;

```js
    process.stdout.write('Hello stdout')
    // 输出 Hello stdout
```

> console.log 相当于 stdout 输出 + /n 换行

`stdin` 通常情况下是暂停的; 因为在执行一个程序，程序会做一些处理然后直接退出，不需要输入流，但是有些时候，程序需要一直处在运行状态等待接受用户传入的数据， 这个时候局需要恢复 stdin 流，然后 Node 就会观察对应的文件描述符，随后保持事件的循环运行，同时保证程序不会退出；等待事件的触发

```js
    process.stdin.resume() // 开启 stdin 流，程序开始等待用户输入
    process.stdin.setEncoding('utf8'); // 设置流编码为 utf8 这样就可以支持特殊字符了
    process.stdin.on('data', function (data) {}); // 监听用户的输入行为，并将输出的内容传到回调函数中
    process.stdin.pause() // 暂停流
```

### ANSI 转义码

要在文本终端下控制格式、颜色以及其他输出项，可以使用 ANSI 转义码；

颜色示例：`process.stdout.write('  \033[33mEnter you choice: \033[39m');` 

其中：

1. `\033` 表示转义序列的开始
2. `[` 表示开始颜色设置
3. 33 表示颜色
4. m 表示颜色设置结束

具体可以查看：[ANSI 转义码](https://en.wikipedia.org/wiki/ANSI_escape_code)
常用的颜色代码有：30（黑色）、31（红色）、32（绿色）、 33（黄色）、34（蓝色）、35（洋红）、36（青色）、37（白色）。

******

## 示例

### 创建项目

为了更好的管理项目，建议创建 `package.json` 文件

1. `npm init` 填入基本信息

### 代码1

```js file-explorer/example.js
    fs.readdir(process.cwd(), function (err, files) {
        // 输出一个换行
        console.log('');
        // \033[31m 和 \033[39m 是为了让文件呈现红色
        if (!files.length) {
            return console.log('     \033[31m No files to show!\033[39m\n')
        }

        console.log(' Select which file or directory you want to see\n');

        function file(i) {

            // 获取文件名
            var filename = files[i];

            // stat 是获取文件或者路径的元数据, 在回调中存在一个错误对象，和一个 stat 对象
            fs.stat(__dirname + '/' + filename, function (err, stat) {

                // 使用 stat 对象上的 isDirectory 方法，判断传入的是一个文件还是一个文件路径
                if (stat.isDirectory()) {

                    // 如果是文件路径将会显示 红色
                    console.log('   ' + i + '   \033[36m' + filename + '\033[39m');
                } else {

                    console.log('   ' + i + '   \033[34m' + filename + '\033[39m');
                }

                i++;

                // 如果循环结束
                if (i == files.length) {
                    console.log('');

                    // 输出提示信息
                    process.stdout.write('  \033[33mEnter your choice: \033[39m');

                    // 开启 stdin 流，等待输入
                    // process.stdin.resume();

                    // 设置流编码为 utf8 这样就可以支持特殊字符了
                    process.stdin.setEncoding('utf8');
                } else {

                    // 否则继续回调
                    file(i);
                }
            });
        }

        file(0)
    })
```

### 代码2

```js file-explorer/index.js
    /**
     * Module dependencies
     */

    let fs = require('fs'),
        stdin = process.stdin,
        stdout = process.stdout;


    fs.readdir(process.cwd(), function (err, files) {

        // 用于储存文件信息，使其可以在整个上下文中调用
        let stats = [];

        function file(i) {
            var filename = files[i];

            fs.stat(__dirname + '/' + filename, function (err, stat) {

                stats[i] = stat;
                if (stat.isDirectory()) {
                    console.log('   ' + i + '   \033[36m' + filename + '\033[31m');
                } else {

                    console.log('   ' + i + '   \033[36m' + filename + '\033[37m');
                }
                if (++i == files.length) {
                    read();
                } else {
                    file(i)
                }
            });
        }

        function read() {
            console.log('');
            stdout.write('  \033[33mEnter you choice: \033[39m');
            stdin.resume();
            stdin.setEncoding('utf8');

            // 开始监听用户的输入行为
            stdin.on('data', option);
        }

        function option(data) {
            let filename = files[Number(data)];

            if (!files[Number(data)]) {

                stdout.write('  \033[31mEnter your choise: \033[39m');
            } else {

                if (stats[Number(data)].isDirectory()) {
                    fs.readdir(__dirname + '/' + filename, function (err, files) {
                        console.log('');
                        console.log('   (' + files.length + 'file)');

                        files.forEach(function (v, i) {
                            console.log('   -  ' + v);
                        });
                        console.log('');
                    })
                } else {


                    fs.readFile(__dirname + '/' + filename, 'utf8', function (err, data) {
                        console.log('');

                        // 添加一些缩进
                        console.log('\033[37m' + data.replace(/(.*)/g, '    $1') + '\033[39m');
                    });
                }


                // 暂停输入流
                stdin.pause();
            }
        }

        file(0)
    });
```

******

# 补充

## watch

Node允许对一个文件或者目录进行监控，如果发生了变化将会触发指定的回调函数

示例：对工作区文件进行监控

```js
    var files = fs.readdirSync(process.cwd());

    files.forEach(function (v) {
        fs.watchFile(process.cwd() + '/' + v, function () {
            console.log('  -' + v +'   changed')
        })
    })
```

示例对文件夹监控

```js
    var files = fs.readdirSync(process.cwd());

    fs.watch(process.cwd(), function () {
        console.log('changed')
    })
```
