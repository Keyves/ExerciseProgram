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
	//启动自动generator自动运行
	next()
}
