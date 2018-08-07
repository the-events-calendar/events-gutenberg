<?php
/**
 * Fetch the Tribe Settings to use on the JS side
 *
 * @since 0.1.1-alpha
 */
class Tribe__Events_Gutenberg__Settings {
	/**
	 * Hook into the required places to make it work
	 *
	 * @since  0.1.1-alpha
	 *
	 * @return void
	 */
	public function hook() {

	}

	/**
	 * Based on a set of rules determines if a Tribe Option is private or not
	 *
	 * @since  0.1.1-alpha
	 *
	 * @param string $key Which key we are checking against
	 *
	 * @return boolean
	 */
	public function is_private_option( $key ) {
		$unsafe_rules = array(
			'_token',
			'_key',
		);

		foreach ( $unsafe_rules as $rule ) {
			if ( preg_match( '/' . $rule . '/', $key ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Get all Public options of Tribe Options
	 *
	 * @since  0.1.1-alpha
	 *
	 * @todo   move the filtering into Core Tribe__Settings_Manager::get_options
	 *
	 * @return array
	 */
	public function get_options() {
		$raw_options = Tribe__Settings_Manager::get_options();
		$options = array();

		foreach ( $raw_options as $key => $option ) {
			if ( $this->is_private_option( $key ) ) {
				continue;
			}

			$options[ $key ] = tribe_get_option( $key );
		}

		return $options;
	}
}