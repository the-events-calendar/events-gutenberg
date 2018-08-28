<?php
/**
 * Initialize Gutenberg editor blocks
 *
 * @since 0.2.7-alpha
 */
class Tribe__Gutenberg__Common__Editor {

	/**
	 * Meta key for flaging if a post is from classic editor
	 *
	 * @since  0.2.7-alpha
	 *
	 * @var string
	 */
	public $key_flag_classic_editor = '_tribe_is_classic_editor';

	/**
	 * Checks if we have Gutenberg Project online, only useful while
	 * its a external plugin
	 *
	 * @todo   Revise when Gutenberg is merged into core
	 *
	 * @since  0.2.7-alpha
	 *
	 * @return boolean
	 */
	public function is_gutenberg_active() {
		return function_exists( 'the_gutenberg_project' );
	}

	/**
	 * Checks if we have Editor Block active
	 *
	 * @since  0.2.7-alpha
	 *
	 * @return boolean
	 */
	public function is_blocks_editor_active() {
		return function_exists( 'register_block_type' ) && function_exists( 'unregister_block_type' );
	}

	/**
	 * Adds the required fields into the Events Post Type so that we can use Block Editor
	 *
	 * @since  0.2.7-alpha
	 *
	 * @param  array $args Arguments used to setup the Post Type
	 *
	 * @return array
	 */
	public function add_support( $args = array() ) {
		// Make sure we have the Support argument and it's an array
		if ( ! isset( $args['supports'] ) || ! is_array( $args['supports'] ) ) {
			$args['supports'] = array();
		}

		// Add Editor Support
		if ( ! in_array( 'editor', $args['supports'] ) ) {
			$args['supports'][] = 'editor';
		}

		return $args;
	}

	/**
	 * Adds the required fields into the Post Type so that we can the Rest API to update it
	 *
	 * @since  0.2.7-alpha
	 *
	 * @param  array $args Arguments used to setup the Post Type
	 *
	 * @return array
	 */
	public function add_rest_support( $args = array() ) {
		// Blocks Editor requires REST support
		$args['show_in_rest'] = true;

		// Make sure we have the Support argument and it's an array
		if ( ! isset( $args['supports'] ) || ! is_array( $args['supports'] ) ) {
			$args['supports'] = array();
		}

		if ( ! in_array( 'revisions', $args['supports'] ) ) {
			$args['supports'][] = 'revisions';
		}

		// Add Custom Fields (meta) Support
		if ( ! in_array( 'custom-fields', $args['supports'] ) ) {
			$args['supports'][] = 'custom-fields';
		}

		return $args;
	}

	/**
	 * Making sure we have correct post content for blocks after going into Gutenberg
	 *
	 * @since  0.2.7-alpha
	 *
	 * @param  int $post Which post we will migrate
	 *
	 * @return bool
	 */
	public function update_post_content_to_blocks( $post ) {
		$post = get_post( $post );
		$blocks = $this->get_classic_template();
		$content = array();

		foreach ( $blocks as $key => $block_param ) {
			$slug = reset( $block_param );

			if ( 'core/paragraph' === $slug ) {
				$content[] = '<!-- wp:freeform -->';
				$content[] = $post->post_content;
				$content[] = '<!-- /wp:freeform -->';
			} else {
				$content[] = '<!-- wp:' . $slug . ' /-->';
			}
		}

		$status = wp_update_post( array(
			'ID' => $post->ID,
			'post_content' => implode( "\n\r", $content ),
		) );

		return $status;
	}

	/**
	 * When initially loading a post in gutenberg flags if came from classic editor
	 *
	 * @since  0.2.7-alpha
	 *
	 * @return bool
	 */
	public function flag_post_from_classic_editor() {
		$post = tribe_get_request_var( 'post' );

		// Bail on empty post
		if ( empty( $post ) ) {
			return false;
		}

		// Bail on non numeric post
		if ( ! is_numeric( $post ) ) {
			return false;
		}

		$on_classic_editor_page = tribe_get_request_var( 'classic-editor', false );
		// Bail if in classic editor
		if ( $on_classic_editor_page ) {
			return false;
		}

		// Bail if not an event (might need to be removed later)
		if ( ! tribe_is_event( $post ) ) {
			return false;
		}

		// Bail if it already has Blocks
		if ( has_blocks( $post ) ) {
			return false;
		}

		$status = update_post_meta( $post, $this->key_flag_classic_editor, 1 );

		// Only trigger when we actually have the correct post
		if ( $status ) {
			/**
			 * Triggers
			 *
			 * @since  0.2.2-alpha
			 *
			 * @param  int $post Which post is getting updated
			 */
			do_action( 'tribe_blocks_editor_flag_post_classic_editor', $post );
		}

		return $status;
	}

	/**
	 * Check if post is from classic editor
	 *
	 * @since  0.2.7-alpha
	 *
	 * @param int|WP_Post $post
	 *
	 * @return bool
	 */
	public function post_is_from_classic_editor( $post ) {
		if ( ! $post instanceof WP_Post ) {
			$post = get_post( $post );
		}

		if ( empty( $post ) ) {
			return false;
		}

		if ( ! $post instanceof WP_Post ) {
			return false;
		}

		return tribe_is_truthy( get_post_meta( $post->ID, $this->key_flag_classic_editor, true ) );
	}
}
