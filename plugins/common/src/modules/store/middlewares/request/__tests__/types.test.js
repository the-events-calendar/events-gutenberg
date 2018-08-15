/**
 * Internal dependencies
 */
import { PREFIX } from '@moderntribe/common/data/utils';
import { types } from '@moderntribe/common/store/middlewares/request';

describe( '[STORE] - Request types', () => {
	it( 'Should return the types values', () => {
		expect( types.WP_REQUEST ).toBe( `${ PREFIX }/WP_REQUEST` );
	} );
} );
