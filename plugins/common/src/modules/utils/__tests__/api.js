import * as api from '../api';


jest.mock( '@moderntribe/common/utils/globals', () => ( {
	config: () => ( {
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
} )
;
