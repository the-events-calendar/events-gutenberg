<?php
/**
 * Events Gutenberg Assets
 *
 * @since 0.2.7-alpha
 */
class Tribe__Gutenberg__Events_Pro__Assets {
	/**
	 *
	 * @since 0.2.7-alpha
	 *
	 * @return void
	 */
	public function hook() {

	}

	/**
	 * Registers and Enqueues the assets
	 *
	 * @since 0.2.7-alpha
	 *
	 * @param string $key Which key we are checking against
	 *
	 * @return boolean
	 */
	public function register() {
		$plugin = tribe( 'gutenberg.events-pro.plugin' );

		tribe_asset(
			$plugin,
			'tribe-pro-gutenberg-blocks',
			'blocks.js',
			/**
			 * @todo revise this dependencies
			 */
			array( 'react', 'react-dom', 'wp-components', 'wp-api', 'wp-api-request', 'wp-blocks', 'wp-i18n', 'wp-element' ),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => false,
				'localize'  => array(),
			)
		);

		tribe_asset(
			$plugin,
			'tribe-pro-gutenberg-elements',
			'elements.js',
			/**
			 * @todo revise this dependencies
			 */
			array( 'react', 'react-dom', 'wp-components', 'wp-api', 'wp-api-request', 'wp-blocks', 'wp-i18n', 'wp-element' ),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => false,
				'localize'  => array(),
			)
		);

		tribe_asset(
			$plugin,
			'tribe-pro-gutenberg-element',
			'elements.css',
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => false,
				'localize'  => array(),
			)
		);
	}
}