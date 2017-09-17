var message = {
	from: 'inject',
	referrer: document.referrer,
}
chrome.extension.sendMessage(message, function(response) {
	// response('yo', response)
});
