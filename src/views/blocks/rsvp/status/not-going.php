<?php
/**
 * This template renders the RSVP ticket "Not Going" status
 *
 * @version TBD
 *
 */
?>
<span>
	<button class="tribe-not-going">
		<?php echo file_get_contents( tribe( 'gutenberg' )->plugin_url . 'src/resources/icons/cross.svg' ); ?>
		<span><?php esc_html_e( 'Not going', 'events-gutenberg' ); ?></span>
	</button>
</span>