Array.prototype.swap = function(i, j) {
	var temp = this[i]
	this[i] = this[j]
	this[j] = temp
}

/***********数组去重************/
Array.prototype.unique = function () {
	var len = array.length
	var obj = {}
	var anoArr = []
	for (var j = 0; j < len; j++) {
		if (!obj[array[j]]) {
			anoArr.push(array[j])
			obj[array[j]] = array[j]
		}
	}
	console.log("去重：", anoArr)
}

/***********数组挪位************/
Array.prototype.move = function (k) {
	var len = array.length
	var anoArr = []
	/*往右边*/
	for (var j = 0; j < len; j++) {
		anoArr[(j + k) % len] = array[j]
	}
	console.log("挪位-右：", anoArr)
	/*往左边*/
	for (var j = 0; j < len; j++) {
		anoArr[j] = array[(j + k) % len]
	}
	console.log("挪位-左：", anoArr)
}


/***********快速排序************/
Array.prototype.quickSort = function () {
	var self = this

	function qksort(low, high) {
		var i, j, flag
		i = low
		j = high
		flag = self[low]
		while (i < j) {
			for (; i < j; j--) {				//从j的位置开始向前遍历
				if (self[j] < flag) {			//当出现大于标兵的数值时
					self[i++] = self[j]			//先将self[i]设置为self[j],再将最低位向后挪一位
					break						//退出当前循环
				}
			}
			for (; i < j; i++) {				//从i的位置开始向后遍历
				if (self[i] > flag) {			//当出现小于标兵的数值时
					self[j--] = self[i]			//先将self[j]设置为self[i],再将最高位向前挪一位
					break						//退出当前循环
				}
			}
		}
		self[i] = flag							//一轮排序后，将最后的i位置数值置为标兵的数值
		if (--j > low) qksort(low, j)
		if (++i < high) qksort(i, high)				//当最低位和最高位还没超出范围时，递归
	}
	qksort(0, this.length)
}

Array.prototype.qksort = function() {
	var i, j, low, high, flag, queue, temp
	queue = []

	queue.push([0, this.length])

	while (queue.length) {
		temp = queue.shift()
		i = low = temp[0]
		j = high = temp[1]
		flag = this[i]

		while (i < j) {
			for (; j > i; j--) {				//从j的位置开始向前遍历，直到low的位置
				if (this[j] < flag) {			//小于标兵
					this[i++] = this[j]			//先将this[i]设置为this[j],再将最低位增一位
					break						//退出当前循环
				}
			}
			for (; i < j; i++) {				//从i的位置开始向后遍历，直到上面j的位置
				if (this[i] > flag) {			//大于标兵
					this[j--] = this[i]			//先将this[j]设置为this[i],再将最高位减一位
					break						//退出当前循环
				}
			}
			this[j--] = this[i]
		}
		this[i] = flag

		if (--j > low) {
			queue.push([low, j])
		}
		if (++i < high) {
			queue.push([i, high])
		}
	}
}

Array.prototype.bubbleSort = function() {
	const len = this.length
	let i, j, flag = true
	for (i = 0; i < len && flag; i++) {
		flag = false
		for (j = len - 1; j >= i; j--) {
			if (this[j] > this[j + 1]) {
				this.swap(j, j + 1)
				flag = true
			}
		}
	}
}

Array.prototype.selectSort = function() {
	const len = this.length
	let i, j, min
	for (i = 0; i < len && flag; i++) {
		min = i
		for (j = i + 1; j < len; j++) {
			if (this[j] < this[min]) {
				min = j
			}
		}
		i !== min && this.swap(i, min)
	}
}

Array.prototype.insertSort = function() {
	const len = this.length
	let i, j, flag
	for (i = 0; i < len; i++) {
		// 当存在左侧大于右侧的数时
		if (this[i] > this[i + 1]) {
			// 设置标兵
			flag = this[i + 1]
			// 将所有比标兵大的数向后挪
			for (j = i; this[j + 1] > flag; j--) {
				this.swap(j - 1, j)
			}
			// 设置符合条件最小的下标为标兵的值
			this[j] = flag
		}
	}
}

/*———————————————————————————————————————————— 数组 ————————————————————————————————————————————*/
var arr = []
var total = 100
for (var n = 0; n < total; n++)
 	arr.push(Math.round(Math.random() * total))


const Benchmark = require('benchmark')
const suite = new Benchmark.Suite


suite
.add('1', function() {
	var temp = [1]
	temp.push(1)
})
.add('2', function() {
	var temp = [1]
	temp.unshift(1)
})
.add('3', function() {
	var temp = [1]
	temp.shift()
})
.add('4', function() {
	var temp = [1]
	temp.pop()
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });
