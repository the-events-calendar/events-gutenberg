<?php
/**
 * This template renders the RSVP ticket icon
 *
 * @version TBD
 *
 */
?>
<div class="rsvp-icon">
	<img src="<?php echo tribe( 'gutenberg' )->plugin_url . 'src/resources/icons/rsvp.svg'; ?>" />
	<?php esc_html_e( 'RSVP', 'events-gutenberg' ) ?>
</div>
