<?php
$ticket = $this->get( 'ticket' );
$available = $ticket->available();
$is_available = 0 !== $available;
?>
<div
	class="tribe-block__tickets__item__quantity"
>
	<?php if ( $is_available ) : ?>
		<?php $this->template( 'blocks/tickets/quantity-add' ); ?>
		<?php $this->template( 'blocks/tickets/quantity-number' ); ?>
		<?php $this->template( 'blocks/tickets/quantity-remove' ); ?>
	<?php else : ?>
		<?php $this->template( 'blocks/tickets/quantity-unavailable' ); ?>
	<?php endif; ?>
</div>
