<?php
/**
 * This template renders the RSVP ticket icon
 *
 * @version TBD
 *
 */
?>
<div class="tribe-block__rsvp__icon">
	<?php echo file_get_contents( tribe( 'gutenberg' )->plugin_url . 'src/resources/icons/rsvp.svg' ); ?>
	<?php esc_html_e( 'RSVP', 'events-gutenberg' ) ?>
</div>
