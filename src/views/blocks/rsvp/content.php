<?php
/**
 * This template renders the RSVP ticket content
 *
 * @version TBD
 *
 */
?>
<div class="rsvp-content">

	<?php $this->template( 'blocks/rsvp/content/title', array( 'ticket' => $ticket ) ); ?>

	<?php $this->template( 'blocks/rsvp/content/description', array( 'ticket' => $ticket ) ); ?>

	<div class="messages">
		<?php if ( ! $ticket->is_in_stock() ) : ?>
			<span class="tickets_nostock"><?php esc_html_e( 'Out of stock!', 'event-tickets' ); ?></span>
		<?php endif; ?>
	</div>

	<!-- This div is where the AJAX returns the form -->
	<div class="rsvp-form"></div>

</div>
