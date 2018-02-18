<?php

/**
 * Initialize Gutenberg editor blocks and styles
 *
 * @since TBD
 */
class Tribe__Events_Gutenberg__Editor {
	/**
	 * Checks if we have Gutenberg Project online, only useful while
	 * its a external plugin
	 *
	 * @todo   Revise when Gutenberg is merged into core
	 *
	 * @since  TBD
	 *
	 * @return boolean
	 */
	public function is_gutenberg_active() {
		return function_exists( 'the_gutenberg_project' );
	}

	/**
	 * Adds the required fields into the Events Post Type so that we can use Block Editor
	 *
	 * @since  TBD
	 *
	 * @param  array $args Arguments used to setup the CPT
	 *
	 * @return array
	 */
	public function add_support( $args = array() ) {
		// Blocks Editor requires REST support
		$args['show_in_rest'] = true;

		// Make sure we have the Support argument and it's an array
		if ( ! isset( $args['supports'] ) || ! is_array( $args['supports'] ) ) {
			$args['supports'] = array();
		}

		// Add Editor Support
		if ( ! in_array( 'editor', $args['supports'] ) ) {
			$args['supports'][] = 'editor';
		}

		return $args;
	}

	/**
	 * Adds the required blocks into the Events Post Type
	 *
	 * @since  TBD
	 *
	 * @param  array $args Arguments used to setup the CPT template
	 *
	 * @return array
	 */
	public function add_template_blocks( $args = array() ) {
		$template = array();

		/**
		 * @todo Have a good method from the block class to em here
		 */
		$template[] = array( 'tribe/event-subtitle' );
		$template[] = array(
			'core/paragraph',
			array(
				'placeholder' => 'Add Description...',
			),
		);
		$template[] = array( 'tribe/event-details' );


		// Save into args
 		$args['template'] = $template;

 		return $args;
	}

	/**
	 * Prevents us from using `init` to register our own blocks, allows us to move
	 * it when the proper place shows up
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function register_blocks() {
		do_action( 'tribe_events_editor_register_blocks' );
	}

	/**
	 * @todo   Move this into the Block PHP files
	 * @return void
	 */
	public function assets() {
		$plugin = tribe( 'gutenberg' );

		tribe_asset(
			$plugin,
			'tribe-events-editor-blocks',
			'blocks.js',
			array( 'react', 'react-dom', 'wp-components', 'wp-api', 'wp-api-request', 'wp-blocks', 'wp-i18n', 'wp-element' ),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => false,
			)
		);

		tribe_asset(
			$plugin,
			'tribe-events-editor-elements',
			'elements.js',
			array( 'react', 'react-dom', 'wp-components', 'wp-api', 'wp-api-request', 'wp-blocks', 'wp-i18n', 'wp-element' ),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => false,
			)
		);

		tribe_asset(
			$plugin,
			'tribe-block-editor-element',
			'element.css',
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => false,
			)
		);

		tribe_asset(
			$plugin,
			'tribe-block-editor-blocks',
			'blocks.css',
			array(),
			'enqueue_block_editor_assets',
			array(
				'in_footer' => false,
			)
		);
	}
}

