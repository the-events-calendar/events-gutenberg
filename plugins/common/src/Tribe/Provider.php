<?php

class Tribe__Gutenberg__Common__Provider extends tad_DI52_ServiceProvider {

	/**
	 * Binds and sets up implementations.
	 *
	 * @since 0.2.7-alpha
	 *
	 */
	public function register() {
		// Setup to check if gutenberg is active
		$this->container->singleton( 'gutenberg.common.plugin', 'Tribe__Gutenberg__Common__Plugin' );
		$this->container->singleton( 'gutenberg.common.editor', 'Tribe__Gutenberg__Common__Editor' );
		$this->container->singleton( 'gutenberg.common.utils', 'Tribe__Gutenberg__Common__Utils' );

		if ( ! tribe( 'gutenberg.common.editor' )->should_load_blocks() ) {
			return;
		}

		$this->container->singleton( 'gutenberg.common.assets', 'Tribe__Gutenberg__Common__Assets', array( 'register' ) );

		$this->hook();

		// Initialize the correct Singletons
		tribe( 'gutenberg.common.assets' );
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
