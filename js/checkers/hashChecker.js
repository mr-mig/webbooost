var hashChecker = (function(){

	var comparisonHash = {};
	var h = hash_config;

	var keys = Object.keys(h);

	keys.forEach(function(key){
		var entry = h[key];
		if (entry.versions){
			entry.versions.forEach(function(version){
				entry.urls.forEach(function(url){
					hashUrl = url.replace(/\$version\$/, version)
					comparisonHash[hashUrl] = 
						entry.file.replace(/\$name\$/, key).replace(/\$version\$/, version);
				});
			})
		} else {
			entry.urls.forEach(function(url){
				comparisonHash[url] = 
					entry.file.replace(/\$name\$/, key);
			});
		}
	});

	return {
 		check : function (url, tabId){
			if (url[0] === 'chrome-extension') return;
			var checkUrl = url[1].replace(/\?.+$/,'');

			if (comparisonHash[checkUrl])
				return redirect(comparisonHash[checkUrl], tabId, url[1]);

			return {cancel: false};
			}
		}
})();