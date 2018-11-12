<?php
/**
 * Events Gutenberg Assets
 *
 * @since 0.3.0-alpha
 */
class Tribe__Gutenberg__Tickets__Assets {
	/**
	 * @since 0.3.0-alpha
	 *
	 * @return void
	 */
	public function hook() {
	}

	/**
	 * Registers and Enqueues the assets
	 *
	 * @since 0.3.0-alpha
	 */
	public function register() {
		$plugin = tribe( 'gutenberg.tickets.plugin' );
		
		tribe_asset(
			$plugin,
			'tribe-tickets-gutenberg-icons',
			'app/icons.js',
			/**
			 * @todo revise this dependencies
			 */
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer'    => false,
				'localize'     => array(),
				'conditionals' => tribe_callback( 'gutenberg.tickets.editor', 'current_type_support_tickets' ),
				'priority'     => 201,
			)
		);

		tribe_asset(
			$plugin,
			'tribe-tickets-gutenberg-elements',
			'app/elements.js',
			/**
			 * @todo revise this dependencies
			 */
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer'    => false,
				'localize'     => array(),
				'conditionals' => tribe_callback( 'gutenberg.tickets.editor', 'current_type_support_tickets' ),
				'priority'     => 202,
			)
		);

		tribe_asset(
			$plugin,
			'tribe-tickets-gutenberg-blocks',
			'app/blocks.js',
			/**
			 * @todo revise this dependencies
			 */
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer'    => false,
				'localize'     => array(),
				'conditionals' => tribe_callback( 'gutenberg.tickets.editor', 'current_type_support_tickets' ),
				'priority'     => 203,
			)
		);

		tribe_asset(
			$plugin,
			'tribe-tickets-gutenberg-blocks-styles',
			'app/blocks.css',
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer'    => false,
				'localize'     => array(),
				'conditionals' => tribe_callback( 'gutenberg.tickets.editor', 'current_type_support_tickets' ),
				'priority'     => 15,
			)
		);
	}
}
