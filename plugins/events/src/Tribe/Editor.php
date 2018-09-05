<?php

/**
 * Initialize Gutenberg editor blocks and styles
 *
 * @since 0.1.0-alpha
 */
class Tribe__Gutenberg__Events__Editor extends Tribe__Gutenberg__Common__Editor {

	/**
	 * Gets the classic template, used for migration and setup new events with classic look
	 *
	 * @since  0.2.2-alpha
	 *
	 * @return array
	 */
	public function get_classic_template() {
		$template = array();
		$template[] = array( 'tribe/event-datetime' );
		$template[] = array( 'tribe/featured-image' );
		$template[] = array(
			'core/paragraph',
			array(
				'placeholder' => __( 'Add Description...', 'events-gutenberg' ),
			),
		);
		$template[] = array( 'tribe/event-links' );
		$template[] = array( 'tribe/classic-event-details' );
		$template[] = array( 'tribe/event-venue' );
		return $template;
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
		$is_classic_editor = ! empty( $post ) && is_numeric( $post ) && ! has_blocks( $post );

		// Basically setups up a different template if is a classic event
		if ( $is_classic_editor ) {
			$template = $this->get_classic_template();
		} else {
			$template[] = array( 'tribe/event-datetime' );
			$template[] = array(
				'core/paragraph',
				array(
					'placeholder' => __( 'Add Description...', 'events-gutenberg' ),
				),
			);
			$template[] = array( 'tribe/event-price' );
			$template[] = array( 'tribe/event-organizer' );
			$template[] = array( 'tribe/event-venue' );
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
	 * Check if current admin page is post type `tribe_events`
	 *
	 * @since  0.2.2-alpha
	 *
	 * @return bool
	 */
	public function is_events_post_type() {
		return Tribe__Admin__Helpers::instance()->is_post_type_screen( Tribe__Events__Main::POSTTYPE );
	}

	/**
	 * @todo   Move this into the Block PHP files
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return void
	 */
	public function assets() {
		$plugin = tribe( 'gutenberg.events.plugin' );

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
				'type'         => 'js',
				'in_footer'    => false,
				'localize'     => array(
					'name' => 'tribe_blocks_editor_google_maps_api',
					'data' => array(
						'zoom' => $gmaps_api_zoom,
						'key' => $gmaps_api_key,
					),
				),
				'conditionals' => array( $this, 'is_events_post_type' ),
			)
		);

		$js_config = array(
			'admin_url' => admin_url(),
			'timeZone' => array(
				'show_time_zone' => false,
				'label' => $this->get_timezone_label(),
			),
			'rest' => array(
				'url' => get_rest_url(),
				'nonce' => wp_create_nonce( 'wp_rest' ),
				'namespaces' => array(
					'core' => 'wp/v2',
				),
			),
		);

		tribe_asset(
			$plugin,
			'tribe-events-editor-elements',
			'elements.js',
			array( 'react', 'react-dom', 'wp-components', 'wp-api', 'wp-api-request', 'wp-blocks', 'wp-i18n', 'wp-element' ),
			'enqueue_block_editor_assets',
			array(
				'in_footer'    => false,
				'localize'     => array(
					array(
						'name' => 'tribe_js_config',
						/**
						 * Array used to setup the FE with custom variables from the BE
						 *
						 * @since TBD
						 *
						 * @param array An array with the variables to be localized
						 */
						'data' => apply_filters( 'tribe_events_gutenberg_js_config', $js_config ),
					),
					array(
						'name' => 'tribe_blocks_editor_settings',
						'data' => tribe( 'gutenberg.events.settings' )->get_options(),
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
				'conditionals' => array( $this, 'is_events_post_type' ),
			)
		);

		$localize_blocks = array(
			array(
				'name' => 'tribe_blocks_editor_settings',
				'data' => tribe( 'gutenberg.events.settings' )->get_options(),
			),
			array(
				'name' => 'tribe_blocks_editor_timezone_html',
				'data' => tribe_events_timezone_choice( Tribe__Events__Timezones::get_event_timezone_string() ),
			),
			array(
				'name' => 'tribe_blocks_editor_price_settings',
				'data' => array(
					'default_currency_symbol'   => tribe_get_option( 'defaultCurrencySymbol', '$' ),
					'default_currency_position' => (
						tribe_get_option( 'reverseCurrencyPosition', false ) ? 'suffix' : 'prefix'
					),
					'is_new_event'              => tribe( 'context' )->is_new_post(),
				),
			),
			array(
				'name' => 'tribe_blocks_editor_constants',
				'data' => array(
					'hide_upsell' => ( defined( 'TRIBE_HIDE_UPSELL' ) && TRIBE_HIDE_UPSELL ) ? 'true' : 'false',
				),
			),
		);

		$is_classic_editor = $this->post_is_from_classic_editor( tribe_get_request_var( 'post', 0 ) );

		$localize_blocks[] = array(
			'name' => 'tribe_blocks_editor',
			'data' => array(
				'is_classic' => $is_classic_editor,
			),
		);

		tribe_asset(
			$plugin,
			'tribe-events-editor-blocks',
			'blocks.js',
			array( 'react', 'react-dom', 'wp-components', 'wp-api', 'wp-api-request', 'wp-blocks', 'wp-i18n', 'wp-element', 'tribe-events-editor-blocks-gmaps-api', 'tribe-events-editor-elements' ),
			'enqueue_block_editor_assets',
			array(
				'in_footer'    => false,
				'localize'     => $localize_blocks,
				'conditionals' => array( $this, 'is_events_post_type' ),
			)
		);

		tribe_asset(
			$plugin,
			'tribe-block-editor-element',
			'element.css',
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer'    => false,
				'conditionals' => array( $this, 'is_events_post_type' ),
			)
		);

		tribe_asset(
			$plugin,
			'tribe-block-editor',
			'editor.css',
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer'    => false,
				'conditionals' => array( $this, 'is_events_post_type' ),
			)
		);

		tribe_asset(
			$plugin,
			'tribe-block-editor-blocks',
			'blocks.css',
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer'    => false,
				'conditionals' => array( $this, 'is_events_post_type' ),
			)
		);
	}

	/**
	 * Remove scripts that are not relevant for the Gutenberg editor or conflict with the scripts
	 * used on gutenberg
	 *
	 * @since 0.2.4-alpha
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
				'time'       => get_option( 'time_format', __( 'g:i a', 'default' ) ),
				'date'       => get_option( 'date_format', __( 'F j, Y', 'default' ) ),
				'dateNoYear' => __( 'F j', 'default' ),
				'datetime'   => __( 'F j, Y g:i a', 'default' ),
			),
			'timezone' => array(
				'offset' => get_option( 'gmt_offset', 0 ),
				'string' => $this->get_timezone_label(),
			),
		);
	}

	/**
	 * Returns the site timezone as a string
	 *
	 * @since TBD
	 *
	 * @return string
	 */
	public function get_timezone_label() {
		return class_exists( 'Tribe__Timezones' )
			? Tribe__Timezones::wp_timezone_string()
			: get_option( 'timezone_string', 'UTC' );
	}

	/**
	 * Add "Event Blocks" category to the editor
	 *
	 * @since  0.2.4-alpha
	 *
	 * @return array
	 */
	public function block_categories( $categories, $post ) {
		if ( Tribe__Events__Main::POSTTYPE !== $post->post_type ) {
			return $categories;
		}

		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'tribe-events',
					'title' => __( 'Event Blocks', 'events-gutenberg' ),
				),
			)
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
