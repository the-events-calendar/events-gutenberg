<?php
/**
 * This template renders the tickets
 *
 * @version TBD
 *
 */
$post_id = $this->get( 'post_id' );
$tickets = $this->get( 'tickets', array() );
$provider = $this->get( 'provider' );
$cart_classes = array( 'tribe-block', 'tribe-block__tickets' );

// We don't display anything if there is not provider
if ( ! $provider ) {
	return false;
}
?>
<form
	id="tribe-block__tickets"
	action="<?php echo esc_url( $provider->get_cart_url() ) ?>"
	class="<?php echo esc_attr( implode( ' ', $cart_classes ) ); ?>"
	method="post"
	enctype='multipart/form-data'
	novalidate
>
	<?php foreach ( $tickets as $key => $ticket ) : ?>
		<?php $this->template( 'blocks/tickets/item', array( 'ticket' => $ticket, 'key' => $key ) ); ?>
	<?php endforeach; ?>
</form>