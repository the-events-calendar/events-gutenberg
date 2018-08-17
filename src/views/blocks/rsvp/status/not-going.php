<?php
/**
 * This template renders the RSVP ticket "Not Going" status
 *
 * @version TBD
 *
 */
?>
<span>
	<button class="not-going">
		<img src="<?php echo tribe( 'gutenberg' )->plugin_url . 'src/resources/icons/cross.svg'; ?>" />
		<span><?php esc_html_e( 'Not going', 'events-gutenberg' ); ?></span>
	</button>
</span>