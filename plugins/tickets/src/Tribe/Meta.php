<?php
/**
 * Initialize Gutenberg Event Meta fields
 *
 * @since TBD
 */
class Tribe__Gutenberg__Tickets__Meta {
	/**
	 * Register the required Meta fields for good Gutenberg saving
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function register() {

		// That comes from Woo, that is why it's static string
		register_meta(
			'post',
			'_price',
			$this->text()
		);

		register_meta(
			'post',
			'_stock',
			$this->text()
		);

		// Tickets Hander Keys
		$handler = tribe( 'tickets.handler' );

		register_meta(
			'post',
			$handler->key_image_header,
			$this->text()
		);

		register_meta(
			'post',
			$handler->key_provider_field,
			$this->text()
		);

		register_meta(
			'post',
			$handler->key_capacity,
			$this->text()
		);

		register_meta(
			'post',
			$handler->key_start_date,
			$this->text()
		);

		register_meta(
			'post',
			$handler->key_end_date,
			$this->text()
		);

		register_meta(
			'post',
			$handler->key_show_description,
			$this->text()
		);

		// Global Stock
		register_meta(
			'post',
			Tribe__Tickets__Global_Stock::GLOBAL_STOCK_ENABLED,
			$this->text()
		);

		register_meta(
			'post',
			Tribe__Tickets__Global_Stock::GLOBAL_STOCK_LEVEL,
			$this->text()
		);

		register_meta(
			'post',
			Tribe__Tickets__Global_Stock::TICKET_STOCK_MODE,
			$this->text()
		);

		register_meta(
			'post',
			Tribe__Tickets__Global_Stock::TICKET_STOCK_CAP,
			$this->text()
		);

		// Fetch RSVP keys
		$rsvp = tribe( 'tickets.rsvp' );

		register_meta(
			'post',
			$rsvp->event_key,
			$this->text()
		);
	}

	/**
	 * Default definition for an attribute of type text
	 *
	 * @since TBD
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

	/**
	 * Default definition for an attribute of type boolean
	 *
	 * @since TBD
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
	 * @since  TBD
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
	 * @since  TBD
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

	/**
	 * Sanitize strings allowing the usage of white spaces before or after the separators, as
	 * - sanitize_text_field removes any whitespace
	 *
	 * @since TBD
	 * @param $value
	 *
	 * @return mixed
	 */
	public function sanitize_separator( $value ) {
		return filter_var( $value, FILTER_SANITIZE_STRING );
	}
}
