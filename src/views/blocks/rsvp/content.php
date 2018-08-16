<?php
/**
 * This template renders the RSVP ticket content
 *
 * @version TBD
 *
 */
?>
<div class="tribe-block__rsvp__content">

	<?php $this->template( 'blocks/rsvp/content/title', array( 'ticket' => $ticket ) ); ?>

	<?php $this->template( 'blocks/rsvp/content/description', array( 'ticket' => $ticket ) ); ?>

	<div class="tribe-block__rsvp__content__messages">
		<?php if ( ! $ticket->is_in_stock() ) : ?>
			<span class="tribe-block__rsvp__messages--no-stock">
				<?php esc_html_e( 'Out of stock!', 'event-tickets' ); ?>
			</span>
		<?php endif; ?>
	</div>

	<!-- This div is where the AJAX returns the form -->
	<div class="tribe-block__rsvp__form"></div>

</div>
