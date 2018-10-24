<?php
/**
 * Initialize Gutenberg Events Pro Meta fields
 *
 * @since TBD
 */
class Tribe__Gutenberg__Events_Pro__Meta {
	/**
	 * Register the required Meta fields for Blocks Editor API saving
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function register() {
		register_meta( 'post', '_tribe_blocks_recurrence_rules', tribe( 'gutenberg.events.meta' )->text() );
		register_meta( 'post', '_tribe_blocks_recurrence_exclusions', tribe( 'gutenberg.events.meta' )->text() );
	}
}
