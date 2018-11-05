<?php

/**
 * Class Tribe__Gutenberg__Events__Pro__Blocks__Additional_Fields
 *
 * General class with the basic information of all the additional fields, centralized point to access the data of
 * additional if required from external places
 */
class Tribe__Gutenberg__Events_Pro__Additional_Fields {
	
	/**
	 * Namespace for Blocks from tribe
	 *
	 * @since  TBD
	 *
	 * @var string
	 */
	private $namespace = 'tribe';
	
	/**
	 * Return the additional fields as an array of values without the ID of each field and also parsing the values
	 * from field where they might have multiple values such as: radio, dropdown, checkbox send an array of values
	 * instead of a single string of value.
	 *
	 * @since TBD
	 *
	 * @return array
	 */
	public function get_fields() {
		$additional_fields = array_values( tribe_get_option( 'custom-fields', array() ) );
		$fields            = array();
		foreach ( $additional_fields as $field ) {
			if ( ! empty( $field['values'] ) ) {
				$field['values'] = explode(
					"\n",
					str_replace( array( "\r", "\t" ), '', $field['values'] )
				);
			}
			$fields[] = $field;
		}
		
		return $fields;
	}
	
	/**
	 * Return the name of the blocks created by additional fields settings as blocks in a format:
	 *
	 * `tribe/field-%s, where %s is the name of meta used to save the block.
	 *
	 * @since TBD
	 * @param $only_visible
	 *
	 * @return array
	 */
	public function get_block_names( $only_visible = false ) {
		$fields = $this->get_fields();
		$names  = [];
		foreach ( $fields as $field ) {
			$should_be_attached = true;
			if ( $only_visible ) {
				$should_be_attached = true === $field['gutenberg_editor'];
			}
			if ( isset( $field['gutenberg_editor'] ) && $should_be_attached ) {
				$names[] = $this->to_block_name( $field['name'] );
			}
		}
		
		return $names;
	}
	
	/**
	 * Convert a string into a valid block name where only a-z and 0-9 characters are valid
	 *
	 * @since TBD
	 *
	 * @param string $name
	 *
	 * @return string
	 */
	public function to_block_name( $name = '' ) {
		/** @var Tribe__Gutenberg__Common__Utils $utils */
		$utils = tribe( 'gutenberg.common.utils' );
		return sprintf('%s/field-%s', $this->namespace, $utils->to_block_name( $name ) );
	}
}
