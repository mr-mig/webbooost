var hash_config = {
	'jquery' : {
		versions: [
		'2.1.0', 
		'2.0.3', 
		'2.0.2', 
		'2.0.1', 
		'2.0.0', 
		'1.11.0', 
		'1.10.2', 
		'1.10.1', 
		'1.10.0', 
		'1.9.1', 
		'1.9.0', 
		'1.8.3', 
		'1.8.2', 
		'1.8.1', 
		'1.8.0', 
		'1.7.2', 
		'1.7.1', 
		'1.7.0', 
		'1.6.4', 
		'1.6.3', 
		'1.6.2', 
		'1.6.1', 
		'1.6.0', 
		'1.5.2', 
		'1.5.1', 
		'1.5.0', 
		'1.4.4', 
		'1.4.3', 
		'1.4.2', 
		'1.4.1'
		],
		urls: [
			'ajax.googleapis.com/ajax/libs/jquery/$version$/jquery.min.js',
			'yandex.st/jquery/$version$/jquery.min.js',
			'cdn.jsdelivr.net/jquery/$version$/jquery.min.js',
			'ajax.aspnetcdn.com/ajax/jQuery/jquery-$version$.min.js',
			'cdnjs.cloudflare.com/ajax/libs/jquery/$version$/jquery.min.js',
			'code.jquery.com/jquery-$version$.min.js'
		],
		file: '$name$/$version$/jquery.min.js'
	},
	'jquery-1' : {
		versions: ['1'],
		urls: [
			'ajax.googleapis.com/ajax/libs/jquery/$version$/jquery.min.js',
			'yandex.st/jquery/$version$/jquery.min.js',
			'cdn.jsdelivr.net/jquery/$version$/jquery.min.js',
			'ajax.aspnetcdn.com/ajax/jQuery/jquery-$version$.min.js',
			'cdnjs.cloudflare.com/ajax/libs/jquery/$version$/jquery.min.js',
			'code.jquery.com/jquery-$version$.min.js'
		],
		file : 'jquery/1.9.1/jquery.min.js'
	},

	'jquery-migrate' : {
		versions: ['1.2.1'],
		urls : [
			'code.jquery.com/jquery-migrate-$version$.min.js'
		],
		file : '$name$/$version$/jquery-migrate.min.js'
	},

	'jquery-latest' : {
		urls: [
			'code.jquery.com/jquery.js'
		],
		file: 'jquery/$name$.js'
	},

	'ga' : {
		urls: [
			'www.google-analytics.com/ga.js', 
			'ssl.google-analytics.com/ga.js'
		],
		file: 'google/ga.js'
	},

	'analytics' : {
		urls: [
			'www.google-analytics.com/analytics.js'
		],
		file: 'google/analytics.js'
	},

	'yandex' : {
		urls: [
			'mc.yandex.ru/metrika/watch.js'
		],
		file: 'yandex/yandex-watch.js'
	},

	'plusone' : {
		urls: [
			'apis.google.com/js/plusone.js'
		],
		file: 'google/plusone.js'
	},

	'twitter' : {
		urls : [
			'platform.twitter.com/widgets.js'
		],
		file: 'twitter/widgets.js'
	},

	'twitter-client' : {
		urls : [
			'platform.twitter.com/js/tfw/hub/client.js'
		],
		file : 'twitter/client.js'
	},

	'swfobject' : {
		versions: ['2.2', '2.1'],
		urls : [
			'cdnjs.cloudflare.com/ajax/libs/swfobject/$version$/swfobject.js',
			'ajax.googleapis.com/ajax/libs/swfobject/$version$/swfobject.js',
			'yandex.st/swfobject/$version$/swfobject.min.js'
		],
		file: 'swfobject/$version$/swfobject.js'
	},

	'bootstrap-js' : {
		versions: ['2.3.2', '3.1.1'],
		urls : [
			'netdna.bootstrapcdn.com/twitter-bootstrap/$version$/js/bootstrap.min.js'
		],
		file : 'bootstrap/$version$/js/bootstrap.min.js'
	},
	
	'bootstrap-theme-css' : {
		versions: ['3.1.1'],
		urls : [
			'netdna.bootstrapcdn.com/bootstrap/$version$/css/bootstrap-theme.min.css'
		],
		file: 'bootstrap/$version$/js/bootstrap-theme.min.css'
	},

	'bootstrap-css' : {
		versions: ['3.1.1', '2.3.2'],
		urls : [
			'netdna.bootstrapcdn.com/bootstrap/$version$/css/bootstrap.min.css',
			'netdna.bootstrapcdn.com/twitter-bootstrap/$version$/css/bootstrap-combined.min.css'
		],
		file : 'bootstrap/3.1.1/css/bootstrap.min.css'
	},

	'font-awesome' : {
		versions : ['3.2.1', '4.0.0'],
		urls: [
			'netdna.bootstrapcdn.com/font-awesome/$version$/css/font-awesome.css'
		],
		file: 'font-awesome/$version$/css/font-awesome-4.0.0.css'
	}
}