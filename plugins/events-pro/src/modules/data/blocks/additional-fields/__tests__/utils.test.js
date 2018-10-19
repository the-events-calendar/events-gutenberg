/**
 * Internal dependencies
 */
import { utils } from '@moderntribe/events-pro/data/blocks/additional-fields';

describe( 'Additional Fields utils', () => {
	describe( 'Field Types', () => {
		test( 'Match field values', () => {
			expect( utils.FIELD_TYPES.CHECKBOX ).toEqual( 'CHECKBOX' );
			expect( utils.FIELD_TYPES.DROP_DOWN ).toEqual( 'DROP_DOWN' );
			expect( utils.FIELD_TYPES.RADIO ).toEqual( 'RADIO' );
			expect( utils.FIELD_TYPES.TEXT ).toEqual( 'TEXT' );
			expect( utils.FIELD_TYPES.TEXT_AREA ).toEqual( 'TEXT_AREA' );
			expect( utils.FIELD_TYPES.URL ).toEqual( 'URL' );
		} );
	} );
} );
