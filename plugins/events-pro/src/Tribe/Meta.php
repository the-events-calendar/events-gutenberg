<?php
/**
 * Initialize Gutenberg Event Meta fields
 *
 * @since TBD
 */
class Tribe__Gutenberg__Events_Pro__Meta extends Tribe__Gutenberg__Common__Meta {
	/**
	 * Register the required Meta fields for Blocks Editor API saving
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function register() {
		$this->register_additional_fields();
		register_meta( 'post', '_tribe_blocks_recurrence_rules', tribe( 'gutenberg.events.meta' )->text() );
		register_meta( 'post', '_tribe_blocks_recurrence_exclusions', tribe( 'gutenberg.events.meta' )->text() );
	}
	
	/**
	 * Register all the additional fields
	 *
	 * @since TBD
	 */
	public function register_additional_fields() {
		$additional_fields = array_values( tribe_get_option( 'custom-fields', array() ) );
		foreach ( $additional_fields as $field ) {
			
			$has_fields = isset( $field['name'], $field['type'], $field['gutenberg_editor'] );
			if ( ! $has_fields ) {
				continue;
			}
			
			switch ( $field['type'] ) {
				case 'textarea':
					$args = $this->textarea();
					break;
				case 'url':
					$args = $this->url();
					break;
				case 'checkbox':
					$args = $this->text();
					// New type of additional field saved on the meta field with __name
					register_meta( 'post', '_' . $field['name'], $this->text_array() );
					break;
				default:
					$args = $this->text();
					break;
			}
			register_meta( 'post', $field['name'], $args );
		}
	}
}
