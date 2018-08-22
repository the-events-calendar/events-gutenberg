<?php

class Tribe__Gutenberg__Events_Pro__Provider extends tad_DI52_ServiceProvider {

	/**
	 * Binds and sets up implementations.
	 *
	 * @since 0.2.7-alpha
	 *
	 */
	public function register() {
		// Setup to check if gutenberg is active
		$this->container->singleton( 'gutenberg.events_pro.plugin', 'Tribe__Gutenberg__Events_Pro__Plugin' );
		$this->container->singleton( 'gutenberg.events_pro.editor', 'Tribe__Gutenberg__Events_Pro__Editor' );

		// Should we continue loading?
		if (
			! tribe( 'gutenberg.events_pro.editor' )->is_gutenberg_active()
			|| ! tribe( 'gutenberg.events_pro.editor' )->is_blocks_editor_active()
		) {
			return;
		}

		$this->container->singleton( 'gutenberg.events_pro.assets', 'Tribe__Gutenberg__Events_Pro__Assets', array( 'register' ) );

		$this->hook();

		// Initialize the correct Singletons
		tribe( 'gutenberg.events_pro.assets' );
	}

	/**
	 * Any hooking any class needs happen here.
	 *
	 * In place of delegating the hooking responsibility to the single classes they are all hooked here.
	 *
	 * @since 0.2.7-alpha
	 *
	 */
	protected function hook() {

	}

	/**
	 * Binds and sets up implementations at boot time.
	 *
	 * @since 0.2.7-alpha
	 */
	public function boot() {
		// no ops
	}
}
