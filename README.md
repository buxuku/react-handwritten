## 手写实现React

### 准备工作

使用` npx create-react-app react-handwritten`命令来快速创建一个项目,删除public和
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

接下来我们来一步步地实现React的各种API,并把每个功能以`序号.API`的形式创建分支,每一个分支会在前一个分支的基础上来创建,并在`doc`目录下
记录下当前API的实现过程.比如第一步,我们来从`1.createElement`开始.
