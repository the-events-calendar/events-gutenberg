/**
 * Internal dependencies
 */
import {
	isTruthy,
	isFalsy,
	replaceWithObject,
	numericLabel,
} from '../string';

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

	test( 'numericLabel', () => {
		let params = {};
		expect( numericLabel( params ) ).toBe( undefined );
		params = { fallback: 'My fallback value' };
		expect( numericLabel( params ) ).toBe( 'My fallback value' );
		params = { count: 0, singular: 'Just %d item', plural: 'We have %d items' };
		expect( numericLabel( params ) ).toBe( undefined );
		params = { count: 0, singular: 'Just %d item', plural: 'We have %d items', fallback: '' };
		expect( numericLabel( params ) ).toBe( '' );
		params = { count: 1, singular: 'Just item', plural: 'We have %d items', fallback: '' };
		expect( numericLabel( params ) ).toBe( 'Just item' );
		params = { count: -10, singular: 'Just %d item', plural: 'We have %d items', fallback: '' };
		expect( numericLabel( params ) ).toBe( '' );
		params = { count: 1, singular: 'Just %d item', plural: 'We have %d items', fallback: '' };
		expect( numericLabel( params ) ).toBe( 'Just 1 item' );
		params = { count: 3, singular: 'Just %d item', plural: 'We have %d items', fallback: '' };
		expect( numericLabel( params ) ).toBe( 'We have 3 items' );
	} );
} );
