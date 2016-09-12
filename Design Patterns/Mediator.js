class Event  {
	constructor() {
		this.cbObj = {}
	}

	on(type, fn) {
		var cbs = this.cbObj[type]
		if (!cbs) {
			cbs = this.cbObj[type] = []
		}
		cbs.push(fn)
	}

	emit() {
		var args = Array.prototype.slice.call(arguments)
		var type = args.shift()
		var cbs = this.cbObj[type]
		if (cbs) {
			cbs.forEach(cb => {
				cb.apply(this, args)
			})
		}
	}

	remove(type) {
		delete this.cbObj[type]
	}
}
