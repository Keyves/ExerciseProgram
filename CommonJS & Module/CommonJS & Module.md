# CommonJS & Module

## CommonJS

**a.js**

```javascript
console.log('a.js begin')
var b = require('./b.js')
console.log('after require b.js', b)

exports.foo = function () {
	console.log('foo')
}
b.bar()

console.log('a.js end')
```

**b.js**

```javascript
console.log('b.js begin')
var a = require('./a.js')
console.log('after require a.js', a)

exports.bar = function () {
	console.log('bar')
  	a.foo();
}

console.log('b.js end')
```

**main.js**

```javascript
// *****************************************************
// first kind
require('./a.js')

// a.js begin
// b.js begin
// after require a.js {}
// b.js end
// after require b.js {bar: [Function]}
// bar
// foo
// a.js end

// *****************************************************
// second kind
// 条件：将a.js中的b.bar移动到exports.foo之前
require('./a.js')

// a.js begin
// b.js begin
// after require a.js {}
// b.js end
// after require b.js {bar: [Function]}
// bar
// Error: a.foo is not a function

// *****************************************************
// third kind
require('./b.js')

// b.js begin
// a.js begin
// after require b.js {}
// Error: b.bar is not a function



```



## Module

**a.js**

```javascript
console.log('a.js begin')
import * as b from './b.js'
console.log('after require b.js', b)

b.bar()
export function foo() {
	console.log('foo')
}

console.log('a.js end')
```

**b.js**

```javascript
console.log('b.js begin')
import * as a from './a.js'
console.log('after require a.js', a)

export function bar() {
	console.log('bar')
	a.foo();
}

console.log('b.js end')
```

**main.js**

```javascript
// *****************************************************
// first kind
import './a.js'

// b.js begin
// after require a.js {foo: [Function]}
// b.js end
// a.js begin
// after require b.js {bar: [Function]}
// bar
// foo
// a.js end

// *****************************************************
// second kind
// 条件：将a.js中的b.bar移动到exports.foo之前
import './a.js'

//输出同上

// *****************************************************
// third kind
import './b.js'

// a.js begin
// after require b.js {bar: [Function]}
// bar
// Error: a.foo is not a function




```

第三种情况：

1. 以`b.js`为入口`
2. 开始顺序执行`b.js`代码`
3. 然后加载`a.js`，执行环境转移到`a.js`
>  因为函数声明`function`带有作用域提升的能力（先声明再导出），所以此时`b`内部的`bar`是有值的，为函数`bar`，但因为`a`还没加载完成所以内部的`a`为`undefined`;如果将`function`声明换成`var | let | const`的表达式声明如`export const bar = function() {}`，`bar`的值将为`undefined`（`var`只是声明提升，并未赋值），至于为什么`var | let | const`的效果一样，因为`import` & `export` 也带有声明提升的功能
1. 开始顺序执行`a.js`代码
2. 因为已经加载过`b.js`所以获取之前加载`b.js`获得的`export`引用之后继续执行
   直到调用`b.bar`
3. 前面提到过`bar`内部的`a`此时为`undefined`，所以调用报错