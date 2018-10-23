<?php
/**
 * Initialize Gutenberg Event Meta fields
 *
 * @since TBD
 */
class Tribe__Gutenberg__Events_Pro__Meta extends Tribe__Gutenberg__Common__Meta {
	/**
	 * Register the required Meta fields for good Gutenberg saving
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function register() {
		$additional_fields = array_values( tribe_get_option( 'custom-fields', array() ) );
		foreach ( $additional_fields as $field ) {
			
			$has_fields = isset( $field['name'] )
			              && isset( $field['type'] )
			              && isset( $field['gutenberg_editor'] );
			
			if ( ! $has_fields ) {
				continue;
			}
			
			if ( false === $field['gutenberg_editor'] ) {
				$is_checkbox = 'checkbox' === $field['type'];
				register_meta( 'post', $field['name'], $this->text() );
				if ( $is_checkbox ) {
					/**
					 * @todo handle the case when there's an array specifically for checkboxes
					 * that includes an extra dash on the name '_'-
					 */
				}
			}
		}
	}
}
