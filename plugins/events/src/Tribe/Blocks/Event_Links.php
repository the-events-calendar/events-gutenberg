<?php
class Tribe__Gutenberg__Events__Blocks__Event_Links
extends Tribe__Gutenberg__Events__Blocks__Abstract {

	/**
	 * Which is the name/slug of this block
	 *
	 * @since  0.1.1-alpha
	 *
	 * @return string
	 */
	public function slug() {
		return 'event-links';
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
			'googleCalendarLabel' => esc_html__( 'Google Calendar', 'events-gutenberg' ),
			'iCalLabel'           => esc_html__( 'iCal Export', 'events-gutenberg' ),
			'hasiCal'             => true,
			'hasGoogleCalendar'   => true,
		);

		return $defaults;
	}

	/**
	 * Since we are dealing with a Dynamic type of Block we need a PHP method to render it
	 *
	 * @since  0.1.1-alpha
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
}