<?php
/**
 * Initialize Gutenberg Rest Compatibility layers for WP api and Tickets
 *
 * @since TBD
 */
class Tribe__Gutenberg__Tickets__REST__Compatibility {
	/**
	 * Register the required Rest filters fields for good Gutenberg saving
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function hook() {
		if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			return false;
		}

		add_filter( 'get_post_metadata', array( $this, 'filter_going_fields' ), 15, 4 );
	}

	/**
	 * Populates Going and Not going fields for the Rest API data Endpoint in WordPress
	 *
	 * @since TBD
	 *
	 * @param  mixed  $check
	 * @param  int    $object_id
	 * @param  string $meta_key
	 * @param  bool   $single
	 *
	 * @return null|int
	 */
	public function filter_going_fields( $check, $object_id, $meta_key, $single ) {
		if (
			'_tribe_ticket_going_count' !== $meta_key
			|| '_tribe_ticket_not_going_count' !== $meta_key
		) {
			return $check;
		}

		if ( ! current_user_can( 'read_private_posts' ) ) {
			return $check;
		}

		$repository = tribe( 'tickets.rest-v1.repository' );
		$ticket_object = $repository->get_ticket_object( $object_id );

		if ( ! $ticket_object instanceof Tribe__Tickets__Ticket_Object ) {
			return $check;
		}

		$attendees = $repository->get_ticket_attendees( $object_id );

		if ( false === $attendees ) {
			return $check;
		}

		if ( 'Tribe__Tickets__RSVP' !== $ticket_object->provider_class ) {
			return $check;
		}

		$going     = 0;
		$not_going = 0;

		foreach ( $attendees as $attendee ) {
			if ( true === $attendee['rsvp_going'] ) {
				$going++;
			} else {
				$not_going++;
			}
		}

		if ( '_tribe_ticket_going_count' === $meta_key ) {
			return $going;
		}

		if ( '_tribe_ticket_not_going_count' === $meta_key ) {
			return $not_going;
		}
	}
}