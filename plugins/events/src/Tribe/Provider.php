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

		// Should we continue loading?
		if ( ! tribe( 'gutenberg.events.editor' )->is_gutenberg_active() || ! tribe( 'gutenberg.events.editor' )->is_blocks_editor_active() ) {
			return;
		}

		$this->container->singleton( 'gutenberg.events.meta', 'Tribe__Gutenberg__Events__Meta' );
		$this->container->singleton( 'gutenberg.events.settings', 'Tribe__Gutenberg__Events__Settings' );
		$this->container->singleton( 'gutenberg.events.i18n', 'Tribe__Gutenberg__Events__I18n', array( 'hook' ) );
		$this->container->singleton( 'gutenberg.events.template', 'Tribe__Gutenberg__Events__Template' );
		$this->container->singleton( 'gutenberg.events.template.overwrite', 'Tribe__Gutenberg__Events__Template__Overwrite', array( 'hook' ) );

		$this->container->singleton( 'gutenberg.events.compatibility.tickets', 'Tribe__Gutenberg__Events__Compatibility__Tickets', array( 'hook' ) );

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

		/**
		 * Lets load all compatibility related methods
		 */
		$this->load_compatibility_tickets();
	}

	/**
	 * Initializes the correct classes for when Tickets is active.
	 *
	 * @since  0.2.4-alpha
	 *
	 * @return bool
	 */
	private function load_compatibility_tickets() {
		if ( ! class_exists( 'Tribe__Tickets__Main' ) ) {
			return false;
		}

		tribe( 'gutenberg.events.compatibility.tickets' );
		return true;
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
		// Setup the Meta registration
		add_action( 'init', tribe_callback( 'gutenberg.events.meta', 'register' ), 15 );

		tribe( 'gutenberg.events.editor' )->hook();

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
