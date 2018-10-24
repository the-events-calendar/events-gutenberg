/**
 * Internal dependencies
 */
import fields from '../fields';
import { actions } from '@moderntribe/events-pro/data/blocks/additional-fields';

describe( 'Fields reducer', () => {
	let state = {};
	const fieldName = '_ecp_custom_23';

	beforeEach( () => {
		state = { allIds: [], byId: {} };
	} );

	test( 'Default reducer', () => {
		expect( fields( undefined, {} ) ).toEqual( state );
	} );

	test( 'Add a new block inside of the reducer', () => {
		expect( fields( state, actions.addField( fieldName ) ) ).toMatchSnapshot();
		expect( fields( state, actions.setFieldLabel( fieldName, 'Website' ) ) ).toMatchSnapshot();
	} );

	test( 'Remove an existing block from the reducer', () => {
		state = fields( state, actions.addField( fieldName ) );
		expect( fields( state, actions.removeField( fieldName ) ) ).toMatchSnapshot();
	} );
} );
