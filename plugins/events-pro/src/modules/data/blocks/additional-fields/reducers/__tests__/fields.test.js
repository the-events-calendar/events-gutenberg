/**
 * Internal dependencies
 */
import fields from '../fields';
import { actions } from '@moderntribe/events-pro/data/blocks/additional-fields';

describe( 'Fields reducer', () => {
	let state = {};

	beforeEach( () => {
		state = { allIds: [], byId: {} };
	} );

	test( 'Default reducer', () => {
		expect( fields( undefined, {} ) ).toEqual( state );
	} );

	test( 'Add a new block inside of the reducer', () => {
		expect( fields( state, actions.addField( 'Website' ) ) ).toMatchSnapshot();
		expect( fields( state, actions.setFieldName( 'Website' ) ) ).toMatchSnapshot();
	} );

	test( 'Remove an existing block from the reducer', () => {
		state = fields( state, actions.removeField( 'Website' ) );
		expect( fields( state, actions.removeField( 'Website' ) ) ).toMatchSnapshot();
	} );
} );
