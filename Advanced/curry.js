function curry(fn) {
	let result = 0
	const _fn = function () {
		result += fn.apply(this, arguments)
		return _fn
	}
	_fn.valueOf = function() {
		const temp = result
		result = 0
		return temp
	}
	return _fn
}

function add() {
	return Array.prototype.reduce.call(arguments, function(p, v) {
		return p + v
	}, 0)
}

add = curry(add)
