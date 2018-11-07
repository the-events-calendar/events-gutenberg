<?php

/**
 * Initialize Gutenberg Events Pro Meta fields
 *
 * @since TBD
 */
class Tribe__Gutenberg__Events_Pro__Meta {
	/**
	 * Register the required Meta fields for Blocks Editor API saving
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function register() {
		register_meta( 'post', '_tribe_blocks_recurrence_rules', tribe( 'gutenberg.events.meta' )->text() );
		register_meta( 'post', '_tribe_blocks_recurrence_exclusions', tribe( 'gutenberg.events.meta' )->text() );
		
		add_filter( 'get_post_metadata', array( $this, 'filter_going_fields' ), 15, 4 );
	}
	
	/**
	 * @since 0.3.0-alpha
	 *
	 * @param null|array|string $value The value get_metadata() should return a single metadata value, or an
	 *                                    array of values.
	 * @param int               $post_id Post ID.
	 * @param string            $meta_key Meta key.
	 * @param string|array      $single Meta value, or an array of values.
	 *
	 * @return array|null|string The attachment metadata value, array of values, or null.
	 */
	public function filter_going_fields( $value, $post_id, $meta_key, $single ) {
		$valid_keys = array(
			'_tribe_blocks_recurrence_rules',
			'_tribe_blocks_recurrence_exclusions',
		);
		
		if ( ! in_array( $meta_key, $valid_keys ) ) {
			return $value;
		}
		
		$recurrence = get_post_meta( $post_id, '_EventRecurrence', true );
		$result = $this->get_value( $post_id, $meta_key );
		if ( empty( $recurrence ) || ! empty( $result ) ) {
			return $value;
		}
		
		$keys = array(
			'_tribe_blocks_recurrence_rules'      => 'rules',
			'_tribe_blocks_recurrence_exclusions' => 'exclusions',
		);
		$key  = $keys[ $meta_key ];
		if ( empty( $recurrence[ $key ] ) ) {
			return $value;
		}
		
		$types = $recurrence[ $key ];
		$data  = array();
		foreach ( $types as $type ) {
			$blocks = new Tribe__Gutenberg__Events_Pro__Recurrence__Blocks( $type );
			$blocks->parse();
			$data[] = $blocks->get_parsed();
		}
		$encoded = json_encode( $data );
		return $single ? $encoded : array( $encoded );
	}
	
	/**
	 * Return the meta value of a post ID directly from the DB
	 *
	 * @since TBD
	 *
	 * @param int    $post_id
	 * @param string $meta_key
	 *
	 * @return mixed
	 */
	public function get_value( $post_id = 0, $meta_key = '' ) {
		global $wpdb;
		$query = "SELECT meta_value FROM $wpdb->postmeta WHERE post_id = %d AND meta_key = %s";
		
		return $wpdb->get_var( $wpdb->prepare( $query, $post_id, $meta_key ) );
	}
}
