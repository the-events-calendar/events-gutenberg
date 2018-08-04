/**
 * Internal dependencies
 */
import { actions } from '@@plugins/events/data/details';
import reducer, { DEFAULT_STATE } from '@@plugins/events/data/details/reducers/details';

describe( '[STORE] - details reducer', () => {
	it( 'Should return default state', () => {
		expect( reducer( undefined, {} ) ).toEqual( DEFAULT_STATE );
	} );

	it( 'Should set the details', () => {
		expect( reducer( DEFAULT_STATE, actions.setDetails( 20, { title: 'Modern Tribe' } ) ) )
			.toMatchSnapshot();
	} );

	it( 'Should enable the loading', () => {
		expect( reducer( DEFAULT_STATE, actions.enableLoading( 20 ) ) )
			.toMatchSnapshot();
	} );

	it( 'Should set the post type', () => {
		expect( reducer( DEFAULT_STATE, actions.setPostType( 20, 'tribe_organizers' ) ) )
			.toMatchSnapshot();
	} );
} );
