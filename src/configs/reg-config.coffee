semver = '\\s*[v=]*\\s*([0-9]+\\.[0-9]+\\.[0-9]+(-[0-9]+-?)?([a-zA-Z-+][a-zA-Z0-9-.:]*)?)'

module.exports =
	'jquery cookie':
		pattern: 'jquery.cookie.js$'
		file: 'jquery/jquery.cookie.plugin.js'

	'jquery form':
		pattern: 'jquery.form.js$'
		file: 'jquery/jquery.form.js'

# wordpress-specific pattern
 'wordpress-specific jquery':
		pattern: "jquery.js\\?ver=#{semver}"
		versions: [
			'2.2.2'
			'2.2.1'
			'2.2.0'
			'2.1.4'
			'2.1.3'
			'2.1.2'
			'2.1.1'
			'2.1.0'
			'2.0.3'
			'2.0.2'
			'2.0.1'
			'2.0.0'
			'1.11.3'
			'1.11.2'
			'1.11.1'
			'1.11.0'
			'1.10.2'
			'1.10.1'
			'1.10.0'
			'1.9.1'
			'1.9.0'
			'1.8.3'
			'1.8.2'
			'1.8.1'
			'1.8.0'
			'1.7.2'
			'1.7.1'
			'1.7.0'
			'1.6.4'
			'1.6.3'
			'1.6.2'
			'1.6.1'
			'1.6.0'
			'1.5.2'
			'1.5.1'
			'1.5.0'
			'1.4.4'
			'1.4.3'
			'1.4.2'
			'1.4.1'
		]
		file: 'jquery/$version$/jquery.min.js'

# wordpress-specific pattern
	'wordpress-specific jquery-migrate':
		pattern: "jquery-migrate.min.js\\?ver=#{semver}"
		versions: [
			'1.2.1'
		]
		file: 'jquery-migrate/$version$/jquery-migrate.min.js'

	'jquery-migrate w/o version':
		pattern:'jquery-migrate.min.js'
		file: 'jquery-migrate/1.2.1/jquery-migrate.min.js'

	'jquery-migrate w version':
		pattern: "jquery-migrate-#{semver}.min.js"
		file: 'jquery-migrate/1.2.1/jquery-migrate.min.js'

	'jquery':
		pattern: "jquery-#{semver}.min.js$"
		versions: [
			'2.2.2'
			'2.2.1'
			'2.2.0'
			'2.1.4'
			'2.1.3'
			'2.1.2'
			'2.1.1'
			'2.1.0'
			'2.0.3'
			'2.0.2'
			'2.0.1'
			'2.0.0'
			'1.11.3'
			'1.11.2'
			'1.11.1'
			'1.11.0'
			'1.10.2'
			'1.10.1'
			'1.10.0'
			'1.9.1'
			'1.9.0'
			'1.8.3'
			'1.8.2'
			'1.8.1'
			'1.8.0'
			'1.7.2'
			'1.7.1'
			'1.7.0'
			'1.6.4'
			'1.6.3'
			'1.6.2'
			'1.6.1'
			'1.6.0'
			'1.5.2'
			'1.5.1'
			'1.5.0'
			'1.4.4'
			'1.4.3'
			'1.4.2'
			'1.4.1'
		]
		file: 'jquery/$version$/jquery.min.js'
