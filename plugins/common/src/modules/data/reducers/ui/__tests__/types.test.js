/**
 * Internal dependencies
 */
import { PREFIX_COMMON_STORE } from '@moderntribe/common/data/utils';
import { types } from '@moderntribe/common/data/reducers/ui';

describe( 'Accordion types', () => {
	it( 'Should return the types with a prefix', () => {
		expect( types.ADD_ACCORDION ).toBe( `${ PREFIX_COMMON_STORE }/ADD_ACCORDION` );
		expect( types.REMOVE_ACCORDION ).toBe( `${ PREFIX_COMMON_STORE }/REMOVE_ACCORDION` );
	} );
} );
