<?php
/**
 * Initialize Gutenberg Event Meta fields
 *
 * @since 0.1.0-alpha
 */
class Tribe__Gutenberg__Events__Meta {
	/**
	 * Register the required Meta fields for good Gutenberg saving
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return void
	 */
	public function register() {
		register_meta( 'post', '_EventAllDay', $this->boolean() );
		register_meta( 'post', '_EventTimezone', $this->text() );
		register_meta( 'post', '_EventStartDate', $this->text() );
		register_meta( 'post', '_EventEndDate', $this->text() );
		register_meta( 'post', '_EventShowMap', $this->boolean() );
		register_meta( 'post', '_EventShowMapLink', $this->boolean() );
		register_meta( 'post', '_EventURL', $this->text() );
		register_meta( 'post', '_EventCost', $this->text() );
		register_meta( 'post', '_EventCostDescription', $this->text() );
		register_meta( 'post', '_EventCurrencySymbol', $this->text() );
		register_meta( 'post', '_EventCurrencyPosition', $this->text() );

		// Use sanitize_textarea_field to allow whitespaces
		register_meta(
			'post',
			'_EventDateTimeSeparator',
			array_merge(
				$this->text(),
				array(
					'sanitize_callback' => array( $this, 'sanitize_separator' ),
				)
			)
		);
		register_meta(
			'post',
			'_EventTimeRangeSeparator',
			array_merge(
				$this->text(),
				array(
					'sanitize_callback' => array( $this, 'sanitize_separator' ),
				)
			)
		);
		register_meta(
			'post',
			'_EventOrganizerID',
			array_merge(
				$this->numeric_array(),
				array(
					'description' => __( 'Event Organizers', 'events-gutenberg' ),
				)
			)
		);

		register_meta(
			'post',
			'_EventVenueID',
			array(
				'description' => __( 'Event Organizers', 'events-gutenberg' ),
				'auth_callback' => array( $this,'auth_callback' ),
				'sanitize_callback' => 'absint',
				'type' => 'integer',
				'single' => true,
				'show_in_rest' => true,
			)
		);

		// Organizers Meta
		register_meta( 'post', '_OrganizerEmail', $this->text() );
		register_meta( 'post', '_OrganizerPhone', $this->text() );
		register_meta( 'post', '_OrganizerWebsite', $this->text() );

		// Venue Meta
		register_meta( 'post', '_VenueAddress', $this->text() );
		register_meta( 'post', '_VenueCity', $this->text() );
		register_meta( 'post', '_VenueCountry', $this->text() );
		register_meta( 'post', '_VenueProvince', $this->text() );
		register_meta( 'post', '_VenueZip', $this->text() );
		register_meta( 'post', '_VenuePhone', $this->text() );
		register_meta( 'post', '_VenueURL', $this->text() );
		register_meta( 'post', '_VenueStateProvince', $this->text() );
		register_meta( 'post', '_VenueLat', $this->text() );
		register_meta( 'post', '_VenueLng', $this->text() );
	}

	/**
	 * Default definition for an attribute of type text
	 *
	 * @since 0.2.4-alpha
	 *
	 * @return array
	 */
	private function text() {
		return array(
			'auth_callback' => array( $this, 'auth_callback' ),
			'sanitize_callback' => 'sanitize_text_field',
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true,
		);
	}

	/***
	 * Default definition for an attribute of type boolean
	 *
	 * @since 0.2.4-alpha
	 *
	 * @return array
	 */
	private function boolean() {
		return array(
			'auth_callback' => array( $this, 'auth_callback' ),
			'sanitize_callback' => array( $this, 'sanitize_boolean' ),
			'type' => 'boolean',
			'single' => true,
			'show_in_rest' => true,
		);
	}

	/**
	 * Register a numeric type of array
	 *
	 * @since 0.2.4-alpha
	 *
	 * @return array
	 */
	private function numeric_array() {
		return array(
			'description' => __( 'Array block', 'events-gutenberg' ),
			'auth_callback' => array( $this, 'auth_callback' ),
			'sanitize_callback' => array( $this, 'sanitize_numeric_array' ),
			'type' => 'number',
			'single' => false,
			'show_in_rest' => true,
		);
	}

	/**
	 * Verify if the current user can edit or not this Post
	 *
	 * @since  0.1.1-alpha
	 *
	 * @param bool   $allowed  Whether the user can add the post meta. Default false.
	 * @param string $meta_key The meta key.
	 * @param int    $post_id  Post ID.
	 * @param int    $user_id  User ID.
	 * @param string $cap      Capability name.
	 * @param array  $caps     User capabilities.
	 *
	 * @return boolean
	 */
	public function auth_callback( $allowed, $meta_key, $post_id, $user_id, $cap, $caps ) {
		$post = get_post( $post_id );
		$post_type_obj = get_post_type_object( $post->post_type );
		$current_user_can = current_user_can( $post_type_obj->cap->edit_post, $post_id );

		return $current_user_can;
	}

	/**
	 * Checks and sanitize a given value to a numeric array or a numeric string
	 *
	 * @since  0.1.0-alpha
	 *
	 * @param  mixed $value Check agains this value
	 *
	 * @return array|bool|int
	 */
	public function sanitize_numeric_array( $value ) {
		if ( is_array( $value ) ) {
			return wp_parse_id_list( $value );
		} elseif ( is_numeric( $value ) ) {
			return absint( $value );
		} else {
			return false;
		}
	}

	/**
	 * Make sure sanitization on boolean does not triggered warnings when multiple values are passed
	 * to the function
	 *
	 * @since 0.2.4-alpha
	 * @param $value
	 *
	 * @return bool
	 */
	public function sanitize_boolean( $value ) {
		return boolval( $value );
	}

	/**
	 * Sanitize strings allowing the usage of white spaces before or after the separators, as
	 * - sanitize_text_field removes any whitespace
	 *
	 * @since 0.2.4-alpha
	 * @param $value
	 *
	 * @return mixed
	 */
	public function sanitize_separator( $value ) {
		return filter_var( $value, FILTER_SANITIZE_STRING );
	}
}
