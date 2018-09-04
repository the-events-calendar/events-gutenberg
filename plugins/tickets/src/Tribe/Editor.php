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
	 * @param array  $template  Array of all the templates used by default
	 * @param string $post_type The current post type
	 *
	 * @return array
	 */
	public function add_tickets_block_in_editor() {
		foreach ( $this->supported_types() as $post_type ) {
			$post_type_object = get_post_type_object( $post_type );
			if ( ! $post_type_object ) {
				var_dump( $post_type );
				continue;
			}
			$template = isset( $post_type->template )
				? (array) $post_type_object->template
				: array();
			$template[] = array( 'tribe/event-tickets' );
			$post_type_object->template = $template;
		}
	}

	/**
	 * Check if current admin page is post type `tribe_events`
	 *
	 * @since  0.2.2-alpha
	 *
	 * @param $post_type
	 * @return bool
	 */
	public function current_type_support_tickets( $post_type = null ) {
		$post_types = $this->supported_types();

		if ( ! is_null( $post_type ) ) {
			return in_array( $post_type, $post_types, true );
		}

		$is_valid_type = false;
		foreach ( $this->supported_types() as $post_type ) {
			$is_valid_type = Tribe__Admin__Helpers::instance()->is_post_type_screen( $post_type );
			// Don't operate on following types as current type is valid
			if ( $is_valid_type ) {
				return $is_valid_type;
			}
		}
		return $is_valid_type;
	}

	/**
	 * Return the supported post types for tickets
	 *
	 * @return array
	 */
	public function supported_types() {
		return (array) tribe_get_option( 'ticket-enabled-post-types', array() );
	}

	/**
	 * Add the event tickets category into the block categories
	 *
	 * @since TBD
	 *
	 * @param $categories
	 * @param $post
	 * @return array
	 */
	public function block_categories( $categories ) {
		if ( ! $this->current_type_support_tickets() ) {
			return $categories;
		}

		return array_merge(
			$categories,
			array(
				array(
					'slug' => 'tribe-tickets',
					'title' => __( 'Tickets Blocks', 'events-gutenberg' ),
				),
			)
		);
	}
}
