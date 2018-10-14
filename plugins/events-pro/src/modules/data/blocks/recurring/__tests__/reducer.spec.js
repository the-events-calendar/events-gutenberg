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

	it( 'should add a exception', () => {
		expect(
			reducer( state, actions.addRule( { id: 4 } ) )
		).toMatchSnapshot();
	} );

	it( 'should remove an exception', () => {
		expect(
			reducer( state, actions.removeRule( 1 ) )
		).toMatchSnapshot();
	} );

	describe( 'edit', () => {
		it( 'should only edit a single exception', () => {
			expect(
				reducer( [{ id: 1 }], actions.editRule( 0, { cool: 'thanks' } ) )
			).toMatchSnapshot();
		} );
		it( 'should update the correct exception', () => {
			expect(
				reducer( state, actions.editRule( 1, { cool: 'thanks' } ) )
			).toMatchSnapshot();
		} );
	} );
} );
