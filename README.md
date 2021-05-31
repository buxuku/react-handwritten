## 手写实现React

这个项目将尝试通过手写的方式来尽可能实现一个相对比较完整的React.并在实现的过程中通过笔记来记录下来一步步实现的过程.

### 说明

实现的过程将从React 15版本的API开始,一步步来实现,不直接去实现17版本是为了更深入地去了解React API,以及明白React在一次次迭代中是如何进行架构的变更和优化.

所以在实现的过程中,前期大多是按照15版本的一些特性来实现的,比如jsx转换,事件池,组件堆栈等等在新版本都是不同的实现或者有所升级,但并不担心,我们会一步步地去跟随着来实现.

另外,这个项目也不追求还原率,也不会写一些比较骚的代码,旨在以最简洁,最容易懂的代码来实现最基本的功能,以便快速梳理完React的整个框架.当大体的API我们都已经完成得八九不离十了,这个时候可以来尝试对具体API进行进一步的优化与完善,处理好各种边界问题.明白React的各种设计思想才是最重要的.

### 准备工作

使用`npx create-react-app react-handwritten`命令来快速创建一个项目,删除public和
src目录下面的所有文件.

然后在public目录下创建一个`index.html`文件,放入最简单的一个html文件.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React handwritten</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

在src目录下创建一个`index.js`文件,写下一个最简单的React组件代码.

```js
import React from 'react';
import ReactDOM from 'react-dom';

const element = <h1>hello <span>world!</span></h1>;

ReactDOM.render(
    element, document.getElementById('root')
);
```

### 起步

接下来我们来一步步地实现React的各种API,并把每个功能以`序号.功能点`的形式创建分支,每一个分支会在前一个分支的基础上来创建,并在`doc`目录记录下当前API的实现过程.以及会建一个对应的Issue,实现该功能点的相关代码都会关联到这个Issue上面.就像下面这样

![8aVQFy](https://buxuku.oss-cn-chengdu.aliyuncs.com/react-handwritten/8aVQFy.jpg)

比如第一步,我们来从[1.createElement](https://github.com/buxuku/react-handwritten/tree/1.createElement)开始.

### 目录

* [1.实现React.createElement](https://github.com/buxuku/react-handwritten/issues/1#)

* [2.虚拟DOM渲染成真实DOM](https://github.com/buxuku/react-handwritten/issues/2#)

* [3.事件处理,合成事件](https://github.com/buxuku/react-handwritten/issues/3)

* [4.组件的全量更新](https://github.com/buxuku/react-handwritten/issues/4#)

* [5.setState异步批量更新](https://github.com/buxuku/react-handwritten/issues/5#)

* [6.组件的ref, createRef, forwardRef](https://github.com/buxuku/react-handwritten/issues/6#)

* [7.基本的dom-diff](https://github.com/buxuku/react-handwritten/issues/7#)

