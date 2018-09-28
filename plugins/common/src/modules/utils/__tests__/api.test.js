import * as api from '../api';


jest.mock( '@moderntribe/common/utils/globals', () => ( {
	config: () => ( {
		admin_url: 'https://localhost/wp-admin/',
		rest: {
			url: 'https://localhost/wp-json/',
		},
	} ),
} ) );

describe( 'api', () => {
	describe( 'endpointUrl', () => {
		test( 'Default values', () => {
			expect( api.endpointUrl() ).toBe( `https://localhost/wp-json/wp/v2` );
		} );

		test( 'Custom endpoint', () => {
			expect( api.endpointUrl( '/media/1023' ) )
				.toBe( 'https://localhost/wp-json/wp/v2/media/1023' );
		} );

		test( 'Custom namespace', () => {
			expect( api.endpointUrl( '/events/10', 'tribe/v1' ) )
				.toBe( 'https://localhost/wp-json/tribe/v1/events/10' );
		} );
	} );

	describe( 'adminAjax', () => {
		test( 'Ajax url', () => {
			expect( api.adminAjax() ).toBe( 'https://localhost/wp-admin/admin-ajax.php' );
		} );
	} );

	describe( 'encode', () => {
		test( 'empty object', () => {
			expect( api.encode() ).toEqual( [] );
		} );

		test( 'regular object', () => {
			const input = {
				name: 'Modern Tribe',
				rol: 'agency',
			}
			expect( api.encode( input ) )
				.toEqual( [ 'name=Modern%20Tribe', 'rol=agency' ] );
		} );

		test( 'nested object', () => {
			const input = {
				name: 'Modern Tribe',
				rol: 'agency',
				teams: {
					products: {
						members: 10,
					},
					support: {
						members: 20,
					},
					agency: {
						members: 30,
					},
				},
			}
			expect( api.encode( input ) )
				.toEqual( [ 'name=Modern%20Tribe', 'rol=agency' ] );
			expect( input );
		} );
	} );
} );
