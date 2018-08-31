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
	<span><?php echo esc_html( $ticket->available() ); ?></span>
	<?php esc_html_e( 'available', 'events-gutenberg' ); ?>
</div>