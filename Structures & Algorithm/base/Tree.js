/*———————————————————————————————————————————— 二叉树 ————————————————————————————————————————————*/
function Tree() {
	this.data = null;
	this.lchild = null;
	this.rchild = null;
	this.parent = null;
}

Tree.prototype.insert = function (data) {			//插入，禁止相同值
	 var node, parent, child;

	 if (!this.data)
	 	return this.data = data;

	 node = this;
	 parent = this;
	 while (node) {
	 	if (data == node.data){
	 		return;
	 	} else {
	 		parent = node;
	 		if (data > node.data)
	 			node = node.rchild;
	 		else
	 			node = node.lchild;
	 	}
	 }
	 child = new Tree();
	 child.data = data;
	 if (data > parent.data)
	 	parent.rchild = child;
	 else
	 	parent.lchild = child;
};
Tree.prototype.find = function (data) {			//查找
	 var node, parent, child;

	 if (!this.data)
	 	return this.data = data;

	 node = this;
	 parent = this;
	 while (node) {
	 	if (node.data == data){
	 		return "success";
	 	} else {
	 		parent = node;
	 		if (node.data < data)
	 			node = node.rchild;
	 		else
	 			node = node.lchild;
	 	}
	 }
	 return "lose";
};
Tree.prototype.layerorder = function (node) {		//层序
	var queue, tempstack, node, rslt, len, i, j;

	node = node || this;
	queue = [];
	rslt = [];

	queue.push(node);

	while (queue.length) {
		for (i = 0; i < queue.length; i++) {
			node = queue.shift();								//队列先出性质
			if(node.lchild) queue.push(node.lchild);
			if(node.rchild) queue.push(node.rchild);		//与上一行换位，则变为从右遍历
			rslt.push(node.data);
		}
	}

	return rslt;
};
Tree.prototype.preorder = function (node) {		//前序
	var rslt = [];
	if (node) {
		rslt.push(node.data);
		rslt = rslt.concat(node.preorder(node.lchild), node.preorder(node.rchild));
	}
	return rslt;
};
Tree.prototype.inorder = function (node) {		//中序
	var rslt = [];
	if (node) {
		rslt = rslt.concat(node.inorder(node.lchild));
		rslt.push(node.data);
		rslt = rslt.concat(node.inorder(node.rchild));
	}
	return rslt;
};
Tree.prototype.postorder = function (node) {	//后序
	var rslt = [];
	if (node) {
		rslt = rslt.concat(node.postorder(node.lchild), node.postorder(node.rchild));
		rslt.push(node.data);
	}
	return rslt;
};
Tree.prototype.max = function (node) {			//最大值
	var parent;

	node = node || this;
	while (node) {
		parent = node;
		node = node.rchild;
	}
	return parent.data;
};
Tree.prototype.min = function (node) {			//最小值
	var parent;

	node = node || this;
	while (node) {
		parent = node;
		node = node.lchild;
	}
	return parent.data;
};
var tree = new Tree();
for (var ti = 0, tlen = array.length; ti < tlen; ti++) {
	tree.insert(array[ti]);
}

console.log("tree:", tree);
console.log("tree->find(50):", tree.find(50));
console.log("tree->layerorder:", tree.layerorder(tree));
console.log("tree->preorder:", tree.preorder(tree));
console.log("tree->inorder(sort):", tree.inorder(tree));
console.log("tree->postorder:", tree.postorder(tree));
console.log("tree->max:", tree.max());
console.log("tree->min:", tree.min());
