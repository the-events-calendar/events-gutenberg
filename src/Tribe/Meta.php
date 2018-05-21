<?php
/**
 * Initialize Gutenberg Event Meta fields
 *
 * @since 0.1.0-alpha
 */
class Tribe__Events_Gutenberg__Meta {
	/**
	 * Register the required Meta fields for good Gutenberg saving
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return void
	 */
	public function register() {
		$args = (object) array();

		$args->text = array(
			'auth_callback' => array( $this,'auth_callback' ),
			'sanitize_callback' => 'sanitize_text_field',
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true,
		);

		$args->bool = array(
			'auth_callback' => array( $this,'auth_callback' ),
			'sanitize_callback' => array( $this, 'sanitize_boolean' ),
			'type' => 'boolean',
			'single' => true,
			'show_in_rest' => true,
		);

		register_meta( 'post', '_EventAllDay', $args->bool );
		register_meta( 'post', '_EventTimezone', $args->text );
		register_meta( 'post', '_EventStartDate', $args->text );
		register_meta( 'post', '_EventEndDate', $args->text );
		register_meta( 'post', '_EventShowMap', $args->text );
		register_meta( 'post', '_EventShowMapLink', $args->text );
		register_meta( 'post', '_EventURL', $args->text );
		register_meta( 'post', '_EventCost', $args->text );
		register_meta( 'post', '_EventCurrencySymbol', $args->text );
		register_meta( 'post', '_EventCurrencyPosition', $args->text );
		register_meta(
			'post',
			'_EventOrganizerID',
			array(
				'description' => __( 'Event Organizers', 'events-gutenberg' ),
				'auth_callback' => array( $this,'auth_callback' ),
				'sanitize_callback' => array( $this, 'sanitize_numeric_array' ),
				'type' => 'number',
				'single' => false,
				'show_in_rest' => true,
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
		register_meta( 'post', '_OrganizerEmail', $args->text );
		register_meta( 'post', '_OrganizerPhone', $args->text );
		register_meta( 'post', '_OrganizerWebsite', $args->text );

		// Venue Meta
		register_meta( 'post', '_VenueAddress', $args->text );
		register_meta( 'post', '_VenueCity', $args->text );
		register_meta( 'post', '_VenueCountry', $args->text );
		register_meta( 'post', '_VenueProvince', $args->text );
		register_meta( 'post', '_VenueZip', $args->text );
		register_meta( 'post', '_VenuePhone', $args->text );
		register_meta( 'post', '_VenueURL', $args->text );
		register_meta( 'post', '_VenueStateProvince', $args->text );
		register_meta( 'post', '_VenueLat', $args->text );
		register_meta( 'post', '_VenueLng', $args->text );
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
		return current_user_can( $post_type_obj->cap->edit_post, $post_id );
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
	 * @since TBD
	 * @param $value
	 *
	 * @return bool
	 */
	public function sanitize_boolean( $value ) {
		return boolval( $value );
	}
}
