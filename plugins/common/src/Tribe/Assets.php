<?php
/**
 * Events Gutenberg Assets
 *
 * @since 0.2.7-alpha
 */
class Tribe__Gutenberg__Common__Assets {
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

		$plugin = tribe( 'gutenberg.common.plugin' );

		tribe_asset(
			$plugin,
			'tribe-common-gutenberg-hoc',
			'hoc.js',
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
			'tribe-common-gutenberg-components',
			'components.js',
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
	}
}