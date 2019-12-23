---
title: 制作Hexo主题
date: 2019-12-22 23:03:57
categories:
- Hexo
---

https://github.com/Shen-Yu/hexo-theme-ayer 参考

翻找了半天主题，一直没有找到自己想要的，要么太复杂，要么太简单，总是差点意思，最后决定还是自己制作一个好了。

不过从头开始有点太麻烦了，所以打算基于[Apollo](https://github.com/pinggod/hexo-theme-apollo)这款主题，做一些定制化更改。本帖就记录一下其中的改动点好了

## Gitalk

> [Gitalk](https://gitalk.github.io)是一款使用Github的issue记录评论的插件，非常适合放在Github上的静态博客

## Search

> [hexo-generator-searchdb](https://github.com/theme-next/hexo-generator-searchdb)为静态博客生成搜索所需数据

## Less

> [hexo-renderer-less](https://github.com/hexojs/hexo-renderer-less)使主题可使用less

```bash
$ npm install hexo-renderer-less --save
```

在主题目录下的`_config.yml`中添加less文件的路径

```js
less:
  paths: ['source/css']
```