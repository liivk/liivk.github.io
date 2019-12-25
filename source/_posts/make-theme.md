---
title: 制作Hexo主题
date: 2019-12-22 23:03
categories:
  - Hexo
excerpt: 翻找了半天主题，一直没有找到自己想要的，要么太复杂，要么太简单，总是差点意思，最后决定还是自己制作一个...
---

翻找了半天主题，一直没有找到自己想要的，要么太复杂，要么太简单，总是差点意思，最后决定还是自己制作一个好了。

不过从头开始有点太麻烦了，所以打算基于[Apollo](https://github.com/pinggod/hexo-theme-apollo)这款主题，做一些定制化更改。本帖就记录一下其中的改动点好了

## Gitalk

> [Gitalk](https://gitalk.github.io)是一款使用Github的issue记录评论的插件，非常适合放在Github上的静态博客

在主题的`_config.yml`中添加配置项：

```yml
# Comment
gitalk:
  enable: false # true
  clientID: '' # GitHub Application Client ID
  clientSecret: '' # Client Secret
  repo: '' # Repository name
  owner: '' # GitHub ID
  admin: '' # GitHub ID
  distractionFreeMode: false # true
```

可将gitalk的js、css资源放在`source/lib`下。

在主题的`layout/partial`文件夹中，新建一个`comment.pug`（需使用主题所选的模板）：

```pug
if theme.gitalk.enable
  link(rel="stylesheet", href=url_for("lib/gitalk.css"))
  script(src=url_for("lib/gitalk.min.js"))
  .gitalk#gitalk-container
  script.
    var gitalk = new Gitalk({
      clientID: '!{theme.gitalk.clientID}',
      clientSecret: '!{theme.gitalk.clientSecret}',
      repo: '!{theme.gitalk.repo}',
      owner: '!{theme.gitalk.owner}',
      admin: ['!{theme.gitalk.admin}'],
      id: location.pathname,
      distractionFreeMode: '!{theme.gitalk.distractionFreeMode}',  // Facebook-like distraction free mode
      pagerDirection: 'last'
    })
    gitalk.render('gitalk-container')
```

在`layout/post.pug`中文章下添加:

```pug
include partial/comment
```

主题中要加的东西就这些了，至于配置项中的配置如何申请，参见[Gitalk](https://gitalk.github.io)

因为Gitalk使用初始化时的id创建issue，为避免非法字符，可以对`location.pathname`做`md5`：

```pug
...
script(src=url_for("lib/md5.min.js"))
...
id: md5(location.pathname),
...
```

## Search

> [hexo-generator-searchdb](https://github.com/theme-next/hexo-generator-searchdb)为静态博客生成搜索所需数据

```bash
$ npm install hexo-generator-searchdb --save
```

在主题的`_config.yml`中添加配置项：

```yml
# 是否启用搜索
search: true
```

在根目录下的`_config.yml`中添加配置项：

```yml
# Search
search:
  path: search.json
  field: post
  format: html
```

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

至此即可修改css文件夹中的less样式啦

## busuanzi

> [busuanzi](https://busuanzi.ibruce.info/)访问量统计

在主题的`_config.yml`中添加选项：

```yml
# 访问量统计(不蒜子)
busuanzi: true
```

将busuanzi的js代码放到`source/lib`下，再在模板中（例如`scripts.pug`或`footer.pug`之类）添加：

```pug
//- 访问量统计
if theme.busuanzi
  script(async src=url_for("lib/busuanzi.pure.mini.js"))
```

在你想要展示访问量的地方添加

```pug
if theme.busuanzi
  .busuanzi
    <span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
```

即可。

## 修改模板

## 添加分类

在`layout`中添加分类专用模板`categories.pug`（也可以是其他名称，但不能是“category”，因为这个已经被hexo默认占用了[模板](https://hexo.io/zh-cn/docs/templates)），模板如下：

```pug
extends partial/layout

block container
  h1.categories!=  __('prev_post')
  .category-all!= list_categories(site.categories, { show_count: false })

block copyright
  include partial/copyright
```

其中继承的layout和下方的内容可以自定义，关键在`list_categories`方法，该方法由[Hexo](https://hexo.io/zh-cn/docs/helpers#list-categories)提供，会渲染出分类列表，将其放在合适的位置。

第一个参数需传递`site.categories`，将会渲染全站所有的分类数据（参考[变量](https://hexo.io/zh-cn/docs/variables)）。

第二个参数为一些个性化参数，可自由配置。

添加完成分类专用模板之后，如果想要个性化定制，还需要添加`category.pug`（必须是这个名称），在模板中通过`page.posts`获取到分类列表数据进行渲染。由于hexo会依次查找category-archive-index，当有该模板时就会拿来渲染，因此也可以在后几个模板中做兼容处理，而无需单独创建`category.pug`，参见[模板](https://hexo.io/zh-cn/docs/templates)

使用时新建page

```
$ hexo new page <title>
```

在新建的page中添加`layout`属性为自己建的专用模板的名称即可。