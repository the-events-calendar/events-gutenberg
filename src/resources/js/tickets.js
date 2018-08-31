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
		container: '.tribe-block__tickets',
		item     : '.tribe-block__tickets__item'
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
	$( obj.selector.item )
		.on( 'click',
		'.tribe-block__tickets__item__quantity__remove, .tribe-block__tickets__item__quantity__add' ,
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
	 * Check tickets availability
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	obj.checkAvailability = function() {

		// We're checking availability for all the tickets at once
		var params = {
			action  : 'ticket-availability-check',
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

				Object.keys( tickets ).forEach( function( ticket_id ) {

					var available = tickets[ ticket_id ].available;
					var ticketEl = $( obj.selector.item + "[data-ticket-id='" + ticket_id + "']" );

					if ( 0 === available ) { // ticket is out of stock

						var unavailable_html = tickets[ ticket_id ].unavailable_html;
						// Set the availability data attribute to false
						ticketEl.attr( 'available', false );
						// Remove classes for instock and purchasable
						ticketEl.removeClass( 'instock' );
						ticketEl.removeClass( 'purchasable' );

						// Update HTML elements with the "Out of Stock" messages
						ticketEl.find( '.tribe-block__tickets__item__extra__available' ).replaceWith( unavailable_html );
						ticketEl.find( '.tribe-block__tickets__item__quantity' ).html( unavailable_html );
					}

					if ( 1 < available ) { // Ticket in stock, we may want to update values
						ticketEl.find( '.tribe-ticket-quantity' ).attr( { 'max' : available } );
						ticketEl.find( '.tribe-block__tickets__item__extra__available span' ).html( available );
					}

				});

			}
		);

	}

	// Check tickets availability every 15 seconds
	var check = setInterval( obj.checkAvailability, 15000 );

})( jQuery, tribe.tickets.block );