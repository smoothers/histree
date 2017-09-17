// Scripts order
// pop_up_utils
// d3.min (d3 visualization library)
// visualization
// * browser_action.js

getActiveTab(activeTab => {
  chrome.extension.sendMessage({
      from: sender,
      action: 'get-tree',
      tab: activeTab
    },
    function(response) {
      root = response.root;
      root.x0 = height / 2;
      root.y0 = 0;

      // Uncomment this to collapse top level items
      // root.children.forEach(collapse);
      update(root);
    });
});

// Navigate to child on node click
function click(d) {
  tellTabToNavigateTo(d.url);
  closePopUp();
}
