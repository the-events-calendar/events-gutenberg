<?php
class Tribe__Events_Gutenberg__Blocks__Event_Website
extends Tribe__Events_Gutenberg__Blocks__Abstract {

	/**
	 * Which is the name/slug of this block
	 *
	 * @since  0.2.1-alpha
	 *
	 * @return string
	 */
	public function slug() {
		return 'event-website';
	}

	/**
	 * Set the default attributes of this block
	 *
	 * @since  TBD
	 *
	 * @return string
	 */
	public function default_attributes() {

		$defaults = array(
			'urlLabel' => esc_html__( 'Add Button Text', 'events-gutenberg' ),
			'href'     => tribe_get_event_website_url(),
		);

		return $defaults;
	}

	/**
	 * Since we are dealing with a Dynamic type of Block we need a PHP method to render it
	 *
	 * @since  0.2.1-alpha
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