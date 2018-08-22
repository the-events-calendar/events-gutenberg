<?php
/**
 * This template renders the RSVP ticket "Going" status
 *
 * @version TBD
 *
 */
?>
<span>
	<button class="tribe-going">
		<?php echo file_get_contents( tribe( 'gutenberg' )->plugin_url . 'src/resources/icons/checkmark.svg' ); ?>
		<span><?php esc_html_e( 'Going', 'events-gutenberg' ); ?></span>
	</button>
</span>