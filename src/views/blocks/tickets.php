<?php
/**
 * This template renders the tickets
 *
 * @version TBD
 *
 */
$post_id = $this->get( 'post_id' );
$tickets = $this->get( 'tickets', array() );
?>
<div class="tribe-block tribe-block__tickets">
	<?php foreach ( $tickets as $key => $ticket ) : ?>
		<?php $this->template( 'blocks/tickets/item', array( 'ticket' => $ticket, 'key' => $key ) ); ?>
	<?php endforeach; ?>
</div>