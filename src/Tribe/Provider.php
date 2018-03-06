<?php
class Tribe__Events_Gutenberg__Provider extends tad_DI52_ServiceProvider {

	/**
	 * Binds and sets up implementations.
	 *
	 * @since  0.1.0-alpha.1
	 *
	 */
	public function register() {
		$this->container->singleton( 'gutenberg', $GLOBALS['__tribe_events_gutenberg_plugin'] );

		// Set the Plugin class and Unset the global variable
		unset( $GLOBALS['__tribe_events_gutenberg_plugin'] );

		// Setup to check if gutenberg is active
		$this->container->singleton( 'gutenberg.editor', 'Tribe__Events_Gutenberg__Editor' );

		// Should we continue loading?
		if ( ! tribe( 'gutenberg.editor' )->is_gutenberg_active() || ! tribe( 'gutenberg.editor' )->is_blocks_editor_active() ) {
			return;
		}

		$this->container->singleton( 'gutenberg.meta', 'Tribe__Events_Gutenberg__Meta' );
		$this->container->singleton( 'gutenberg.template', 'Tribe__Events_Gutenberg__Template' );
		$this->container->singleton( 'gutenberg.template.overwrite', 'Tribe__Events_Gutenberg__Template__Overwrite', array( 'hook' ) );

		$this->container->singleton( 'gutenberg.blocks.event-subtitle', 'Tribe__Events_Gutenberg__Blocks__Event_Subtitle' );
		$this->container->singleton( 'gutenberg.blocks.event-details', 'Tribe__Events_Gutenberg__Blocks__Event_Details' );
		$this->container->singleton( 'gutenberg.blocks.event-venue', 'Tribe__Events_Gutenberg__Blocks__Event_Venue' );
		$this->container->singleton( 'gutenberg.blocks.event-links', 'Tribe__Events_Gutenberg__Blocks__Event_Links' );

		$this->hook();

		/**
		 * Call all the Singletons that need to be setup/hooked
		 */
		tribe( 'gutenberg.template.overwrite' );

		/**
		 * @todo  Remove this later on
		 */
		tribe( 'gutenberg.editor' )->assets();
	}

	/**
	 * Any hooking any class needs happen here.
	 *
	 * In place of delegating the hooking responsibility to the single classes they are all hooked here.
	 *
	 * @since  0.1.0-alpha.1
	 *
	 */
	protected function hook() {
		add_filter( 'tribe_events_register_event_type_args', tribe_callback( 'gutenberg.editor', 'add_support' ) );
		add_filter( 'tribe_events_register_event_type_args', tribe_callback( 'gutenberg.editor', 'add_template_blocks' ) );

		// Add Rest API support
		add_filter( 'tribe_events_register_event_type_args', tribe_callback( 'gutenberg.editor', 'add_rest_support' ) );
		add_filter( 'tribe_events_register_venue_type_args', tribe_callback( 'gutenberg.editor', 'add_rest_support' ) );
		add_filter( 'tribe_events_register_organizer_type_args', tribe_callback( 'gutenberg.editor', 'add_rest_support' ) );

		// Setup the Meta registration
		add_action( 'init', tribe_callback( 'gutenberg.meta', 'register' ), 25 );

		// Setup the registration of Blocks
		add_action( 'init', tribe_callback( 'gutenberg.editor', 'register_blocks' ), 20 );

		// Register blocks to own own action
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.blocks.event-subtitle', 'register' ) );
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.blocks.event-details', 'register' ) );
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.blocks.event-venue', 'register' ) );
		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.blocks.event-links', 'register' ) );
	}

	/**
	 * Binds and sets up implementations at boot time.
	 *
	 * @since  0.1.0-alpha.1
	 */
	public function boot() {
		// no ops
	}
}
