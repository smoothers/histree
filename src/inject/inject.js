// Tells the background to add this page as a node in this tab's Histree
chrome.runtime.sendMessage({
	from: 'inject',
	action: 'insert-node',
	data: {
		title: document.title
	}
});
