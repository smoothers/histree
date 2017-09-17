
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "page_loaded" ) {

      console.log("brown cow");

    }
  }
);