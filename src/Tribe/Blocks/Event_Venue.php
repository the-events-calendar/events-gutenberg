<?php
class Tribe__Events_Gutenberg__Blocks__Event_Venue
extends Tribe__Events_Gutenberg__Blocks__Abstract {

	/**
	 * Which is the name/slug of this block
	 *
	 * @since  0.1.1-alpha
	 *
	 * @return string
	 */
	public function slug() {
		return 'event-venue';
	}

	/**
	 * Since we are dealing with a Dynamic type of Block we need a PHP method to render it
	 *
	 * @since  0.1.0-alpha
	 *
	 * @param  array $attributes
	 *
	 * @return string
	 */
	public function render( $attributes = array() ) {
		$args['attributes'] = $attributes;

		// Add the rendering attributes into global context
		tribe( 'gutenberg.template' )->add_template_globals( $args );

		return tribe( 'gutenberg.template' )->template( array( 'blocks', $this->slug() ), $args, false );
	}

	/**
	 * Attach hooks associated with this block
	 *
	 * @return mixed|void
	 */
	public function hook() {
		if ( ! class_exists( 'Tribe__Events__Main' ) ) {
			return;
		}
		$post_type = Tribe__Events__Main::POSTTYPE;
		add_action( "save_post_{$post_type}", array( $this, 'clear_venues' ) );
	}

	/**
	 * Remove venues associated to an event that are no longer relevant
	 *
	 * @since TBD
	 *
	 * @param $post_id
	 * @return boolean
	 */
	public function clear_venues( $post_id ) {
		$status = get_post_status( $post_id );
		if ( 'publish' !== $status ) {
			return false;
		}

		$key = '_EventTempVenues';
		$venues = get_post_meta( $post_id, $key );

		if ( empty( $venues ) || ! is_array( $venues ) ) {
			return false;
		}

		$current_venue = absint( get_post_meta( $post_id, '_EventVenueID', true ) );
		foreach ( $venues as $venue_id ) {

			if ( $current_venue === absint( $venue_id ) ) {
				continue;
			}

			if ( 'draft' === get_post_status( $venue_id ) ) {
				wp_delete_post( $venue_id );
			}
		}

		return delete_post_meta( $post_id, $key );
	}
}
