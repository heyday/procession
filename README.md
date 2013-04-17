# procession

A single state queuing system.


## Quick Start

Three options are available for getting the source:

* [Download the latest release](https://github.com/heyday/procession/zipball/master).
* Clone the repo: `git clone git://github.com/heyday/procession.git`.
* Install with [Bower](http://twitter.github.com/bower): `bower install procession`. **-- Not working yet**

### AMD

1. Configure your loader with a package:

	```javascript
	packages: [
		{ name: 'procession', location: 'path/to/procession/', main: 'procession' },
		// ... other packages ...
	]
	```

1. `define( [ 'procession', ... ], function( Procession, ... ) { ... } );` or `require( [ 'procession', ... ], function( Procession, ... ) { ... } );`

### Script Tag

1. `<script src="path/to/procession/procession.min.js"></script>`
1. `procession` will be available as `window.Procession`


## API

```javascript
var procession = new Procession();

procession.queue( load, unload, options );
```

### Example usage
Creating a banner system with jQuery.

```javascript
var banner = new Procession();

banner.queue(
	null,
	function( options ) {
		var $el = $( '.banner:visible' );

		// Animate out
		$el.fadeOut( options.speed );

		return $el.promise( 'fx' );
	},
	{ speed: 'fast' }
);


$( '.banner-select' ).click( function( e ) {
	var $banner, banner_id;

	 banner_id = $( el ).data( 'bannerId' );
	 $banner = $( '#' + banner_id );

	e.preventDefault();

	banner.queue(
		function( options, unload_promise ) { // Load

			return unload_promise.then( function() {

				// Animate in
				$banner.fadeIn( options.speed );

				return $banner.promise( 'fx' );
			} );
		},
		function( options ) { // Unload

			// Animate out
			$banner.fadeOut( options.speed );

			return $banner.promise( 'fx' );
		},
		{ speed: 'fast' }
	);

} );
```

## Development

### Running the unit tests

1. `npm install` - Install all required dev modules
1. `npm install -g grunt-cli` - Install Grunt
1. `grunt test` - Lints all files, and then runs the unit tests in a PhantomJS instance

### Building the module locally

1. `npm install` - Install all required dev modules
1. `npm install -g grunt-cli bower` - Install Grunt and Bower
1. `bower install` - Install all required dependencies
1. `grunt build` - Runs all tests, and then builds the production file
