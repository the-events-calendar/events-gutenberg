<?php
/**
 * This template renders the RSVP ticket "Not Going" status
 *
 * @version TBD
 *
 */
?>
<span>
	<button class="tribe-block__rsvp__status-button tribe-block__rsvp__status-button--not-going">
		<?php echo file_get_contents( tribe( 'gutenberg' )->plugin_url . 'src/resources/icons/cross.svg' ); ?>
		<span><?php esc_html_e( 'Not going', 'events-gutenberg' ); ?></span>
	</button>
</span>