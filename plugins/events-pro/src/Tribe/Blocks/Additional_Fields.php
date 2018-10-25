<?php

/**
 * Class Tribe__Gutenberg__Events__Pro__Blocks__Additional_Fields
 */
class Tribe__Gutenberg__Events_Pro__Blocks__Additional_Fields {
	/**
	 * Register all the additionals fields as they might have
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function register() {
		$blocks = tribe( 'gutenberg.events.pro.fields' )->get_block_names( );
		foreach ( $blocks as $block ) {
			$field = new Tribe__Gutenberg__Events_Pro__Blocks__Additional_Field( $block );
			$field->register();
		}
	}
}
