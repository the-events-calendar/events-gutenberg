<?php
/**
 * Initialize template overwrite for block single pages
 *
 * @since 0.1.1-alpha
 */
class Tribe__Gutenberg__Events__Template__Overwrite {

	/**
	 * Hook into the Events Template single page to allow Blocks to be properly reordered
	 *
	 * @since 0.1.1-alpha
	 *
	 * @return void
	 */
	public function hook() {
		add_filter( 'tribe_events_template_single-event.php', array( $this, 'silence' ) );
		add_filter( 'tribe_events_before_view', array( $this, 'include_blocks' ), 1, PHP_INT_MAX );
	}

	/**
	 * Gets the file path in Gutenberg Ext
	 *
 	 * @since 0.1.1-alpha
	 *
	 * @param  array|string  $slug  Which file we want to include
	 *
	 * @return string
	 */
	public function get_path( $slug ) {
		$slug = (array) $slug;

		return tribe( 'gutenberg' )->plugin_path . 'src/views/' . implode( '/', array_map( 'sanitize_file_name', $slug ) ) . '.php';
	}

	/**
	 * Silence the actual templating and lets use an action to prevent Old Stuff to have any sort of interactions
	 * with what we are constructing here.
	 *
	 * @since 0.1.1-alpha
	 *
	 * @param string $file Which file would be loaded
	 *
	 * @return string
	 */
	public function silence( $file ) {
		$post_id = get_the_ID();

		// Prevent overwrite for posts that doens't have Blocks
		if ( ! has_blocks( $post_id ) ) {
			return $file;
		}

		return $this->get_path( 'silence' );
	}

	/**
	 * After `tribe_events_before_view` we will include the blocks template for Single Events
	 *
	 * @since 0.1.1-alpha
	 *
	 * @param string $silence Unused file path, since it's always the same for Blocks editor
	 *
	 * @return string
	 */
	public function include_blocks( $silence ) {
		// Prevent printing anything for events that don't have silence
		if ( $silence !== $this->get_path( 'silence' ) ) {
			return false;
		}

		$post_id = get_the_ID();

		// Prevent printing for posts that doens't have Blocks
		if ( ! has_blocks( $post_id ) ) {
			return $file;
		}

		$args = array(
			'post_id' => $post_id,
			'post' => get_post( $post_id ),
		);

		// Set globals to allow better usage of render method for each block
		tribe( 'gutenberg.events.template' )->add_template_globals( $args );

		return tribe( 'gutenberg.events.template' )->template( 'single-event' );
	}

}

