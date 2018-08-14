<?php
/**
 * Tickets block Setup
 *
 * @todo  Move into the Tickets folder
 */
class Tribe__Events_Gutenberg__Blocks__Tickets
extends Tribe__Events_Gutenberg__Blocks__Abstract {

	/**
	 * Which is the name/slug of this block
	 *
	 * @since  TBD
	 *
	 * @return string
	 */
	public function slug() {
		return 'tickets';
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
		tribe( 'gutenberg.template' )->add_template_globals( $args );

		return tribe( 'gutenberg.template' )->template( array( 'blocks', $this->slug() ), $args, false );
	}
}