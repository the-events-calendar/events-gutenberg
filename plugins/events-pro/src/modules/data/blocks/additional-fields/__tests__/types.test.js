/**
 * Internal dependencies
 */
import { PREFIX_EVENTS_PRO_STORE } from '@moderntribe/events-pro/data/prefix';
import { types } from '@moderntribe/events-pro/data/blocks/additional-fields';

describe( 'Additional Field types', () => {
	test( 'Should match the types', () => {
		expect( types.ADD_ADDITIONAL_FIELD )
			.toEqual( `${ PREFIX_EVENTS_PRO_STORE }/ADD_ADDITIONAL_FIELD` );
		expect( types.REMOVE_ADDITIONAL_FIELD )
			.toEqual( `${ PREFIX_EVENTS_PRO_STORE }/REMOVE_ADDITIONAL_FIELD` );
		expect( types.SET_ADDITIONAL_FIELD_NAME )
			.toEqual( `${ PREFIX_EVENTS_PRO_STORE }/SET_ADDITIONAL_FIELD_NAME` );
		expect( types.SET_ADDITIONAL_FIELD_IS_PRISTINE )
			.toEqual( `${ PREFIX_EVENTS_PRO_STORE }/SET_ADDITIONAL_FIELD_IS_PRISTINE` );
		expect( types.SET_ADDITIONAL_FIELD_VALUE )
			.toEqual( `${ PREFIX_EVENTS_PRO_STORE }/SET_ADDITIONAL_FIELD_VALUE` );
		expect( types.SET_ADDITIONAL_FIELD_TYPE )
			.toEqual( `${ PREFIX_EVENTS_PRO_STORE }/SET_ADDITIONAL_FIELD_TYPE` );
		expect( types.SET_ADDITIONAL_FIELD_OPTIONS )
			.toEqual( `${ PREFIX_EVENTS_PRO_STORE }/SET_ADDITIONAL_FIELD_OPTIONS` );
		expect( types.SET_ADDITIONAL_FIELD_DIVIDER_LIST )
			.toEqual( `${ PREFIX_EVENTS_PRO_STORE }/SET_ADDITIONAL_FIELD_DIVIDER_LIST` );
		expect( types.SET_ADDITIONAL_FIELD_DIVIDER_END )
			.toEqual( `${ PREFIX_EVENTS_PRO_STORE }/SET_ADDITIONAL_FIELD_DIVIDER_END` );
	} );
} );
