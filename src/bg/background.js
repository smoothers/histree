// Initialize a new HistreeStorage object when background process / chrome starts up
const histreeStorage = new HistreeStorage();

// This handles messages sent from inject.js or browser_action.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handles requests from browser_action.js
  if (request.from === 'browser_action') {
    if (request.action === 'get-tree') {
      console.log('sending', histreeStorage.getHistreeForTabId(request.data.tab.id));
      return sendResponse(histreeStorage.getHistreeForTabId(request.data.tab.id));
    }
  // Handles requests from the injected script
  } else if (request.from === 'inject') {
    if (request.action === 'insert-node') {
      // If an insert node request comes in, insert that node ito the storage tree
      histreeStorage.insertNodeIntoTreeByTabId({ url: sender.url, title: request.data.title },
        sender.tab.id);

      // Send an empty response to tell the page the insertion was complete
      return sendResponse()
    }
  }
});

// Not sure what this is doing - can we remove it?
chrome.history.onVisited.addListener(
  (result) => {}
);
