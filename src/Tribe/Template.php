<?php

/**
 * Allow including of Gutenberg Template
 *
 * @since 0.1.1-alpha
 */
class Tribe__Events_Gutenberg__Template extends Tribe__Template {
	/**
	 * Building of the Class template configuration
	 *
	 * @since  0.1.1-alpha
	 */
	public function __construct() {
		$this->set_template_origin( tribe( 'gutenberg' ) );
		$this->set_template_folder( 'src/views' );

		// Configures this templating class extract variables
		$this->set_template_context_extract( true );
	}

	/**
	 * Return the attributes of the template
	 *
	 * @since TBD
	 *
	 * @param array $default_attributes
	 * @return array
	 */
	public function attributes( $default_attributes = array() ) {
		return wp_parse_args(
			$this->get( 'attributes', array() ),
			$default_attributes
		);
	}

	/**
	 * Return a specific attribute
	 *
	 * @since TBD
	 *
	 * @param array $default_attributes
	 * @return array
	 */
	public function attr( $index, $default_attributes = array() ) {

		$attributes = $this->get( 'attributes', array() );

		return Tribe__Utils__Array::get( $attributes, $index, $default_attributes );
	}
}

