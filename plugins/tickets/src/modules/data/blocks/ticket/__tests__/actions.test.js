/**
 * Internal dependencies
 */
import * as actions from '../actions';

describe( 'Ticket actions', () => {
	const blockId = 'modern-tribe';

	describe( 'Tickets actions', () => {
		test( 'set tickets initial state', () => {
			const props = {
				clientId: 'modern-tribe',
				attributes: {
					header: 99,
					sharedCapacity: 19,
				},
			};
			expect( actions.setTicketsInitialState( props ) ).toMatchSnapshot();
		} );

		test( 'set tickets header', () => {
			expect( actions.setTicketsHeader( null ) ).toMatchSnapshot();
			expect( actions.setTicketsHeader( { image: 10 } ) ).toMatchSnapshot();
		} );

		test( 'set tickets is settings open', () => {
			expect( actions.setTicketsIsSettingsOpen( true ) ).toMatchSnapshot();
			expect( actions.setTicketsIsSettingsOpen( false ) ).toMatchSnapshot();
		} );

		test( 'open settings', () => {
			expect( actions.openSettings() ).toMatchSnapshot();
		} );

		test( 'close settings', () => {
			expect( actions.closeSettings() ).toMatchSnapshot();
		} );

		test( 'set tickets is parent block loading', () => {
			expect( actions.setTicketsIsParentBlockLoading( true ) ).toMatchSnapshot();
			expect( actions.setTicketsIsParentBlockLoading( false ) ).toMatchSnapshot();
		} );

		test( 'set tickets is child block selected', () => {
			expect( actions.setTicketsIsChildBlockSelected( true ) ).toMatchSnapshot();
			expect( actions.setTicketsIsChildBlockSelected( false ) ).toMatchSnapshot();
		} );

		test( 'set tickets is parent block selected', () => {
			expect( actions.setTicketsIsParentBlockSelected( true ) ).toMatchSnapshot();
			expect( actions.setTicketsIsParentBlockSelected( false ) ).toMatchSnapshot();
		} );

		test( 'set tickets active child block id', () => {
			expect( actions.setTicketsActiveChildBlockId( 'modern-tribe' ) ).toMatchSnapshot();
		} );

		test( 'set tickets provider', () => {
			expect( actions.setTicketsProvider( 'Tribe__Tickets__Commerce__PayPal__Main' ) ).toMatchSnapshot();
		} );

		test( 'set tickets shared capacity', () => {
			expect( actions.setTicketsSharedCapacity( 99 ) ).toMatchSnapshot();
		} );

		test( 'set tickets temp shared capacity', () => {
			expect( actions.setTicketsTempSharedCapacity( 99 ) ).toMatchSnapshot();
		} );
	} );

	describe( 'Ticket details actions', () => {
		test( 'set ticket title', () => {
			expect( actions.setTicketTitle( blockId, 'Modern Tribe' ) );
		} );

		test( 'set ticket description', () => {
			expect( actions.setTicketDescription( blockId, 'The Next Generation of Digital Agency' ) )
				.toMatchSnapshot();
		} );

		test( 'set ticket price', () => {
			expect( actions.setTicketPrice( blockId, 99 ) ).toMatchSnapshot();
		} );

		test( 'set ticket sku', () => {
			expect( actions.setTicketSku( blockId, 'my-sku' ) ).toMatchSnapshot();
		} );

		test( 'set ticket start date', () => {
			expect( actions.setTicketStartDate( blockId, 'January 1, 2018' ) ).toMatchSnapshot();
		} );

		test( 'set ticket start moment', () => {
			expect( actions.setTicketStartDateMoment( blockId, { type: 'moment' } ) ).toMatchSnapshot();
			expect( actions.setTicketStartDateMoment( blockId, null ) ).toMatchSnapshot();
		} );

		test( 'set ticket end date', () => {
			expect( actions.setTicketEndDate( blockId, 'January 10, 2018' ) ).toMatchSnapshot();
		} );

		test( 'set ticket end moment', () => {
			expect( actions.setTicketEndDateMoment( blockId, { type: 'moment' } ) ).toMatchSnapshot();
			expect( actions.setTicketEndDateMoment( blockId, null ) ).toMatchSnapshot();
		} );

		test( 'set ticket start time', () => {
			expect( actions.setTicketStartTime( blockId, '10:00' ) ).toMatchSnapshot();
		} );

		test( 'set ticket end time', () => {
			expect( actions.setTicketEndTime( blockId, '12:34' ) ).toMatchSnapshot();
		} );

		test( 'set ticket capacity type', () => {
			expect( actions.setTicketCapacityType( blockId, 'unlimited' ) ).toMatchSnapshot();
		} );

		test( 'set ticket capacity', () => {
			expect( actions.setTicketCapacity( blockId, '10' ) ).toMatchSnapshot();
		} );
	} );

	describe( 'Ticket temp details actions', () => {
		test( 'set ticket temp title', () => {
			expect( actions.setTicketTempTitle( blockId, 'Modern Tribe' ) );
		} );

		test( 'set ticket temp description', () => {
			expect( actions.setTicketTempDescription( blockId, 'The Next Generation of Digital Agency' ) )
				.toMatchSnapshot();
		} );

		test( 'set ticket temp price', () => {
			expect( actions.setTicketTempPrice( blockId, 99 ) ).toMatchSnapshot();
		} );

		test( 'set ticket temp sku', () => {
			expect( actions.setTicketTempSku( blockId, 'my-sku' ) ).toMatchSnapshot();
		} );

		test( 'set ticket temp start date', () => {
			expect( actions.setTicketTempStartDate( blockId, 'January 1, 2018' ) ).toMatchSnapshot();
		} );

		test( 'set ticket temp start moment', () => {
			expect( actions.setTicketTempStartDateMoment( blockId, { type: 'moment' } ) ).toMatchSnapshot();
			expect( actions.setTicketTempStartDateMoment( blockId, null ) ).toMatchSnapshot();
		} );

		test( 'set ticket temp end date', () => {
			expect( actions.setTicketTempEndDate( blockId, 'January 10, 2018' ) ).toMatchSnapshot();
		} );

		test( 'set ticket temp end moment', () => {
			expect( actions.setTicketTempEndDateMoment( blockId, { type: 'moment' } ) ).toMatchSnapshot();
			expect( actions.setTicketTempEndDateMoment( blockId, null ) ).toMatchSnapshot();
		} );

		test( 'set ticket temp start time', () => {
			expect( actions.setTicketTempStartTime( blockId, '10:00' ) ).toMatchSnapshot();
		} );

		test( 'set ticket temp end time', () => {
			expect( actions.setTicketTempEndTime( blockId, '12:34' ) ).toMatchSnapshot();
		} );

		test( 'set ticket temp capacity type', () => {
			expect( actions.setTicketTempCapacityType( blockId, 'unlimited' ) ).toMatchSnapshot();
		} );

		test( 'set ticket temp capacity', () => {
			expect( actions.setTicketTempCapacity( blockId, '10' ) ).toMatchSnapshot();
		} );
	} );

	describe( 'Ticket actions', () => {
		test( 'set ticket sold', () => {
			expect( actions.setTicketSold( blockId, 23 ) ).toMatchSnapshot();
		} );

		test( 'set ticket availability', () => {
			expect( actions.setTicketAvailable( blockId, 99 ) ).toMatchSnapshot();
		} );

		test( 'set ticket id', () => {
			expect( actions.setTicketId( blockId, 99 ) ).toMatchSnapshot();
		} );

		test( 'set ticket currency symbol', () => {
			expect( actions.setTicketCurrencySymbol( blockId, '$' ) ).toMatchSnapshot();
		} );

		test( 'set ticket provider', () => {
			expect( actions.setTicketProvider( blockId, 'provider' ) ).toMatchSnapshot();
		} );

		test( 'set ticket is loading', () => {
			expect( actions.setTicketIsLoading( blockId, true ) ).toMatchSnapshot();
			expect( actions.setTicketIsLoading( blockId, false ) ).toMatchSnapshot();
		} );

		test( 'set ticket has been created', () => {
			expect( actions.setTicketHasBeenCreated( blockId, true ) ).toMatchSnapshot();
			expect( actions.setTicketHasBeenCreated( blockId, false ) ).toMatchSnapshot();
		} );

		test( 'set ticket has changes', () => {
			expect( actions.setTicketHasChanges( blockId, true ) ).toMatchSnapshot();
			expect( actions.setTicketHasChanges( blockId, false ) ).toMatchSnapshot();
		} );

		test( 'set ticket is selected', () => {
			expect( actions.setTicketIsSelected( blockId, true ) ).toMatchSnapshot();
			expect( actions.setTicketIsSelected( blockId, false ) ).toMatchSnapshot();
		} );
	} );

	describe( 'Ticket saga actions', () => {
		test( 'set ticket details', () => {
			expect( actions.setTicketDetails( blockId, {} ) ).toMatchSnapshot();
		} );

		test( 'set ticket temp details', () => {
			expect( actions.setTicketTempDetails( blockId, {} ) ).toMatchSnapshot();
		} );

		test( 'fetch ticket', () => {
			expect( actions.fetchTicket( blockId, 99 ) ).toMatchSnapshot();
		} );

		test( 'create new ticket', () => {
			expect( actions.createNewTicket( blockId ) ).toMatchSnapshot();
		} );

		test( 'update ticket', () => {
			expect( actions.updateTicket( blockId ) ).toMatchSnapshot();
		} );

		test( 'delete ticket', () => {
			expect( actions.deleteTicket( blockId ) ).toMatchSnapshot();
		} );

		test( 'register ticket block', () => {
			expect( actions.registerTicketBlock( blockId ) ).toMatchSnapshot();
		} );

		test( 'remove ticket block', () => {
			expect( actions.removeTicketBlock( blockId ) ).toMatchSnapshot();
		} );

		test( 'set ticket initial state', () => {
			const props = {
				clientId: 'modern-tribe',
				attributes: {
					ticketId: 99,
				},
			};
			expect( actions.setTicketInitialState( props ) ).toMatchSnapshot();
		} );
	} );
} );
