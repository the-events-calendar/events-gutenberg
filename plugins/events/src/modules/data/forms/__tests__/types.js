/**
 * Internal dependencies
 */
import { types } from '@@plugins/events/data/forms';

describe( '[STORE] - Form types', () => {
	it( 'Should return the types values', () => {
		expect( types.REMOVE_VOLATILE_ID ).toBe( 'REMOVE_VOLATILE_ID' );
		expect( types.ADD_VOLATILE_ID ).toBe( 'ADD_VOLATILE_ID' );
		expect( types.ADD_FORM ).toBe( 'ADD_FORM' );
		expect( types.SET_SAVING_FORM ).toBe( 'SET_SAVING_FORM' );
		expect( types.SUBMIT_FORM ).toBe( 'SUBMIT_FORM' );
		expect( types.CREATE_FORM_DRAFT ).toBe( 'CREATE_FORM_DRAFT' );
		expect( types.EDIT_FORM_ENTRY ).toBe( 'EDIT_FORM_ENTRY' );
		expect( types.SET_FORM_FIELDS ).toBe( 'SET_FORM_FIELDS' );
		expect( types.CLEAR_FORM ).toBe( 'CLEAR_FORM' );
	} );
} );
