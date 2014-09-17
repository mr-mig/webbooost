stats = require '../stats'

chrome.tabs.getSelected null, (tab)->
	stat = stats.get tab.id
	stat ?= {count: 0, time: 0}

	$id "resources-count"
		.innerHTML = stat.count
	$id "time-count"
		.innerHTML = stat.time / 1000 + ' sec.'
	$id "total-time-count"
		.innerHTML = stats.totalTimeSaved / 1000 + ' sec.'

	document.title = "I have saved " + stats.totalTimeSaved / 1000 + ' seconds while surfing the Web!'
