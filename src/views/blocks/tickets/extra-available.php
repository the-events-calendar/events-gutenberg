<?php
$ticket = $this->get( 'ticket' );
?>
<div
	class="tribe-block__tickets__item__extra__available"
>
	<?php echo sprintf( __( '%d available', 'events-gutenberg' ), $ticket->available() ); ?>
</div>