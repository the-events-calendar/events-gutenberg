<?php
/**
 * Events Gutenberg Assets
 *
 * @since TBD
 */
class Tribe__Events_Gutenberg__Assets {
	/**
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function hook() {

	}

	/**
	 * Registers and Enqueues the assets
	 *
	 * @since  TBD
	 *
	 * @param string $key Which key we are checking against
	 *
	 * @return boolean
	 */
	public function register() {

		$plugin = tribe( 'gutenberg' );

		tribe_asset(
			$plugin,
			'tribe-events-gutenberg-views',
			'views.css',
			array(),
			'wp_enqueue_scripts',
			array(
				'groups'       => array( 'events-views' ),
				'conditionals' => array( $this, 'should_enqueue_frontend' ),
			)
		);

	}

	/**
	 * Checks if we should enqueue frontend assets
	 *
	 * @since  TBD
	 *
	 * @return bool
	 */
	public function should_enqueue_frontend() {
		$should_enqueue = (
			tribe_is_event_query()
			|| tribe_is_event_organizer()
			|| tribe_is_event_venue()
			|| is_active_widget( false, false, 'tribe-events-list-widget' )
		);

		/**
		 * Allow filtering of where the base Frontend Assets will be loaded
		 *
		 * @since  TBD
		 *
		 * @param bool $should_enqueue
		 */
		return apply_filters( 'tribe_events_gutenberg_assets_should_enqueue_frontend', $should_enqueue );
	}
}