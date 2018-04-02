// Initialize a new HistreeStorage object when background process / chrome starts up
const histreeStorage = new HistreeStorage();

// This handles messages sent from inject.js or browser_action.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handles requests from browser_action.js
  if (request.from === 'browser_action') {
    if (request.action === 'get-tree') {
      return sendResponse(histreeStorage.getHistreeForTabId(request.data.tab.id));
    }
  }
});

// Listens for changes to tabs to see when pages are loaded
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    histreeStorage.insertNodeIntoTreeByTabId({
      url: tab.url,
      title: tab.title,
      favIconUrl: tab.favIconUrl
    }, tab.id);
  }
});
