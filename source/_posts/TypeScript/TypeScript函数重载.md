---
title: TypeScript函数重载
tags:
  - TypeScript函数重载
abbrlink: a846e40f
categories:
  - - TypeScript
date: 2019-08-18 17:09:51
---


知识点：

{% note default %}

-   `TypeScript函数重载`

{% endnote %}

<!-- more -->

---

## TypeScript 中的函数重载

示例：

```ts
type MessageType = "string" | "image" | "audio";

type Message = {
    id: number;
    type: MessageType;
    content: string;
};

const data = [
    {
        id: 1,
        type: "image",
        content: "a image"
    },
    {
        id: 2,
        type: "string",
        content: "a string"
    }
];

function getMessage(
    query: number | MessageType
): Message[] | Message | undefined {
    if (typeof query === "number") {
        return data.find(message => message.id === query);
    } else {
        return data.filter(message => message.type === query);
    }
}

const result = getMessage("string");
```

这里面存在几个问题

1. getMessage 返回参数存在多个类型，这种返回值无法直接使用，需要指定其具体类型，像这种返回值并没有价值。

    ![20190818150129.png](http://resources.ffstone.top/resource/image/20190818150129.png)

2. 在函数内部，返回一个值时，还存在返回值不能同时满足所有定义的返回类型会出现报错提示

    ![20190818150423.png](http://resources.ffstone.top/resource/image/20190818150423.png)

3. 在使用函数时，参数的提示信息，不够具体，并且无法表达出输入不同类型的不同输出类型

    ![20190818150634.png](http://resources.ffstone.top/resource/image/20190818150634.png)

**使用重载改进**

```ts
type MessageType = "string" | "image" | "audio";

type Message = {
    id: number;
    type: MessageType;
    content: string;
};

const data = [
    {
        id: 1,
        type: "image",
        content: "a image"
    },
    {
        id: 2,
        type: "string",
        content: "a string"
    }
];

function getMessage(id: number): Message | undefined;
function getMessage(type: MessageType): Message[];
function getMessage(query: any): any {
    if (typeof query === "number") {
        return data.find(message => message.id === query);
    } else {
        return data.filter(message => message.type === query);
    }
}
```

再看上述的问题：

1. 准确的返回值类型

    ![20190818151134.png](http://resources.ffstone.top/resource/image/20190818151134.png)

2. 在函数内部，返回值也不是问题

3. 函数提示信息

    ![20190818151826.png](http://resources.ffstone.top/resource/image/20190818151826.png)
    ![20190818151910.png](http://resources.ffstone.top/resource/image/20190818151910.png)

### 补充

TypeScript **重载的过程**是，拿传入的参数和重载的方法签名列表中**由上往下逐个匹配**，直到找到一个完全匹配的函数签名，否则报错。所以推荐的做法是将签名更加具体的重载放上面，不那么具体的放后面。
