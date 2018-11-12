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
		if (
			! tribe( 'gutenberg.common.editor' )->should_load_blocks()
			|| ! class_exists( 'Tribe__Events__Pro__Main' )
		) {
			return;
		}

		$this->container->singleton( 'gutenberg.events.pro.editor', 'Tribe__Gutenberg__Events_Pro__Editor' );
		$this->container->singleton( 'gutenberg.events.pro.fields', 'Tribe__Gutenberg__Events_Pro__Additional_Fields' );
		$this->container->singleton( 'gutenberg.events.pro.frontend.template', 'Tribe__Gutenberg__Events_Pro__Template__Frontend' );
		$this->container->singleton( 'gutenberg.events.pro.admin.template', 'Tribe__Gutenberg__Events_Pro__Template__Admin' );
		$this->container->singleton( 'gutenberg.events.pro.blocks.fields', 'Tribe__Gutenberg__Events_Pro__Blocks__Additional_Fields' );
		$this->container->singleton(
			'gutenberg.events-pro.assets', 'Tribe__Gutenberg__Events_Pro__Assets', array( 'register' )
		);

		$this->container->singleton( 'gutenberg.events-pro.meta', 'Tribe__Gutenberg__Events_Pro__Meta' );
		$this->container->singleton( 'gutenberg.events-pro.recurrence.provider', 'Tribe__Gutenberg__Events_Pro__Recurrence__Provider' );
		$this->container->singleton( 'gutenberg.events-pro.recurrence.queue-status', 'Tribe__Gutenberg__Events_Pro__Recurrence__Queue_Status' );
		$this->container->singleton( 'gutenberg.events-pro.recurrence.blocks-meta', 'Tribe__Gutenberg__Events_Pro__Recurrence__Blocks_Meta' );

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

		tribe( 'gutenberg.events-pro.recurrence.provider' )->hook();
		tribe( 'gutenberg.events-pro.recurrence.queue-status' )->hook();
		add_action( 'init', tribe_callback( 'gutenberg.events-pro.meta', 'register' ), 15 );

		tribe( 'gutenberg.events.pro.editor' )->hook();
		// Setup the Meta registration
		add_action(
			'tribe_events_editor_register_blocks',
			tribe_callback( 'gutenberg.events.pro.blocks.fields', 'register' )
		);
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
