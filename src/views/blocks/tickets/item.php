<?php
/**
 * This template renders the tickets
 *
 * @version TBD
 *
 */
$post_id = $this->get( 'post_id' );
$ticket = $this->get( 'ticket' );
$classes = array( 'tribe-block__tickets__item' );
?>
<div
	id="tribe-block-tickets-item-<?php echo esc_attr( $ticket->ID ); ?>"
	class="<?php echo implode( ' ', get_post_class( $classes, $tickets->ID ) ); ?>"
>
	<?php $this->template( 'blocks/tickets/icon' ); ?>
	<?php $this->template( 'blocks/tickets/content' ); ?>
	<?php $this->template( 'blocks/tickets/extra' ); ?>
	<?php $this->template( 'blocks/tickets/quantity' ); ?>
</div>