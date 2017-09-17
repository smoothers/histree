// The HistreeStorage class has methods for accessing the the stored histrees
class HistreeStorage {

  constructor() {
    // The rootsDict is where we will store
    this.rootsDict = {
      // tabId: tree
    };
  }

  insertNodeIntoTreeByTabId(node, tabId) {
    // Ensure that the node has a children array
    node.children = node.children || [];

    // If this tab does not yet have a tree
    if (!tabId in rootsDict) {
      // Create a new tree for the tab
      rootsDict[tabId] = {
        root: node,
        currentNode: node
      }
    }
    // Else if the tab already has a tree
    else {
      var visitedNode = treeHasVisited(rootsDict[tabId].root, node);

      // If the node is already in the tree
      if (visitedNode) {
        // Set the node to be the current node
        rootsDict[tabId].currentNode = visitedNode;
      }
      else {
        // Else add the node as a child of the current node
        rootsDict[tabId].currentNode.children.push(node);
        // and set the current node to the new page
        rootsDict[tabId].currentNode = node;
      }
    }
  }

  getHistreeForTabId(tabId) {
    return this.rootsDict[tabId];
  }
}
