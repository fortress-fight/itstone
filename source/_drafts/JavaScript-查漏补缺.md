---
title: JavaScript-查漏补缺
date: 2018-10-19 17:06:40
tags:
    - JavaScript
    - 查漏补缺
category:
    - JavaScript
---

---

<!-- more -->

## JavaScript 中的错误类型

| 提示符         | 描述                                                                            |
| -------------- | ------------------------------------------------------------------------------- |
| Error          | 错误对象                                                                        |
| SyntaxError    | 解析过程语法错误(往往是书写时候造成的语法错误)                                  |
| TypeError      | 不属于有效类型(给的不是需要的类型而导致无法操作)                                |
| ReferenceError | 无效引用(引用了一个不存在的变量)                                                |
| RangeError     | 数值超出有效范围(传入的数值必须在一定的范围内, 例如：`let arr = new Array(-1))` |
| URIError       | 解析URI编码出错(处理URI编码出错。函数参数不正确)                                |
| EvalError      | 调用eval函数错误                                                                |
| InternalError  | Javascript引擎内部错误的异常抛出， "递归太多"                                   |

注：

{% blockquote%}

1.  EvalError调用eval函数错误，已经弃用，为了向后兼容，低版本还可以使用。
2.  InternalError 递归过深 抛出错误，多数浏览器未实现，属于非标准方法，生产环境禁用

{% endblockquote %}

1.  `Error`  是错误类型的基础，其他类型都是继承自 `Error` 类

    ```js
        console.log(Error.isPrototypeOf(TypeError))  // true
        console.log(Object.getPrototypeOf(TypeError) === Error) // true
    ```

2.  抛出错误
    通过 `throw new Error([message])` // 使用 throw 抛出异常后，之后的代码不再执行。

3.  捕获错误
    可以通过 `try{}catch(err){}` 语句来捕获到这个错误

    ```js
        try{
            throw new Error('this is a normal Error')
        }catch(err){
            console.log(err);
        }
    ```
4.  自定义错误类型
    <!-- TODO 自己处理 -->
    ```js
        function MyErrorType(message){
            this.message = message || '错误';
            this.name = 'MyErrorType';
            this.stack = (new Error()).stack;  // 错误位置和调用栈
        }

        MyErrorType.prototype = Object.create(Error.prototype);
        MyErrorType.prototype.constructor = MyErrorType;

        throw new MyErrorType('自定义错误类型抛出错误')

    ```

### 补充

1.  `getPrototypeOf` && `isPrototypeOf` && `instaceOf`

    `Object.getPrototypeOf()` 方法返回指定对象的原型（内部`[[Prototype]]`属性的值）。
    `prototypeObj.isPrototypeOf(object)` 检查 **一个对象** 是否存在于另一个对象的原型链上。

        -  例如： `Error.isPrototypeOf(TypeError) // true` 就是检查 `Error` 是否存在于 `TypeError` 的原型链上: 

            ```js
                TypeError.__proto__ // ƒ Error() { [native code] }
                TypeError.__proto__.__proto__ // ƒ () { [native code] }
                TypeError.__proto__.__proto__.__proto__ // {...}
                TypeError.__proto__.__proto__.__proto__.__proto__ // null
            ```


    `instanceof` 运算符用于测试 **构造函数的 `prototype` 属性** 是否出现在对象的原型链中的任何位置

    1.  `instaceof` 简单使用：
        ```js
            // 判断 foo 是否是 Foo 类的实例 , 并且是否是其父类型的实例
            function Aoo(){} 
            function Foo(){} 
            Foo.prototype = new Aoo();//JavaScript 原型继承
            
            var foo = new Foo(); 
            console.log(foo instanceof Foo)//true 
            console.log(foo instanceof Aoo)//true
        ```

    2.  `instaceof` 复制使用：
        ```js
            console.log(Object instanceof Object);//true 
            console.log(Function instanceof Function);//true 
            console.log(Number instanceof Number);//false 
            console.log(String instanceof String);//false 
            console.log(Function instanceof Object);//true 
            
            console.log(Foo instanceof Function);//true 
            console.log(Foo instanceof Foo);//false
        ```

        为什么 Object 和 Function instanceof 自己等于 true，而其他类 instanceof 自己却又不等于 true 呢？如何解释？要想从根本上了解 instanceof 的奥秘，需要从两个方面着手：

        1.  **语言规范中是如何定义这个运算符的。**
        2.  **JavaScript 原型继承机制。**

        在 ECMAScript-262 edition 3 中，instanceof 可以描述为：

        ```js
            // 检测右侧的构造函数的原型（prototype），是否出现在左侧的对象的原型链上
            function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
                var O = R.prototype;// 取 R 的显示原型
                L = L.__proto__;// 取 L 的隐式原型
                while (true) { 
                    if (L === null) 
                        return false; 
                    if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true 
                        return true; 
                    L = L.__proto__; 
                } 
            }
        ```

2.  JavaScript 的原型继承机制

    由于本文主要集中在剖析 JavaScript instanceof 运算符，所以对于 JavaScript 的原型继承机制不再做详细的讲解，下图详细的描述了 JavaScript 各种对象的显示和隐式原型链结构。

    由其本文涉及显示原型和隐式原型，所以下面对这两个概念作一下简单说明。在 JavaScript 原型继承结构里面，规范中用 `[[Prototype]]` 表示对象隐式的原型，在 JavaScript 中用 `__proto__` 表示，并且在 Firefox 和 Chrome 浏览器中是可以访问得到这个属性的，但是 IE 下不行。所有 JavaScript 对象都有 `__proto__` 属性，但只有 `Object.prototype.__proto__` 为 null，前提是没有在 Firefox 或者 Chrome 下修改过这个属性。这个属性指向它的原型对象。 至于显示的原型，在 JavaScript 里用 `prototype` 属性表示，这个是 JavaScript 原型继承的基础知识，在这里就不在叙述了。

    ![JavaScript 原型链结构](http://resources.ffstone.top/resource/image/figure1.jpg)

    解释 `TypeError instanceof Error` 为 `false`

    ```js
        TypeError.__proto__ // ƒ Error() { [native code] }
        TypeError.__proto__.__proto__ // ƒ () { [native code] }
        TypeError.__proto__.__proto__.__proto__ // {...}
        TypeError.__proto__.__proto__.__proto__.__proto__ // null

        Error.prototype // {constructor: ƒ, name: "Error", message: "", toString: ƒ}
    ```

3.  继承的实现过程

    ```js
        class A {};
        class B extends A{};
        var b = new B();
    ```

    首先类的 `extends` 的实现方式如下：

    ```js
        class A {};
        class B {};
        Object.setPrototypeOf(B.prototype, A.prototype);
        Object.setPrototypeOf(B, A);
        var b = new B();
    ```

    而 `setPrototypeOf` 的实现方式如下：

    ```js
        Object.setPrototypeOf = function (obj, proto) {
            obj.__proto__ = proto;
            return obj;
        }
    ```

    `new` 操作符的具体工作为：

    ```js
        b.__proto__ = B.prototype;
        b.call(B);
    ```

    总结：

    ```js
        B.prototype // A {constructor: ƒ}
        B.__proto__ // class A {}
        B.__proto__.__proto__ // function () {}
        B.__proto__.__proto__.__proto__ // {}

        A.prototype // {constructor: ƒ}
    ```

    实例的原型链（`__proto__`）指向的就是其构造函数的 `prototype`
    而继承中的父类在子类的原型链上
    
### 参考

1.  [JavaScript instanceof 运算符深入剖析](https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/index.html)