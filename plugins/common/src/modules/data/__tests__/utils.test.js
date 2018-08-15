/**
 * Internal dependencies
 */
import { PREFIX } from '@moderntribe/common/data/utils';

describe( 'prefix', () => {
	it( 'Should return the prefix', () => {
		expect( PREFIX ).toBe('@@MT/COMMON');
	} );
} );
