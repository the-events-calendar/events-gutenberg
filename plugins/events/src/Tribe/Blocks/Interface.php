<?php

interface Tribe__Events_Gutenberg__Blocks__Interface {

	/**
	 * Which is the name/slug of this block
	 *
	 * @since  0.1.1-alpha
	 *
	 * @return string
	 */
	public function slug();

	/**
	 * Which is the name/slug of this block
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return string
	 */
	public function name();

	/**
	 * What are the default attributes for this block
	 *
	 * @since  TBD
	 *
	 * @return array
	 */
	public function default_attributes();

	/**
	 * Since we are dealing with a Dynamic type of Block we need a PHP method to render it
	 *
	 * @since  0.1.0-alpha
	 *
	 * @param  array $attributes
	 *
	 * @return string
	 */
	public function render( $attributes = array() );

	/**
	 * Does the registration for PHP rendering for the Block, important due to been
	 * an dynamic Block
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return void
	 */
	public function register();

	/**
	 * Used to include any Assets for the Block we are registering
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return void
	 */
	public function assets();

	/**
	 * Fetches which ever is the plugin we are dealing with
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return mixed
	 */
	public function plugin();

	/**
	 * Attach any specific hook to the current block.
	 *
	 * @since TBD
	 *
	 * @return mixed
	 */
	public function hook();
}
