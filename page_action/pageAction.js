var stats = loadStats();

chrome.tabs.getSelected(null, function(tab){
	var stat = stats.get(tab.id);
	if (!stat)
		stat = {count: 0, time: 0}
	$id("resources-count").innerHTML = stat.count;
	$id("time-count").innerHTML = stat.time/1000 + ' sec.';
	$id("total-time-count").innerHTML = stats.totalTimeSaved/1000 + ' sec.';
	document.title = "I have saved " + stats.totalTimeSaved/1000 + ' seconds while surfing the Web!';
});

ga_ready(function(){
	ga.pageview('Stats', '/stats');
})