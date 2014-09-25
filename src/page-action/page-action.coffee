stats = require '../stats'
$id = require('../helpers').$id

chrome.tabs.getSelected null, (tab)->
	stat = stats.get tab.id
	stat ?= {count: 0, libs: []}

	$id 'resources-count'
		.innerHTML = stat.count
	$id 'total-resources-count'
		.innerHTML = stats.allStats.count

	stat.libs.forEach((entry)->
		li = document.createElement 'li'
		li.innerHTML = entry
		$id('resources-list').appendChild li
	)