<?php
/**
 * Events Gutenberg Assets
 *
 * @since 0.2.4-alpha
 */
class Tribe__Gutenberg__Events__Assets {
	/**
	 *
	 * @since  0.2.4-alpha
	 *
	 * @return void
	 */
	public function hook() {

	}

	/**
	 * Registers and Enqueues the assets
	 *
	 * @since  0.2.4-alpha
	 *
	 * @param string $key Which key we are checking against
	 *
	 * @return boolean
	 */
	public function register() {

		$plugin = tribe( 'gutenberg.events.plugin' );

		tribe_asset(
			$plugin,
			'tribe-events-gutenberg-views',
			'app/views.css',
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
	 * @since  0.2.4-alpha
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
		 * @since  0.2.4-alpha
		 *
		 * @param bool $should_enqueue
		 */
		return apply_filters( 'tribe_events_gutenberg_assets_should_enqueue_frontend', $should_enqueue );
	}
}