<?php
class Tribe__Gutenberg__Tickets__Blocks__Attendees
extends Tribe__Gutenberg__Common__Blocks__Abstract {

	/**
	 * Which is the name/slug of this block
	 *
	 * @since  TBD
	 *
	 * @return string
	 */
	public function slug() {
		return 'attendees';
	}

	/**
	 * Set the default attributes of this block
	 *
	 * @since  TBD
	 *
	 * @return array
	 */
	public function default_attributes() {

		$defaults = array(
			'title' => __( "Who's coming?", 'events-gutenberg' ),
		);

		return $defaults;
	}

	/**
	 * Register block assets
	 *
	 * @since  TBD
	 *
	 * @param  array $attributes
	 *
	 * @return void
	 */
	public function assets() {
		$gutenberg = tribe( 'gutenberg.tickets.plugin' );

		tribe_asset(
			$gutenberg,
			'tribe-tickets-gutenberg-block-attendees-style',
			'attendees/frontend.css',
			array(),
			null
		);
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
		/**
		 * @todo Be sure we get the post ID from tickets so it can run without TEC
		 */
		$args['post_id']    = $post_id = tribe( 'gutenberg.events.template' )->get( 'post_id' );
		$args['attributes'] = $this->attributes( $attributes );
		$args['attendees']  = $this->get_attendees( $post_id );

		// Add the rendering attributes into global context
		tribe( 'gutenberg.tickets.template' )->add_template_globals( $args );

		// enqueue assets
		tribe_asset_enqueue( 'tribe-tickets-gutenberg-block-attendees-style' );

		return tribe( 'gutenberg.tickets.template' )->template( array( 'blocks', $this->slug() ), $args, false );
	}

	/**
	 * Get the attendees for the event
	 *
	 * @since  TBD
	 *
	 * @param  array $attributes
	 *
	 * @return string
	 */
	public function get_attendees( $post_id ) {

		$post = get_post( $post_id );

		if ( ! $post instanceof WP_Post ) {
			$post = get_post();
		}

		$attendees  = Tribe__Tickets__Tickets::get_event_attendees( $post->ID );
		$total      = count( $attendees );
		$emails     = array();
		$output     = array();

		// Bail if there are no attendees
		if ( empty( $attendees ) || ! is_array( $attendees ) ) {
			return;
		}

		foreach ( $attendees as $key => $attendee ) {

			// Only Check for optout when It's there
			if ( isset( $attendee['optout'] ) && false !== $attendee['optout'] ) {
				continue;
			}

			// Skip when we already have another email like this one.
			if ( in_array( $attendee['purchaser_email'], $emails ) ) {
				continue;
			}

			// Skip folks who've RSVPed as "Not Going".
			if ( 'no' === $attendee['order_status'] ) {
				continue;
			}

			// Skip "Failed" orders
			if ( 'failed' === $attendee['order_status'] ) {
				continue;
			}

			$emails[] = $attendee['purchaser_email'];
			$output[] = $attendee;
		}

		return $output;

	}
}