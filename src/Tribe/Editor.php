<?php

/**
 * Initialize Gutenberg editor blocks and styles
 *
 * @since 0.1.0-alpha
 */
class Tribe__Events_Gutenberg__Editor {
	/**
	 * Checks if we have Gutenberg Project online, only useful while
	 * its a external plugin
	 *
	 * @todo   Revise when Gutenberg is merged into core
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return boolean
	 */
	public function is_gutenberg_active() {
		return function_exists( 'the_gutenberg_project' );
	}

	/**
	 * Checks if we have Editor Block active
	 *
	 * @since  0.1.1-alpha
	 *
	 * @return boolean
	 */
	public function is_blocks_editor_active() {
		return function_exists( 'register_block_type' ) && function_exists( 'unregister_block_type' );
	}

	/**
	 * Adds the required fields into the Events Post Type so that we can use Block Editor
	 *
	 * @since  0.1.0-alpha
	 *
	 * @param  array $args Arguments used to setup the Post Type
	 *
	 * @return array
	 */
	public function add_support( $args = array() ) {
		// Make sure we have the Support argument and it's an array
		if ( ! isset( $args['supports'] ) || ! is_array( $args['supports'] ) ) {
			$args['supports'] = array();
		}

		// Add Editor Support
		if ( ! in_array( 'editor', $args['supports'] ) ) {
			$args['supports'][] = 'editor';
		}

		return $args;
	}

	/**
	 * Adds the required fields into the Post Type so that we can the Rest API to update it
	 *
	 * @since  0.1.0-alpha
	 *
	 * @param  array $args Arguments used to setup the Post Type
	 *
	 * @return array
	 */
	public function add_rest_support( $args = array() ) {
		// Blocks Editor requires REST support
		$args['show_in_rest'] = true;

		// Make sure we have the Support argument and it's an array
		if ( ! isset( $args['supports'] ) || ! is_array( $args['supports'] ) ) {
			$args['supports'] = array();
		}

		// Add Custom Fields (meta) Support
		if ( ! in_array( 'custom-fields', $args['supports'] ) ) {
			$args['supports'][] = 'custom-fields';
		}

		return $args;
	}

	/**
	 * Adds the required blocks into the Events Post Type
	 *
	 * @since  0.1.3-alpha
	 *
	 * @param  array $args Arguments used to setup the CPT template
	 *
	 * @return array
	 */
	public function add_event_template_blocks( $args = array() ) {
		$template = array();

		$post = tribe_get_request_var( 'post' );
		$is_classic_editor = ! empty( $post ) && is_numeric( $post ) && ! gutenberg_post_has_blocks( $post );

		// Basically setups up a diferent template if is a classic event
		if ( $is_classic_editor ) {
			$template[] = array( 'tribe/event-subtitle' );
			$template[] = array(
				'core/paragraph',
				array(
					'placeholder' => __( 'Add Description...', 'events-gutenberg' ),
				),
			);
			$template[] = array( 'tribe/event-links' );
			$template[] = array( 'tribe/event-details' );
			$template[] = array( 'tribe/event-venue' );
		} else {
			$template[] = array(
				'core/paragraph',
				array(
					'placeholder' => __( 'Add Description...', 'events-gutenberg' ),
				),
			);
			$template[] = array( 'tribe/event-price' );
			$template[] = array( 'tribe/event-website' );
			$template[] = array( 'tribe/event-links' );
		}

		/**
		 * Allow modifying the default template for Events
		 *
		 * @since  0.1.3-alpha
		 *
		 * @param  array   $template   Array of all the templates used by default
		 * @param  string  $post_type  Which post type we are filtering
		 * @param  array   $args       Array of configurations for the post type
		 *
		 */
 		$args['template'] = apply_filters( 'tribe_events_editor_default_template', $template, Tribe__Events__Main::POSTTYPE, $args );

 		return $args;
	}

	/**
	 * Prevents us from using `init` to register our own blocks, allows us to move
	 * it when the proper place shows up
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return void
	 */
	public function register_blocks() {
		/**
		 * Internal Action used to register blocks for Events
		 *
		 * @since  0.1.0-alpha
		 */
		do_action( 'tribe_events_editor_register_blocks' );
	}

