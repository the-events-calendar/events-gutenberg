<?php
class Tribe__Gutenberg__Events__Blocks__Featured_Image
extends Tribe__Gutenberg__Events__Blocks__Abstract {

	/**
	 * Which is the name/slug of this block
	 *
	 * @since  0.2.2-alpha
	 *
	 * @return string
	 */
	public function slug() {
		return 'featured-image';
	}

	/**
	 * Since we are dealing with a Dynamic type of Block we need a PHP method to render it
	 *
	 * @since  0.2.2-alpha
	 *
	 * @param  array $attributes
	 *
	 * @return string
	 */
	public function render( $attributes = array() ) {
		$args['attributes'] = $this->attributes( $attributes );

		// Add the rendering attributes into global context
		tribe( 'gutenberg.events.template' )->add_template_globals( $args );

		return tribe( 'gutenberg.events.template' )->template( array( 'blocks', $this->slug() ), $args, false );
	}

	/**
	 * Register the Assets for when this block is active
	 *
	 * @since  0.2.8-alpha
	 *
	 * @return void
	 */
	public function assets() {
		tribe_asset(
			tribe( 'gutenberg.events.plugin' ),
			'tribe-events-block-' . $this->slug(),
			$this->slug() . '/frontend.css',
			array(),
			'wp_enqueue_scripts',
			array(
				'conditionals' => array( $this, 'has_block' ),
			)
		);
	}
}