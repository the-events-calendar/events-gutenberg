(function( $, my ) {
	'use strict';

	var tribe_tickets_rsvp = {
		num_attendees: 0,
		event        : {}
	};

	// Bind actions to the "not-going" click
	$( '.tribe-block__rsvp__ticket' ).on( 'click', '.not-going', function( e ) {
		var ticket    = $( this ).closest( '.tribe-block__rsvp__ticket' );

		ticket.find( '.rsvp-form' ).html( '' );

	} );

	// Bind actions to the "going" click
	$( '.tribe-block__rsvp-ticket' ).on( 'click', '.going', function( e ) {
		var ticket    = $( this ).closest( '.tribe-block__rsvp__ticket' );
		var ticket_id = ticket.data( 'rsvp-id' );

		var params = {
			action    : 'rsvp-form',
			ticket_id : ticket_id
		};

		$.post(
			TribeRsvp.ajaxurl,
			params,
			function( response ) {
				ticket.find( '.tribe-block__rsvp__form' ).html( response.html );
			}
		);
	} );
})( jQuery, tribe_tickets_rsvp );