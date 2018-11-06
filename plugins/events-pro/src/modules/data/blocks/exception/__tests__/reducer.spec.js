/**
 * Internal Dependencies
 */
import reducer from '../reducer';
import * as actions from '../actions';

describe( 'Exception reducer', () => {
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
			reducer( state, actions.addException( { id: 4 } ) )
		).toMatchSnapshot();
	} );

	it( 'should remove an exception', () => {
		expect(
			reducer( state, actions.removeException( 1 ) )
		).toMatchSnapshot();
	} );

	describe( 'edit', () => {
		it( 'should only edit a single exception', () => {
			expect(
				reducer( [{ id: 1 }], actions.editException( 0, { cool: 'thanks' } ) )
			).toMatchSnapshot();
		} );
		it( 'should update the correct exception', () => {
			expect(
				reducer( state, actions.editException( 1, { cool: 'thanks' } ) )
			).toMatchSnapshot();
		} );
	} );

	it( 'should sync from DB', () => {
		expect(
			reducer( state, actions.syncExceptionsFromDB( '[{},{}]' ) )
		).toMatchSnapshot();
	} );
} );
