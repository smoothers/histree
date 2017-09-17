// This handles messages sent from inject.js or browser_action.js
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  // Handles reuqests from browser_action.js
  if (request.from === 'browser_action') {
    console.log('Got message from browser_action');
    sendResponse('Some stuff');
  } else if (request.from === 'inject') {
    console.log('Inject began');
    sendResponse()
  }
});

chrome.history.onVisited.addListener(
  function(result) {
    console.log(result);
  }
);
