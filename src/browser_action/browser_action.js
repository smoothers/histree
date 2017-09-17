// Scripts order
// pop_up_utils
// d3.min (d3 visualization library)
// visualization
// * browser_action.js

// This is the starting point for the 'main' action
// We first get the active tab when the the browser_action button is clicked
getActiveTab(activeTab => {
  // Once we've recieved the tab, we can then ask the background task for the tab's tree
  chrome.extension.sendMessage({
      from: sender,
      action: 'get-tree',
      tab: activeTab
    },
    function(getTreeResponse) {
      // Once we've recieved the tree from the background
      // we set the root node's position
      root = getTreeResponse.root;
      root.x0 = height / 2;
      root.y0 = 0;

      // Then we call the 'update' method to trigger the rest of the visualization
      update(root);
    });
});
