---
title: 快速搭建Hexo+Github博客
date: 2019-12-21 23:01:35
categories: 
- Hexo
---

## 使用Hexo+Github搭建博客

好久没有弄博客了，之前用WordPress在阿里云上搭了一个，但是自从阿里云到期后就一直懒得再弄了。平时写的记的都放在为知笔记里，现在终于打算再整理一下，思来想去还是弄个托管在Github上的静态博客吧，免得以后再要迁移服务器什么的那么麻烦。

静态博客的框架有很多，Github Pages推的[Jekyll](https://jekyllrb.com/)，使用Go编写的[Hugo](https://gohugo.io/)，使用Python编写的[Pelican](https://getpelican.com/)等等，作为一个前端er，肯定就要用基于Node开发的[Hexo](https://hexo.io/zh-cn/)啦

## 本地搭建

开始之前，需要安装一下[Node](https://nodejs.org/zh-cn/)环境。推荐使用[Nvm](https://github.com/nvm-sh/nvm)来管理node环境，当然如果你只是为了写个博客，那么去node官网下载安装即可。

安装完成之后，推荐按照[切换常用软件源地址](/2019/12/source-address-switch/)中设置一下npm源和github代理，否过国内的网络环境，你懂的~

做好了准备工作，就可以按照以下步骤开始了：

- 安装hexo `npm i hexo-cli -g`

- 初始化项目 `hexo init blog`

- 进入项目并安装依赖 `cd blog && npm i`

- 启动本地服务 `hexo server`

## 个性化

Hexo支持设置主题，在官网上收录有部分[主题](https://hexo.io/themes/)，也可以去Github上自己找。

将主题clone到themes目录下（或使用git submodule来管理）

```bash
$ git clone git@github.com:XXX/XXX.git themes/XXX
// or
$ git submodule add git@github.com:XXX/XXX.git themes/XXX
```

(使用submodule可以方便在其他地方拉取主题仓库，可参考[Git submodule 子模块的管理和使用](https://www.jianshu.com/p/9000cd49822c))

按照主题里要求的安装依赖，再修改项目下`_config.yml`中的`theme`项为themes目录里的主题文件夹名即可

> 建议不要直接clone源仓库，因为如果自己有对主题做修改，那么修改是无法提交的。建议先fork主题到自己的github下，然后在clone这个fork的仓库，这样就可以push提交了



## 写博客

## 发布

## 备份源码