<?php

/**
 * Allow including admin templates
 *
 * @since TBD
 */
class Tribe__Gutenberg__Events_Pro__Template__Admin extends Tribe__Template {
	/**
	 * Building of the Class template configuration
	 *
	 * @since TBD
	 */
	public function __construct() {
		$this->set_template_origin( tribe( 'gutenberg' ) );
		// todo: update to the plugins directory only
		$this->set_template_folder( 'plugins/events-pro/src/admin-view' );
		
		// Configures this templating class extract variables
		$this->set_template_context_extract( true );
	}
}
