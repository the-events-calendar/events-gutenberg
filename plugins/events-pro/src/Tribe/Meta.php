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
			
			$has_fields = isset( $field['name'], $field['type'], $field['gutenberg_editor'] );
			if ( ! $has_fields ) {
				continue;
			}
			
			if ( false === $field['gutenberg_editor'] ) {
				switch ( $field['type'] ) {
					case 'textarea':
						$args = $this->textarea();
						break;
					case 'url':
						$args = $this->url();
						break;
					default:
						$args = $this->text();
						break;
				}
				register_meta( 'post', $field['name'], $args );
				
				if ( 'checkbox' === $field['type'] ) {
					register_meta( 'post', '_' . $field['name'], $this->text_array() );
				}
			}
		}
	}
}
