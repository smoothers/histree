
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "page_loaded" ) {

      console.log("injet.js said page loaded brah");

    }
  }
);

chrome.history.onVisited.addListener(
	function(result) {
		console.log(result);
	}
);