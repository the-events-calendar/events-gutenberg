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
		$this->container->singleton( 'gutenberg.events-pro.plugin', 'Tribe__Gutenberg__Events_Pro__Plugin' );
		
		// Return if we shouldn't load blocks or Events Pro Plugin is active
		if ( ! tribe( 'gutenberg.common.editor' )->should_load_blocks()
		     || ! class_exists( 'Tribe__Events__Pro__Main' ) ) {
			return;
		}

		$this->container->singleton( 'gutenberg.events.pro.editor', 'Tribe__Gutenberg__Events_Pro__Editor' );

		$this->container->singleton(
			'gutenberg.events-pro.assets', 'Tribe__Gutenberg__Events_Pro__Assets', array( 'register' )
		);

		$this->hook();
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
		// Initialize the correct Singletons
		tribe( 'gutenberg.events-pro.assets' );
		tribe( 'gutenberg.events.pro.editor' )->hook();
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
