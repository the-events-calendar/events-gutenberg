<?php
/**
 * This template renders the RSVP ticket form
 *
 * @version TBD
 *
 */

$event_id = $this->get( 'post_id' );
$tickets  = $this->get( 'tickets' );

?>
<div class="tribe-block__rsvp">

	<?php foreach ( $tickets as $ticket ) : ?>

		<div class="tribe-block__rsvp-ticket" data-rsvp-id="<?php echo absint( $ticket->ID ); ?>">

			<?php $this->template( 'blocks/rsvp/icon' ); ?>

			<?php $this->template( 'blocks/rsvp/content', array( 'ticket' => $ticket ) ); ?>

			<?php $this->template( 'blocks/rsvp/status', array( 'ticket' => $ticket ) ); ?>

		</div>

	<?php endforeach; ?>

</div>