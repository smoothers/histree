var roots_dict = {};

// This handles messages sent from inject.js or browser_action.js
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

  // Handles reuqests from browser_action.js
  if (request.from === 'browser_action') {
    if (request.action === 'navigate') {
      sendActiveTabToUrl(request.url);
    } else if (request.action === 'get-tree') {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
        sendResponse(roots_dict[tab[0].id].root);
      });
    } else {
      console.log('Got message from browser_action');
      sendResponse('Some stuff');
    }
  } else if (request.from === 'inject') {
    sendResponse('Sounds good :)')

    var node = {
      url: sender.url,
      children: []
    }

    // if message from new tab
    if (!roots_dict.hasOwnProperty(sender.tab.id)) {
      var current_node = node
      var tree_info = {
        'root': node,
        'current_node': current_node
      }
      roots_dict[sender.tab.id] = tree_info;
    }

    // if tab id is already in roots_dict
    else {
      var visitedNode = treeHasVisited(roots_dict[sender.tab.id].root, node);
      if (visitedNode) {
        roots_dict[sender.tab.id].current_node = visitedNode;
      }
      else {
        roots_dict[sender.tab.id].current_node.children.push(node);
        roots_dict[sender.tab.id].current_node = node;
      }
    }
  }
});

function sendActiveTabToUrl(url) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.update(activeTab.id, {
      url: url
    });
  });
}

chrome.history.onVisited.addListener(
  function(result) {}
);
