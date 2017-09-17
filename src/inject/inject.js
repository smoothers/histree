// Tells the background to add this page as a node in this tab's Histree
chrome.extension.sendMessage({
	from: 'inject',
	action: 'insert-node'
});
