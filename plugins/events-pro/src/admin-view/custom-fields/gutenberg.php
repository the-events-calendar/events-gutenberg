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
