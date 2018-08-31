<?php
/**
 * Events Gutenberg Assets
 *
 * @since TBD
 */
class Tribe__Gutenberg__Tickets__Assets {
	/**
	 * @since TBD
	 *
	 * @return void
	 */
	public function hook() {
	}

	/**
	 * Registers and Enqueues the assets
	 *
	 * @since TBD
	 */
	public function register() {
		$plugin = tribe( 'gutenberg.tickets.plugin' );

		tribe_asset(
			$plugin,
			'tribe-tickets-gutenberg-blocks',
			'blocks.js',
			/**
			 * @todo revise this dependencies
			 */
			array( 'react', 'react-dom', 'wp-components', 'wp-blocks', 'wp-i18n', 'wp-element' ),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => false,
				'localize'  => array(),
			)
		);
	}
}
