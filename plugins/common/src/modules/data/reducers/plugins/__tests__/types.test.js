/**
 * Internal dependencies
 */
import { types } from '@moderntribe/common/data/reducers/plugins';

describe( 'Plugin types', () => {
	it( 'Should use a prefix', () => {
		expect( types.PREFIX ).toBe( '@@MT/COMMON' );
	} );

	it( 'Should return the types with a prefix', () => {
		const PREFIX = '@@MT/COMMON';
		expect( types.ADD_PLUGIN ).toBe( `${ PREFIX }/ADD_PLUGIN` );
		expect( types.REMOVE_PLUGIN ).toBe( `${ PREFIX }/REMOVE_PLUGIN` );
		expect( types.ACTIVATE_PLUGIN ).toBe( `${ PREFIX }/ACTIVATE_PLUGIN` );
		expect( types.DEACTIVATE_PLUGIN ).toBe( `${ PREFIX }/DEACTIVATE_PLUGIN` );
	} );
} );