	/**
	 * @todo   Move this into the Block PHP files
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return void
	 */
	public function assets() {
		$plugin = tribe( 'gutenberg' );

		/**
		 * Allows for filtering the embedded Google Maps API URL.
		 *
		 * @since ??
		 *
		 * @param string $api_url The Google Maps API URL.
		 */
		$gmaps_api_zoom = apply_filters( 'tribe_events_single_map_zoom_level', (int) tribe_get_option( 'embedGoogleMapsZoom', 8 ) );
		$gmaps_api_key = tribe_get_option( 'google_maps_js_api_key' );
		$gmaps_api_url = 'https://maps.googleapis.com/maps/api/js';

		if ( ! empty( $gmaps_api_key ) && is_string( $gmaps_api_key ) ) {
			$gmaps_api_url = add_query_arg( array( 'key' => $gmaps_api_key ), $gmaps_api_url );
		}

		/**
		 * Allows for filtering the embedded Google Maps API URL.
		 *
		 * @since  ??
		 *
		 * @param string $api_url The Google Maps API URL.
		 */
		$gmaps_api_url = apply_filters( 'tribe_events_google_maps_api', $gmaps_api_url );

		tribe_asset(
			$plugin,
			'tribe-events-editor-blocks-gmaps-api',
			$gmaps_api_url,
			array(),
			'enqueue_block_editor_assets',
			array(
				'type'      => 'js',
				'in_footer' => false,
				'localize'  => array(
					'name' => 'tribe_blocks_editor_google_maps_api',
					'data' => array(
						'zoom' => $gmaps_api_zoom,
						'key' => $gmaps_api_key,
					),
				),
			)
		);

		tribe_asset(
			$plugin,
			'tribe-events-editor-elements',
			'elements.js',
			array( 'react', 'react-dom', 'wp-components', 'wp-api', 'wp-api-request', 'wp-blocks', 'wp-i18n', 'wp-element' ),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => false,
				'localize'  => array(
					array(
						'name' => 'tribe_blocks_editor_settings',
						'data' => tribe( 'gutenberg.settings' )->get_options(),
					),
					array(
						'name' => 'tribe_blocks_editor_timezone_html',
						'data' => tribe_events_timezone_choice( Tribe__Events__Timezones::get_event_timezone_string() ),
					),
					array(
						'name' => 'tribe_date_settings',
						'data' => array( $this, 'get_date_settings' ),
					),
					array(
						'name' => 'tribe_data_countries',
						'data' => tribe( 'languages.locations' )->get_countries(),
					),
					array(
						'name' => 'tribe_data_us_states',
						'data' => Tribe__View_Helpers::loadStates(),
					),
				),
			)
		);

		tribe_asset(
			$plugin,
			'tribe-events-editor-blocks',
			'blocks.js',
			array( 'react', 'react-dom', 'wp-components', 'wp-api', 'wp-api-request', 'wp-blocks', 'wp-i18n', 'wp-element', 'tribe-events-editor-blocks-gmaps-api', 'tribe-events-editor-elements' ),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => false,
				'localize'  => array(
					array(
						'name' => 'tribe_blocks_editor_settings',
						'data' => tribe( 'gutenberg.settings' )->get_options(),
					),
					array(
						'name' => 'tribe_blocks_editor_timezone_html',
						'data' => tribe_events_timezone_choice( Tribe__Events__Timezones::get_event_timezone_string() ),
					),
				),
			)
		);

		tribe_asset(
			$plugin,
			'tribe-block-editor-element',
			'element.css',
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => false,
			)
		);

		tribe_asset(
			$plugin,
			'tribe-block-editor',
			'editor.css',
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => false,
			)
		);

		tribe_asset(
			$plugin,
			'tribe-block-editor-blocks',
			'blocks.css',
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => false,
			)
		);
	}

	/**
	 * Remove scripts that are not relevant for the Gutenberg editor or conflict with the scripts
	 * used on gutenberg
	 *
	 * @since TBD
	 */
	public function deregister_scripts() {
		wp_deregister_script( 'tribe_events_google_maps_api' );
	}

	/**
	 * Get Localization data for Date settings
	 *
	 * @since  0.1.6-alpha
	 *
	 * @return array
	 */
	public function get_date_settings() {
		global $wp_locale;
		return array(
			'l10n'     => array(
				'locale'        => get_user_locale(),
				'months'        => array_values( $wp_locale->month ),
				'monthsShort'   => array_values( $wp_locale->month_abbrev ),
				'weekdays'      => array_values( $wp_locale->weekday ),
				'weekdaysShort' => array_values( $wp_locale->weekday_abbrev ),
				'meridiem'      => (object) $wp_locale->meridiem,
				'relative'      => array(
					/* translators: %s: duration */
					'future' => __( '%s from now', 'default' ),
					/* translators: %s: duration */
					'past'   => __( '%s ago', 'default' ),
				),
			),
			'formats'  => array(
				'time'     => get_option( 'time_format', __( 'g:i a', 'default' ) ),
				'date'     => get_option( 'date_format', __( 'F j, Y', 'default' ) ),
				'datetime' => __( 'F j, Y g:i a', 'default' ),
			),
			'timezone' => array(
				'offset' => get_option( 'gmt_offset', 0 ),
				'string' => get_option( 'timezone_string', 'UTC' ),
			),
		);
	}

	/************************
	 *                      *
	 *  Deprecated Methods  *
	 *                      *
	 ************************/

	/**
	 * Adds the required blocks into the Events Post Type
	 *
	 * @since      0.1.0-alpha
	 * @deprecated 0.1.3-alpha
	 *
	 * @param  array $args Arguments used to setup the CPT template
	 *
	 * @return array
	 */
	public function add_template_blocks( $args = array() ) {
		return $this->add_event_template_blocks( $args );
	}
}
