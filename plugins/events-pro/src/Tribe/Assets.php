<?php
/**
 * Events Gutenberg Assets
 *
 * @since 0.2.7-alpha
 */
class Tribe__Gutenberg__Events_Pro__Assets {
	/**
	 *
	 * @since 0.2.7-alpha
	 *
	 * @return void
	 */
	public function hook() {}

	/**
	 * Registers and Enqueues the assets
	 *
	 * @since 0.2.7-alpha
	 *
	 * @param string $key Which key we are checking against
	 *
	 * @return boolean
	 */
	public function register() {
		$plugin = tribe( 'gutenberg.events-pro.plugin' );

		tribe_asset(
			$plugin,
			'tribe-pro-gutenberg-blocks',
			'blocks.js',
			/**
			 * @todo revise this dependencies
			 */
			array( 'react', 'react-dom', 'wp-components', 'wp-api', 'wp-api-request', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => true,
				'localize'  => array(),
			)
		);
		
		tribe_asset(
			$plugin,
			'tribe-pro-gutenberg-blocks-styles',
			'blocks.css',
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => true,
				'localize'  => array(),
			)
		);
		
		tribe_asset(
			$plugin,
			'tribe-pro-gutenberg-elements',
			'elements.js',
			/**
			 * @todo revise this dependencies
			 */
			array( 'react', 'react-dom', 'wp-components', 'wp-api', 'wp-api-request', 'wp-blocks', 'wp-i18n', 'wp-element' ),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => true,
				'localize'  => array(),
			)
		);
		
		tribe_asset(
			$plugin,
			'tribe-pro-gutenberg-element',
			'elements.css',
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => true,
				'localize'  => array(),
			)
		);

		add_filter( 'tribe_events_gutenberg_js_config', array( $this, 'set_editor_defaults' ), 10 );
	}

	/**
	 * Set default values for the editor localization
	 *
	 * @since 0.3.0-alpha
	 *
	 * @param array $defaults Array with the default values
	 *
	 * @return array
	 */
	public function set_editor_defaults( $js_config ) {

		$defaults = array();

		// If defined set the default Venue
		$default_venue = (int) tribe_get_option( 'eventsDefaultVenueID', 0 );
		if ( $default_venue ) {
			$defaults['venue'] = $default_venue;
		}

		// If defined, set the default Venue Address
		$venue_address = tribe_get_option( 'eventsDefaultAddress', '' );
		if ( '' !== $venue_address ) {
			$defaults['venueAddress'] = $venue_address;
		}

		$venue_city = tribe_get_option( 'eventsDefaultCity', '' );
		if ( '' !== $venue_city ) {
			$defaults['venueCity'] = $venue_city;
		}

		$venue_state = tribe_get_option( 'eventsDefaultState', '' );
		if ( '' !== $venue_state ) {
			$defaults['venueState'] = $venue_state;
		}

		$venue_province = tribe_get_option( 'eventsDefaultProvince', '' );
		if ( '' !==  $venue_province ) {
			$defaults['venueProvince'] = $venue_province;
		}

		$venue_zip = tribe_get_option( 'eventsDefaultZip', '' );
		if ( '' !==  $venue_zip ) {
			$defaults['venueZip'] = $venue_zip;
		}

		$venue_phone = tribe_get_option( 'eventsDefaultPhone', '' );
		if ( '' !==  $venue_phone ) {
			$defaults['venuePhone'] = $venue_phone;
		}

		$venue_country = tribe_get_option( 'defaultCountry', null );
		if ( $venue_country ) {
			$defaults['venueCountry'] = $venue_country;
		}

		// If defined, set the default Organizer
		$default_organizer = (int) tribe_get_option( 'eventsDefaultOrganizerID', 0 );
		if ( $default_organizer ) {
			$defaults['organizer'] = $default_organizer;
		}

		$js_config['editor_defaults'] = $defaults;

		return $js_config;
	}

}
