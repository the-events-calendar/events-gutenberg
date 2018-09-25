/**
 * External dependencies
 */
import { createSelector } from 'reselect';

/**
 * Internal dependencies
 */
import { TYPES } from '@moderntribe/tickets/blocks/ticket/edit-container/content/capacity/template';

export const getBlock = ( state ) => state.tickets.blocks.ticket;

export const getTicketUI = createSelector(
	[ getBlock ],
	( block ) => block.ui,
);

export const getTickets = createSelector(
	[ getBlock ],
	( block ) => block.tickets,
);

export const getBlockParentSelected = createSelector(
	[ getTicketUI ],
	( ui ) => ui.isParentBlockSelected,
)

export const getChildParentSelected = createSelector(
	[ getTicketUI ],
	( ui ) => ui.isChildBlockSelected,
);

export const getParentOrChildSelected = createSelector(
	[ getBlockParentSelected, getChildParentSelected ],
	( parentSelected, childSelected ) => parentSelected || childSelected,
);

export const getSharedCapacity = createSelector(
	[ getTicketUI ],
	( ticket ) => ticket.sharedCapacity,
);

export const getSettingsIsOpen = createSelector(
	[ getTicketUI ],
	( ticket ) => ticket.isSettingsOpen,
);

export const getHeader = createSelector(
	[ getTicketUI ],
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

// ticket selectors
export const getTicketBlockId = ( state, props ) => props.blockId;

export const getTicketsIds = createSelector(
	[ getTickets ],
	( tickets ) => tickets.allIds,
);

export const getTicketsObject = createSelector(
	[ getTickets ],
	( tickets ) => tickets.byId,
);

export const getIndependentTickets = createSelector(
	[ getTicketsIds, getTicketsObject ],
	( ids, tickets ) => {
		return ids.filter( ( id ) => {
			const item = tickets[ id ];
			return item.capacityType === TYPES.independent;
		} )
			.map( ( id ) => tickets[ id ] )
			.map( ( ticket ) => {
				const quantity = parseInt( ticket.independentCapacity, 10 );
				return {
					name: ticket.title,
					quantity: isNaN( quantity ) ? 0 : quantity,
				};
			} );
	},
);

export const getIndependentCapacity = createSelector(
	[ getTicketsIds, getTicketsObject ],
	( ids, tickets ) => {
		return ids.reduce( ( total, id ) => {
			const item = tickets[ id ];
			const capacity = parseInt( item.independentCapacity, 10 );
			const independent = isNaN( capacity ) ? 0 : capacity;
			return total + independent;
		}, 0 );
	}
)

export const getTotalCapacity = createSelector(
	[ getSharedCapacity, getIndependentCapacity ],
	( shared, independent ) => {
		/**
		 * values can be empty string on initial load so we need to fallback to a number in order
		 * to return a number to the total so in case of NaN we fallback to zero as the default value
		 * absence of value is not same as zero on inputs so it can't be used as: null or zero,
		 * inputs needs to have undefined or empty string instead.
		 */
		const totalShared = parseInt( shared, 10 );
		const sharedCapacity = isNaN( totalShared ) ? 0 : totalShared;
		return sharedCapacity + independent;
	},
);

export const getTicketBlock = createSelector(
	[ getTicketsObject, getTicketBlockId ],
	( tickets, blockId ) => tickets[ blockId ] || {},
);

export const getTicketTitle = createSelector(
	[ getTicketBlock ],
	( block ) => block.title,
);

export const getTicketDescription = createSelector(
	[ getTicketBlock ],
	( block ) => block.description,
);

export const getTicketPrice = createSelector(
	[ getTicketBlock ],
	( block ) => block.price,
);

export const getTicketSKU = createSelector(
	[ getTicketBlock ],
	( block ) => block.SKU,
);

export const getTicketStartDate = createSelector(
	[ getTicketBlock ],
	( block ) => block.startDate,
);

export const getTicketStartTime = createSelector(
	[ getTicketBlock ],
	( block ) => block.startTime,
);

export const getTicketEndDate = createSelector(
	[ getTicketBlock ],
	( block ) => block.endDate,
);

export const getTicketEndTime = createSelector(
	[ getTicketBlock ],
	( block ) => block.endTime,
);

export const getTicketIndependentCapacity = createSelector(
	[ getTicketBlock ],
	( block ) => block.independentCapacity,
);

export const getTicketSharedCapacity = createSelector(
	[ getTicketBlock ],
	( block ) => block.sharedCapacity,
);

export const getTicketCapacityType = createSelector(
	[ getTicketBlock ],
	( block ) => block.capacityType,
);
