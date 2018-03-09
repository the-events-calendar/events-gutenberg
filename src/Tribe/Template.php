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
}

