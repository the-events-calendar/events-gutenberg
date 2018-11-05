<div class="tribe-field-row tribe-field-gutenberg-options">
	<label for="<?php echo esc_attr( $input_id ); ?>">
		<?php esc_html_e( 'Use in Block Editor', 'tribe-events-calendar-pro' ); ?>
	</label>
	<div class="tribe-field-wrap">
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
		<p class="tooltip description">
			<?php
			esc_html_e(
				'Include this field on all new events in the Gutenberg block editor',
				'tribe-events-calendar-pro'
			);
			?>
		</p>
	</div>
</div>
