<?php

/**
 * Register the required Meta fields for Blocks Editor API saving
 * Initialize Gutenberg Event Meta fields
 *
 * @since TBD
 */
class Tribe__Gutenberg__Events_Pro__Meta extends Tribe__Gutenberg__Common__Meta {
	/**
	 * Register the required Meta fields for good Gutenberg saving
	 *
	 * @since  TBD
	 *
	 * @return void
	 */
	public function register() {
		/** @var Tribe__Gutenberg__Events_Pro__Recurrence__Blocks_Meta $blocks_meta */
		$blocks_meta = tribe( 'gutenberg.events-pro.recurrence.blocks-meta' );
		register_meta( 'post', $blocks_meta->get_rules_key(), $this->text() );
		register_meta( 'post', $blocks_meta->get_exclusions_key(), $this->text() );
		$this->register_additional_fields();
		
		$this->hook();
	}
	
	/**
	 * Register the fields used by dynamic fields into the REST API
	 *
	 * @since TBD
	 */
	public function register_additional_fields() {
		$additional_fields = array_values( tribe_get_option( 'custom-fields', array() ) );
		foreach ( $additional_fields as $field ) {
			
			$has_fields = isset( $field['name'], $field['type'], $field['gutenberg_editor'] );
			if ( ! $has_fields ) {
				continue;
			}
			
			switch ( $field['type'] ) {
				case 'textarea':
					$args = $this->textarea();
					break;
				case 'url':
					$args = $this->url();
					break;
				case 'checkbox':
					$args = $this->text();
					register_meta( 'post', '_' . $field['name'], $this->text_array() );
					break;
				default:
					$args = $this->text();
					break;
			}
			register_meta( 'post', $field['name'], $args );
		}
	}
	
	/**
	 * Add filters into the Meta class
	 *
	 * @since TBD
	 */
	public function hook() {
		add_filter( 'get_post_metadata', array( $this, 'fake_blocks_response' ), 15, 4 );
		add_action( 'deleted_post_meta', array( $this, 'remove_recurrence_meta' ), 10, 3 );
		add_filter( 'tribe_events_pro_show_recurrence_meta_box', array( $this, 'remove_recurrence_classic_meta' ) );
		add_filter( 'tribe_events_pro_split_redirect_url', array( $this, 'split_series_link' ), 10, 2 );
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
	public function fake_blocks_response( $value, $post_id, $meta_key, $single ) {
		/** @var Tribe__Gutenberg__Events_Pro__Recurrence__Blocks_Meta $blocks_meta */
		$blocks_meta = tribe( 'gutenberg.events-pro.recurrence.blocks-meta' );
		$valid_keys  = array(
			$blocks_meta->get_exclusions_key(),
			$blocks_meta->get_rules_key(),
		);
		
		if ( ! in_array( $meta_key, $valid_keys ) ) {
			return $value;
		}
		
		$recurrence = get_post_meta( $post_id, '_EventRecurrence', true );
		$result     = $this->get_value( $post_id, $meta_key );
		if ( empty( $recurrence ) || ! empty( $result ) ) {
			return $value;
		}
		
		$keys = array(
			$blocks_meta->get_rules_key()      => 'rules',
			$blocks_meta->get_exclusions_key() => 'exclusions',
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
	
	/**
	 * Removes the meta keys that maps into the classic editor when the `_EventRecurrence` is
	 * removed.
	 *
	 * @since TBD
	 *
	 * @param $meta_id
	 * @param $object_id
	 * @param $meta_key
	 */
	public function remove_recurrence_meta( $meta_id, $object_id, $meta_key ) {
		if ( '_EventRecurrence' !== $meta_key ) {
			return;
		}
		/** @var Tribe__Gutenberg__Events_Pro__Recurrence__Blocks_Meta $blocks_meta */
		$blocks_meta = tribe( 'gutenberg.events-pro.recurrence.blocks-meta' );
		delete_post_meta( $object_id, $blocks_meta->get_rules_key() );
		delete_post_meta( $object_id, $blocks_meta->get_exclusions_key() );
	}
	
	/**
	 * Remove the recurrence meta box if classic-editor is set
	 *
	 * @since TBD
	 *
	 * @param $show_meta
	 *
	 * @return bool
	 */
	public function remove_recurrence_classic_meta( $show_meta ) {
		/** @var Tribe__Gutenberg__Common__Plugin $plugin */
		$plugin             = tribe( 'gutenberg.common.plugin' );
		$disabled_by_plugin = $plugin->is_classic_plugin_active() && $plugin->is_classic_option_active();
		$is_classic_editor  = tribe_get_request_var( 'classic-editor', null ) || $disabled_by_plugin;
		
		return $is_classic_editor === null ? false : $show_meta;
	}
	
	/**
	 * Redirect to classic editor if the event does not have any block on it
	 *
	 * @since TBD
	 *
	 * @param $url
	 * @param $post_id
	 *
	 * @return mixed
	 */
	public function split_series_link( $url, $post_id ) {
		$args = array();
		if ( ! has_blocks( absint( $post_id ) ) ) {
			$args = array( 'classic-editor' => '' );
		}
		
		return add_query_arg( $args, $url );
	}
}
