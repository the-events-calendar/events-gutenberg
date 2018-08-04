/**
 * Internal dependencies
 */
import { actions } from '@@plugins/events/data/blocks/classic';
import reducer, { DEFAULT_STATE } from '@@plugins/events/data/blocks/classic/reducers';

describe( '[STORE] - Classic reducer', () => {
	test( 'Default state', () => {
		expect( reducer( undefined, {} ) ).toEqual( DEFAULT_STATE );
	} );

	test( 'Details title', () => {
		expect( reducer( DEFAULT_STATE, actions.setDetailsTitle( 'Event' ) ) ).toMatchSnapshot();
	} );

	test( 'Organizer title', () => {
		expect( reducer( DEFAULT_STATE, actions.setOrganizerTitle( 'Modern Tribe' ) ) )
			.toMatchSnapshot();
	} );
} );
