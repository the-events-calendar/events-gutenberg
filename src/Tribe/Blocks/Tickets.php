<?php
/**
 * Tickets block Setup
 *
 * @todo  Move into the Tickets folder
 */
class Tribe__Events_Gutenberg__Blocks__Tickets
extends Tribe__Events_Gutenberg__Blocks__Abstract {

	/**
	 * Which is the name/slug of this block
	 *
	 * @since  TBD
	 *
	 * @return string
	 */
	public function slug() {
		return 'tickets';
	}

	/**
	 * Returns the Correct tickets for the Tickets block
	 *
	 * @since  TBD
	 *
	 * @param  int   $post_id  Which Event or Post we are looking ticket in
	 * @return array
	 */
	private function get_tickets( $post_id ) {
		$unfiltered_tickets = Tribe__Tickets__Tickets::get_all_event_tickets( $post_id );
		$tickets = array();

		foreach ( $unfiltered_tickets as $key => $ticket ) {
			// Skip RSVP items
			if ( 'Tribe__Tickets__RSVP' === $ticket->provider_class ) {
				continue;
			}

			if ( ! $ticket->date_in_range() ) {
				continue;
			}
			$tickets[] = $ticket;
		}

		return $tickets;
	}

	/**
	 * Since we are dealing with a Dynamic type of Block we need a PHP method to render it
	 *
	 * @since  TBD
	 *
	 * @param  array $attributes
	 *
	 * @return string
	 */
	public function render( $attributes = array() ) {
		$post_id            = tribe( 'gutenberg.template' )->get( 'post_id' );
		$args['attributes'] = $this->attributes( $attributes );
		$args['tickets']    = $this->get_tickets( $post_id );

		// Fetch the default provider
		$provider = Tribe__Tickets__Tickets::get_event_ticket_provider( $post_id );
		$provider = call_user_func( array( $provider, 'get_instance' ) );

		$args['provider'] = $provider;

		// Add the rendering attributes into global context
		tribe( 'gutenberg.template' )->add_template_globals( $args );

		// enqueue assets
		tribe_asset_enqueue( 'tribe-gutenberg-tickets' );

		return tribe( 'gutenberg.template' )->template( array( 'blocks', $this->slug() ), $args, false );
	}

	/**
	 * Register block assets
	 *
	 * @since  TBD
	 *
	 *
	 * @return void
	 */
	public function assets() {
		$gutenberg = tribe( 'gutenberg' );

		tribe_asset(
			$gutenberg,
			'tribe-gutenberg-tickets',
			'tickets.js',
			array( 'jquery', 'jquery-ui-datepicker' ),
			null,
			array(
				'type'         => 'js',
				'localize'     => array(
					'name' => 'TribeTickets',
					'data' => array(
						'ajaxurl' => admin_url( 'admin-ajax.php', ( is_ssl() ? 'https' : 'http' ) )
					),
				),
			)
		);
	}
}