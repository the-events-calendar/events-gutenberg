/**
 * Internal dependencies
 */
import { selectors } from '@moderntribe/events/data/blocks/organizers';

const state = {
	blocks: {
		organizers: {
			blocks: {
				byId: {
					firstBlock: {
						organizer: 100,
					},
					secondBlock: {
						organizer: 101,
					},
				},
				allIds: [ 100, 101 ],
			},
			classic: [ 98, 99, 100 ],
		},
	},
};

describe( '[STORE] - Organizers selectors', () => {
	it( 'Should return the classic organizers', () => {
		expect( selectors.getOrganizersInClassic( state ) ).toEqual( [ 98, 99, 100 ] );
	} );

	it( 'Should return the organizer block', () => {
		expect( selectors.getOrganizerBlock( state, { id: 'firstBlock' } ) )
			.toEqual( state.blocks.organizers.blocks.byId.firstBlock );
		expect( selectors.getOrganizerBlock( state, { id: 'secondBlock' } ) )
			.toEqual( state.blocks.organizers.blocks.byId.secondBlock );
		expect( selectors.getOrganizerBlock( state, { id: 'thirdBlock' } ) )
			.toEqual( undefined );
	} );

	it( 'Should return the organizer in a block', () => {
		expect( selectors.getOrganizerInBlock( state, { id: 'firstBlock' } ) ).toEqual( 100 );
		expect( selectors.getOrganizerInBlock( state, { id: 'secondBlock' } ) ).toEqual( 101 );
		expect( selectors.getOrganizerInBlock( state, { id: 'thirdBlock' } ) ).toEqual( undefined );
	} );

	it( 'Should return the organizers in a block', () => {
		expect( selectors.getOrganizersInBlock( state ) ).toEqual( [ 100, 101 ] );
	} );

	it( 'Should return the mapped organizers', () => {
		expect( selectors.getMappedOrganizers( state ) ).toMatchSnapshot();
	} );
} );
