/*
小易总是感觉饥饿，所以作为章鱼的小易经常出去寻找贝壳吃。最开始小易在一个初始位置x_0。对于小易所处的当前位置x，他只能通过神秘的力量移动到 4 * x + 3或者8 * x + 7。因为使用神秘力量要耗费太多体力，所以它只能使用神秘力量最多100,000次。贝壳总生长在能被1,000,000,007整除的位置(比如：位置0，位置1,000,000,007，位置2,000,000,014等)。小易需要你帮忙计算最少需要使用多少次神秘力量就能吃到贝壳。
输入描述:

输入一个初始位置x_0,范围在1到1,000,000,006


输出描述:

输出小易最少需要使用神秘力量的次数，如果使用次数使用完还没找到贝壳，则输出-1

输入例子:

125000000

输出例子:

1

289869954 -> 99999

*/
function test3(input_arrays) {
	var x = +input_arrays[0]
	var mod = 1000000007
	var map = new Map()
	var queue = []
	var temp
	queue.push(x)
	map.set(x, 1)

	while(queue.length) {
		x = queue.shift()
		if (x === 0) {
			return console.log(map.get(x) - 1)
		}
		if (map.get(x) > 100000) {
			continue
		}
		temp = (x * 4 + 3) % mod
		if (!map.has(temp)) {
			queue.push(temp)
			map.set(temp, map.get(x) + 1)
		}
		temp = (x * 8 + 7) % mod
		if (!map.has(temp)) {
			queue.push(temp)
			map.set(temp, map.get(x) + 1)
		}
	}
	console.log(-1, map.size)
}



function test1(input_arrays) {
	var a = input_arrays[0];
	var da = input_arrays[1];
	var b = input_arrays[2];
	var db = input_arrays[3];
	var pa, pb, result
	pa = pb = ''
	a.split('').forEach(function(v) {
		if (v === da) {
			pa += v
		}
	});
	b.split('').forEach(function(v) {
		if (v === db) {
			pb += v
		}
	});
	result = parseInt(Number(pa) + Number(pb))
	console.log(result)
}


/*
二货小易有一个W*H的网格盒子，网格的行编号为0~H-1，网格的列编号为0~W-1。每个格子至多可以放一块蛋糕，任意两块蛋糕的欧几里得距离不能等于2。
对于两个格子坐标(x1,y1),(x2,y2)的欧几里得距离为:
( (x1-x2) * (x1-x2) + (y1-y2) * (y1-y2) ) 的算术平方根
小易想知道最多可以放多少块蛋糕在网格盒子里。
输入描述:

每组数组包含网格长宽W,H，用空格分割.(1 ≤ W、H ≤ 1000)


输出描述:

输出一个最多可以放的蛋糕数

输入例子:

3 2

输出例子:

4

 */
function test2(input_arrays) {
	var w = +input_arrays[0];
	var h = +input_arrays[1];
	var arr = [], result
	arr.push({
		x: 0,
		y: 0
	})
	for (var x = 0; x < w; x++) {
		for (var y = 0; y < h; y++) {
			if (arr.every(function(v) {
				return Math.sqrt(Math.pow(x - v.x, 2) + Math.pow(y - v.y, 2)) !== 2
			})) {
				arr.push({
					x: x,
					y: y
				})
			}
		}
	}
	result = arr.length
	console.log(result)
}

test2([3, 2])
