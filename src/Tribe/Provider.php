<?php
class Tribe__Events_Gutenberg__Provider extends tad_DI52_ServiceProvider {

	/**
	 * Binds and sets up implementations.
	 *
	 * @since  TBD
	 *
	 */
	public function register() {
		$this->container->singleton( 'gutenberg', $GLOBALS['__tribe_events_gutenberg_plugin'] );

		// Set the Plugin class and Unset the global variable
		unset( $GLOBALS['__tribe_events_gutenberg_plugin'] );

		// Setup to check if gutenberg is active
		$this->container->singleton( 'gutenberg.editor', 'Tribe__Events_Gutenberg__Editor' );

		// Should we continue loading?
		if ( ! tribe( 'gutenberg.editor' )->is_gutenberg_active() ) {
			return;
		}

		$this->container->singleton( 'gutenberg.meta', 'Tribe__Events_Gutenberg__Meta' );

		$this->container->singleton( 'gutenberg.blocks.event-subtitle', 'Tribe__Events_Gutenberg__Blocks__Event_Subtitle' );
		$this->container->singleton( 'gutenberg.blocks.event-details', 'Tribe__Events_Gutenberg__Blocks__Event_Details' );

		$this->hook();

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
	 * @since  TBD
	 *
	 */
	protected function hook() {
		add_filter( 'tribe_events_register_event_type_args', tribe_callback( 'gutenberg.editor', 'add_support' ) );
		add_filter( 'tribe_events_register_event_type_args', tribe_callback( 'gutenberg.editor', 'add_template_blocks' ) );

		add_action( 'init', tribe_callback( 'gutenberg.editor', 'register_blocks' ), 20 );
		add_action( 'init', tribe_callback( 'gutenberg.meta', 'register' ), 25 );

		add_action( 'tribe_events_editor_register_blocks', tribe_callback( 'gutenberg.blocks.event-details', 'register' ) );
	}

	/**
	 * Binds and sets up implementations at boot time.
	 *
	 * @since  TBD
	 */
	public function boot() {
		// no ops
	}
}
