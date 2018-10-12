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
		add_action( 'tribe_events_pro_after_custom_field_content',
			array( $this, 'after_custom_field_content' ),
			10,
			3
		);
		add_filter( 'tribe-events-save-options', array( $this, 'save_custom_field_values' ) );
		add_action( 'admin_print_styles', array( $this, 'admin_enqueue_styles' ) );
		add_action( 'admin_print_footer_scripts', array( $this, 'admin_print_scripts' ) );
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
	 */
	public function after_custom_field_content( $ticket, $index, $count ) {
		$input_id = 'gutenberg_editor_' . esc_attr( $index );
		$value    = isset( $ticket['gutenberg_editor'] ) && $ticket['gutenberg_editor'] ? '1' : '0';
		$class_name = $value === '1' ? 'tribe-custom-field-gutenberg-checkbox--checked' : '';
		?>
        <div class="tribe-field-row tribe-field-gutenberg-options">
            <label for="<?php echo esc_attr( $input_id ); ?>">
				<?php esc_html_e( 'Hide it in block Editor', 'tribe-events-calendar-pro' ); ?>
            </label>
            <button
                    class="tribe-custom-field-gutenberg-checkbox <?php echo esc_attr( $class_name ); ?>"
                    name="<?php echo esc_attr( $input_id ); ?>"
                    type="button"
                    data-value="<?php echo esc_attr( $value ); ?>">
            </button>
            <input
                    type="hidden"
                    id="<?php echo esc_attr( $input_id ); ?>"
                    name="custom-field-gutenberg-editor[<?php echo esc_attr( $index ); ?>]"
                    data-name-template="custom-field-gutenberg-editor"
                    data-count="<?php echo esc_attr( $count ); ?>"
                    value="<?php echo esc_attr( $value ); ?>"
            />
        </div>
		<?php
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
			$assigned_index = $index;
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
	 * Include styles used to style the admin elements added by the gutenberg extension on settings page or
     * admin screens other that the ones non related to blocks
	 *
	 * @since TBD
	 */
	public function admin_enqueue_styles() {
		/**
		 * @todo replace with real plugin template, once is moved out of the extension
		 */
		$directory   = 'plugins/events-pro/src/styles/admin.css';
		$plugins_url = plugins_url(
			trailingslashit( basename( tribe( 'gutenberg' )->plugin_path ) )
		);
		wp_enqueue_style(
			'gutenberg-pro-admin-css',
			$plugins_url . $directory,
			array(),
			apply_filters( 'tribe_events_pro_css_version', Tribe__Events__Pro__Main::VERSION )
		);
	}
	
	/**
	 * Attach JS behavior into the "fake checkbox" and into the "Add Another" button in order to reset and attach behaviors
     * into each "fake checkbox" as HTML inputs are recreated via JS on PRO side, also this allow to have a single JS logic
     * for all the fields instead of one per field.
	 *
	 * @since TBD
	 */
	public function admin_print_scripts() {
		?>
        <script type="text/javascript">
	        ( function() {
		        function toggleInput( input, isActive ) {
			        input.setAttribute( 'value', isActive ? '1' : '0' );
			        return input;
		        }

		        function toggleButton( button, isActive ) {
			        if ( isActive ) {
				        button.classList.remove( 'tribe-custom-field-gutenberg-checkbox--checked' );
			        } else {
				        button.classList.add( 'tribe-custom-field-gutenberg-checkbox--checked' );
			        }
			        return button;
		        }

		        function attachBehavior( isCreatingFields ) {
			        return function( button ) {
				        if ( button._attached ) {
					        return;
				        }
				        button._attached = true;
				        var input = button.parentNode.querySelector( 'input[type="hidden"]' );
				        if ( ! input ) {
					        return;
				        }
				        
				        // Reset input and button fields is is creating a new duplicate of the same field
				        if ( isCreatingFields ) {
				        	toggleInput( input, true );
				        	toggleButton( button, true );
                        }
				        
				        button.addEventListener( 'click', function() {
				        	var isActive = input.getAttribute( 'value' ) === '1';
				        	toggleInput( input, isActive );
				        	toggleButton( button, isActive );
				        } );
			        };
		        }

		        function init( isCreatingFields ) {
			        return function() {
				        [].slice
                          .call( document.querySelectorAll( '.tribe-custom-field-gutenberg-checkbox' ) )
                          .map( attachBehavior( isCreatingFields ) );
			        };
		        }

		        var addButton = document.querySelector( '.add-another-field.tribe-add-post.button' );
		        if ( addButton ) {
			        addButton.addEventListener( 'click', function() {
				        setTimeout( init( true ) );
			        } );
		        }
		        init( false )();
	        } )();
        </script>
		<?php
	}
}