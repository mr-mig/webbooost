stats = require '../stats'
state = require '../state'
$id = require('../helpers').$id
getUri = require('../helpers').getUriFromTab

chrome.tabs.getSelected null, (tab)->
	stats.get tab.id, (stat) ->
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

	state.get tab.id, (pageConfig) ->
		if pageConfig.disabled
			disable()
		else
			enable()

		$id('switch').addEventListener 'change', (e) ->
			if @checked
				pageConfig.disabled = false;
				enable()
			else
				pageConfig.disabled = true;
				disable()
			state.sync(pageConfig)

	$id('site-id').innerHTML = getUri(tab);

disable = ()->
	$id('enabled').style.display = 'none'
	$id('disabled').style.display = 'inline'
	$id('switch').checked = false

enable = () ->
	$id('disabled').style.display = 'none'
	$id('enabled').style.display = 'inline'
	$id('switch').checked = true
