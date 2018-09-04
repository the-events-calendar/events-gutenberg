<?php
/**
 * This template renders the RSVP ticket description
 *
 * @version TBD
 *
 */
?>
<div class="tribe-block__rsvp__availability">
	<?php if ( ! $ticket->is_in_stock() ) : ?>
		<span class="tribe-block__rsvp__no-stock"><?php esc_html_e( 'Out of stock!', 'event-tickets' ); ?></span>
	<?php else : ?>
		<span class="tribe-block__rsvp__quantity"><?php echo $ticket->remaining(); ?> </span>
		<?php esc_html_e( 'remaining', 'events-gutenberg' ) ?>

	<?php endif; ?>
</div>