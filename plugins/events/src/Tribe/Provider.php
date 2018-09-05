<?php

class Tribe__Gutenberg__Events__Provider extends tad_DI52_ServiceProvider {

	/**
	 * Binds and sets up implementations.
	 *
	 * @since  0.1.0-alpha
	 *
	 */
	public function register() {
		// Setup to check if gutenberg is active
		$this->container->singleton( 'gutenberg.events.plugin', 'Tribe__Gutenberg__Events__Plugin' );
		$this->container->singleton( 'gutenberg.events.editor', 'Tribe__Gutenberg__Events__Editor' );

		if ( ! tribe( 'gutenberg.common.editor' )->should_load_blocks() ) {
			return;
		}

		$this->container->singleton( 'gutenberg.events.meta', 'Tribe__Gutenberg__Events__Meta' );
		$this->container->singleton( 'gutenberg.events.settings', 'Tribe__Gutenberg__Events__Settings' );
		$this->container->singleton( 'gutenberg.events.i18n', 'Tribe__Gutenberg__Events__I18n', array( 'hook' ) );
		$this->container->singleton( 'gutenberg.events.template', 'Tribe__Gutenberg__Events__Template' );
		$this->container->singleton( 'gutenberg.events.template.overwrite', 'Tribe__Gutenberg__Events__Template__Overwrite', array( 'hook' ) );

		$this->container->singleton( 'gutenberg.events.blocks.classic-event-details', 'Tribe__Gutenberg__Events__Blocks__Classic_Event_Details' );
		$this->container->singleton( 'gutenberg.events.blocks.event-datetime', 'Tribe__Gutenberg__Events__Blocks__Event_Datetime' );
		$this->container->singleton( 'gutenberg.events.blocks.event-venue', 'Tribe__Gutenberg__Events__Blocks__Event_Venue' );
		$this->container->singleton( 'gutenberg.events.blocks.event-organizer', 'Tribe__Gutenberg__Events__Blocks__Event_Organizer' );
		$this->container->singleton( 'gutenberg.events.blocks.event-links', 'Tribe__Gutenberg__Events__Blocks__Event_Links' );
		$this->container->singleton( 'gutenberg.events.blocks.event-price', 'Tribe__Gutenberg__Events__Blocks__Event_Price' );
		$this->container->singleton( 'gutenberg.events.blocks.event-category', 'Tribe__Gutenberg__Events__Blocks__Event_Category' );
		$this->container->singleton( 'gutenberg.events.blocks.event-tags', 'Tribe__Gutenberg__Events__Blocks__Event_Tags' );
		$this->container->singleton( 'gutenberg.events.blocks.event-website', 'Tribe__Gutenberg__Events__Blocks__Event_Website' );
		$this->container->singleton( 'gutenberg.events.blocks.featured-image', 'Tribe__Gutenberg__Events__Blocks__Featured_Image' );

		$this->hook();

		/**
		 * Call all the Singletons that need to be setup/hooked
		 */
		tribe( 'gutenberg.events.i18n' );
		tribe( 'gutenberg.events.template.overwrite' );
	}

	/**
	 * Any hooking any class needs happen here.
	 *
	 * In place of delegating the hooking responsibility to the single classes they are all hooked here.
	 *
	 * @since  0.1.0-alpha
	 *
	 */
	protected function hook() {
		add_filter( 'tribe_events_register_event_type_args', tribe_callback( 'gutenberg.events.editor', 'add_event_template_blocks' ) );
		add_filter( 'tribe_events_register_event_type_args', tribe_callback( 'gutenberg.events.editor', 'add_template_blocks' ) );

		// Add Rest API support
		add_filter( 'tribe_events_register_event_type_args', tribe_callback( 'gutenberg.events.editor', 'add_rest_support' ) );
		add_filter( 'tribe_events_register_venue_type_args', tribe_callback( 'gutenberg.events.editor', 'add_rest_support' ) );
		add_filter( 'tribe_events_register_organizer_type_args', tribe_callback( 'gutenberg.events.editor', 'add_rest_support' ) );

		// Remove assets that are not relevant for Gutenberg Editor
		add_action( 'wp_print_scripts', tribe_callback( 'gutenberg.events.editor', 'deregister_scripts' ) );

		// Setup the Meta registration
		add_action( 'init', tribe_callback( 'gutenberg.events.meta', 'register' ), 25 );

		// Setup the registration of Blocks
		add_action( 'init', tribe_callback( 'gutenberg.events.editor', 'register_blocks' ), 20 );
		// Load assets of the blocks
		add_action( 'admin_init', tribe_callback( 'gutenberg.events.editor', 'assets' ) );

		// Maybe add flag from classic editor
		add_action( 'init', tribe_callback( 'gutenberg.events.editor', 'flag_post_from_classic_editor' ), 0 );

		// Add Block Categories to Editor
		add_action( 'block_categories', tribe_callback( 'gutenberg.events.editor', 'block_categories' ), 10, 2 );

		// Update Post content to use blocks
		add_action( 'tribe_blocks_editor_flag_post_classic_editor', tribe_callback( 'gutenberg.events.editor', 'update_post_content_to_blocks' ) );

		// Register blocks to own own action
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.events.blocks.classic-event-details', 'register' ) );
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.events.blocks.event-datetime', 'register' ) );
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.events.blocks.event-venue', 'register' ) );
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.events.blocks.event-organizer', 'register' ) );
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.events.blocks.event-links', 'register' ) );
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.events.blocks.event-price', 'register' ) );
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.events.blocks.event-category', 'register' ) );
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.events.blocks.event-tags', 'register' ) );
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.events.blocks.event-website', 'register' ) );
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.events.blocks.featured-image', 'register' ) );
	}

	/**
	 * Binds and sets up implementations at boot time.
	 *
	 * @since  0.1.0-alpha
	 */
	public function boot() {
		// no ops
	}
}
