/**
 * Internal dependencies
 */
import { actions } from '@moderntribe/events-pro/data/blocks/additional-fields';
import field, { DEFAULT_STATE } from '../field';
import { FIELD_TYPES } from '@moderntribe/events-pro/blocks/additional-fields/utils';

describe( 'Fields reducer', () => {
	let state = {};
	const fieldName = '_ecp_custom_23';

	beforeEach( () => {
		state = { allIds: [], byId: {} };
	} );

	test( 'Default reducer', () => {
		expect( field( undefined, {} ) ).toEqual( DEFAULT_STATE );
	} );

	test( 'Set ticket name', () => {
		expect( field( DEFAULT_STATE, actions.setFieldLabel( fieldName, 'Website' ) ) )
			.toMatchSnapshot();
	} );

	test( 'Set ticket value', () => {
		const action = actions.setFieldValue( fieldName, 'https://theeventscalendar.com/' );
		expect( field( DEFAULT_STATE, action ) ).toMatchSnapshot();
	} );

	test( 'Set field type', () => {
		expect( field( DEFAULT_STATE, actions.setFieldType( fieldName, FIELD_TYPES.url ) ) )
			.toMatchSnapshot();
	} );

	test( 'Set field is pristine', () => {
		expect( field( DEFAULT_STATE, actions.setFieldIsPristine( fieldName, true ) ) )
			.toMatchSnapshot();
		expect( field( DEFAULT_STATE, actions.setFieldIsPristine( fieldName, false ) ) )
			.toMatchSnapshot();
	} );

	test( 'Set field options', () => {
		const action = actions.setFieldOptions( fieldName, [ 'Pizza', 'Cheese Cake', 'Cheese' ] );
		expect( field( DEFAULT_STATE, action ) ).toMatchSnapshot();
	} );

	test( 'Set field divider list', () => {
		const action = actions.setFieldDividerList( fieldName, ', ' );
		expect( field( DEFAULT_STATE, action ) ).toMatchSnapshot();
	} );

	test( 'Set field divider end', () => {
		const action = actions.setFieldDividerEnd( fieldName, ' & ' );
		expect( field( DEFAULT_STATE, action ) ).toMatchSnapshot();
	} );

	test( 'append field value', () => {
		const action = actions.appendFieldValue( fieldName, 'Chocolate' );
		const newState = {
			...DEFAULT_STATE,
			value: [],
		};
		expect( field( newState, action ) ).toMatchSnapshot();
	} );

	test( 'remove field value', () => {
		const action = actions.removeFieldValue( fieldName, 'Chocolate' );
		const newState = {
			...DEFAULT_STATE,
			value: [ 'Chocolate' ],
		};
		expect( field( newState, action ) ).toMatchSnapshot();
	} );

	test( 'set meta key value', () => {
		const action = actions.setFieldMetaKey( fieldName, '_additional_field' );
		expect( field( DEFAULT_STATE, action ) ).toMatchSnapshot();
	} );

	test( 'field output', () => {
		const action = actions.setFieldOutput( fieldName, 'My custom output' );
		expect( field( DEFAULT_STATE, action ) ).toMatchSnapshot();
	} );
} );
