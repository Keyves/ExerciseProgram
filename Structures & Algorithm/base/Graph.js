/*———————————————————————————————————————————— 图 ————————————————————————————————————————————*/
function Graph(vexnum, arcnum) {			//无向图
	this.vexs = [];
	this.arcs = [];
	this.vexnum = vexnum || 0;
	this.arcnum = arcnum || 0;
}

Graph.prototype.search = function (vx) {		//查找顶点
    for (var i = 0; i < this.vexnum; i++)
        if (this.vexs[i] === vx)
        	return i;

    return -1;
};

Graph.prototype.addvex = function (vx) {		//添加节点
	var i, j;

	if (this.search(vx) !== -1)
        return console.log('顶点已经存在!');

    j = this.vexnum;

    this.vexs[this.vexnum++] = vx;

    for (i = 0; i < this.vexnum; i++) {
        this.arcs[i] = this.arcs[i] || [];
        this.arcs[j] = this.arcs[j] || [];
        this.arcs[i][j] = 0;
        this.arcs[j][i] = this.arcs[i][j];
    }
};

Graph.prototype.addarc = function (v1, v2) {		//添加弧
	var i, j;

	i = this.search(v1);
	j = this.search(v2);

	if (i === -1 || j === -1)
        return console.log('不存在顶点!');

    this.arcs[i][j] = 1;
    this.arcs[j][i] = this.arcs[i][j];

};

Graph.prototype.BFS = function () {				//广度优先搜索
	var i, j, k, visited, queue, rslt;

	visited = [];
	queue = [];
	rslt = [];

	for (i = 0; i < this.vexnum; i++)
		visited[i] = false;

	for (i = 0; i < this.vexnum; i++) {
		if (!visited[i]) {
		    visited[i] = true;
		    queue.push(i);

			rslt.push(this.vexs[i]);	//test

		    while (queue.length !== 0) {
		        k = queue.shift();

		        for (j = 0; j < this.vexnum; j++) {
		            if (this.arcs[k][j] === 1 && !visited[j]) {
		                visited[j] = true;
		                queue.push(j);

						rslt.push(this.vexs[j]);	//test
		            }
		        }
		    }
		}
	}
	return rslt;
};

// Graph.prototype.DFS = function () {			//深度优先搜索（非递归）
// 	var i, j, k, visited, stack, rslt;

// 	visited = [];
// 	stack = [];
// 	rslt = [];

// 	for (i = 0; i < this.vexnum; i++)
// 		visited[i] = false;

// 	for (i = 0; i < this.vexnum; i++) {
// 		if (!visited[i]) {
// 			visited[i] = true;
// 			stack.push(i);

// 			rslt.push(this.vexs[i]);

// 			while (stack.length !== 0) {
// 				k = stack.pop();

// 				for (j = 0; j < this.vexnum; j++) {
// 					if (this.arcs[k][j] === 1 && !visited[j]) {
// 			                visited[j] = true;
// 			                stack.push(j);

// 							rslt.push(this.vexs[j]);	//test
// 					} else {
// 						stack.pop();
// 					}
// 				}
// 			}
// 		}
// 	}
// 	return rslt;
// };

Graph.prototype.DFS_REC = function () {		//深度优先搜索（递归）
	var i, visited, rslt;

	visited = [];
	rslt = [];

	for (i = 0; i < this.vexnum; i++)
		visited[i] = false;
	for (i = 0; i < this.vexnum; i++)
		if (!visited[i])
			DFS(this, i);

	function DFS(that, i) {
		var j;

		visited[i] = true;

		rslt.push(that.vexs[i]);		//test

		for (j = 0; j < that.vexnum; j++)
			if (that.arcs[i][j] === 1 && !visited[j])
				DFS(that, j);
	}
	return rslt;
};

var graph = new Graph(0, 9);

graph.addvex('A');
graph.addvex('E');
graph.addvex('F');
graph.addvex('G');
graph.addvex('H');
graph.addvex('I');
graph.addvex('B');
graph.addvex('C');
graph.addvex('D');

graph.addarc('A', 'B');
graph.addarc('A', 'F');
graph.addarc('B', 'C');
graph.addarc('B', 'I');
graph.addarc('B', 'G');
graph.addarc('F', 'G');
graph.addarc('F', 'E');
graph.addarc('C', 'D');
graph.addarc('C', 'I');
graph.addarc('D', 'I');
graph.addarc('D', 'G');
graph.addarc('D', 'H');
graph.addarc('D', 'E');
graph.addarc('E', 'H');
graph.addarc('G', 'H');

console.log(graph);

//console.log("深度优先搜索（非递归）", graph.DFS());
console.log("深度优先搜索（递归）", graph.DFS_REC());
console.log("广度优先搜索", graph.BFS());
