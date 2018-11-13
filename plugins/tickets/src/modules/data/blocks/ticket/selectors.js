/**
 * External dependencies
 */
import { createSelector } from 'reselect';

/**
 * Internal dependencies
 */
import * as constants from './constants';
import { tickets as ticketsConfig } from '@moderntribe/common/utils/globals';

const {
	UNLIMITED,
	INDEPENDENT,
	SHARED,
	TICKET_TYPES,
} = constants;

export const getBlock = ( state ) => state.tickets.blocks.ticket;

//
// ─── BLOCK SELECTORS ────────────────────────────────────────────────────────────
//

export const getTicketsIsSettingsOpen = createSelector(
	[ getBlock ],
	( block ) => block.isSettingsOpen,
);

export const getTicketsIsParentBlockLoading = createSelector(
	[ getBlock ],
	( block ) => block.isParentBlockLoading,
);

export const getTicketsIsChildBlockSelected = createSelector(
	[ getBlock ],
	( block ) => block.isChildBlockSelected,
);

export const getTicketsIsParentBlockSelected = createSelector(
	[ getBlock ],
	( block ) => block.isParentBlockSelected,
);

export const getTicketsActiveChildBlockId = createSelector(
	[ getBlock ],
	( block ) => block.activeChildBlockId,
);

export const hasTicketsActiveChildBlockId = createSelector(
	[ getTicketsActiveChildBlockId ],
	( id ) => id !== '',
);

export const getTicketsProvider = createSelector(
	[ getBlock ],
	( block ) => block.provider,
);

export const getTicketsSharedCapacity = createSelector(
	[ getBlock ],
	( block ) => block.sharedCapacity,
);

export const getTicketsSharedCapacityInt = createSelector(
	[ getTicketsSharedCapacity ],
	( capacity ) => parseInt( capacity, 10 ) || 0,
);

export const getTicketsTempSharedCapacity = createSelector(
	[ getBlock ],
	( block ) => block.tempSharedCapacity,
);

export const getTicketsTempSharedCapacityInt = createSelector(
	[ getTicketsTempSharedCapacity ],
	( capacity ) => parseInt( capacity, 10 ) || 0,
);

/**
 * @todo: fix this later, add test
 */
export const isTicketDisabled = createSelector(
	[ getTicketsIsSettingsOpen ],
	( isSettingsOpen ) => isSettingsOpen,
);

//
// ─── HEADER SELECTORS ───────────────────────────────────────────────────────────
//

export const getTicketsHeader = createSelector(
	[ getBlock ],
	( block ) => block.header,
);

export const getTicketsHeaderId = createSelector(
	[ getTicketsHeader ],
	( header ) => header.id,
);

export const getTicketsHeaderSrc = createSelector(
	[ getTicketsHeader ],
	( header ) => header.src,
);

export const getTicketsHeaderAlt = createSelector(
	[ getTicketsHeader ],
	( header ) => header.alt,
);

//
// ─── TICKETS SELECTORS ──────────────────────────────────────────────────────────
//

export const getTickets = createSelector(
	[ getBlock ],
	( block ) => block.tickets,
);

export const getAllTicketIds = createSelector(
	[ getTickets ],
	( tickets ) => tickets.allIds,
);

export const getTicketsById = createSelector(
	[ getTickets ],
	( tickets ) => tickets.byId,
);

export const getTicketsArray = createSelector(
	[ getAllTicketIds, getTicketsById ],
	( ids, tickets ) => ids.map( ( id ) => tickets[ id ] ),
);

export const getTicketsCount = createSelector(
	[ getAllTicketIds ],
	( allIds ) => allIds.length,
);

export const hasTickets = createSelector(
	[ getTicketsCount ],
	( count ) => count > 0,
);

export const getIndependentTickets = createSelector(
	[ getTicketsArray ],
	( tickets ) => (
		tickets.filter( ( ticket ) => ticket.details.capacityType === TICKET_TYPES[ INDEPENDENT ] )
	),
);

export const getSharedTickets = createSelector(
	[ getTicketsArray ],
	( tickets ) => (
		tickets.filter( ( ticket ) => ticket.details.capacityType === TICKET_TYPES[ SHARED ] )
	),
);

export const getSharedTicketsCount = createSelector(
	[ getSharedTickets ],
	tickets => tickets.length,
);

export const getUnlimitedTickets = createSelector(
	[ getTicketsArray ],
	( tickets ) => (
		tickets.filter( ( ticket ) => ticket.details.capacityType === TICKET_TYPES[ UNLIMITED ] )
	),
);

//
// ─── TICKET SELECTORS ───────────────────────────────────────────────────────────
//

