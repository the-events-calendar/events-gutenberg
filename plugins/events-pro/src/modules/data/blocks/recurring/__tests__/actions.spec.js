/**
 * Internal Dependencies
 */
import * as actions from '../actions';

describe( 'Recurrence actions', () => {
	test( 'addField', () => {
		expect( actions.addField() ).toMatchSnapshot();
	} );

	test( 'addRule', () => {
		expect( actions.addRule( { value: 1 } ) ).toMatchSnapshot();
	} );

	test( 'removeField', () => {
		expect( actions.removeField() ).toMatchSnapshot();
	} );

	test( 'removeRule', () => {
		expect( actions.removeRule( 1 ) ).toMatchSnapshot();
	} );

	test( 'editRule', () => {
		expect( actions.editRule( 1, { value: 1 } ) ).toMatchSnapshot();
	} );

	test( 'syncRule', () => {
		expect( actions.syncRule( 1, { value: 1 } ) ).toMatchSnapshot();
	} );

	test( 'syncRulesFromDB', () => {
		expect( actions.syncRulesFromDB( { value: 1 } ) ).toMatchSnapshot();
	} );
} );
