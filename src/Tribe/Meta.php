<?php
/**
 * Initialize Gutenberg Event Meta fields
 *
 * @since TBD
 */
class Tribe__Events_Gutenberg__Meta {
	/**
	 * Register the required Meta fields for good Gutenberg saving
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function register() {
		$args = (object) array();

		$args->text = array(
			'auth_callback' => '__return_true',
			'sanitize_callback' => 'sanitize_text_field',
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true,
		);

		register_meta( 'post', '_EventStartDate', $args->text );
		register_meta( 'post', '_EventEndDate', $args->text );
		register_meta( 'post', '_EventURL', $args->text );

		register_meta(
			'post',
			'_EventOrganizerID',
			array(
				'description' => __( 'Event Organizers', 'the-events-calendar' ),
				'auth_callback' => '__return_true',
				'sanitize_callback' => array( $this, 'sanitize_numeric_array' ),
				'type' => 'number',
				'single' => false,
				'show_in_rest' => true,
			)
		);

		register_meta( 'post', '_OrganizerEmail', $args->text );
		register_meta( 'post', '_OrganizerPhone', $args->text );
		register_meta( 'post', '_OrganizerWebsite', $args->text );
	}

	public function sanitize_numeric_array( $value ) {
		if ( is_array( $value ) ) {
			return wp_parse_id_list( $value );
		} elseif ( is_numeric( $value ) ) {
			return absint( $value );
		} else {
			return false;
		}
	}
}