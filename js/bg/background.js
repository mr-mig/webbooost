// load GA scripts and fire pageview event
appendScript('/js/ga-config.js', function(){
	ga_ready(function(){
		ga.pageview('Background', '/bg')	
	});
});

var stats = loadStats();
// prevent mem leak 
stats.resetPages();


function checkUrl (details){
	if (details.method !== 'GET') return {cancel:false}

	var urlData = details.url.split('://') 

	var result = hashChecker.check(urlData, details.tabId);
	if (result && result.redirectUrl) return result;

	result = regChecker.check(urlData, details.tabId);
	if (result && result.redirectUrl) return result;

	return {cancel:false};
}

function redirect(url, tabId, originalUrl){
	if (tabId) {
		if (tabId > 0) {
			chrome.pageAction.show(tabId);
		}
		stats.addBoost(tabId);
		ga.event('Boost','redirect', url, 1)
	}

	console.log("boosted", originalUrl, js(url));
	return {redirectUrl: js(url)}
}

chrome.webRequest.onBeforeRequest.addListener(
	checkUrl,
	{
		urls: ['http://*/*','https://*/*','chrome-extension://*/*'], 
		types: ['script','stylesheet']
	},
	["blocking"]
);