/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import trim from 'lodash/trim';

/**
 * Internal dependencies
 */
import { TYPES } from '@moderntribe/tickets/blocks/ticket/edit-container/content/capacity/template';

export const getBlock = ( state ) => state.tickets.blocks.ticket;

// UI selectors

export const getTicketUI = createSelector( [ getBlock ], ( block ) => block.ui );
export const getTickets = createSelector( [ getBlock ], ( block ) => block.tickets );

export const getBlockParentSelected = createSelector(
	[ getTicketUI ],
	( ui ) => ui.isParentBlockSelected,
);

export const getChildParentSelected = createSelector(
	[ getTicketUI ],
	( ui ) => ui.isChildBlockSelected,
);

export const getParentOrChildSelected = createSelector(
	[ getBlockParentSelected, getChildParentSelected ],
	( parentSelected, childSelected ) => parentSelected || childSelected,
);

export const getSharedCapacity = createSelector( [ getTicketUI ], ( ui ) => ui.sharedCapacity );
export const getSettingsIsOpen = createSelector( [ getTicketUI ], ( ui ) => ui.isSettingsOpen );

export const getActiveBlockId = createSelector( [ getTicketUI ], ( ui ) => ui.activeChildBlockId );
export const hasActiveBlockId = createSelector(
	[ getActiveBlockId ],
	( blockId ) => blockId !== '',
);

// Temporarily UI selectors

export const getTmpUI = createSelector(
	[ getTicketUI ],
	( ui ) => ui.tmp,
);

export const getTmpSharedCapacity = createSelector(
	[ getTmpUI ],
	( tmp ) => tmp.sharedCapacity,
);

// Header Image

export const getHeader = createSelector( [ getTicketUI ], ( ui ) => ui.header );
export const getImageSize = ( state, props ) => props.size;
export const getImageID = createSelector(
	[ getHeader ],
	( header ) => header === null ? 0 : header.id,
);

export const getImageAlt = createSelector(
	[ getHeader ],
	( header ) => header === null ? '' : header.alt,
);

export const getHeaderSize = createSelector(
	[ getHeader, getImageSize ],
	( header, size ) => {
		if ( header === null || ! header.sizes || ! header.sizes[ size ] ) {
			return '';
		}
		return header.sizes[ size ].url;
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

export const getTicketsArray = createSelector(
	[ getTicketsIds, getTicketsObject ],
	( ids, tickets ) => ids.map( ( id ) => tickets[ id ] ),
);

export const getIndependentTickets = createSelector(
	[ getTicketsArray ],
	( tickets ) => (
		tickets.filter( ( ticket ) => ticket.capacityType === TYPES.independent )
	),
);

export const getSharedTickets = createSelector(
	[ getTicketsArray ],
	( tickets ) => (
		tickets.filter( ( ticket ) => ticket.capacityType === TYPES.shared )
	),
);

export const getUnlimitedTickets = createSelector(
	[ getTicketsArray ],
	( tickets ) => (
		tickets.filter( ( ticket ) => ticket.capacityType === TYPES.unlimited )
	),
);

export const getTicketsIndependentCapacity = createSelector(
	[ getIndependentTickets ],
	( tickets ) => {
		return tickets.reduce( ( total, ticket ) => {
			const capacity = parseInt( ticket.capacity, 10 );
			return total + ( isNaN( capacity ) ? 0 : capacity );
		}, 0 );
	},
);

export const getTicketsSharedCapacity = createSelector(
	[ getSharedTickets ],
	( tickets ) => {
		return tickets.reduce( ( total, ticket ) => {
			const capacity = parseInt( ticket.capacity, 10 );
			return total + ( isNaN( capacity ) ? 0 : capacity );
		}, 0 );
	},
);

export const getTotalSold = createSelector(
	[ getTicketsIds, getTicketsObject ],
	( ids, tickets ) => {
		return ids.reduce( ( total, id ) => {
			const item = tickets[ id ];
			const sold = parseInt( item.sold, 10 );
			const value = isNaN( sold ) ? 0 : sold;
			return total + value;
		}, 0 );
	},
);

export const getTotalCapacity = createSelector(
	[ getTicketsSharedCapacity, getTicketsIndependentCapacity ],
	( shared, independent ) => shared + independent,
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

export const getTicketCapacity = createSelector(
	[ getTicketBlock ],
	( block ) => {
		const capacity = parseInt( block.capacity, 10 );
		return capacity || 0;
	},
);

export const getTicketCapacityType = createSelector(
	[ getTicketBlock ],
	( block ) => block.capacityType,
);

export const getTicketValidness = createSelector(
	[ getTicketBlock ],
	( block ) => {
		const isTitleValid = trim( block.title ) !== '';
		if ( block.capacityType === TYPES.unlimited ) {
			return isTitleValid;
		}

		const isCapacityValid = trim( block.capacity ) !== '';
		return isTitleValid && isCapacityValid;
	},
);

export const getTicketEditing = createSelector(
	[ getTicketBlock ],
	( block ) => block.isEditing,
);

export const getTicketVolatile = createSelector(
	[ getTicketBlock ],
	( block ) => block.postId === null,
);

export const getTicketExpires = createSelector(
	[ getTicketBlock ],
	( block ) => ! block.dateIsPristine,
);

export const getTicketSold = createSelector(
	[ getTicketBlock ],
	( block ) => block.sold,
);

export const isUnlimitedTicket = createSelector(
	[ getTicketBlock ],
	( block ) => block.capacityType === TYPES.unlimited,
);

export const isSharedTicket = createSelector(
	[ getTicketBlock ],
	( block ) => block.capacityType === TYPES.shared,
);

export const getTicketStartDateMoment = createSelector(
	[ getTicketBlock ],
	( block ) => block.startDateMoment,
);

export const getTicketEndDateMoment = createSelector(
	[ getTicketBlock ],
	( block ) => block.endDateMoment,
);
