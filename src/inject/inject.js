chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === 'complete') {
		clearInterval(readyStateCheckInterval);

		chrome.runtime.sendMessage({
			'from': 'inject',
			'message': 'page_loaded'});

	}
	}, 10);
});
