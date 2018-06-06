/**
 * Internal dependencies
 */
import { removeEmptyStrings, castBooleanStrings, diff } from './../object';

test( 'removeEmptyStrings', () => {
	expect( removeEmptyStrings( {} ) ).toEqual( {} );
	expect( removeEmptyStrings( { a: 1, b: 'sample', c: '' } ) ).toEqual( { a: 1, b: 'sample' } );
	expect( removeEmptyStrings( { a: '', b: '', c: '' } ) ).toEqual( {} );
	expect( removeEmptyStrings( { a: undefined, b: null, c: '' } ) )
		.toEqual( { a: undefined, b: null } );
	expect( removeEmptyStrings( { a: undefined, b: null, c: 'false' } ) )
		.toEqual( { a: undefined, b: null, c: 'false' } );
} );

test( 'castBooleanStrings', () => {
	expect( castBooleanStrings( {} ) ).toEqual( {} );
	expect( castBooleanStrings( { a: '0', b: 'no', c: 'false', d: true } ) )
		.toEqual( { a: false, b: false, c: false, d: true } );
	expect( castBooleanStrings( { a: '1', b: 'yes', c: 'true', d: false } ) )
		.toEqual( { a: true, b: true, c: true, d: false } );
} );

test( 'diff', () => {
	expect( diff( {}, {} ) ).toEqual( {} );
	expect( diff( { a: 1, b: 2 }, { a: 1, b: 2 } ) ).toEqual( {} );
	expect( diff( { a: 1 }, { b: 2 } ) ).toEqual( { a: 1 } );
	expect( diff( { a: 1, b: 2 }, { a: 1 } ) ).toEqual( { b: 2 } );
	expect( diff( { a: [ 1, 2 ] }, { a: [] } ) ).toEqual( { a: [ 1, 2 ] } );
	expect( diff( { a: true, b: false, c: false }, { a: false, b: true, c: false } ) )
		.toEqual( { a: true, b: false } );
	expect( diff( { a: true, b: { c: false } }, { a: true, b: { c: true } } ) )
		.toEqual( { b: { c: false } } );
	expect( diff( { a: [ 1, 2 ] }, { a: [ 2, 4 ] } ) )
		.toEqual( { a: [ 1 ] } );
	expect( diff( { a: [ 1, 2 ] }, { a: [ 2 ] } ) )
		.toEqual( { a: [ 1 ] } );
	expect( diff( { a: { b: [ 1, 2 ], c: [ 4 ] } }, { a: { b: [ 2 ], c: [ 5 ] } } ) )
		.toEqual( { a: { b: [ 1 ], c: [ 4 ] } } );
} );
