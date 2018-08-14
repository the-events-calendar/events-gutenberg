<?php
/**
 * This template renders the RSVP ticket "Going" status
 *
 * @version TBD
 *
 */
?>
<span>
	<button class="going">
		<img src="<?php echo tribe( 'gutenberg' )->plugin_url . 'src/resources/icons/checkmark.svg'; ?>" />
		<span><?php esc_html_e( 'Going', 'events-gutenberg' ); ?></span>
	</button>
</span>