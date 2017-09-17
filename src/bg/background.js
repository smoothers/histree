// This handles messages sent from inject.js or browser_action.js
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  // Handles reuqests from browser_action.js
  if (request.from === 'browser_action') {
    if (request.action === 'navigate') {
      console.log('sender', sender);
      console.log('url', request.url);
    } else {
      console.log('Got message from browser_action');
      sendResponse('Some stuff');
    }
  } else if (request.from === 'inject') {
    console.log('request.referrer', request.referrer);
    sendResponse('tsurp');
  }
});

chrome.history.onVisited.addListener(
  function(result) {
    console.log(result);
  }
);
