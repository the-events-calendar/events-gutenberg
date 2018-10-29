<?php

class Tribe__Gutenberg__Events_Pro__Blocks__Additional_Field extends Tribe__Gutenberg__Common__Blocks__Abstract {
	
	private $slug = '';
	
	/**
	 * Tribe__Gutenberg__Events_Pro__Blocks__Additional_Field constructor.
	 *
	 * @since TBD
	 *
	 * @param $slug
	 */
	public function __construct( $slug ) {
		$this->slug = $slug;
	}
	
	/**
	 * Which is the name/slug of this block
	 *
	 * @since TBD
	 *
	 * @return string
	 */
	public function slug() {
		return $this->slug;
	}
	
	/**
	 * Does the registration for PHP rendering for the Block, important due to been
	 * an dynamic Block
	 *
	 * @since TBD
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
		$this->hook();
	}
	
	/**
	 * Set the default attributes of this block
	 *
	 * @since  TBD
	 *
	 * @return array
	 */
	public function default_attributes() {
		return array(
			'isPristine' => true,
			'type'       => 'text',
			'label'      => '',
			'metaKey'    => '',
			'output'     => '',
		);
	}
	
	/**
	 * Since we are dealing with a Dynamic type of Block we need a PHP method to render it
	 *
	 * @since  TBD
	 *
	 * @param  array $attributes
	 *
	 * @return string
	 */
	public function render( $attributes = array() ) {
		$args['attributes'] = $this->attributes( $attributes );
		// Add the rendering attributes into global context
		tribe( 'gutenberg.events.pro.frontend.template' )->add_template_globals( $args );
		
		$type     = isset( $attributes['type'] ) ? $attributes['type'] : 'text';
		$location = array( 'blocks', 'additional-fields', $type );
		
		return tribe( 'gutenberg.events.pro.frontend.template' )->template( $location, $args, false );
	}
	
	/**
	 * Register the Assets for when this block is active
	 *
	 * @since TBD
	 *
	 * @return void
	 */
	public function assets() {
	}
}
