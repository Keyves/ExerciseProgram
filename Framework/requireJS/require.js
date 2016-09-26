var cache = {}
var r = /require\((.*)\)/g

function define(fnOrStr) {
    var str = typeof fnOrStr === 'function' ? fnOrStr.toString() : fnOrStr
    while (match = r.exec(str)) {
        console.log(match && match[1])
        // 如果匹配到了内容，下载 path 对应的源码
        match && match[1] && require(match[1])
    }
}
/*
function require(path) {
    var xhr = new XMLHttpRequest(),
        res
    xhr.open("GET", path, true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            res = xhr.responseText
            // 缓存文件
            cache[path] = res
            // 继续递归匹配
            define(res)
        }
    }
    xhr.send()
}
*/
function require(path) {
	var script = document.createElement('script')
	script.src = path
	script.onload = function (res) {
		console.log(arguments)
	}

	(document.getElementsByTagName("head")[0] || document.body).appendChild(script)
}
