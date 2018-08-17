<?php
/**
 * This template renders the RSVP ticket content
 *
 * @version TBD
 *
 */
?>
<div class="tribe-block__rsvp__content">

	<div class="tribe-block__rsvp__details__status">
		<?php $this->template( 'blocks/rsvp/details', array( 'ticket' => $ticket ) ); ?>
		<?php $this->template( 'blocks/rsvp/status', array( 'ticket' => $ticket ) ); ?>
	</div>

	<?php $this->template( 'blocks/rsvp/form', array( 'ticket' => $ticket ) ); ?>

</div>