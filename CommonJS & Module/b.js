/*console.log('b.js begin')
import * as a from './a.js'
console.log('after require a.js', a)

export function bar() {
	console.log('bar')
	a.foo();
}

console.log('b.js end')
*/
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
const obj = {firstName, lastName, year}

export default obj;
export {...obj}
