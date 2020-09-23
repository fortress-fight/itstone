---
title: typescript代码段
tags:
    - 代码段
    - typescript
categories:
    - - typescript
abbrlink: 464149fd
path:
---

{% note default %}

-   使用类的实例类型
-   axios 对返回值添加类型

{% endnote %}

<!-- more -->

---

## 使用类的实例类型

声明一个类的同时会创建两个类型：

1.  这个类的实例类型
2.  这个类的构造函数。

如果想要获得这个类的实例类型，可以使用下面的方式：

```ts
class Point {
    x: number;
    y: number;
}
interface Point3d extends Point {
    z: number;
}
var point3d: Point3d = { x: 1, y: 2, z: 3 };
```

## axios 对返回值添加类型

来源： [typescript axios 使用拦截器时封装通用返回值的方法](https://gaojiajun.cn/2019/12/typescript-axios-interceptor-commondata/)
使用： 添加文件 `axios.d.ts` 文件到当前工作目录下, 其内容如下：

```ts axios.d.ts
import "axios";

declare module "axios" {
    export interface AxiosInstance {
        <T = any>(config: AxiosRequestConfig): Promise<T>;
        request<T = any>(config: AxiosRequestConfig): Promise<T>;
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
        patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    }
}

declare global {
    namespace Ajax {
        interface Response<T> {
            ErrorMessage: string;
            ErrorCode: number;
            IsSuccess: boolean;
            Data?: T;
        }
    }
}
```
