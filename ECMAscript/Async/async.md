# Async

```js
function setTimeoutPromise(value) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('timeout ' + value)
		},2000)
	})
}

function* setTimeoutGenerator() {
	console.log('start')
	const x1 = yield setTimeoutPromise(1)
	console.log(x1)
	console.log('middle')
	const x2 = yield setTimeoutPromise(2)
	console.log(x2)
	console.log('end')
}

function run(generatorFunc) {
	const temp = generatorFunc()

	function next(data) {
		const result = temp.next(data)
		//当generator函数执行完成时，返回运行结果
		if (result.done)
			return result.value
		//generator函数的返回值（此时强制要求为Promise对象）调用Promise对象then方法
		//并在运行完成时调用generator自动运行下一步，直到done为true（即完成）
		result.value.then((data) => {
			next(data)
		})
	}
	//启动generator自动运行
	next()
}

run(setTimeoutGenerator)
// console:
// start
// timeout 1
// middle
// timeout 2
// end
```

以上为async函数的generator实现

1. 首先通过run函数将generator函数生成的对象赋值给temp
2. 再通过内部定义的next函数调用temp.next()
3. temp.next()运行后，yield截断函数，并返回相应的promise对象
4. 调用promise.then()，并在返回结果后调用next从上次的yield出发继续运行(回到步骤3)
5. 如此往复，直到generator函数全部运行完毕，返回generator的最终返回值
