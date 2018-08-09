/**
 * Internal dependencies
 */
import { actions } from 'data/details';

describe( '[STORE] - Details actions', () => {
	test( 'Enable isLoading action', () => {
		expect( actions.enableIsLoading( 'events' ) ).toMatchSnapshot();
	} );

	test( 'Disable isLoading action', () => {
		expect( actions.disableIsLoading( 'events' ) ).toMatchSnapshot();
	} );

	test( 'Set details actions', () => {
		expect( actions.setDetails( 'events', { id: 20, title: 'Modern Tribe' } ) ).toMatchSnapshot();
	} );

	test( 'Set post type action', () => {
		expect( actions.setPostType( 'events', 'tribe_events' ) ).toMatchSnapshot();
	} );
} );
