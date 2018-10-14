/**
 * Internal Dependencies
 */
import * as actions from '../actions';

describe( 'Exception actions', () => {
	test( 'addField', () => {
		expect( actions.addField() ).toMatchSnapshot();
	} );
	test( 'addException', () => {
		expect( actions.addException( { value: 1 } ) ).toMatchSnapshot();
	} );
	test( 'removeField', () => {
		expect( actions.removeField() ).toMatchSnapshot();
	} );
	test( 'removeException', () => {
		expect( actions.removeException( 1 ) ).toMatchSnapshot();
	} );
	test( 'editException', () => {
		expect( actions.editException( 1, { value: 1 } ) ).toMatchSnapshot();
	} );
} );
