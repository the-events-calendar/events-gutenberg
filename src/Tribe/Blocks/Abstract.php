<?php

abstract class Tribe__Events_Gutenberg__Blocks__Abstract
implements Tribe__Events_Gutenberg__Blocks__Interface {

	/**
	 * Namespace for Blocks from tribe
	 *
	 * @since  0.1.1-alpha
	 *
	 * @var string
	 */
	private $namespace = 'tribe';

	/**
	 * Builds the name of the Block
	 *
	 * @since  0.1.1-alpha
	 *
	 * @return string
	 */
	public function name() {
		return $this->namespace . '/' . $this->slug();
	}

	/**
	 * Since we are dealing with a Dynamic type of Block we need a PHP method to render it
	 *
	 * @since  0.1.0-alpha
	 *
	 * @param  array $attributes
	 *
	 * @return string
	 */
	public function render( $attributes = array() ) {
		if ( version_compare( phpversion(), '5.4', '>=' ) ) {
			$json_string = json_encode( $attributes, JSON_PRETTY_PRINT );
		} else {
			$json_string = json_encode( $attributes );
		}

		return
		'<pre class="tribe-placeholder-text-' . $this->name() . '">' .
			'Block Name: ' . $this->name() . "\n" .
			'Block Attributes: ' . "\n" . $json_string .
		'</pre>';
	}

	/**
	 * Sends a valid JSON response to the AJAX request for the block contents
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return void
	 */
	public function ajax() {
		wp_send_json_error( esc_attr__( 'Problem loading the block, please remove this block to restart.', 'the-events-calendar' ) );
	}

	/**
	 * Fetches which ever is the plugin we are dealing with
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return mixed
	 */
	public function plugin() {
		return tribe( 'gutenberg' );
	}

	/**
	 * Does the registration for PHP rendering for the Block, important due to been
	 * an dynamic Block
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return void
	 */
	public function register() {
		$block_args = array(
			'render_callback' => array( $this, 'render' ),
		);

		register_block_type( $this->name(), $block_args );

		add_action( 'wp_ajax_' . $this->get_ajax_action(), array( $this, 'ajax' ) );

		$this->assets();
	}

	/**
	 * Fetches the name for the block we are working with and converts it to the
	 * correct `wp_ajax_{$action}` string for us to Hook
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return string
	 */
	public function get_ajax_action() {
		return str_replace( 'tribe/', 'tribe_editor_block_', $this->name() );
	}

	/**
	 * Used to include any Assets for the Block we are registering
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return void
	 */
	public function assets() {

	}
}

