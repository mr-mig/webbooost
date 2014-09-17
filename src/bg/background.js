var stats = loadStats();
// prevent mem leak 
stats.resetPages();


function checkUrl(details) {
	if (details.method !== 'GET') return {cancel: false};

	var urlData = details.url.split('://');

	var result = hashChecker.check(urlData, details.tabId);
	if (result && result.redirectUrl) return result;

	// this kind of script injection
	// can potentionally break the page
	result = regChecker.check(urlData, details.tabId);
	if (result && result.redirectUrl) return result;

	return {cancel: false};
}

function redirect(url, tabId, originalUrl) {
	if (tabId) {
		if (tabId > 0) {
			chrome.pageAction.show(tabId);
		}
		stats.addBoost(tabId);
	}

	console.log("boosted", originalUrl, js(url));
	return {redirectUrl: js(url)}
}

chrome.webRequest.onBeforeRequest.addListener(
		checkUrl,
		{
			urls: ['http://*/*', 'https://*/*', 'chrome-extension://*/*'],
			types: ['script', 'stylesheet']
		},
		["blocking"]
);