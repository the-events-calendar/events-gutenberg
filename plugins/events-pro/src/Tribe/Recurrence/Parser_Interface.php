<?php

/**
 * Interface Tribe__Gutenberg__Events_Pro__Recurrence__Parser_Interface
 *
 * @since TBD
 */
interface Tribe__Gutenberg__Events_Pro__Recurrence__Parser_Interface {
	
	/**
	 * Tribe__Gutenberg__Events_Pro__Recurrence__Parser_Interface constructor.
	 *
	 * @param array $fields
	 */
	public function __construct( $fields = array() );
	
	/**
	 * Method used to setup the class
	 *
	 * @since TBD
	 *
	 * @return boolean
	 */
	public function parse();
	
	/**
	 *
	 *
	 * @since TBD
	 *
	 * @param string $type
	 *
	 * @return boolean
	 */
	public function set_type( $type = '' );
	
	/**
	 * Return the parsed data
	 *
	 * @since TBD
	 *
	 * @return array
	 */
	public function get_parsed();
}
