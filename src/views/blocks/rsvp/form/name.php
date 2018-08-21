<?php
/**
 * This template renders the RSVP ticket form name input
 *
 * @version TBD
 *
 */
/**
 * Set the default Full Name for the RSVP form
 *
 * @since TBD
 *
 * @param string
 */
$name = apply_filters( 'tribe_tickets_rsvp_form_full_name', '', $ticket );
?>
<input
	type="text"
	name="attendee[full_name]"
	class="tribe-tickets-full-name"
	placeholder="<?php esc_attr_e( 'Full Name', 'events-gutenberg' ); ?>"
	value="<?php echo esc_attr( $name ); ?>"
/>