export const getTicketBlockId = ( state, ownProps ) => ownProps.blockId;

export const getTicket = createSelector(
	[ getTicketsById, getTicketBlockId ],
	( tickets, blockId ) => tickets[ blockId ] || {},
);

export const getTicketSold = createSelector(
	[ getTicket ],
	( ticket ) => ticket.sold,
);

export const getTicketAvailable = createSelector(
	[ getTicket ],
	( ticket ) => ticket.available,
);

export const getTicketId = createSelector(
	[ getTicket ],
	( ticket ) => ticket.ticketId,
);

export const getTicketCurrencySymbol = createSelector(
	[ getTicket ],
	( ticket ) => ticket.currencySymbol,
);

export const getTicketProvider = createSelector(
	[ getTicket ],
	( ticket ) => ticket.provider,
);

export const getTicketExpires = createSelector(
	[ getTicket ],
	( ticket ) => ticket.expires,
);

export const getTicketIsLoading = createSelector(
	[ getTicket ],
	( ticket ) => ticket.isLoading,
);

export const getTicketHasBeenCreated = createSelector(
	[ getTicket ],
	( ticket ) => ticket.hasBeenCreated,
);

export const getTicketHasChanges = createSelector(
	[ getTicket ],
	( ticket ) => ticket.hasChanges,
);

//
// ─── TICKET DETAILS SELECTORS ───────────────────────────────────────────────────
//

export const getTicketDetails = createSelector(
	[ getTicket ],
	( ticket ) => ticket.details || {},
);

export const getTicketTitle = createSelector(
	[ getTicketDetails ],
	( details ) => details.title,
);

export const getTicketDescription = createSelector(
	[ getTicketDetails ],
	( details ) => details.description,
);

export const getTicketPrice = createSelector(
	[ getTicketDetails ],
	( details ) => details.price,
);

export const getTicketSku = createSelector(
	[ getTicketDetails ],
	( details ) => details.sku,
);

export const getTicketStartDate = createSelector(
	[ getTicketDetails ],
	( details ) => details.startDate,
);

export const getTicketStartDateMoment = createSelector(
	[ getTicketDetails ],
	( details ) => details.startDateMoment,
);

export const getTicketEndDate = createSelector(
	[ getTicketDetails ],
	( details ) => details.endDate,
);

export const getTicketEndDateMoment = createSelector(
	[ getTicketDetails ],
	( details ) => details.endDateMoment,
);

export const getTicketStartTime = createSelector(
	[ getTicketDetails ],
	( details ) => details.startTime,
);

export const getTicketEndTime = createSelector(
	[ getTicketDetails ],
	( details ) => details.endTime,
);

export const getTicketCapacityType = createSelector(
	[ getTicketDetails ],
	( details ) => details.capacityType,
);

export const getTicketCapacity = createSelector(
	[ getTicketDetails ],
	( details ) => parseInt( details.capacity, 10 ) || 0,
);

export const isUnlimitedTicket = createSelector(
	[ getTicketDetails ],
	( block ) => block.capacityType === TICKET_TYPES[ UNLIMITED ],
);

export const isSharedTicket = createSelector(
	[ getTicketDetails ],
	( block ) => block.capacityType === TICKET_TYPES[ SHARED ],
);

export const isIndependentTicket = createSelector(
	[ getTicketDetails ],
	( block ) => block.capacityType === TICKET_TYPES[ INDEPENDENT ],
);

//
// ─── TICKET TEMP DETAILS SELECTORS ──────────────────────────────────────────────
//

export const getTicketTempDetails = createSelector(
	[ getTicket ],
	( ticket ) => ticket.tempDetails || {},
);

export const getTicketTempTitle = createSelector(
	[ getTicketTempDetails ],
	( tempDetails ) => tempDetails.title,
);

export const getTicketTempDescription = createSelector(
	[ getTicketTempDetails ],
	( tempDetails ) => tempDetails.description,
);

export const getTicketTempPrice = createSelector(
	[ getTicketTempDetails ],
	( tempDetails ) => tempDetails.price,
);

export const getTicketTempSku = createSelector(
	[ getTicketTempDetails ],
	( tempDetails ) => tempDetails.sku,
);

export const getTicketTempStartDate = createSelector(
	[ getTicketTempDetails ],
	( tempDetails ) => tempDetails.startDate,
);

export const getTicketTempStartDateMoment = createSelector(
	[ getTicketTempDetails ],
	( tempDetails ) => tempDetails.startDateMoment,
);

export const getTicketTempEndDate = createSelector(
	[ getTicketTempDetails ],
	( tempDetails ) => tempDetails.endDate,
);

