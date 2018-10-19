/**
 * Internal dependencies
 */
import { actions, utils } from '@moderntribe/events-pro/data/blocks/additional-fields';
import field, { DEFAULT_STATE } from '../field';

describe( 'Fields reducer', () => {
	let state = {};

	beforeEach( () => {
		state = { allIds: [], byId: {} };
	} );

	test( 'Default reducer', () => {
		expect( field( undefined, {} ) ).toEqual( DEFAULT_STATE );
	} );

	test( 'Set ticket name', () => {
		expect( field( DEFAULT_STATE, actions.setFieldName( 'Website' ) ) ).toMatchSnapshot();
	} );

	test( 'Set ticket value', () => {
		const action = actions.setFieldValue( 'Website', 'https://theeventscalendar.com/' );
		expect( field( DEFAULT_STATE, action ) ).toMatchSnapshot();
	} );

	test( 'Set field type', () => {
		expect( field( DEFAULT_STATE, actions.setFieldType( 'Website', utils.FIELD_TYPES.URL ) ) )
			.toMatchSnapshot();
	} );

	test( 'Set field is pristine', () => {
		expect( field( DEFAULT_STATE, actions.setFieldIsPristine( 'Website', true ) ) )
			.toMatchSnapshot();
		expect( field( DEFAULT_STATE, actions.setFieldIsPristine( 'Website', false ) ) )
			.toMatchSnapshot();
	} );

	test( 'Set field options', () => {
		const action = actions.setFieldOptions( 'Refreshments', [ 'Pizza', 'Cheese Cake', 'Cheese' ] );
		expect( field( DEFAULT_STATE, action ) ).toMatchSnapshot();
	} );

	test( 'Set field divider list', () => {
		const action = actions.setFieldDividerList( 'Refreshments', ', ' );
		expect( field( DEFAULT_STATE, action ) ).toMatchSnapshot();
	} );

	test( 'Set field divider end', () => {
		const action = actions.setFieldDividerEnd( 'Refreshments', ' & ' );
		expect( field( DEFAULT_STATE, action ) ).toMatchSnapshot();
	} );
} );
