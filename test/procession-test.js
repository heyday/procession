/*jshint browser:true, laxbreak:true */
( function( define ) { 'use strict';
define( [ 'buster', '../procession', 'when' ], function( buster, Procession, when ) {

	// Buster setup
	var expect = buster.assertions.expect,
		describe = buster.spec.describe, it = buster.spec.it,
		before = buster.spec.before, after = buster.spec.after;

	//
	// Tests
	//
	describe( 'Procession', function() {
		it( 'is defined', function() {
			expect( Procession ).toBeDefined();
			expect( Procession ).toBeFunction();
			expect( new Procession() ).toBeObject();
		} );

		describe( 'queue to procession', function() {
			before( function() {
				this.procession = new Procession();
			} );

			describe( 'Load', function() {
				it( 'is called', function() {
					var load = this.spy();

					return when( this.procession.queue( load ) )
						.then( function() {
							expect( load ).toHaveBeenCalledOnce();
						} )
						.yield();
				} );

				it( 'is called twice', function() {
					var load = this.spy();

					return when( this.procession.queue( load ) )
						.then( function() {
							expect( load ).toHaveBeenCalledOnce();
						} )
						.yield( this.procession.queue( load ) )
						.then( function() {
							expect( load ).toHaveBeenCalledTwice();
						} )
						.yield();
				} );

				it( 'is called with options', function() {
					var load = this.spy(),
						options = { foo: 'bar' };

					return when( this.procession.queue( load, null, options ) )
						.then( function() {
							expect( load ).toHaveBeenCalledWith( options );
						} )
						.yield();
				} );

				it( 'is called with unload promise', function() {
					var load = this.spy();

					return when( this.procession.queue( load ) )
						.then( function() {
							expect( when.isPromise( load.getCall( 0 ).args[ 1 ] ) ).toBeTrue();
						} )
						.yield();
				} );
			} );


		} );
	} );

} );
} )( typeof define == 'function'
	? define
	: function( deps, factory ) { factory( this.buster, this.Procession, this.when ); }
	// Boilerplate for AMD, and browser global
);
