function BigNumberCalculation(num1, num2) {
	var num1Arr = num1.toString().split('')
	var num2Arr = num2.toString().split('')
	var num1Len = num1Arr.length
	var num2Len = num2Arr.length


	var handleArr = []
	for (var i = 0; i < num2Len; i++) {
		handleArr[i] = []
		for (var j = 0; j < num1Len; j++) {
			handleArr[i][j] = num2Arr[i] * num1Arr[j]
		}
		handleArr[i] = tenBitToBitArray(handleArr[i]).concat(Array.apply(null, Array(num2Len - i - 1)).map(v => 0))
	}

	var resultArr = []
	var result
	for (var j = num1Len + num2Len; j--;) {
		result = 0
		for (var i = num2Len; i--;) {
			result += handleArr[i].pop() || 0
		}
		result && resultArr.push(result)
	}
	return tenBitToBitArray(resultArr.reverse()).join('')
}


function tenBitToBitArray(arr) {
	var resultArr = arr.slice()
	var tenBit = 0
	var temp
	for (var i = resultArr.length; i--;) {
		//将当前值添加前一个数的十位
		temp = resultArr[i] + tenBit
		//并将当前数组位替换为temp取个位
		resultArr[i] = temp % 10
		//将temp取十位存入tenBit
		tenBit = Math.floor(temp / 10)
	}

	tenBit && resultArr.unshift(tenBit)

	return resultArr
}

BigNumberCalculation(12943, 12345)
BigNumberCalculation(12943, 999)
