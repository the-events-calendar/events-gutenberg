<?php
/**
 * Initialize Gutenberg editor with specifics for the tickets plugin
 *
 * @since TBD
 */
class Tribe__Gutenberg__Tickets__Editor extends Tribe__Gutenberg__Common__Editor {
	/**
	 * Adds the ticket block into the editor
	 *
	 * @since  TBD
	 *
	 * @param  array   $template   Array of all the templates used by default
	 *
	 * @return array
	 */
	public function add_tickets_block_in_editor( $template ) {
		if ( is_array( $template ) ) {
			$template[] = array( 'tribe/event-tickets' );
		}
		return $template;
	}
}
