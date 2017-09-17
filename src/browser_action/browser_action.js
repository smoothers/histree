// Scripts order
// pop_up_utils
// d3.min (d3 visualization library)
// visualization
// * browser_action.js

// This is the starting point for the 'main' action
// We first get the active tab when the the browser_action button is clicked
setTimeout(() => {
  console.log('load');
  // code...
  getActiveTab(activeTab => {
    // Once we've recieved the tab, we can then ask the background task for the tab's tree
    chrome.extension.sendMessage({
        from: sender,
        action: 'get-tree',
        data: {
          tab: activeTab
        }
      },
      (getTreeResponse) => {
        // HACK: There is a race condition that resets the size of the body/window
        // setTimeout(() => {
        const histreeVisualization = new HistreeVisualization(getTreeResponse.depth,
          getTreeResponse.width);

        histreeVisualization.drawTree(getTreeResponse.root);
        // }, 100);
      });
  });
}, 1000);
