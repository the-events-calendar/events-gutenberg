/**
 * External dependencies
 */
import { createSelector } from 'reselect';

export const getTicketBlock = ( state ) => state.tickets.blocks.ticket;

export const getSharedCapacity = createSelector(
	[ getTicketBlock ],
	( ticket ) => ticket.sharedCapacity,
);

/**
 * @todo: Add the amount of independent capacity to this one.
 */
export const getTotalCapacity = createSelector(
	[ getSharedCapacity ],
	( shared ) => {
		/**
		 * values can be empty string on initial load so we need to fallback to a number in order
		 * to return a number to the total so in case of NaN we fallback to zero as the default value
		 * absence of value is not same as zero on inputs so it can't be used as: null or zero,
		 * inputs needs to have undefined or empty string instead.
		 */
		const totalShared = parseInt( shared, 10 );
		return isNaN( totalShared ) ? 0 : totalShared;
	}
);

export const getSettingsIsOpen = createSelector(
	[ getTicketBlock ],
	( ticket ) => ticket.isSettingsOpen,
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
