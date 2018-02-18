<?php
class Tribe__Events_Gutenberg__Blocks__Event_Subtitle
extends Tribe__Events_Gutenberg__Blocks__Abstract {

	/**
	 * Which is the name/slug of this block
	 *
	 * @since  TBD
	 *
	 * @return string
	 */
	public function name() {
		return 'tribe/event-subtitle';
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
		return 'Event Subtitle';
	}

	/**
	 * Sends a valid JSON response to the AJAX request for the block contents
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function ajax() {
		$data = $this->render();

		wp_send_json_success( $data );
	}
}