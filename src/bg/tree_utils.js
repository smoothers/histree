function areSameNode(node1, node2) {
	return node1.url === node2.url;
}

function treeHasVisited(r, n){
	if (areSameNode(n, r)) {
		return r;
	}
	else{
		for (var i = 0; i < r.children.length; i++){
			var visitedNode = treeHasVisited(r.children[i], n);
			if (visitedNode){
				return visitedNode;
			}
		}
	}
	return false;
};

function depthOf(r, d){
	d++;
	if (isLeaf(r)){
		return d;
	}
	else{
		var children_depths = r.children.map(function(x){return depthOf(x, d);});
		return Math.max.apply( Math, children_depths);
	}
};

function widthOf(r, w){
	if (isLeaf(r)){
		return 1;
	}
	else{
		current_width = w;
		r.children.forEach(function(c){ w += widthOf(c, current_width); })
	}
	return w;
};

function isLeaf(r){
	return (r.children.length === 0);
}

// Here's an alternative implementation of this method - the functionality isn't different, it
// 	just uses some native javascript iteration power
// function treeHasVisited(tree, node){
// 	if (areSameNode(tree, node)) {
// 		return tree;
// 	}
// 	// Find the child tree that has the node, or return undefined if that node isn't found
// 	return tree.children.find(child => treeHasVisited(child, node));
// };
