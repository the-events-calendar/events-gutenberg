<?php
class Tribe__Events_Gutenberg__Blocks__Event_Links
extends Tribe__Events_Gutenberg__Blocks__Abstract {

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
		tribe( 'gutenberg.template' )->add_template_globals( $args );

		// We need to remove all filters before trying to render iCal Link on Gutenberg otherwise we hit an infinite Loop
		remove_all_filters( 'the_content' );

		return tribe( 'gutenberg.template' )->template( array( 'blocks', $this->slug() ), $args, false );
	}
}