---
title: ES6基础-类
abbrlink: 5d044257
date: 2018-01-23 23:27:12
tags:
---

******

<!-- more -->

# ES6基础 -- 类

大多数面向对象的编程语言都支持类和类集成的特性，但是 JavaScript 却不支持这些特性，而是通过其他方法定义并关联多个相关对象；

尽管一部分 JavaScript 的开发者坚持 JavaScript 中不需要类，但是为了更好的规范实现类的特性，在 ES6 中提引用了类的特性；但是 ES6 中的类依旧是借鉴了 JavaScript 的动态特性，算是一个语法糖；

## ES5 中的近类结构

ES5 中实现类的特性的思路是：**首先创建一个构造函数，然后定义另一个方法并赋值给构造函数的原型**

```js learn01.js
    function CreatePerson (name) {
        this.name = name;
    }

    CreatePerson.prototype.sayName = function () {
        console.log(this.name);
    }

    var person1= new CreatePerson('example');

    person1.sayName(); // example

    // 检测继承关系
    console.log(person1 instanceof CreatePerson); // true
    console.log(person1 instanceof Object); // true
```

1. 建立构造函数 `CreatePerson`
2. 给 `CreatePerson` 的原型添加一个 `sayName` 方法
3. 使用 `new` 操作符创建一个 `CreatePerson` 的实例，实例将会继承 `CreatePerson.prototype`；而且由于存在原型继承的特性，所以实例同于也是 `Object` 的实例；
4. 通过 `instanceof` 可以检测实例与构造函数的关系；

## ES6 的类结构

### 基本的类声明语法

声明类的格式：`class <类名> {}`；

例如：

```js learn02.js
    class CreatePerson {
        constructor (name) {
            this.name = name;
        }

        sayName () {
            console.log(this.name);
        }
    }

    let person = new CreatePerson('example');
    person.sayName(); // example

    console.log(person instanceof CreatePerson); // true
    console.log(person instanceof Object); // true

    console.log(typeof CreatePerson); // function
    console.log(typeof CreatePerson.prototype.sayName); // function

```

这里直接在类中通过特殊的 `constructor` 方法名来定义构造函数；这种类的构造方式使用简介语法来定义方法，因而不需要通过 `function` 关键字来定义；

私有属性是示例中的属性，**私有属性不会存在于原型上，并且只能在类的构造函数或方法中添加**，建议在构造函数中创建所有的私有属性，从而值通过一处就可以管理类中的所有私有属性；

通过 `console.log(typeof CreatePerson); // function` 可以看出 ES6 中的类声明是基于已有自定义类型声明的语法糖，`CreatePerson` 声明实际上创建了一个具有构造函数方法行为的函数；而 `sayName` 方法实际上是 `CreatePerson.prototype` 上的一个方法；通过语法糖包装以后，类就可以代替自定义类型的功能

> 与真正的函数不同，类属性不可以被赋予新值，例如：`CreatePerson.prototype` 就是 `CreatePerson` 的只读属性。`CreatePerson.prototype` 本身就是一个对象，我们只能够对该对象的属性和方法进行操作，而不能够使用另一个对象来替换该对象

### ES6 类声明的进一步了解

尽管 ES6 类声明与自定义类型之间有诸多相似之处，但是我们仍是需要知道它们之间的差异：

1. 自定义类型通过函数进行声明，函数声明可以被提升，而类声明与 `let` 类似，不能被提升；在声明之前，它们会存在于临时死区中；
2. 类声明中的所有代码将自动运行在严格模式下，而且无法强行让代码脱离严格模式中执行；
3. 在自定义类型中，需要通过 `Object.defineProperty()` 方法手动指定某个方法为不可美剧；而在类中，所有方法都是不可枚举的。
4. 每一个类都有 `[[Construct]]` 的内部方法，通过关键字 `new` 调用时将会执行 `[[Construct]]` 方法，而没有 `[[Construct]]` 的方法的函数，不能通过 `new` 进行调用。
5. 使用除关键字 `new` 以外的方式调用类的构造函数会导致程序抛出错误，而执行构造函数的话，将会执行 `[[Call]]` 内部方法。
6. 在类中修改类名会导致程序报错。

我们可以模拟类的语法，编写等价代码，创建近类结构：

```js learn03.js
    let CreatePerson = (function () {

        "use strict";
        
        // 模拟 constructor 行为
        const CreatePerson = function (name) {

            if (typeof new.target === 'undefined') {
                throw new Error ('必须通过关键字 new 调用构造函数');
            }

            this.name = name;
        }

        // 模拟定义内部方法
        Object.defineProperty(CreatePerson.prototype, 'sayName', {
            value: function () {

                if (typeof new.target !== 'undefined') {
                    throw new Error('不可使用关键字 new 调用该方法');
                }

                console.log(this.name);
                
            },
            enumerable: false,
            writable: true,
            configurable: true
        });

        return CreatePerson;
    })();

    let person = new CreatePerson('example');

    person.sayName(); // example
```

在外部作用域中的 `CreatePerson` 是通过 `let` 进行声明的，而内部作用域中的 `CreatePerson` 是通过 `const` 进行声明的，所以在内部不能修改 `CreatePerson` 的名称，（ES6 类声明的时候，也不能在内部更换绑定 `new.target` 来限制调用方式；最后将这个定义完成的构造函数返回；

上面的示例模拟了 ES6 中类的实现
