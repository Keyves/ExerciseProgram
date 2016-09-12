/*———————————————————————————————————————————— 数组 ————————————————————————————————————————————*/
var array = [];

for (var n = 0; n < 10; n++)
	array.push(Math.round(Math.random() * 10));

console.log(array);

/***********数组去重************/
Array.prototype.unique = function () {
	var len = array.length;
	var obj = {};
	var anoArr = [];
	for (var j = 0; j < len; j++) {
		if (!obj[array[j]]) {
			anoArr.push(array[j]);
			obj[array[j]] = array[j];
		}
	}
	console.log("去重：", anoArr);
};

/***********数组挪位************/
Array.prototype.move = function (k) {
	var len = array.length;
	var anoArr = [];
	/*往右边*/
	for (var j = 0; j < len; j++) {
		anoArr[(j + k) % len] = array[j];
	}
	console.log("挪位-右：", anoArr);
	/*往左边*/
	for (var j = 0; j < len; j++) {
		anoArr[j] = array[(j + k) % len];
	}
	console.log("挪位-左：", anoArr);
};


/***********快速排序************/
Array.prototype.qksort = function () {
	var _this = this;

	var len, temp, half;

	len = this.length - 1;				//破坏有序序列，随机交换两个值
	temp = this[0];
	half = Math.floor(len/2);
	this[0] = this[half];
	this[half] = temp;

	function qksort(l, h) {
		var i, j, flag, tmp;
		i = l;
		j = h;
		flag = _this[l];
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
		if (--j > l) qksort(l, j);
		if (++i < h) qksort(i, h);				//当最低位和最高位还没超出范围时，递归
	}
	qksort(0, len);
};
// 	function count(a, b) {
// 		return a - b;
// 	}
// 	var st;
// 	var et;

// 	st = +new Date;
// 	array.sort(count);
// 	et = +new Date;
// 	console.log(et - st);


// console.log(array);


// 	st = +new Date;
// 	array.qksort();
// 	et = +new Date;
// 	console.log(et - st);

// console.log(array);
