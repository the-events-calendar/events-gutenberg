<?php
/**
 * This template renders the tickets opt-out input
 *
 * @version TBD
 *
 */
/**
 * Use this filter to hide the Attendees List Optout
 *
 * @since TBD
 *
 * @param bool
 */
$ticket = $this->get( 'ticket' );
$hide_attendee_list_optout = apply_filters( 'tribe_tickets_plus_hide_attendees_list_optout', false );
if ( $hide_attendee_list_optout
	 && ! class_exists( 'Tribe__Tickets_Plus__Attendees_List' )
	 && Tribe__Tickets_Plus__Attendees_List::is_hidden_on( $this->get( 'post_id' ) )
) {
	return;
}
?>
<div class="tribe-block__tickets__item__optout">
	<label for="tribe-tickets-attendees-list-optout">
		<input
			type="checkbox"
			name="optout_<?php echo esc_attr( $ticket->ID ); ?>"
			id="tribe-tickets-attendees-list-optout"
		>
		<span class="tribe-tickets-meta-option-label">
			<?php esc_html_e( "Don't show my information on public attendee lists", 'events-gutenberg' ); ?>
		</span>
	</label>
</div>