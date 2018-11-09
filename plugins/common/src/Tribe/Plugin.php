<?php
/**
 * Simple file to correctly have the plugin assets be loaded
 *
 * @todo  Remove once merged into actual Plugin
 */
class Tribe__Gutenberg__Common__Plugin {

	/**
	 * The semantic version number of this extension; should always match the plugin header.
	 *
	 * @since  0.2.7-alpha
	 */
	const VERSION = Tribe__Gutenberg__Plugin::VERSION;

	/**
	 * The constructor; delays initializing the extension until all other plugins are loaded.
	 *
	 * @since  0.2.7-alpha
	 */
	public function __construct() {
		// Setup the Condiguration file
		$this->plugin_file = str_replace( '/src/Tribe/', '/', __FILE__ );
		$this->plugin_path = trailingslashit( dirname( $this->plugin_file ) );
		$this->plugin_dir  = trailingslashit( basename( $this->plugin_path ) );
		$this->plugin_url  = plugins_url( $this->plugin_dir );
	}
	
	/**
	 * classic_editor_replace is function that is created by the plugin:
	 *
	 * - https://wordpress.org/plugins/classic-editor/
	 *
	 * @since TBD
	 *
	 * @return bool
	 */
	function is_classic_plugin_active() {
		return function_exists( 'classic_editor_replace' );
	}
	
	/**
	 * Check if the setting `'classic-editor-replace'` is set to `replace` that option means to
	 * replace the gutenberg editor with the classic editor
	 *
	 * @since TBD
	 *
	 * @return bool
	 */
	function is_classic_option_active() {
		return 'replace' === get_option( 'classic-editor-replace' );
	}
}
