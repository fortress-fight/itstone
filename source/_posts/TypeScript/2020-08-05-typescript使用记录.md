---
title: typescript 使用记录
tags:
  - typescript
categories:
  - - TypeScript
abbrlink: 9f4b0247
date: 2020-08-05 09:23:31
---


{% note default %}

-   TS 报错：找不到名称 \*\*\* (缺少类型声明的错误提示)

{% endnote %}

<!-- more -->

---

## TS 报错：找不到名称 \*\*\*

**场景**：引入外部文件，使用该文件提供的外部全局变量时，TS 会提示找不到名称 \*\*\* （上述中的全局变量）
**解决方式**：这个提示性的错误和 `import` 一个没有声明的错误，都是因为缺少对于使用的变量缺少类型声明的错误提示。需要在 `global.d.ts` 或 `***.d.ts` 文件中对于该 变量/模块 进行声明。例如：

```ts
// 对于变量
declare var ***: any
```

```ts
// 对于模块
declare var ***: any;
declare module "***" {
    export default ***
}
```
