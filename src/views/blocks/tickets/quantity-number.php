<?php
/**
 * @todo Allow multiple Commerce Providers
 */
$must_login = ! is_user_logged_in() && $ticket->get_provider()->login_required();
$ticket = $this->get( 'ticket' );
$available = $ticket->available();

if ( class_exists( 'WC_Product_Simple' ) ) {
	$product = new WC_Product_Simple( $ticket->ID );
} else {
	$product = new WC_Product( $ticket->ID );
}

$stock        = $ticket->stock();
$max_quantity = $product->backorders_allowed() ? '' : $stock;
$max_quantity = $product->is_sold_individually() ? 1 : $max_quantity;
$remaining    = $ticket->remaining();
$available    = $ticket->available();

?>
<div
	class="tribe-block__tickets__item__quantity__number"
>
	<input
		type="number"
		class="tribe-ticket-quantity"
		step="1"
		min="0"
		<?php if ( -1 !== $remaining ) : ?>
			max="<?php echo esc_attr( $max_quantity ); ?>"
		<?php endif; ?>
		name="quantity_<?php echo absint( $ticket->ID ); ?>"
		value="0"
		<?php disabled( $must_login ); ?>
	/>
</div>