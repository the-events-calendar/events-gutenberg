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
		// Should we continue loading?
		if (
			! tribe( 'gutenberg.events.editor' )->is_gutenberg_active()
			|| ! tribe( 'gutenberg.events.editor' )->is_blocks_editor_active()
		) {
			return;
		}
		$this->container->singleton(
			'gutenberg.events-tickets.assets', 'Tribe__Gutenberg__Tickets__Assets', array( 'register' )
		);
		$this->container->singleton(
			'gutenberg.tickets.blocks.tickets',
			'Tribe__Gutenberg__Tickets__Blocks__Tickets'
		);
		$this->hook();
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
		tribe( 'gutenberg.events-tickets.assets' );
	}

	/**
	 * Binds and sets up implementations at boot time.
	 *
	 * @since TBD
	 */
	public function boot() {}
}
