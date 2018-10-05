<?php
/**
 * This template renders the RSVP ticket "Not Going" icon
 *
 * @version 0.3.0-alpha
 *
 */
?>
<span>
	<button class="tribe-block__rsvp__status-button tribe-block__rsvp__status-button--not-going">
		<?php $this->template( 'blocks/rsvp/status/not-going-icon' ); ?>
		<span><?php esc_html_e( 'Not going', 'events-gutenberg' ); ?></span>
	</button>
</span>