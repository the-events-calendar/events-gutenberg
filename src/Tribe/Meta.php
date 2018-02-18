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
		$args = array(
			'auth_callback' => '__return_true',
			'sanitize_callback' => 'sanitize_text_field',
			'type' => 'string',
			'single' => true,
			'show_in_rest' => true,
		);
		register_meta( 'post', '_EventStartDate', $args );
		register_meta( 'post', '_EventEndDate', $args );
		register_meta( 'post', '_EventURL', $args );
	}
}