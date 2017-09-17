var roots_dict = {};

// This handles messages sent from inject.js or browser_action.js
chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  // Handles reuqests from browser_action.js
  if (request.from === 'browser_action') {
    if (request.action === 'navigate') {
      return sendActiveTabToUrl(request.url);
    } else if (request.action === 'get-tree') {
      console.log('sending', roots_dict[request.tab.id]);
      sendResponse(roots_dict[request.tab.id]);
    } else {
      return sendResponse('No action in request');
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

const getActiveTab = (callback) => {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
    callback(tabs[0]);
  });
}

const sendActiveTabToUrl = (url) => {
  getActiveTab((tab) => {
    chrome.tabs.update(tab.id, {
      url: url
    });
  });
}

chrome.history.onVisited.addListener(
  (result) => {}
);
