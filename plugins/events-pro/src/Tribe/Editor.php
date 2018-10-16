<?php

/**
 * Class Tribe__Gutenberg__Events_Pro__Editor
 *
 * @since TBD
 */
class Tribe__Gutenberg__Events_Pro__Editor extends Tribe__Gutenberg__Common__Editor {
	
	/**
	 * Attach hooks into the editor
	 *
	 * @since TBD
	 */
	public function hook() {
		add_action( 'tribe_events_pro_after_custom_field_content', array( $this, 'after_custom_field_content' ), 10, 3 );
		add_filter( 'tribe-events-save-options', array( $this, 'save_custom_field_values' ) );
		$this->assets();
	}
	
	/**
	 * Attach a new input after each custom field input is rendered, the value is being stored in a hidden field and
	 * creates a fake <button> to have A11y benefits like focus and so on. The "fake checkbox" is used as we need to send
	 * to the request the value of this operation regardless of is true / false so using a native checkbox send only
	 * the value when the checkbox is mark as "checked", with this approach the "hidden" field is always being send into
	 * the request regardless of the state of it so we can have a valid reference all the time to the value of each custom
	 * field.
	 *
	 * @since TBD
	 *
	 * @param $ticket
	 * @param $index
	 * @param $count
	 *
	 * @return mixed
	 */
	public function after_custom_field_content( $ticket, $index, $count ) {
		$value = isset( $ticket['gutenberg_editor'] ) && $ticket['gutenberg_editor'] ? '1' : '0';
		$args  = array(
			'input_id'   => 'gutenberg_editor_' . esc_attr( $index ),
			'value'      => $value,
			'index'      => $index,
			'class_name' => $value === '1' ? 'tribe-custom-field-gutenberg-checkbox--checked' : '',
			'count'      => $count,
		);
		
		$html = tribe( 'gutenberg.events.pro.admin.template' )->template( array( 'custom-fields', 'gutenberg' ), $args, false );
		echo $html;
	}
	
	/**
	 * Hook into the options before they are stored in the DB, and access the variable used to hold the reference
	 * to the hidden fields, from there we just need to make sure if the fields has been checked or not and update the
	 * custom fields value in the options before they are stored in the DB.
	 *
	 * @since TBD
	 *
	 * @param $options
	 *
	 * @return mixed
	 */
	public function save_custom_field_values( $options ) {
		if ( empty( $options['custom-fields'] ) || ! is_array( $options['custom-fields'] ) ) {
			return $options;
		}
		$gutenberg_fields = $this->gutenberg_custom_fields_canonical_keys(
			tribe_get_request_var( 'custom-field-gutenberg-editor', array() )
		);
		foreach ( $options['custom-fields'] as $index => $field ) {
			$checked = isset( $gutenberg_fields[ $index ] ) && '1' === $gutenberg_fields[ $index ];
			$options['custom-fields'][ $index ]['gutenberg_editor'] = $checked;
		}
		return $options;
	}
	
	/**
	 * Make sure the keys of the gutenberg custom fields match the same logic as the custom fields, this logic is
	 * basically if the key or index of a gutenberg field has `_` at the start it means it belongs to an existing
	 * meta field and in order to have the right key we just need to remove the '_'  from the start on the other hand
	 * if does not have one it means it's a new created field which requires to grab the highest max value available
	 * at this point and increase from there every time this scenario is presented.
	 *
	 * @since TBD
	 *
	 * @param array $gutenberg_custom_fields An array with the gutenberg custom fields
	 *
	 * @return array An array with only number as index representing the location of the custom field block
	 */
	public function gutenberg_custom_fields_canonical_keys( $gutenberg_custom_fields ) {
		$max_index = $this->get_custom_fields_max_index();
		$mapped = array();
		foreach ( $gutenberg_custom_fields as $index => $field ) {
			if ( 0 === strpos( $index, '_' ) ) {
				$assigned_index = substr( $index, 1 );
			} else {
				$assigned_index = ++$max_index;
			}
			$mapped[ $assigned_index ] = $field;
		}
		return $mapped;
    }
	
	/**
	 * Return the highest number for the custom fields, this value is created and updated by PRO. Fallback to a zero
	 * value if is not present on the settings or there are no custom fields present yet.
	 *
	 * @since TBD
	 *
	 * @return int
	 */
	private function get_custom_fields_max_index() {
		$current_options = Tribe__Settings_Manager::get_options();;
		if ( isset( $current_options['custom-fields-max-index'] ) ) {
			return $current_options['custom-fields-max-index'];
		} else if ( isset( $current_options['custom-fields'] ) ) {
			return count( $current_options['custom-fields'] ) + 1;
		} else {
			return 0;
		}
	}
	
	/**
	 * Register and Load styles and JS behavior into the admin views
	 *
	 * @since TBD
	 */
	public function assets() {
		$events_pro = tribe( 'gutenberg.events-pro.plugin' );
		
		tribe_asset(
			$events_pro,
			'gutenberg-events-pro-admin-additional-fields-admin-style',
			'admin/custom-fields.css',
			array(),
			'admin_enqueue_scripts',
			array(
				'conditionals' => array( $this, 'maybe_load_custom_field_assets' ),
			)
		);
		
		tribe_asset(
			$events_pro,
			'gutenberg-events-pro-admin-additional-fields-behavior',
			'admin-custom-fields.js',
			array(),
			'admin_enqueue_scripts',
			array(
				'conditionals' => array( $this, 'maybe_load_custom_field_assets' ),
			)
		);
	}
	
	/**
	 * Callback used to load the assets only when the Additional Fields tab is selected
	 *
	 * @since TBD
	 *
	 * @return bool
	 */
	public function maybe_load_custom_field_assets() {
		$screen = get_current_screen();
		if ( $screen === null || $screen->id !== 'tribe_events_page_tribe-common' ) {
			return false;
		}
		$tab = tribe_get_request_var( 'tab' );
		return 'additional-fields' === $tab;
	}
}
