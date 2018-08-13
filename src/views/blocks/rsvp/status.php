<?php
/**
 * This template renders the RSVP ticket actions section
 *
 * @version TBD
 *
 */
?>
<div class="rsvp-status">
	<?php if ( $ticket->is_in_stock() ) : ?>

		<?php $this->template( 'blocks/rsvp/status/going', array( 'ticket' => $ticket ) ); ?>
		<?php $this->template( 'blocks/rsvp/status/not-going', array( 'ticket' => $ticket ) ); ?>

	<?php else : ?>
		<?php $this->template( 'blocks/rsvp/status/full', array( 'ticket' => $ticket ) ); ?>
	<?php endif; ?>
</div>
