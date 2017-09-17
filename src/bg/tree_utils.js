function treeHasVisited(r, n){
	if (n.url === r.url){
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