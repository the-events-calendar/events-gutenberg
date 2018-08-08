<?php

class Tribe__Gutenberg__Events__Provider extends tad_DI52_ServiceProvider {

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

		// Should we continue loading?
		if (
			! tribe( 'gutenberg.common.editor' )->is_gutenberg_active()
			|| ! tribe( 'gutenberg.common.editor' )->is_blocks_editor_active()
		) {
			return;
		}

		$this->container->singleton( 'gutenberg.common.assets', 'Tribe__Gutenberg__Common__Assets', array( 'register' ) );

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
