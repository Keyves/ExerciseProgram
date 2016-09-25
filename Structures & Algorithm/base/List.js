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
	var self = this, i, j, mid, pivot

	;(function qksort(low, high) {
		i = low
		j = high
		mid = Math.floor((i + j) / 2)

		pivot = self[low]
		while (i < j) {
			// 从下标j遍历，将大于标兵的数存入下标i处，并将下标往后挪一位
			for (; i < j; j--) {
				if (self[j] < pivot) {
					self[i++] = self[j]
					break
				}
			}
			// 从下标i遍历，将小于标兵的数存入下标j处，并将下标往前挪一位
			for (; i < j; i++) {
				if (self[i] > pivot) {
					self[j--] = self[i]
					break
				}
			}
		}
		self[i] = pivot							//一轮排序后，将最后的下标i（大小分界点）数值置为标兵的数值

		if (--j > low) qksort(low, j)
		if (++i < high) qksort(i, high)				//当最低位和最高位还没超出范围时，递归
	})(0, this.length - 1)
}

Array.prototype.optimizeSort = function() {
	var self = this, i, j, mid, pivot, pivotIndex

	;(function qksort(low, high) {
		if (high - low <= 50) {
			self.insertSort(low, high)
		} else {
			i = low
			j = high
			mid = Math.floor((i + j) / 2)

			if (self[low] > self[high]) {
				self.swap(low, high)
			}
			if (self[mid] > self[high]) {
				self.swap(high, mid)
			}
			if (self[mid] > this[low]) {
				self.swap(mid, low)
			}

			pivot = self[low]
			while (i < j) {
				// 从下标j遍历，将大于标兵的数存入下标i处，并将下标往后挪一位
				for (; i < j; j--) {
					if (self[j] < pivot) {
						self[i++] = self[j]
						break
					}
				}
				// 从下标i遍历，将小于标兵的数存入下标j处，并将下标往前挪一位
				for (; i < j; i++) {
					if (self[i] > pivot) {
						self[j--] = self[i]
						break
					}
				}
			}
			self[i] = pivot							//一轮排序后，将最后的下标i（大小分界点）数值置为标兵的数值

			if (--j > low) qksort(low, j)
			if (++i < high) qksort(i, high)				//当最低位和最高位还没超出范围时，递归
		}
	})(0, this.length - 1)
}

Array.prototype.heapSort = function() {
	var i, len = this.length - 1
	for (i = Math.floor((len) / 2); i >= 0; i--) {
		this.heapAdjust(i, len)
	}
	for (i = len; i > 0; i--) {
		this.swap(0, i)
		this.heapAdjust(0, i - 1)
		console.log(this)
	}
}

Array.prototype.heapAdjust = function(low, high) {
	var i = low,
	    j = 2 * i,
	    pivot = this[i]
	while (j <= high) {
	    if (j < high && this[j] < this[j + 1])
			j++ //从左右子节点中选出较大的节点
	    if (pivot < this[j]) { //根节点(pivot)<较大的节点
	        this[i] = this[j]
	        i = j
	        j *= 2
	    } else {
			break
		}
	}
	this[i] = pivot //被筛选的元素放在最终的位置上
}

Array.prototype.mergeSort = function(low, high) {
	low = low !== undefined ? low : 0
	high = high !== undefined ? high : this.length - 1

	if (high !== low) {
		var mid = Math.floor((low + high) / 2)
		this.mergeSort(low, mid)
		this.mergeSort(mid + 1, high)
		this.merge(low, mid, high)
	}
}

Array.prototype.merge = function(low, mid, high) {
	var result = [], i, j
	for (i = low, j = mid + 1; i <= mid && j <= high;) {
		if (this[i] < this[j]) {
			result.push(this[i++])
		} else {
			result.push(this[j++])
		}
	}
	while (i <= mid) {
		result.push(this[i++])
	}
	while (j <= high) {
		result.push(this[j++])
	}

	result.unshift(low, result.length)
	this.splice.apply(this, result)
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

Array.prototype.insertSort = function(start, end) {
	var i, j, pivot
	end = end !== undefined ? end + 1 : this.length
	start = start !== undefined ? start : 0

	for (i = start; i < end; i++) {
		pivot = this[i]
		// 当存在左侧大于右侧的数时
		for (j = i - 1; j > start - 1 && this[j] > pivot; j--) {
			this[j + 1] = this[j]
		}
		this[j + 1] = pivot
	}
}


/*———————————————————————————————————————————— 数组 ————————————————————————————————————————————*/
var arr = []
var total = 10
for (var n = 0; n < total; n++)
 	arr.push(Math.round(Math.random() * total))

console.log(arr)
// 
// const Benchmark = require('benchmark')
// const suite = new Benchmark.Suite
//
//
//
// suite
// .add('1', function() {
// 	var temp = arr.slice()
// 	temp.quickSort()
// })
// .add('2', function() {
// 	var temp = arr.slice()
// 	temp.optimizeSort()
// })
// .on('cycle', function(event) {
//   console.log(String(event.target))
// })
// .on('complete', function() {
//   console.log('Fastest is ' + this.filter('fastest').map('name'))
// })
// .run({ 'async': true })
