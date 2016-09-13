function main(width) {
	var max = Math.pow(width, 2)
	var halfWidth = width / 2
	var number, t, r, b, l, col, row, loopTimes
	var arr = []

	// 初始化矩阵
	for (var idx = 0; idx < width; idx++) {
		arr[idx] = []
	}

	// 依次是数据、上、右、下、左
	number = t = r = b = l = 0
	// 行、列
	col = row = 0
	// 循环次数
	loopTimes = 1

	// 避免奇数最后一圈陷入死循环
	while(loopTimes <= halfWidth) {
		// 设置上方的行
		col = loopTimes - 1
		t = loopTimes - 1
		while(t < width - loopTimes) {
			arr[col][t] = ++number
			t++
		}
		// 设置右方的列
		row = width - loopTimes
		r = loopTimes - 1
		while(r < width - loopTimes) {
			arr[r][row] = ++number
			r++
		}
		// 设置下方的行
		col = width - loopTimes
		b = width - loopTimes
		while(b >= loopTimes) {
			arr[col][b] = ++number
			b--
		}
		// 设置左方的列
		row = loopTimes - 1
		l = width - loopTimes
		while(l >= loopTimes) {
			arr[l][row] = ++number
			l--
		}

		++loopTimes
	}

	// 补充奇数时将最后一圈的值
	if (loopTimes !== halfWidth) {
		--loopTimes
		arr[loopTimes][loopTimes] = ++number
	}

	for (var i = 0; i < width; ++i) {
		console.log(arr[i].join(' '), '\n')
	}
}
main(3)
