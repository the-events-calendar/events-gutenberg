/**
 * Internal dependencies
 */
import {
	isTruthy,
	isFalsy,
	replaceWithObject,
} from '@@tribe/events/editor/utils/string';

describe( 'Tests for string.js', () => {
	test( 'isTruthy', () => {
		expect( isTruthy( 'Sample string' ) ).toEqual( false );
		expect( isTruthy( '0' ) ).toEqual( false );
		expect( isTruthy( 'false' ) ).toEqual( false );
		expect( isTruthy( '1' ) ).toEqual( true );
		expect( isTruthy( 'yes' ) ).toEqual( true );
		expect( isTruthy( 'true' ) ).toEqual( true );
	} );

	test( 'isFalsy', () => {
		expect( isFalsy( 'Sample string' ) ).toEqual( false );
		expect( isFalsy( '1' ) ).toEqual( false );
		expect( isFalsy( 'true' ) ).toEqual( false );
		expect( isFalsy( '' ) ).toEqual( true );
		expect( isFalsy( '0' ) ).toEqual( true );
		expect( isFalsy( 'no' ) ).toEqual( true );
		expect( isFalsy( 'false' ) ).toEqual( true );
	} );

	test( 'replaceWithObject', () => {
		expect( replaceWithObject() ).toEqual( '' );
		expect( replaceWithObject( '', {} ) ).toEqual( '' );
		expect( replaceWithObject( 'abcd' ) ).toEqual( 'abcd' );
		expect( replaceWithObject( 'abcd', { z: 'a' } ) ).toEqual( 'abcd' );
		expect( replaceWithObject( 'abcd', { a: 'b', c: 'd' } ) ).toEqual( 'bbdd' );
		expect( replaceWithObject( 'abcd', { a: '', c: '' } ) ).toEqual( 'bd' );
	} );
} );
