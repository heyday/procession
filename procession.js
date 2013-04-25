/** @license MIT License copyright (c) Heyday */

/**
 * Procession
 *
 * Licensed under the MIT License at:
 * http://heyday.mit-license.org/
 *
 * @version 0.1.0
 */

/*jshint laxbreak:true */
( function( define ) {
define( [ 'when' ], function( when ) {
	var Procession, isFunction;

	isFunction = function( obj ) {
		return Object.prototype.toString.call( obj ) == '[object Function]';
	};

	Procession = function() {
		this._resetQueue();
	};

	Procession.prototype = {

		_add: function( load, unload, options ) {
			var promise;

			options = options || {};

			promise = this._getFirstFromQueue()
				.then( function( prevous ) {
					var load_promise, unload_promise;

					prevous = prevous || { options: {} };

					options.prevous = prevous.options;

					if ( isFunction( prevous.unload ) ) {
						unload_promise = when( prevous.unload( options ) ).yield();
					} else {
						unload_promise = when.resolve();
					}

					if ( isFunction( load ) ) {
						load_promise = when( load( options, unload_promise ) );
					}

					return when.all( [ unload_promise, load_promise ] )
						.yield( {
							load: load,
							unload: unload,
							options: options
						} );
				} );

			this._addToQueue( promise );

			return promise;
		},

		_getFirstFromQueue: function() {
			return this.__queue.length ? this.__queue.shift() : when.resolve();
		},

		_resetQueue: function() {
			this.__queue = [];
		},

		_addToQueue: function( valueOrPromise ) {
			this.__queue.push( when( valueOrPromise ) );
		},

		queue: function( load, unload, options ) {
			return this._add( load, unload, options );
		}

	};

	return Procession;
} );
} )( typeof define == 'function'
	? define
	: function( deps, factory ) { this.Procession = factory( this.when ); }
	// Boilerplate for AMD, and browser global
);
