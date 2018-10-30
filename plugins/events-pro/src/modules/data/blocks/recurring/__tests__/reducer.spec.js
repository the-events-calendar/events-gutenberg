/**
 * Internal Dependencies
 */
import reducer from '../reducer';
import * as actions from '../actions';

describe( 'Rule reducer', () => {
	let state;

	beforeEach( () => {
		state = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
		];
	} );

	it( 'should return the default state', () => {
		expect( reducer( undefined, {} ) ).toEqual( [] );
	} );

	it( 'should add a rule', () => {
		expect(
			reducer( state, actions.addRule( { id: 4 } ) )
		).toMatchSnapshot();
	} );

	it( 'should remove a rule', () => {
		expect(
			reducer( state, actions.removeRule( 1 ) )
		).toMatchSnapshot();
	} );

	it( 'should only edit a single rule', () => {
		expect(
			reducer( [ { id: 1 } ], actions.editRule( 0, { cool: 'thanks' } ) )
		).toMatchSnapshot();
	} );

	it( 'should update the correct rule', () => {
		expect(
			reducer( state, actions.editRule( 1, { cool: 'thanks' } ) )
		).toMatchSnapshot();
	} );

	it( 'should sync rules from db', () => {
		expect(
			reducer( undefined, actions.syncRulesFromDB( JSON.stringify( state ) ) )
		).toMatchSnapshot();
	} );
} );
