/**
 * Internal dependencies
 */
import {
	isTruthy,
	isFalsy,
	replaceWithObject,
	interpolateNumbers,
} from '@moderntribe/common/utils/string';

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

	describe( 'interpolateNumbers', () => {
		test( 'Strings with no values', () => {
			expect( interpolateNumbers( '' ) ).toBe( '' );
			expect( interpolateNumbers( '   Modern     Tribe    ' ) ).toBe( '   Modern     Tribe    ' );
		} );

		test( 'Interpolation with no params', () => {
			expect( interpolateNumbers( 'Modern Tribe - %d projects' ) )
				.toBe( 'Modern Tribe - %d projects' );
			expect( interpolateNumbers( '%d %d %d' ) ).toBe( '%d %d %d' );
		} );

		test( 'Interpolate with numeric values', () => {
			expect( interpolateNumbers( 'WordPress %d', 5 ) ).toBe( 'WordPress 5' );
			expect( interpolateNumbers( '%d apples', 12 ) ).toBe( '12 apples' );
			expect( interpolateNumbers( '%d bugs were found on %d projects on %d', 10, 20, 2018 ) )
				.toBe( '10 bugs were found on 20 projects on 2018' );
		} );

		test( 'Unbalance interpolation', () => {
			expect( interpolateNumbers( '%d bugs were found on %d projects on %d', 10 ) )
				.toBe( '10 bugs were found on %d projects on %d' );
		} );
	} );
} );
