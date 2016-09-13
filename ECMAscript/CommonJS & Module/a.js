/*console.log('a.js begin')
import * as b from './b.js'
console.log('after require b.js', b)

export var foo = function() {
	console.log('foo')
}
b.bar()

console.log('a.js end')
*/
import {year} from './b.js'
console.log(year)