export const getTicketTempEndDateMoment = createSelector(
	[ getTicketTempDetails ],
	( tempDetails ) => tempDetails.endDateMoment,
);

export const getTicketTempStartTime = createSelector(
	[ getTicketTempDetails ],
	( tempDetails ) => tempDetails.startTime,
);

export const getTicketTempEndTime = createSelector(
	[ getTicketTempDetails ],
	( tempDetails ) => tempDetails.endTime,
);

export const getTicketTempCapacityType = createSelector(
	[ getTicketTempDetails ],
	( tempDetails ) => tempDetails.capacityType,
);

export const getTicketTempCapacity = createSelector(
	[ getTicketTempDetails ],
	( tempDetails ) => parseInt( tempDetails.capacity, 10 ) || 0,
);

//
// ─── AMOUNT REDUCERS ────────────────────────────────────────────────────────────
//

export const _getTotalCapacity = ( tickets ) => tickets.reduce( ( total, ticket ) => {
	const capacity = parseInt( ticket.details.capacity, 10 ) || 0;
	return total + capacity;
}, 0 );

export const _getTotalTempCapacity = ( tickets ) => tickets.reduce( ( total, ticket ) => {
	const tempCapacity = parseInt( ticket.tempDetails.capacity, 10 ) || 0;
	return total + tempCapacity;
}, 0 );

export const _getTotalSold = ( tickets ) => tickets.reduce( ( total, ticket ) => {
	const sold = parseInt( ticket.sold, 10 ) || 0;
	return total + sold;
}, 0 );

export const _getTotalAvailable = ( tickets ) => tickets.reduce( ( total, ticket ) => {
	const available = parseInt( ticket.available, 10 ) || 0;
	return total + available;
}, 0 );

export const getIndependentTicketsCapacity = createSelector( getIndependentTickets, _getTotalCapacity );
export const getIndependentTicketsTempCapacity = createSelector( getIndependentTickets, _getTotalTempCapacity );
export const getIndependentTicketsSold = createSelector( getIndependentTickets, _getTotalSold );
export const getIndependentTicketsAvailable = createSelector( getIndependentTickets, _getTotalAvailable );

export const getSharedTicketsSold = createSelector( getSharedTickets, _getTotalSold );
export const getSharedTicketsAvailable = createSelector(
	[ getTicketsSharedCapacityInt, getSharedTicketsSold ],
	( sharedCapacity, sharedSold ) => Math.max( sharedCapacity - sharedSold, 0 ),
);

export const getIndependentAndSharedTicketsCapacity = createSelector(
	[ getIndependentTicketsCapacity, getTicketsSharedCapacityInt ],
	( independentCapacity, sharedCapacity ) => independentCapacity + sharedCapacity,
);
export const getIndependentAndSharedTicketsTempCapacity = createSelector(
	[ getIndependentTicketsTempCapacity, getTicketsTempSharedCapacityInt ],
	( independentTempCapacity, tempSharedCapacity ) => independentTempCapacity + tempSharedCapacity,
);
export const getIndependentAndSharedTicketsSold = createSelector(
	[ getIndependentTicketsSold, getSharedTicketsSold ],
	( independentSold, sharedSold ) => independentSold + sharedSold,
);
export const getIndependentAndSharedTicketsAvailable = createSelector(
	[ getIndependentTicketsAvailable, getSharedTicketsAvailable ],
	( independentAvailable, sharedAvailable ) => independentAvailable + sharedAvailable,
);

//
// ─── MISC SELECTORS ─────────────────────────────────────────────────────────────
//

export const getTicketProviders = () => {
	const tickets = ticketsConfig();
	return tickets.providers || [];
};

export const hasMultipleTicketProviders = createSelector(
	[ getTicketProviders ],
	( providers ) => providers.length > 1,
);

export const hasTicketProviders = createSelector(
	[ getTicketProviders ],
	( providers ) => providers.length > 0,
);

//
// ─── OTHER SELECTORS ────────────────────────────────────────────────────────────
//

// export const getTicketValidness = createSelector(
// 	[ getTicketBlock ],
// 	( block ) => {
// 		const isTitleValid = trim( block.title ) !== '';
// 		if ( block.capacityType === TICKET_TYPES[ UNLIMITED ] ) {
// 			return isTitleValid;
// 		}

// 		const isCapacityValid = trim( block.capacity ) !== '';
// 		return isTitleValid && isCapacityValid;
// 	},
// );

// export const isTicketDisabled = createSelector(
// 	[ getSettingsIsOpen, getActiveBlockId, getTicketEditing ],
// 	( isSettingsOpen, activeBlockId, isEditing ) => (
// 		isSettingsOpen || ( !! activeBlockId && ! isEditing )
// 	),
// );
