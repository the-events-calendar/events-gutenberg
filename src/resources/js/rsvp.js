var tribe_tickets_rsvp = {
	num_attendees: 0,
	event        : {}
};

(function( $, my ) {
	'use strict';

	// Bind actions to the "not-going" click
	$( '.tribe-block__rsvp-ticket' ).on( 'click', '.not-going', function( e ) {
		e.preventDefault();
		var ticket    = $( this ).closest( '.tribe-block__rsvp-ticket' );

		ticket.find( '.rsvp-form' ).html( '' );

	} );

	// Bind actions to the "going" click
	$( '.tribe-block__rsvp-ticket' ).on( 'click', '.going', function( e ) {
		e.preventDefault();
		var ticket    = $( this ).closest( '.tribe-block__rsvp-ticket' );
		var ticket_id = ticket.data( 'rsvp-id' );

		var params = {
			action    : 'rsvp-form',
			ticket_id : ticket_id
		};

		$.post(
			TribeRsvp.ajaxurl,
			params,
			function( response ) {
				ticket.find( '.rsvp-form' ).html( response.html );
			}
		);
	} );
})( jQuery, tribe_tickets_rsvp );