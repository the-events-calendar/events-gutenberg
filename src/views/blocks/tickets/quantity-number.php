<?php
$must_login = ! is_user_logged_in() && $ticket->get_provider()->login_required();
$ticket = $this->get( 'ticket' );
$max_quantity = tribe( 'tickets.handler' )->get_ticket_max_purchase( $ticket->ID );
?>
<div
	class="tribe-block__tickets__item__quantity__number"
>
	<input
		type="number"
		class="tribe-ticket-quantity"
		step="1"
		min="0"
		<?php if ( -1 !== $max_quantity && $ticket->managing_stock() ) : ?>
			max="<?php echo esc_attr( $max_quantity ); ?>"
		<?php endif; ?>
		name="quantity_<?php echo absint( $ticket->ID ); ?>"
		value="0"
		<?php disabled( $must_login ); ?>
	/>
</div>