var tribe_tickets = {
	num_attendees: 0,
	event        : {}
};

(function( $, my ) {
	'use strict';

	var tribe_ticket = $( '.tribe-block__tickets' );

	// Bail if we don't have what we need
	if ( 0 === tribe_ticket.length ) {
		return;
	}

	/**
	 * Handle the number input + and - actions
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	$( '.tribe-block__tickets__item' )
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

})( jQuery, tribe_tickets );