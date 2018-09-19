/**
 * External dependencies
 */
import { createSelector } from 'reselect';

export const getTicketBlock = ( state ) => state.tickets.blocks.ticket;

export const getSharedCapacity = createSelector(
	[ getTicketBlock ],
	( ticket ) => ticket.sharedCapacity,
);

export const getHeader = createSelector(
	[ getTicketBlock ],
	( ticket ) => ticket.header,
);

export const getImageSize = ( state, props ) => props.size;

export const getImageID = createSelector(
	[ getHeader ],
	( header ) => header === null ? null : header.id,
);

export const getHeaderSize = createSelector(
	[ getHeader, getImageSize ],
	( header, size ) => {
		if ( header === null || ! header.sizes || ! header.sizes[ size ] ) {
			return null;
		}
		return header.sizes[ size ];
	},
);
