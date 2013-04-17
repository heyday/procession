var config = module.exports;

config[ 'browser global' ] = {
	environment: 'browser',
	rootPath: '../',
	tests: [
		'test/*-test.js'
	],
	sources: [
		'components/when/when.js',
		'procession.js'
	]
};

config[ 'browser AMD' ] = {
	environment: 'browser',
	rootPath: '../',
	libs: [
		'node_modules/requirejs/require.js',
		'test/amd.config.js'
	],
	tests: [
		'test/*-test.js'
	],
	resources: [
		'components/when/when.js',
		'procession.js'
	],
	extensions: [
		require( 'buster-amd' )
	]
};
