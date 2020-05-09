---
title: typescript-工具类型
tags:
  - 速记
  - typescript
categories:
  - - TYPESCRIPT
abbrlink: 2f4e1b63
date: 2020-05-09 11:47:41
---


{% note default %}

-   `infer` 声明一个类型变量并对它进行使用，可以用于函数类型的参数/返回值
-   `Partial<T>` 将某个类型的属性全部变为可选项
-   `Required<T>` 将某个类型的属性全部变为必选
-   `Readonly<T>` 将某个类型的属性全部变为只读
-   `Record<K extends keyof any, T>` 将 K 中所有的属性的值转换为 T 类型
-   `Pick<T, K extends keyof T>` 将类型 T 中的子属性挑出来，变成包含这个类型部分属性的子类型
-   `Omit<T, K extends keyof any>` 将类型 T 中的子属性中属于 K 的部分 挑出来，变成不包含这个类型部分属性的子类型
-   `Exclude<T, U>` 将类型 T 中属于类型 U 的属性移除
-   `Extract<T, U>`将类型 T 中属于类型 U 的属性挑选出来
-   `NonNullable<T>` 过滤掉类型 T 中的 null 和 undefined 类型
-   `ReturnType<T>` 的作用是用于获取函数 T 的返回类型。
-   `InstanceType<T>` 的作用是获取构造函数类型的实例类型。
-   `ThisType<T>` 的作用是用于指定上下文对象的类型。
-   `Parameters<T>` 的作用是用于获得函数的参数类型组成的元组类型。
-   `ConstructorParameters<T>` 的作用是用于获得构造函数的参数类型组成的元组类型。（如果 T 不是函数，则返回的是 never 类型）。

{% endnote %}

<!-- more -->

---

## infer

使用示例：

```ts
type FunctionReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

-   `infer R` 表示符合函数类型的返回值
-   这里使用了 TS 的条件语法，如果 T 和 `(...args:any[]) => ...` 类型，那么 `FunctionReturnType<T>` 类型就是 T 的返回值类型，否则就是 `any`

## Partial

定义：

```ts
// node_modules/typescript/lib/lib.es5.d.ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

使用示例：

```ts
interface Todo {
    title: string;
    description: string;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}
const todo1 = {
    title: "organize desk",
    description: "clear clutter",
};
const todo2 = updateTodo(todo1, {
    description: "throw out trash",
});
```

## Required

定义：

```ts
// node_modules/typescript/lib/lib.es5.d.ts
/**
 * Make all properties in T required
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

### Record

定义：

```ts
// node_modules/typescript/lib/lib.es5.d.ts
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

示例：

```ts
interface PageInfo {
    title: string;
}
type Page = "home" | "about" | "contact";
const x: Record<Page, PageInfo> = {
    about: { title: "about" },
    contact: { title: "contact" },
    home: { title: "home" },
};
```

## Pick

定义:

```ts
// node_modules/typescript/lib/lib.es5.d.ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

示例：

```ts
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}
type TodoPreview = Pick<Todo, "title" | "completed">;
const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
};
```

## Omit

定义：

```ts
// node_modules/typescript/lib/lib.es5.d.ts
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

示例：

```ts
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}
type TodoPreview = Omit<Todo, "description">;
const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
};
```

## Exclude

定义：

```ts
// node_modules/typescript/lib/lib.es5.d.ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

示例：

```ts
type T0 = Exclude<"a" | "b" | "c", "a">;
type T1 = Exclude<"a" | "b" | "c", "a" | "d">;
```

## Extract

定义：

```ts
// node_modules/typescript/lib/lib.es5.d.ts
/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;
```

示例：

```ts
type T0 = Extract<"a" | "b" | "c", "a" | "c">;

// T0 = "a" | "c"
```

## NonNullable<T>

定义：

```ts
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;
```

示例：

```ts
type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]
```

## ReturnType<T>

```ts
定义：

// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

示例：

```ts
type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<(s: string) => void>; // void
type T2 = ReturnType<<T>() => T>; // {}
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T4 = ReturnType<any>; // any
type T5 = ReturnType<never>; // any
type T6 = ReturnType<string>; // Error
type T7 = ReturnType<Function>; // Error
```

## InstanceType

定义：

```ts
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
```

示例：

```ts
class C {
    x = 0;
    y = 0;
}

type T0 = InstanceType<typeof C>; // C
type T1 = InstanceType<any>; // any
type T2 = InstanceType<never>; // any
type T3 = InstanceType<string>; // Error
type T4 = InstanceType<Function>; // Error
```

## ThisType

定义：

```ts
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Marker for contextual 'this' type
 */
interface ThisType<T> {}
```

> 注意：使用 ThisType<T> 时，必须确保 --noImplicitThis 标志设置为 true。

示例：

```ts
interface Person {
    name: string;
    age: number;
}

const obj: ThisType<Person> = {
    dosth() {
        this.name; // string
    },
};
```

## Parameters<T>

定义：

```ts
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

示例：

```ts
type A = Parameters<() => void>; // []
type B = Parameters<typeof Array.isArray>; // [any]
type C = Parameters<typeof parseInt>; // [string, (number | undefined)?]
type D = Parameters<typeof Math.max>; // number[]
```

## ConstructorParameters<T>

定义：

```ts
// node_modules/typescript/lib/lib.es5.d.ts

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
```

示例：

```ts
type A = ConstructorParameters<ErrorConstructor>; // [(string | undefined)?]
type B = ConstructorParameters<FunctionConstructor>; // string[]
type C = ConstructorParameters<RegExpConstructor>; // [string, (string | undefined)?]
```

## 参考网站

-   [semlinker 全栈修仙之路 -- 掌握 TS 这些工具类型，让你开发事半功倍](https://mp.weixin.qq.com/s?__biz=MzI2MjcxNTQ0Nw==&mid=2247484142&idx=1&sn=946ba90d10e2625513f09e60a462b3a7&chksm=ea47a3b6dd302aa05af716d0bd70d8d7c682c9f4527a9a0c03cd107635711c394ab155127f9e&scene=21#wechat_redirect)
