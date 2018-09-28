// @TODO: Take this line off once we actually have the tribe object
if ( 'undefined' === typeof tribe ) {
	tribe = {};
}

// Define the tickets object if not defined
if ( 'undefined' === typeof tribe.tickets ) {
	tribe.tickets = {};
}

tribe.tickets.block = {
	num_attendees: 0,
	event        : {}
};

( function( $, obj ) {
	'use strict';

	obj.selector = {
		container                 : '.tribe-block__tickets',
		submit                    : '.tribe-block__tickets__buy',
		item                      : '.tribe-block__tickets__item',
		itemQuantity              : '.tribe-block__tickets__item__quantity',
		itemQuantityInput         : '.tribe-ticket-quantity',
		itemExtraAvailable        : '.tribe-block__tickets__item__extra__available',
		itemExtraAvailableQuantity: '.tribe-block__tickets__item__extra__available_quantity'
	};

	var $tribe_ticket = $( obj.selector.container );

	// Bail if there are no tickets on the current event/page/post
	if ( 0 === $tribe_ticket.length ) {
		return;
	}

	/**
	 * Handle the number input + and - actions
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	$( obj.selector.item ).on( 'click',
		'.tribe-block__tickets__item__quantity__remove, .tribe-block__tickets__item__quantity__add',
		function( e ) {
			e.preventDefault();
			var input  = $( this ).parent().find( 'input[type="number"]' );
			var add    = $( this ).hasClass( 'tribe-block__tickets__item__quantity__add' );

			// stepUp or stepDown the input according to the button that was clicked
			add ? input[0].stepUp() : input[0].stepDown();

			// Trigger the on Change for the input as it's not handled via stepUp() || stepDown()
			input.trigger( 'change' );

	} );

	/**
	 * Handle the TPP form
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	$( obj.selector.item ).on( 'change',
		'.tribe-ticket-quantity',
		function( e ) {
			var $this      = $( this );
			var $ticket    = $this.closest( obj.selector.item );
			var $ticket_id = $ticket.data( 'ticket-id' );

			var $form = $this.closest( obj.selector.container );

			// Only disable / enable if is a Tribe Commerce Paypal form.
			if ( 'Tribe__Tickets__Commerce__PayPal__Main' !== $form.data( 'provider' ) ) {
				return;
			}

			var new_quantity = parseInt( $this.val(), 10 );
			new_quantity     = isNaN( new_quantity ) ? 0 : new_quantity;

			if ( new_quantity > 0 ) {
				$form
					.find( '[data-ticket-id]:not([data-ticket-id="' + $ticket_id + '"])' )
					.closest( 'div' )
					.find( 'input, button' )
					.attr( 'disabled', 'disabled' )
					.closest( 'div' )
					.addClass( 'tribe-tickets-purchase-disabled' );
			} else {
				$form
					.find( 'input, button' )
					.removeAttr( 'disabled' )
					.closest( 'div' )
					.removeClass( 'tribe-tickets-purchase-disabled' );
			}

	} );

	/**
	 * Handle the tickets form submission
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	$( obj.selector.container ).on( 'click',
		obj.selector.submit,
		function( e ) {
			e.preventDefault();

			var provider = obj.getProvider();
			var submit   = obj.handleSubmit( provider );

			if ( submit ) {
				$( obj.selector.container ).submit();
			}
	} );

	/**
	 * Get the Tickets Provider
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	obj.getProvider = function() {
		return $( obj.selector.container ).data( 'provider' );
	}

	/**
	 * Trigger form submission handlers for
	 * the different providers
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	obj.handleSubmit = function( provider ) {

		switch ( provider ) {
			case 'Tribe__Tickets__Commerce__PayPal__Main' :
				return obj.handleSubmitTpp();
				break;
			case 'Tribe__Tickets_Plus__Commerce__WooCommerce__Main' :
				return obj.handleSubmitWoo();
				break;
			case 'Tribe__Tickets_Plus__Commerce__EDD__Main' :
				return obj.handleSubmitEdd();
				break;
			default:
				return false;
		}
	}

	/**
	 * Handle Woo Tickets submit
	 *
	 * @since TBD
	 *
	 * @return bool
	 */
	obj.handleSubmitWoo = function() {

		// Set the flag to process WooTickets
		$( '<input>' ).attr( {
			type  : 'hidden',
			id    : 'wootickets_process',
			name  : 'wootickets_process',
			value : 1
		} ).appendTo( obj.selector.container );

		return true;
	}

	/**
	 * Handle TPP Tickets submit
	 *
	 * @since TBD
	 *
	 * @return bool
	 */
	obj.handleSubmitTpp = function() {

		// Reset form action as needed
		$( obj.selector.container ).attr( 'action', '' );

		// Add required post var
		$( '<input>' ).attr( {
			type  : 'hidden',
			id    : 'add',
			name  : 'add',
			value : 1
		} ).appendTo( obj.selector.container );

		return true;
	}

	/**
	 * Handle Edd tickets submit
	 *
	 * @since TBD
	 *
	 * @return bool
	 */
	obj.handleSubmitEdd = function() {
		return true;
	}

	/**
	 * Get the tickets IDs
	 *
	 * @since TBD
	 *
	 * @return array
	 */
	obj.getTickets = function() {

		var $tickets = $( obj.selector.item ).map( function() {
			return $( this ).data( 'ticket-id' );
		} ).get();

		return $tickets;
	}

	/**
	 * Make dom updates for the AJAX response
	 *
	 * @since TBD
	 *
	 * @return array
	 */
	obj.updateAvailability = function( tickets ) {

		Object.keys( tickets ).forEach( function( ticket_id ) {

			var available = tickets[ ticket_id ].available;
			var $ticketEl = $( obj.selector.item + "[data-ticket-id='" + ticket_id + "']" );

			if ( 0 === available ) { // ticket is out of stock

				var unavailableHtml = tickets[ ticket_id ].unavailable_html;
				// Set the availability data attribute to false
				$ticketEl.attr( 'available', false );
				// Remove classes for instock and purchasable
				$ticketEl.removeClass( 'instock' );
				$ticketEl.removeClass( 'purchasable' );

				// Update HTML elements with the "Out of Stock" messages
				$ticketEl.find( obj.selector.itemExtraAvailable ).replaceWith( unavailableHtml );
				$ticketEl.find( obj.selector.itemQuantity ).html( unavailableHtml );
			}

			if ( 1 < available ) { // Ticket in stock, we may want to update values
				$ticketEl.find( obj.selector.itemQuantityInput ).attr( { 'max' : available } );
				$ticketEl.find( obj.selector.itemExtraAvailableQuantity ).html( available );
			}

		});
	}

	/**
	 * Check tickets availability
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	obj.checkAvailability = function() {

		// We're checking availability for all the tickets at once
		var params = {
			action  : 'ticket_availability_check',
			tickets : obj.getTickets(),
		};

		$.post(
			TribeTickets.ajaxurl,
			params,
			function( response ) {
				var success = response.success;

				// Bail if we don't get a successful response
				if ( ! success ) {
					return;
				}

				// Get the tickets response with availability
				var tickets = response.data.tickets;

				// Make DOM updates
				obj.updateAvailability( tickets );

			}
		);

		// Repeat every 15 seconds
		setTimeout( obj.checkAvailability, 15000 );

	}

	/**
	 * Init the tickets script
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	obj.init = function() {
		obj.checkAvailability();
	}

	obj.init();


})( jQuery, tribe.tickets.block );