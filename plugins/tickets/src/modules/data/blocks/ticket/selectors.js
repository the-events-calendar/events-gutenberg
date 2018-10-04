/**
 * External dependencies
 */
import { createSelector } from 'reselect';
import trim from 'lodash/trim';

/**
 * Internal dependencies
 */
import { TICKET_TYPES } from '@moderntribe/tickets/data/utils';

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

export const isParentBlockLoading = createSelector(
	[ getTicketUI ],
	( ui ) => ui.isParentBlockLoading,
);

export const getSelectedProvider = createSelector(
	[ getTicketUI ],
	( ui ) => ui.provider,
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
export const getImageId = createSelector(
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
		return header.sizes[ size ].url || header.sizes[ size ].source_url;
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
		tickets.filter( ( ticket ) => ticket.capacityType === TICKET_TYPES.independent )
	),
);

export const getSharedTickets = createSelector(
	[ getTicketsArray ],
	( tickets ) => (
		tickets.filter( ( ticket ) => ticket.capacityType === TICKET_TYPES.shared )
	),
);

export const getUnlimitedTickets = createSelector(
	[ getTicketsArray ],
	( tickets ) => (
		tickets.filter( ( ticket ) => ticket.capacityType === TICKET_TYPES.unlimited )
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
		if ( block.capacityType === TICKET_TYPES.unlimited ) {
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

export const getTicketExpires = createSelector(
	[ getTicketBlock ],
	( block ) => ! block.dateIsPristine,
);

export const isUnlimitedTicket = createSelector(
	[ getTicketBlock ],
	( block ) => block.capacityType === TICKET_TYPES.unlimited,
);

export const isSharedTicket = createSelector(
	[ getTicketBlock ],
	( block ) => block.capacityType === TICKET_TYPES.shared,
);

export const getTicketStartDateMoment = createSelector(
	[ getTicketBlock ],
	( block ) => block.startDateMoment,
);

export const getTicketEndDateMoment = createSelector(
	[ getTicketBlock ],
	( block ) => block.endDateMoment,
);

export const getTicketIsLoading = createSelector(
	[ getTicketBlock ],
	( block ) => block.isLoading,
);

export const getTicketHasBeenCreated = createSelector(
	[ getTicketBlock ],
	( block ) => block.hasBeenCreated,
);

export const getTicketId = createSelector(
	[ getTicketBlock ],
	( block ) => block.ticketId,
);

export const getTicketIsBeingEdited = createSelector(
	[ getTicketEditing, getTicketHasBeenCreated ],
	( isEditing, hasBeenCreated ) => isEditing && hasBeenCreated,
);

export const isTicketDisabled = createSelector(
	[ getSettingsIsOpen, getActiveBlockId, getTicketEditing ],
	( isSettingsOpen, activeBlockId, isEditing ) => (
		isSettingsOpen || ( !! activeBlockId && ! isEditing )
	),
);

export const getTicketSold = createSelector(
	[ getTicketBlock ],
	( block ) => parseInt( block.sold, 10 ) || 0,
);

export const getTicketAvailability = createSelector(
	[ getTicketBlock ],
	( block ) => parseInt( block.available, 10 ) || 0,
);
