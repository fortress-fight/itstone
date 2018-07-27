---
title: ESLint-使用
date: 2018-07-26 22:13:25
tags:
    - eslint
    - vscode
    - 代码校验
category:
    - JavaScript--工具向
---

ESLint 是一个开源的 JavaScript 代码检查工具，由 Nicholas C. Zakas 于2013年6月创建。代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格。对大多数编程语言来说都会有代码检查，一般来说编译程序会内置检查工具。

<!-- more -->

# ESLint 简介

JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript 代码错误通常需要在执行过程中不断调试。像 ESLint 这样的可以让程序员在编码的过程中发现问题而不是在执行的过程中。

ESLint 的初衷是为了让程序员可以创建自己的检测规则。ESLint 的所有规则都被设计成可插入的。ESLint 的默认规则与其他的插件并没有什么区别，规则本身和测试可以依赖于同样的模式。为了便于人们使用，ESLint 内置了一些规则，当然，你可以在使用过程中自定义规则。

参考：

- [eslint-英文](https://eslint.org/)
- [eslint-中文](http://eslint.cn/)
- [eslint-dome](http://eslint.cn/demo)

## ESLint 配置

我们有两种方式进行 ESLint 的配置：

1. 使用 JavaScript 注释把配置信息直接嵌入到一个代码源文件中
2. 使用 JavaScript、JSON 或者 YAML 文件为整个目录和它的子目录指定配置信息。可以配置一个独立的 `.eslintrc.*` 文件，或者直接在 `package.json` 文件里的 `eslintConfig` 字段指定配置， ESLint 会查找和自动读取他们，或者通过命令行运行时指定一个任意的配置文件。

### ES6 支持

支持 ES6 语法并不意味着支持新的 ES6 全局变量或者类型，所以不仅使用 `{"parserOptions: {"ecmaVersion": 6}"}` 来启用 ES6 语法支持；还需要设置：`{"env": {"es6": true}}` (设置此项后 ecmaVersion 将会自动设置为 6));

1. 解析器选项可以在 `.eslintrc.*` 文件中使用 `parserOptions` 属性设置：
    - ecmaVersion - 默认设置为 5 ，可以使用 6、7、8 或者 9 来指定想要使用 ECMAScript 版本，可以通过使用年份命名的版本号指定为 2015、2016 ...
    - sourceType - 设置为 `"script"` （默认）或者 `module` （如果代码是模块化的）
    - ecmaFeatures:{JSX:true} - 表示想要使用的实现特性（不做解释）[官网解释](http://eslint.cn/docs/user-guide/configuring)

2. env 参数

    env 一个环境定义了一组预定义的全局变量；可用的环境变量：
    - browser - 浏览器环境中的全局变量 (true|false)
    - node - Node.js 全局变量和 Node.js 作用域
    - shared-node-browser Node.js 和 Browser 通用全局变量
    - es6
    ...

    env 制定下的环境的全局变量不会作为未知变量产生报错，如果 ESLint 检测出未知变量，将会发出 `no-undef` 警告
    
    注：这些环境变量并不是互斥的，可以同时设置多个；可以在源文件中、配置文件中或者使用命令行的 `--env` 选项来指定环境

    注：如果在 JavaScript 文件中使用注释来指定环境：`/* eslint-env browser */`

### 全局变量

除了上述参数 `env` 来定义一组预定义的全局变量，我们还可以通过 `globals` 配置项来自定义全局变量; 为 `true` 可以重写；`false` 不可以（需要启动 `no-global-assign` 配合使用）

1. globals 参数

在配置文件配置全局变量：

```js
    {
        "globals": {
            "var1": true,
            "var2": false
        }
    }
```

在 JavaScript 文件中注释：

```js
    /* global var1:false, var2:false */
```

### 插件

ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。插件名称需要存放在 `plugins` 关键字下，插件可以省略 `eslint-plugin-` 前缀

```js
    {
        plugins: [
            'html'
        ]
    }
```

注：由于 NodeJS 的 `require` 函数的行为，全局安装的 ESLint 实例只能使用全局安装的 ESLint 插件，本地安装的版本，只能使用本地安装的插件；

### Configuring Rules

ESLint 附带有大量的规则，可以使用注释或者配置文件修改你项目中要使用的规则。要改变规则设置，需要设置规则为下列值之一：

- ["off"|0] 关闭规则
- ["warn"|1] 开启规则，使用警告级别的错误（不会导致程序退出）
- ["error"|2] 开启规则，使用错误级别的错误（当被触发的使用，程序会退出）

1. 代码注释

```js
    /* eslint eqeqeq:"off" */
```

如果规则需要设置参数：

```js
    /* eslint quotes: ["error", "double"]*/
```

注：数组的第一项总是规则的严重程度

2. 配置文件

```js
    {
        "rules": {
            "eqeqeq": "off",
            "quotes": ["error", "double"]
        }
    }
```

**如果需要配置一个插件中的规则的时**，需要使用 `插件名/规则名:` 的形式

注意：当指定来自插件的规则时，需要确保删除 `eslint-plugin-` 前缀，因为 ESLint 在内部只使用没有前缀的名称去定位规则

### 禁止 ESLint

我们可以在文件中使用以下格式的块注释来临时禁止规则发出警告

```js
/* eslint-disable */
/* eslint-disable no-alert,no-console */
```

如果希望在整个文件中禁止出现警告，可以将 `/* eslint-disable */` 放到文件顶部

如果希望只在一行上禁止使用校验：

```js
    alert('foo'); // eslint-deable-line 
```

### 共享设置

ESLint 支持在配置文件添加共享设置。你可以添加 settings 对象到配置文件，它将提供给每一个将被执行的规则。如果你想添加的自定义规则而且使它们可以访问到相同的信息，这将会很有用，并且很容易配置。
<!-- 暂时使用不到 -->

```json
    {
        "settings": {
            "sharedData": "Hello"
        }
    }
```

### 使用配置文件

使用配置文件可以通过 `.eslintrc.*` 和 `package.json` 文件，ESLint 将自动在要检测的文件父级目录里寻找他们，如果你希望将 ESLint 限制到一个特定的项目中，在你项目的根目录下的配置文件中设置：`root:true` 一旦 ESLint 发现配置文件中有 `"root": true`， 他就会停止在父级目录中继续寻找

或者使用 `-c` 选项传递命令行将文件保持到你喜欢的地方

```cli
    eslint -c myconfig.json myfiletotest.js
```

如果你使用一个配置文件，想要 ESLint 忽略任何 .eslintrc.* 文件，请确保使用 --no-eslintrc 的同时，加上 -c 标记。

存在配置文件就将覆盖默认设置

##

```js

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
```

## 私有 `.eslintrc.*`

```js
    module.exports = {
        root: true,
        parserOptions: {
            sourceType: 'module',
            ecmaVersion: 6
        },
        env: {
            es6: true,
            browser: true,
            node: true
        },
        plugins: [
            'eslint-plugin-html'
        ],
        rules: {}
    }
```