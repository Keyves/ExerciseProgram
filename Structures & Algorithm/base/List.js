/*———————————————————————————————————————————— 数组 ————————————————————————————————————————————*/
var arr = []

for (var n = 0; n < 10; n++)
	arr.push(Math.round(Math.random() * 10))

console.log(arr)

/**
 * 交换位置
 */
Array.prototype.swap = function(i, j) {
	var temp = this[i]
	this[i] = this[j]
	this[j] = temp
	return this
}

/**
 * 数组去重
 */
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

/**
 * 数组挪位
 */
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


/**
 * 插入排序
 */
Array.prototype.insertSort = function() {
	let i, j, flag, temp
	for (i = 0, len = this.length; i < len; i++) {
		j = i + 1
		flag = this[j]
		for (; j--;) {
			if (this[j] > flag) {
				this[j + 1] = this[j]
				this[j] = flag
			} else {
				break
			}
		}
	}
}

/**
 * 希尔排序
 */
Array.prototype.shellSort = function() {

}

/**
 * 堆排序
 */
Array.prototype.heapSort = function() {
 	let i, len = this.length
 	for (i = Math.floor(len / 2); i > 0; i--) {
 		this.heapAjust(i, len)
 	}
 	for (i = len; i > 1; i--) {
 		this.swap(1, i)
 		this.heapAjust(1, i - 1)
 	}
 }
Array.prototype.heapAjust = function(i, j) {
	let temp, k
	temp = this[i]
	for (k = i * 2; k < j; k *= 2) {
		if (k < j && this[k] < this[k + 1]) {
			++k
		}
		if (temp >= this[k]) {
			break
		}
		this[i] = this[k]
		i = k
	}
	this[i] = temp
}


/**
 * 归并排序
 */
 Array.prototype.mergeSort1 = function() {
	 var k = 0, len = this.length, result = []
	 while (result.length < len) {
		 this.MergePass(k, len, result)
		 k *= 2
		 this.MergePass(k, len, result)
		 k *= 2
	 }
}

Array.prototype.MergePass = function(low, high) {
	var i = 0, j
	while (i <= high - 2 * low + 1) {
		this.merge(i, i + low - 1, i + 2 * low - 1)
		i = i + 2 * low
	}
	if (i < high - low + 1)
		this.merge(i, i + low - 1, high)
	else
		for (j = i; j <= high; i++)
			console.log('what')
}

Array.prototype.mergeSort = function(low, high) {
	if (low < high) {
		var mid = Math.floor((low + high) / 2)
		this.mergeSort(low, mid)
		this.mergeSort(mid + 1, high)
		this.merge(low, mid, high)
	}
}

Array.prototype.merge = function(low, mid, high) {
	var i = low, j = mid + 1 ,k = 0, result = []
	while(i <= mid && j <= high) {
	    if(this[i] <= this[j]) { //比较第一部分和第二部分，取较小者
	        result[k++] = this[i++]
	    } else {
	        result[k++] = this[j++]
	    }
	}
	while(i <= mid) {
	    result[k++] = this[i++]
	}
	while(j <= high) {
	    result[k++] = this[j++]
	}
	for(k = 0, i = low; i <= high; k++, i++)
		this[i] = result[k]
}

/**
 * 快速排序
 */
Array.prototype.qksort = function () {
	var _this = this

	var len, temp, half

	len = this.length - 1;				//破坏有序序列，随机交换两个值
	temp = this[0]
	half = Math.floor(len/2)
	this[0] = this[half]
	this[half] = temp

	function qksort(l, h) {
		var i, j, flag, tmp
		i = l
		j = h
		flag = _this[l]
		while (i < j) {
			for (; i < j; j--) {				//从j的位置开始向前遍历
				if (_this[j] < flag) {			//当出现大于标兵的数值时
					_this[i++] = _this[j];	//先将_this[i]设置为_this[j],再将最低位向后挪一位
					break;						//退出当前循环
				}
			}
			for (; i < j; i++) {				//从i的位置开始向后遍历
				if (_this[i] > flag) {			//当出现小于标兵的数值时
					_this[j--] = _this[i];	//先将_this[j]设置为_this[i],再将最高位向前挪一位
					break;						//退出当前循环
				}
			}
		}
		_this[i] = flag;						//一轮排序后，将最后的i位置数值置为标兵的数值
		if (--j > l) qksort(l, j)
		if (++i < h) qksort(i, h);				//当最低位和最高位还没超出范围时，递归
	}
	qksort(0, len)
}


arr.mergeSort1()
console.log(arr)
