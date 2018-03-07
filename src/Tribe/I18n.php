<?php
/**
 * Include translations to Gutenberg Ext
 *
 * @since 0.1.0-alpha.2
 */
class Tribe__Events_Gutenberg__I18n {
	/**
	 * Hook into the required places to make it work
	 *
	 * @since  0.1.0-alpha.2
	 *
	 * @return void
	 */
	public function hook() {
		// add_action( 'admin_enqueue_scripts', array( $this, 'include_inline_script' ) );
	}

	/**
	 * Include the Inline Script with locale
	 *
	 * @since  0.1.0-alpha.2
	 *
	 * @return void
	 */
	public function include_inline_script( $value ) {
		// Prepare Jed locale data.
		$locale_data = gutenberg_get_jed_locale_data( 'the-events-calendar' );
		wp_add_inline_script(
			'wp-edit-post',
			'wp.i18n.setLocaleData( ' . json_encode( $locale_data ) . ' );',
			'before'
		);
	}
}