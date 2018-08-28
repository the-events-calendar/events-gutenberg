/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import { difference } from 'lodash';

export const getOrganizersInClassic = ( state ) => state.blocks.organizers.classic;

export const getOrganizerBlock = ( state, props ) =>
	state.blocks.organizers.blocks.byId[ props.clientId ];

export const getOrganizerInBlock = createSelector(
	[ getOrganizerBlock ],
	( block ) => block ? block.organizer : undefined
);

export const getOrganizersInBlock = ( state ) => state.blocks.organizers.blocks.allIds;

export const getMappedOrganizers = createSelector(
	[ getOrganizersInClassic, getOrganizersInBlock ],
	( classic, blocks ) => {
		return classic.map( ( id ) => ( {
			id,
			block: difference( [ id ], blocks ).length === 0,
		} ) );
	}
);
