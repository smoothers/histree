// This handles messages sent from inject.js or browser_action.js
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  // Handles reuqests from browser_action.js
  if (request.from = 'browser_action') {
    console.log('Got message');
    sendResponse('Some stuff');
  }
});
