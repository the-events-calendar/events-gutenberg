<?php
/**
 * This template renders the RSVP ticket description
 *
 * @version TBD
 *
 */
?>
<div class="availability">
	<?php if ( ! $ticket->is_in_stock() ) : ?>
		<span class="no-stock"><?php esc_html_e( 'Out of stock!', 'event-tickets' ); ?></span>
	<?php else : ?>
		<?php printf(
			'<span class="quantity">%s</span> %s',
			$ticket->remaining(),
			esc_html__( 'Remaining', 'events-gutenberg' )
		); ?>
	<?php endif; ?>
</div>