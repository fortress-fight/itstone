---
title: DOM操作与浏览器渲染
date: 2018-10-30 17:41:59
tags:
    - DOM
    - 浏览器
folder:
    - 随手记
categories:
    - 随手记
---

---

<!-- more -->

## 前言

1. [DOM 操作成本到底高在哪儿？](https://segmentfault.com/a/1190000014070240)
2. [关键渲染路径](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/?hl=zh-cn)

**操作 DOM 的成本很高，不要轻易操作 DOM** 目前随着 React 、VUE 等 MV\* 框架的出现，以数据驱动视图的模式成为主流；开发者无需像之前一样的关注 DOM 操作，也导致了 jQuery 的使用渐渐减少而 lodash 这种高度模块化的方法库的使用者渐渐增加，当然这些都是题外话。本文的作者主要讲解了，为什么 DOM 操作会成为消耗浏览器性能的大户（主要讲解的是浏览器渲染的相应步骤）。

关键渲染路径文章
在处理交互更新的过程中，理想的情况下是每秒处理 60 帧，但是浏览器在渲染页面的时候会面临很多问题，关键渲染路径这篇文章介绍了浏览器如何显示页面的；已经如何提高网站的速度；

![progressive-rendering.png](http://resources.ffstone.top/resource/image/progressive-rendering.png)

### DOM

DOM -- Document Object Model （文本对象模型）  
HTML -- Hyper Text Markup Language （超文本标记语言）
CSSOM -- CSS Object Model (CSS 对象模型)

文本对象模型是为 HTML 或者 XML 提供的 API，HTML 在 DOM 的模型标准中被视为对象；而 DOM 只提供编程接口，并没有提供实际操作 HTML 里面的内容，而在浏览器端，我们可以使用 JavaScript 使用 DOM 去操作 HTML 的内容。当然，DOM 的编程接口不仅仅提供给 JavaScript ，很多语言也都具有操作 DOM 的能力；

### 浏览器

通常来说我们浏览的页面是在浏览器中进行渲染的，浏览器对其的渲染方式大致如下：

1. 解析 HTML，构建 DOM 树。如果遇到外链，将会发起请求；
2. 解析 CSS, 生成 CSSOM 树；
3. 合并 DOM 树和 CSS 规则，生成 render 树 (渲染树)；
4. 布局 render 树（Layout/reflow）, 负责各元素尺寸、位置的计算；
5. 绘制 render 树（paint）, 绘制页面像素信息；(浏览器会将各层的信息发送给 GPU，GPU 将各层合成，显示在屏幕上)

浏览器渲染页面的时候首先是要构建 DOM 和 CSSOM (在 CSSOM 没有加载之前会阻塞 JS 的加载) ，所以我们需要尽快的将 HTML 和 CSS 提供给浏览器；并且无论是 DOM 还是 CSSOM 都是经过：`Bytes => Characters => tokens => nodes => Object Model` 的过程；

-   注：  
     Bytes -- 字节  
     Characters -- 字符  
     tokens -- 令牌  
     nodes -- 节点  
     Object Model -- 对象模型  
     DOM 和 CSSOM 都是独立的数据结构

Chrome DevTools Timeline 让我们可以捕获和检查 DOM 和 CSSOM 的构建和处理开销。 -- [Chrome 开发者工具](https://developers.google.com/web/tools/chrome-devtools/)

## 浏览器渲染

`Bytes => Characters => tokens => nodes => Object Model`

### 构建 DOM 树

![full-process.png](http://resources.ffstone.top/resource/image/full-process.png)

1. 转换：Bytes => Characters
   浏览器从磁盘或网络读取 HTML 的原始字节，并根据文件的指定编码（例如 UTF-8）将它们转换成各个字符。
2. 令牌化：Characters => tokens
   浏览器将字符串转换成 W3C HTML5 标准规定的各种令牌，例如，`“<html>”、“<body>”`，以及其他尖括号内的字符串。每个令牌都具有特殊含义和一组规则。
3. tokens => nodes
   发出的令牌转换成定义其属性和规则的“对象”
4. nodes => Object Model
   最后，由于 HTML 标记定义不同标记之间的关系（一些标记包含在其他标记内），创建的对象链接在一个树数据结构内，此结构也会捕获原始标记中定义的父项-子项关系：HTML 对象是 body 对象的父项，body 是 paragraph 对象的父项，依此类推。

浏览器每次处理 HTML 标记时，都会完成以上所有步骤：将字节转换成字符，确定令牌，将令牌转换成节点，然后构建 DOM 树。这整个流程可能需要一些时间才能完成，有大量 HTML 需要处理时更是如此。

如果您打开 Chrome DevTools 并在页面加载时记录时间线，就可以看到一堆 HTML 字节转换成 DOM 树花费的时间。对于较大的页面，这一过程需要的时间可能会显著增加。创建流畅动画时，如果浏览器需要处理大量 HTML，这很容易成为瓶颈。

DOM 树捕获文档标记的属性和关系，但并未告诉我们元素在渲染后呈现的外观。那是 CSSOM 的责任。

### 构建 CSSOM 树

![construction](http://resources.ffstone.top/resource/image/construction)

CSS 字节转换成字符，接着转换成令牌和节点，最后链接到一个称为“CSS 对象模型”(CSSOM) 的树结构内：

![cssom-tree.png](http://resources.ffstone.top/resource/image/cssom-tree.png)

在计算各个节点的样式的时候，浏览器都会先从该节点的普遍属性开始，再去应用该节点的具体属性。并且由于每个浏览器都有自己默认的样式表，因此很多时候 CSSOM 只是对这样默认样式表的部分替换；

要了解 CSS 处理所需的时间，您可以在 DevTools 中记录时间线并寻找“Recalculate Style”事件：与 DOM 解析不同，该时间线不显示单独的“Parse CSS”条目，而是在这一个时间下，一同捕获解析和 CSSOM 树构建，以及计算的样式的递归计算。

上面说过 DOM 和 CSSOM 都是独立的数据结构，但是页面渲染的 CSSOM 和 DOM 是相互关联的，说明了浏览器还做了一步 -- 将 DOM 于 CSSOM 关联在一起；

### 生成 render 树

DOM 树用于描述内容，CSS 描述了需要对文档应用的样式规则；而 render 树是 DOM 树和 CSSOM 树的合并，使得浏览器可以在屏幕上渲染像素；

render 树：

1. 生成 render 树

    ![render-tree-construction.png](http://resources.ffstone.top/resource/image/render-tree-construction.png)

2. 渲染树只包含渲染网页所需要的节点

    DOM 树是从根节点开始遍历**可见节点**。如果遇到了 `display:none;` 的不可见节点或者是本身即为不可见节点（脚本标记、元标记等），**在渲染的过程中将会跳过该节点**（这里就能解释很多切页面时遇到的问题）。而对于可见节点应用为其找到的 CSSOM 规则并应用。最后将可见节点连同内容和计算样式发送给浏览器；

    注：'visibility:hidden; 是隐藏元素，但是该元素依占据布局控件'

3. 布局计算每个对象的精确位置和大小

    在得到内容和计算样式后，我们并没有计算它们在设备时候内的确切位置和大小，这时就需要进入布局阶段；
    布局流程的输出是一个“盒模型”，它会精确地捕获每个元素在视口内的确切位置和尺寸：所有相对测量值都转换为屏幕上的绝对像素。

4. 浏览器绘制像素到屏幕上

    最后我们得到了渲染时需要的节点信息，这样浏览器就可以将每个节点转换成为屏幕上的实际像素；

我们可以在 DevTools 中查看渲染中各个阶段具体信息；

执行渲染树构建、布局和绘制所需的时间将取决于 **文档大小**、**应用的样式**，以及 **运行文档的设备**：文档越大，浏览器需要完成的工作就越多；样式越复杂，绘制需要的时间就越长（例如，单色的绘制开销“较小”，而阴影的计算和渲染开销则要“大得多”）。

#### 补充

1. 在渲染过程中，渲染步骤将会多次执行。比如说通过 JS 操作 DOM 后，浏览器将会重新构建 DOM、CSSOM 树，重新渲染、布局以及绘制；
2. 如果修改了 Layout ，将会产生（reflow 回流），将会导致再次消耗 GPU 重新出发绘制页面；
3. 如果仅修改了绘制部分（例如：修改了颜色）会产生 （repaint 重绘）；
4. 图片下载完成以后同样会重新触发 Layout 和 Paint (绘制);

![tree-relationship.png](http://resources.ffstone.top/resource/image/tree-relationship.png)

## 优化关键渲染路径

浏览器对页面的渲染方式大致如下：

1. 解析 HTML，构建 DOM 树。如果遇到外链，将会发起请求；
2. 解析 CSS, 生成 CSSOM 树；
3. 合并 DOM 树和 CSS 规则，生成 render 树 (渲染树)；
4. 布局 render 树（Layout/reflow）, 负责各元素尺寸、位置的计算；
5. 绘制 render 树（paint）, 绘制页面像素信息；(浏览器会将各层的信息发送给 GPU，GPU 将各层合成，显示在屏幕上)

一个简单的页面渲染就需要完成相当多的工作。如果 DOM 或 CSSOM 被修改，您只能再执行一遍以上所有步骤，以确定哪些像素需要在屏幕上进行重新渲染；

**优化关键渲染路径**就是指最大限度缩短执行上述第 1 步至第 5 步耗费的总时间。 这样一来，就能尽快将内容渲染到屏幕上，此外还能缩短首次渲染后屏幕刷新的时间，即为交互式内容实现更高的刷新率。

为了更好的优化渲染速度，我们还需要了解以下几个方面；

### 阻塞渲染的 CSS

默认情况下，**CSS 被视为阻塞渲染的资源**，这意味着浏览器将不会渲染任何已处理的内容，直至 CSSOM 构建完毕。请务必精简您的 CSS，尽快提供它，并利用媒体类型和查询来解除对渲染的阻塞。

从渲染树的构建步骤中，我们可以知道只有 DOM 树和 CSSOM 树都存在的时候，才会构建渲染树，也就是说 HTML 和 CSS 都会阻塞浏览器渲染资源。由于 HTML 的加载不可避免，我们可以通过优化 CSS 的方式来减少阻塞时间；

加载 CSS 特点：

1. 默认下，CSS 会被视作阻塞渲染的资源
2. 通过媒体资源类型和媒体查询将一些 CSS 资源标记为不阻塞渲染

    ```html
        <link href="style.css" rel="stylesheet">
        <link href="print.css" rel="stylesheet" media="print">
        <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
        <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    ```

    上述示例中，第三个声明具有动态媒体查询，将在网页加载时计算。根据网页加载时设备的方向，portrait.css 可能阻塞渲染，也可能不阻塞渲染。

3. 浏览器会下载所有 CSS 资源，无论是否为阻塞资源

注：**CSS 是阻塞渲染的资源。需要将它尽早、尽快地下载到客户端，以便缩短首次渲染的时间。**

### 使用 JavaScript 添加交互

JavaScript 也会阻止 DOM 构建和延缓网页渲染。 为了实现最佳性能，可以让您的 JavaScript 异步执行，并去除关键渲染路径中任何不必要的 JavaScript。

1. JavaScript 可以查询和修改 DOM 与 CSSOM

2. JavaScript 执行会阻止 CSSOM

    JavaScript 不仅可以读取和修改 DOM 属性，还可以读取和修改 CSSOM 属性。如果在 CSSOM 还没完成前，修改元素的 CSS 属性，就会与 CSSOM 形成竞态问题；  
    所以在浏览器尚未完成 CSSOM 的下载和构建时运行脚本，会对性能不利。最终**浏览器决定将延迟脚本执行和 DOM 构建，直至其完成 CSSOM 的下载和构建**。

3. 除非将 JavaScript 显式声明为异步，否则它会阻止构建 DOM。

    当 HTML 解析器遇到一个 script 标记时，它会暂停构建 DOM，将控制权移交给 JavaScript 引擎；等 JavaScript 引擎运行完毕，浏览器会从中断的地方恢复 DOM 构建。

简言之，JavaScript 在 DOM、CSSOM 和 JavaScript 执行之间引入了大量新的依赖关系，从而可能导致浏览器在处理以及在屏幕上渲染网页时出现大幅延迟，而 “优化关键渲染路径” 在很大程度上是指了解和优化 HTML、CSS 和 JavaScript 之间的依赖关系谱。

无论我们使用 `<script>` 标记还是内联 JavaScript 代码段，您都可以期待两者能够以相同方式工作。 在两种情况下，浏览器都会先暂停并执行脚本，然后才会处理剩余文档。

不过，如果是外部 JavaScript 文件，浏览器必须停下来，等待从磁盘、缓存或远程服务器获取脚本，这就可能给关键渲染路径增加数十至数千毫秒的延迟。

默认情况下，所有 JavaScript 都会阻止解析器。由于浏览器不了解脚本计划在页面上执行什么操作，它会作最坏的假设并阻止解析器。向浏览器传递脚本不需要在引用位置执行的信号既可以让浏览器继续构建 DOM，也能够让脚本在就绪后执行；例如，在从缓存或远程服务器获取文件后执行。
为此，我们可以将脚本标记为*异步*（异步关键字可以指示浏览器在等待脚本可用期间不阻止 DOM 构建，这样可以显著提升性能）：

```html
    <script src="app.js" async></script>
```

注：

1. 异步的问题在于不知道在代码执行的时候 DOM 是否加载完毕，但是通常在页面中，我们会将需要在 DOM 加载完毕后需要执行的代码放入 `window.onDOMContentLoaded` 里面，所以将 `script` 放到 `header` 里，使用异步可以加速页面的加载。但是如果多个 JS 文件具有相互依赖的关系，同时使用异步行为的话，无法保证加载顺序，需要注意；
2. defer 这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后，**触发 DOMContentLoaded 事件前执行**。如果缺少 src 属性（即内嵌脚本），该属性不应被使用，因为这种情况下它不起作用。对动态嵌入的脚本使用 `async=false` 来达到类似的效果。

#### 补充

[使用 Lighthouse 审核页面](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp?hl=zh-cn#lighthouse)

## 分析渲染性能

目的：让浏览器尽可能快的绘制页面，减少访客看到空白屏幕的时间
方法：优化加载的资源以及再加顺序

### reflow 与 repaint

1. reflow 回流

现代浏览器会对回流进行优化，它将会等到足够的数量的变化发生的时候，统一做一次批处理处理回流；

以下情况将会造成回流：

1. 页面第一次渲染
2. DOM 树发生变化
3. Render 树发生变化
4. 浏览器窗口大小发生变化
5. **获取元素的某些属性**

    浏览器为了获取正确的值，也会提前触发回流；这些属性包括 `offsetLeft`、`offsetTop`、`offsetWidth`、`offsetHeight`、`scrollTop/Left/Width/Height`、`clientTop/Left/Width/Height`、调用了 `getComputedStyle()` 或者 IE 的 `currentStyle`;

6. repaint 重绘

首先触发了 reflow 的，必定触发重绘；其次修改了背景色、颜色、以及字体也将会触发重绘

#### 优化方式

1. 避免逐个修改节点样式，尽量一次性修改
2. 使用 DocumentFragment 将需要多次修改的 DOM 元素缓存，最后一次性 append 到真实 DOM 中渲染
3. 可以将需要多次修改的 DOM 元素设置 display: none，操作完再显示。（因为隐藏元素不在 render 树内，因此修改隐藏元素不会触发回流重绘）
4. 避免多次读取某些属性
5. 将复杂的节点元素脱离文档流，降低回流成本

## 文件加载与浏览器的渲染

### 资源加载

1. DOMContentLoaded 与 Load

    DOMContentLoaded 是指 DOM 加载完成时触发；
    Load 是在页面上所有的 DOM, 样式表，脚本，图片都已经加载完成后触发；

2. CSS 资源加载

    由于 Render 树是有 DOM 树和 CSSOM 树合成，所以 HTML 和 CSS 都将会阻塞渲染，所以让 CSS 放在头部进行优先加载将会更加合适，可以缩短首次渲染时间；

3. JS 资源

    JS 加载将会阻塞浏览器的解析，也就是说发现了一个外链脚本时，如果不加上 defer 或 async 属性，浏览器将会选择等待脚本下载完成并执行后才会继续解析 HTML；（在浏览器中 JS 引擎线程和渲染线程是互斥的）

    补充：  
    async 异步执行，异步下载完毕后就会执行，不确保执行顺序，一定在 onload 前，但不确定在 DOMContentLoaded 事件的前后  
    defer 延迟执行，相当于放在 body 最后（理论上在 DOMContentLoaded 事件前）

### 浏览器渲染示例

```html
    <html>
    <head>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link href="style.css" rel="stylesheet">
    </head>
    <body>
        <p>Hello <span>web performance</span> students!</p>
        <div><img src="awesome-photo.jpg"></div>
        <script src="app.js"></script>
    </body>
    </html>
```

图片示例：

![analysis-dom-css-js-async.png](http://resources.ffstone.top/resource/image/analysis-dom-css-js-async.png)

渲染步骤：请求页面 => 获取页面 => 渲染 DOM / 请求外链 => 建立 CSSOM 树 => 运行 JS => 渲染页面

注意：

1. 这里要特别注意，由于有 CSS 资源，CSSOM 还未构建前，会阻塞 js（如果有的话）
2. 无论 JavaScript 是内联还是外链，只要浏览器遇到 script 标记，唤醒 JavaScript 解析器，就会进行暂停 blocked 浏览器解析 HTML，并等到 CSSOM 构建完毕，才执行 js 脚本

### 优化建议

1. 减少资源请求数量（内联亦或是延迟动态加载）
2. 使 CSS 样式表尽早加载，减少@import 的使用，因为需要解析完样式表中所有 import 的资源才会算 CSS 资源下载完
3. 异步 js：阻塞解析器的 JavaScript 会强制浏览器等待 CSSOM 并暂停 DOM 的构建，导致首次渲染的时间延迟

## 待补充：

[关键渲染路径](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/?hl=zh-cn)

[Chrome 开发者工具](https://developers.google.com/web/tools/chrome-devtools/)
[Chrome 开发者工具教程](http://discover-devtools.codeschool.com/)

[视频教程](https://www.udacity.com/courses/web-development)

[从 setTimeout-setInterval 看 JS 线程](https://segmentfault.com/a/1190000013702430#articleHeader2)
