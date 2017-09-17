// Initialize a new HistreeStorage object when background process / chrome starts up
const histreeStorage = new HistreeStorage();

// This handles messages sent from inject.js or browser_action.js
chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  // Handles requests from browser_action.js
  if (request.from === 'browser_action') {
    if (request.action === 'navigate') {
      return sendActiveTabToUrl(request.url);
    } else if (request.action === 'get-tree') {
      return sendResponse(histreeStorage.getHistreeForTabId(request.tab.id));
    } else {
      return sendResponse('No action in request');
    }
  // Handles requests from the injected script
  } else if (request.from === 'inject') {
    if (request.action === 'insert-node') {
      histreeStorage.insertNodeIntoTreeByTabId({ url: sender.url }, sender.tab.id);
      return sendResponse()
    }
  }
});

// Not sure what this is doing - can we remove it?
chrome.history.onVisited.addListener(
  (result) => {}
);
