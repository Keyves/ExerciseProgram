# 跨域通信
[TOC]

## 同源策略

origin: http://store.company.com/dir/page.html

| URL                                      | 同源   | 原因         |
| ---------------------------------------- | ---- | ---------- |
| http://store.company.com/dir2/other.html | 是    |            |
| http://store.company.com/dir/inner/another.html | 是    |            |
| https://store.company.com/secure.html    | 否    | 协议不同       |
| http://store.company.com:81/dir/etc.html | 否    | 端口不同(默认80) |
| http://news.company.com/dir/other.html   | 否    | 主机名不同      |

---

## jsonp

根据image，script，iframe等标签的src被浏览器允许加载其它domain资源的特性，将回调函数名作为参数传递
```html
client:
<script>
	function callback_fn(data) {
		console.log(data)
	}
</script>
<script src="http://xxxx.com/yyy?callback=callback_fn"></script>
```
```js
callback_fn({x : 1, y: 2})
```
* 优点
  兼容性尚可

* 缺点
  只能为get请求，不能传输大数据

---

## cors

Server response header

| 属性名                              | 值                                        | 含义       |
| -------------------------------- | ---------------------------------------- | -------- |
| Access-Control-Allow-Origin      | * or ip address                          | 来源地址     |
| Access-Control-Allow-Methods     | POST                                     | 请求类型     |
| Access-Control-Allow-Credentials | true                                     | cookie凭证 |
| Access-Control-Allow-Headers     | Origin, X-Requested-With, Content-Type, Accept | 请求头属性    |
| Access-Control-Max-Age           | 1000                                     | 缓存时间     |

* 优点
  可自由定义跨域来源，允许合法来源的各类跨域请求
* 缺点
  兼容性一般，部分浏览器未实现，安全性一般

---

## iframe + window.domain

```javascript
window.domain = 'http://127.0.0.1'
// iframe 加载的页面内也需要有这一句，即可调用iframe的全局对象
function test(){
  var win = document.getElementById("iframe").contentWindow; //获取window对象
  console.log(win);
}
var iframe = '<iframe id="iframe" src="http://127.0.0.1:9000/domain.html" onload="test()"></iframe>'
document.body.innerHTML = iframe
```
设置相同的domain可以共享全局对象

---

## iframe + window.name

```javascript
window.domain = 'http://127.0.0.1'
// iframe 加载的页面内也需要有这一句，即可调用iframe的全局对象
function test(){
  var win = document.getElementById("iframe").contentWindow; //获取window对象
  console.log(win.name);
}
var iframe = '<iframe id="iframe" src="http://127.0.0.1:9000/domain.html" onload="test()"></iframe>'
document.body.innerHTML = iframe
```
同一个窗口下面的多个页面共享window.name

---

## iframe/open + postMessage

```js
// Sender
// '<iframe id="iframe" src="http://reciever"></iframe>'
// window.open('http://receiver')
var onmessage = function (event) {
    var data = event.data;
    var origin = event.origin;
};
window.addEventListener('message', onmessage, false);
// window.attachEvent('onmessage', onmessage);
```
```js
// Receiver
window.top.postMessage({u: "alsy"}, "http://sender");
```
HTML5 新API

---

## iframe + window.navigation

* 原理：iframe之间是共享`navigator`对象的，用它来传递信息
* 要求：IE6/7

```js
// a.com
navigation.onData(){
    // 数据到达的处理函数
}
typeof navigation.getData === 'function' 
    || navigation.getData()
```
```js
// b.com
navigation.getData = function(){
     typeof navigation.onData === 'function'
                || navigation.onData(data)
}
```







