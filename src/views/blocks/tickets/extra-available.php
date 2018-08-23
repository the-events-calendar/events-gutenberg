<?php
/**
 * This template renders a Single Ticket availability
 *
 * @version TBD
 *
 */

$ticket = $this->get( 'ticket' );
?>
<div
	class="tribe-block__tickets__item__extra__available"
>
	<?php echo sprintf( __( '%d available', 'events-gutenberg' ), $ticket->available() ); ?>
</div>