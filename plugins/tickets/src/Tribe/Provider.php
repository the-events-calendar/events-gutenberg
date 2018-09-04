<?php
/**
 * Register Event Tickets provider
 *
 * @since TBD
 */
class Tribe__Gutenberg__Tickets__Provider extends tad_DI52_ServiceProvider {
	/**
	 * Binds and sets up implementations.
	 *
	 * @since TBD
	 *
	 */
	public function register() {
		// Setup to check if gutenberg is active
		$this->container->singleton( 'gutenberg.tickets.plugin', 'Tribe__Gutenberg__Tickets__Plugin' );
		$this->container->singleton( 'gutenberg.tickets.editor', 'Tribe__Gutenberg__Tickets__Editor' );

		if (
			! tribe( 'gutenberg.common.editor' )->should_load_blocks()
			|| ! class_exists( 'Tribe__Tickets__Main' )
		) {
			return;
		}

		$this->container->singleton( 'gutenberg.tickets.template', 'Tribe__Gutenberg__Tickets__Template' );

		$this->container->singleton(
			'gutenberg.tickets.compatibility.tickets',
			'Tribe__Gutenberg__Tickets__Compatibility__Tickets',
			array( 'hook' )
		);

		$this->container->singleton(
			'gutenberg.tickets.assets', 'Tribe__Gutenberg__Tickets__Assets', array( 'register' )
		);

		$this->container->singleton( 'gutenberg.tickets.blocks.tickets', 'Tribe__Gutenberg__Tickets__Blocks__Tickets' );

		$this->hook();
		/**
		 * Lets load all compatibility related methods
		 *
		 * @todo remove once RSVP and tickets blocks are completed
		 */
		$this->load_compatibility_tickets();
	}

	/**
	 * Any hooking any class needs happen here.
	 *
	 * In place of delegating the hooking responsibility to the single classes they are all hooked here.
	 *
	 * @since TBD
	 *
	 */
	protected function hook() {
		// Initialize the correct Singleton
		tribe( 'gutenberg.tickets.assets' );
		// Register blocks
		add_action(
			'tribe_events_editor_register_blocks',
			tribe_callback( 'gutenberg.tickets.blocks.tickets', 'register' )
		);

		add_filter(
			'tribe_events_editor_default_template',
			tribe_callback( 'gutenberg.tickets.editor', 'add_tickets_block_in_editor' )
		);
	}

	/**
	 * Initializes the correct classes for when Tickets is active.
	 *
	 * @since  0.2.4-alpha
	 *
	 * @return bool
	 */
	private function load_compatibility_tickets() {
		tribe( 'gutenberg.tickets.compatibility.tickets' );
		return true;
	}

	/**
	 * Binds and sets up implementations at boot time.
	 *
	 * @since TBD
	 */
	public function boot() {}
}
