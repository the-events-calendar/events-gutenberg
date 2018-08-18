<?php
/**
 * This template renders the RSVP ticket form quantity input
 *
 * @version TBD
 *
 */
$must_login = ! is_user_logged_in() && tribe( 'tickets.rsvp' )->login_required();
$remaining  = $ticket->remaining();
?>
<div class="number-input">
	<?php $this->template( 'blocks/rsvp/form/quantity-minus' ); ?>
		<input
			type="number"
			name="quantity_<?php echo absint( $ticket->ID ); ?>"
			class="tribe-tickets-quantity"
			step="1"
			min="1"
			value="0"
			data-remaining="<?php echo esc_attr( $remaining ); ?>"
			<?php if ( -1 !== $remaining ) : ?>
				max="<?php echo esc_attr( $remaining ); ?>"
			<?php endif; ?>
			<?php disabled( $must_login ); ?>
		/>
	<?php $this->template( 'blocks/rsvp/form/quantity-plus' ); ?>
</div>