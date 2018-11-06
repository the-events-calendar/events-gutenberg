<?php
/**
 * Plugin Name: The Events Calendar: Gutenberg Extension
 * Description: This plugin allows you to use The Events Calendar with the Gutenberg development plugin's block editor.
 * Version: 0.3.4-alpha
 * Author: Modern Tribe, Inc.
 * Author URI: https://github.com/moderntribe/events-gutenberg
 * License: GPLv2 or later
 */

defined( 'WPINC' ) || die;

class Tribe__Gutenberg__Plugin {

	/**
	 * The semantic version number of this extension; should always match the plugin header.
	 *
	 * @since  0.1.0-alpha
	 */
	const VERSION = '0.3.4-alpha';

	/**
	 * Each plugin required by this extension
	 *
	 * @since  0.1.0-alpha
	 *
	 * @var array Plugins are listed in 'main class' => 'minimum version #' format
	 */
	public $plugins_required = array(
		'Tribe__Events__Main' => '4.6.13',
	);

	/**
	 * Where in the themes we will look for templates
	 *
	 * @since  0.3.0-alpha
	 *
	 * @var string
	 */
	public $template_namespace = 'gutenberg';

	/**
	 * The constructor; delays initializing the extension until all other plugins are loaded.
	 *
	 * @since  0.1.0-alpha
	 */
	public function __construct() {
		add_action( 'plugins_loaded', array( $this, 'load' ), 100 );

		// Setup the Condiguration file
		$this->plugin_file = __FILE__;
		$this->plugin_path = trailingslashit( dirname( $this->plugin_file ) );
		$this->plugin_dir  = trailingslashit( basename( $this->plugin_path ) );
		$this->plugin_url  = plugins_url( $this->plugin_dir );
		// todo: remove after migration of the extension
		$this->extension_url = trailingslashit( $this->plugin_url . 'plugins/events' );
	}

	/**
	 * Extension hooks and initialization; exits if the extension is not authorized by Tribe Common to run.
	 *
	 * @since  0.1.0-alpha
	 */
	public function load() {

		// Exit early if our framework is saying this extension should not run.
		if ( ! function_exists( 'tribe_register_plugin' ) ) {
			return;
		}

		// Bail when the Required versions are not avail
		if ( ! tribe_register_plugin( $this->plugin_file, __CLASS__, self::VERSION, $this->plugins_required ) ) {
			return;
		}

		// Register this a the Base for the Gutenberg plugin
		tribe_singleton( 'gutenberg', $this );

		// After loading unset on the global scope
		unset( $GLOBALS['__tribe_events_gutenberg_plugin'] );

		// Setup the Autoloading of classes
		$this->autoloading();

		// Register the Service Provider
		tribe_register_provider( 'Tribe__Gutenberg__Common__Provider' );
		tribe_register_provider( 'Tribe__Gutenberg__Events__Provider' );
		tribe_register_provider( 'Tribe__Gutenberg__Events_Pro__Provider' );
		tribe_register_provider( 'Tribe__Gutenberg__Tickets__Provider' );
		tribe_register_provider( 'Tribe__Gutenberg__Tickets__REST__V1__Service_Provider' );
	}

	/**
	 * To allow easier usage of classes on our files we have a AutoLoader that will match
	 * class names to it's required file inclusion into the Request.
	 *
	 * @since  0.1.0-alpha
	 *
	 * @return void
	 */
	protected function autoloading() {
		$prefixes = array(
			'Tribe__Gutenberg__Common__' => $this->plugin_path . 'plugins/common/src/Tribe',
			'Tribe__Gutenberg__Events__' => $this->plugin_path . 'plugins/events/src/Tribe',
			'Tribe__Gutenberg__Events_Pro__' => $this->plugin_path . 'plugins/events-pro/src/Tribe',
			'Tribe__Gutenberg__Tickets__' => $this->plugin_path . 'plugins/tickets/src/Tribe',
			'Tribe__Gutenberg__Tickets_Plus__' => $this->plugin_path . 'plugins/tickets-plus/src/Tribe',
		);

		$autoloader = Tribe__Autoloader::instance();
		$autoloader->register_prefixes( $prefixes );

		// deprecated classes are registered in a class to path fashion
		foreach ( glob( $this->plugin_path . 'src/deprecated/*.php' ) as $file ) {
			$class_name = str_replace( '.php', '', basename( $file ) );
			$autoloader->register_class( $class_name, $file );
		}

		$autoloader->register_autoloader();
	}
}

// This will be unset later on `plugins_loaded`
$GLOBALS['__tribe_events_gutenberg_plugin'] = new Tribe__Gutenberg__Plugin();
