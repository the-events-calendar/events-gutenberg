/**
 * Internal dependencies
 */
import { actions } from 'data/details';

describe( '[STORE] - Details actions', () => {
	test( 'Enable loading action', () => {
		expect( actions.enableLoading( 'events' ) ).toMatchSnapshot();
	} );

	test( 'Disable loading action', () => {
		expect( actions.disableLoading( 'events' ) ).toMatchSnapshot();
	} );

	test( 'Set details actions', () => {
		expect( actions.setDetails( 'events', { id: 20, title: 'Modern Tribe' } ) ).toMatchSnapshot();
	} );

	test( 'Set post type action', () => {
		expect( actions.setPostType( 'events', 'tribe_events' ) ).toMatchSnapshot();
	} );
} );
