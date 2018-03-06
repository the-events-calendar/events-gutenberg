<?php
class Tribe__Events_Gutenberg__Blocks__Event_Venue
extends Tribe__Events_Gutenberg__Blocks__Abstract {

	/**
	 * Which is the name/slug of this block
	 *
	 * @since  0.1.0-alpha.2
	 *
	 * @return string
	 */
	public function slug() {
		return 'event-venue';
	}

	/**
	 * Since we are dealing with a Dynamic type of Block we need a PHP method to render it
	 *
	 * @since  0.1.0-alpha.1
	 *
	 * @param  array $attributes
	 *
	 * @return string
	 */
	public function render( $attributes = array() ) {
		$args['attributes'] = $attributes;
		return tribe( 'gutenberg.template' )->template( array( 'blocks', $this->slug() ), $args, false );
	}
}