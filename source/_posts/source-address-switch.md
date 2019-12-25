---
title: 切换常用软件源地址
date: 2019-12-22 18:03
---

## 设置git代理

> 需要拥有梯子，同时开启梯子的本地sock代理或http代理

**设置git全局代理**

```bash
$ git config --global http.proxy socks5://127.0.0.1:1080
$ git config --global https.proxy socks5://127.0.0.1:1080
```

如果只想代理特定网站，例如Github，则把`https.proxy`改为`https.https://github.com.proxy`(`http.proxy`同理)。

如果想用梯子的http代理，则把`socks5://127.0.0.1:1080`改为`http://127.0.0.1:1080`

**取消代理**

```bash
$ git config --global --unset http.proxy
$ git config --global --unset https.proxy
```

如果设置时是代理特定网站，则命令改成`https.https://github.com.proxy`

> 以上仅针对拉取仓库时是https协议的，ssh协议如下

**SSH协议仓库**

修改`~/.ssh/config`文件

```
Host github.com
  HostName github.com
  User git
  # sock代理
  ProxyCommand nc -v -x 127.0.0.1:1080 %h %p
  # http代理
  # ProxyCommand socat - PROXY:127.0.0.1:%h:%p,proxyport=8080
```