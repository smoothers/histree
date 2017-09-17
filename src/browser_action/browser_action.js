// Scripts order
// pop_up_utils
// d3.min (d3 visualization library)
// visualization
// * browser_action.js
const exampleData = {
  url: 'http://www.example.com/moo/foo/bar',
  title: 'Foos bars and the bar foods',
  children: [
    {
      url: 'http://www.ixce.cods/mar/pars',
      title: 'Ice DOgs 12098 12980 1928 ',
      children: [
        {
          url: 'http://www.ixce.cods/mar/pars',
          title: 'Ice DOgs 12098 12980 1928 ',
          children: []
        },
        {
          url: 'http://www.ixce.cods/mar/pars',
          title: 'Ice DOgs 12098 12980 1928 ',
          children: []
        },
      ]
    },
    {
      url: 'http://www.ixce.cods/mar/pars',
      title: 'Ice DOgs 12098 12980 1928 ',
      children: [
        {
          url: 'http://www.ixce.cods/mar/pars',
          title: 'Ice DOgs 12098 12980 1928 ',
          children: []
        },
        {
          url: 'http://www.ixce.cods/mar/pars',
          title: 'Ice DOgs 12098 12980 1928 ',
          children: []
        },
      ]
    },
  ]
}

// // This is the starting point for the 'main' action
// // We first get the active tab when the the browser_action button is clicked
// getActiveTab(activeTab => {
//   // Once we've recieved the tab, we can then ask the background task for the tab's tree
//   chrome.extension.sendMessage({
//       from: sender,
//       action: 'get-tree',
//       data: {
//         tab: activeTab
//       }
//     },
//     function(getTreeResponse) {
//       // Once we've recieved the tree from the background
//       // we set the root node's position
//       root = getTreeResponse.root;
//       root.x0 = height / 2;
//       root.y0 = 0;
//
//       // Then we call the 'update' method to trigger the rest of the visualization
//       update(root);
//     });
// });

function drawTree(tree) {
  // Once we've recieved the tree from the background
  // we set the root node's position
  root = tree;
  root.x0 = height / 2;
  root.y0 = 0;

  // Then we call the 'update' method to trigger the rest of the visualization
  update(root);
}

drawTree(exampleData);
