/**
 * Internal dependencies
 */
import { types } from '@moderntribe/events/data/forms';
import { PREFIX_EVENTS_STORE } from '@moderntribe/events/data/utils';

describe( '[STORE] - Form types', () => {
	it( 'Should return the types values', () => {
		expect( types.REMOVE_VOLATILE_ID ).toBe( `${ PREFIX_EVENTS_STORE }/REMOVE_VOLATILE_ID` );
		expect( types.ADD_VOLATILE_ID ).toBe( `${ PREFIX_EVENTS_STORE }/ADD_VOLATILE_ID` );
		expect( types.ADD_FORM ).toBe( `${ PREFIX_EVENTS_STORE }/ADD_FORM` );
		expect( types.SET_SAVING_FORM ).toBe( `${ PREFIX_EVENTS_STORE }/SET_SAVING_FORM` );
		expect( types.SUBMIT_FORM ).toBe( `${ PREFIX_EVENTS_STORE }/SUBMIT_FORM` );
		expect( types.CREATE_FORM_DRAFT ).toBe( `${ PREFIX_EVENTS_STORE }/CREATE_FORM_DRAFT` );
		expect( types.EDIT_FORM_ENTRY ).toBe( `${ PREFIX_EVENTS_STORE }/EDIT_FORM_ENTRY` );
		expect( types.SET_FORM_FIELDS ).toBe( `${ PREFIX_EVENTS_STORE }/SET_FORM_FIELDS` );
		expect( types.CLEAR_FORM ).toBe( `${ PREFIX_EVENTS_STORE }/CLEAR_FORM` );
	} );
} );
