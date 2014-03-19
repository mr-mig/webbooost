var regChecker = (function(){

	var keys = Object.keys(reg_config);
	var cfgRegExps = {};

	keys.forEach(function(key){
		cfgRegExps[key] = new RegExp(key);
	});

	return {
 		check : function (url, tabId){
 			url = url[1];
 			keys.forEach(function(key){
 				if (cfgRegExps[key].test(url)){

 					if (reg_config[key].versions){
 						var match = cfgRegExps[key].exec(url);	
 						if (match.length > 1){
 							var version = match[1];
 							if (reg_config[key].versions.indexOf(version) > -1){
 								var newUrl = reg_config[key].file.replace(/\$version\$/, version);
 								return redirect(newUrl, tabId, url);
 							} else {
 								// if version is not whitelisted
 								return {cancel: false};
 							}
 						} else {
 							// if no whitelisted version is matched
 							return {cancel: false};
 						}

 					} else {
 						var newUrl = reg_config[key].file;
 						return redirect(newUrl, tabId, url);
 					}
 				}
 			});
			return {cancel: false};
		}
	}

})();