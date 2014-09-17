Array.prototype.last = function(){
	return this[this.length - 1];
}

function js(filename){
	return chrome.extension.getURL(['/injectees/',filename].join(""));
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadStats(){
	if (localStorage["stats"])
		var stats = JSON.parse(localStorage["stats"]); 

	if (!stats)
		stats = {
			tabStats : {},
			totalTimeSaved : 0
		};

	stats.addBoost = function(tabId){
		if (!this.tabStats[tabId])
			this.tabStats[tabId] = {count: 0, time: 0};
		this.tabStats[tabId].count += 1;
		var timeDelta = getRandom(5, 30);
		this.tabStats[tabId].time += timeDelta;
		this.totalTimeSaved += timeDelta;

		localStorage["stats"] = JSON.stringify(this);
		return this.tabStats[tabId];
	}

	stats.get = function(id){
		return stats.tabStats[id];
	}

	stats.resetPages = function(){
		stats.tabStats = {};
	}
	return stats;
}

function $id(id) {
	return document.getElementById(id);
}

function appendScript(src, cb){
	var s = document.createElement('script');
	s.src = src;
	s.onload = cb;
	document.body.appendChild(s);
}