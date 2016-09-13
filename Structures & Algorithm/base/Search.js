// 正向顺序查询
function sequentialSearchForward(arr, key) {
	const len = arr.length
	let i = -1
	arr = arr.slice()
	arr[len] = key
	while (arr[i] !== key) {
		i++
	}
	return i === len ? -1 : i
}
// 反向顺序查询
function sequentialSearchBackward(arr, key) {
	const temp = arr[0]
	let i = arr.length
	arr = arr.slice()
	arr[0] = key
	while (arr[i] !== key) {
		i--
	}
	return i === 0 && temp !== key ? -1 : i
}
// 二分查询
// 要求：数字关键码，且有序(通常为从小到大)
function binarySearchForward(arr, key) {
	// 三种下标
	let low, mid, high
	low = 0
	high = arr.length - 1

	while (low <= high) {
		mid = Math.floor(high + low / 2)
		if (key < arr[mid]) {
			high = mid - 1
		} else if (key > arr[mid]) {
			low = mid + 1
		} else {
			return mid
		}
	}
	return -1
}
// 从大到小
function binarySearchBackward(arr, key) {
	// 三种下标
	let low, mid, high
	low = 0
	high = arr.length - 1

	while (low <= high) {
		mid = Math.floor(high + low / 2)
		if (key > arr[mid]) {
			high = mid - 1
		} else if (key < arr[mid]) {
			low = mid + 1
		} else {
			return mid
		}
	}
	return -1
}

// 插值查找
// 适应于关键码分布均匀的顺序表中
function interpolationSearchForward(arr, key) {
	let low, mid, high
	low = 0
	high = arr.length - 1

	while (low <= high) {
		mid = Math.floor(low + (key - arr[low]) / (arr[high] - arr[low]) * (high - low))

		if (arr[mid] === undefined) return -1
		if (key < arr[mid]) {
			high = mid - 1
		} else if (key > arr[mid]) {
			low = mid + 1
		} else {
			return mid
		}
	}

	return -1
}

function fibonacciSearch(arr, key) {
	function createFibonacciArray(n) {
		let i = 2, arr = [], temp
		arr[0] = 0
		arr[1] = 1
		while ((temp = arr[i - 1] + arr[i - 2]) < n) {
			arr[i] = temp
			i++
		}
		return arr
	}
	let low, mid, high, i, j, F
	low = 0
	high = arr.length - 1
	F = createFibonacciArray(high)
	// TODO
}

test(interpolationSearchForward)

function test(fn) {
	var a = [1,2,3,4,5]
	console.log(fn(a, -1), -1)
	console.log(fn(a, 1), 0)
	console.log(fn(a, 3), 2)
	console.log(fn(a, 5), 4)
	console.log(fn(a, 6), -1)
}
