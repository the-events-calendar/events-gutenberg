<?php
/**
 * This template renders one Ticket Container it will
 * be repeated for as many ticket are to be displayed
 *
 * @version TBD
 *
 */
$post_id = $this->get( 'post_id' );
$ticket  = $this->get( 'ticket' );
$classes = array(
	'tribe-block__tickets__item',
);

$context = array(
	'ticket' => $ticket,
	'key' => $this->get( 'key' ),
);
?>
<div
	id="tribe-block-tickets-item-<?php echo esc_attr( $ticket->ID ); ?>"
	class="<?php echo implode( ' ', get_post_class( $classes, $ticket->ID ) ); ?>"
>
	<?php $this->template( 'blocks/tickets/icon', $context ); ?>
	<?php $this->template( 'blocks/tickets/content', $context ); ?>
	<?php $this->template( 'blocks/tickets/extra', $context ); ?>
	<?php $this->template( 'blocks/tickets/quantity', $context ); ?>
</div>