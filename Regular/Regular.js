var price = '价格是￥ 10.5！！！';
var email = 'michael.Mt13@gmail.com';
var url = 'http://zhidao.baidu.com/link?url=r9JUtPoXpFRQTlSL4aP_3FsTJnX9sE9-IRunzGuftEd9OyJpRIPItq3QIPUKsVqc_bRR9oTKs4pOAVpbMH6tq';
var html = '<div class="s-skin-container s-isindex-wrap" style="background-color:rgb(64, 64, 64);background-image:url(xx);">  </div>'
var sweep = 'this is michaelmt .';
var number = 'this is number 100000000 $';


var reg = {
	price: /￥ (\d+\.\d)/g,
	email: /^[A-z][-\.\w]*@\w+(\.\w+)*\.[com|edu|gov|int|mil|net|org|biz|info|name|museum|coop|aero]/g,
	url: /(?:http:\/\/)?([^\/]+\/)+/,
	html: {
		style: /([^";]*;)+/g
	},
	sweep: /(?!=\bmichael)(?=mt\b)/g,
	number: /(\d)(?=\d{3})+/g
};


console.log(reg.email.exec(email));
console.log((reg.price.exec(price))[1]);
console.log(reg.html.style.exec(html));
console.log(reg.url.exec(url)[1]);
console.log(sweep.replace(reg.sweep,'-'));
console.log(number.replace(reg.number,'$1,'));
