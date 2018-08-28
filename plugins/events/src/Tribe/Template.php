<?php

/**
 * Allow including of Gutenberg Template
 *
 * @since 0.1.1-alpha
 */
class Tribe__Gutenberg__Events__Template extends Tribe__Template {
	/**
	 * Building of the Class template configuration
	 *
	 * @since  0.1.1-alpha
	 */
	public function __construct() {
		$this->set_template_origin( tribe( 'gutenberg' ) );
		// todo: update to the plugins directory only
		$this->set_template_folder( 'plugins/events/src/views' );

		// Configures this templating class extract variables
		$this->set_template_context_extract( true );
	}

	/**
	 * Return the attributes of the template
	 *
	 * @since 0.2.4-alpha
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
	 * @since 0.2.4-alpha
	 *
	 * @param  mixed $default
	 * @return mixed
	 */
	public function attr( $index, $default = null ) {

		$attribute = $this->get( array_merge( array( 'attributes' ), (array) $index ), array(), $default );

		return $attribute;

	}
}

