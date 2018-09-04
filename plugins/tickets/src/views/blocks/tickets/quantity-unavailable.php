<?php
/**
 * This template renders a Single Ticket Quantity when Unavailable
 *
 * @version TBD
 *
 */

$ticket = $this->get( 'ticket' );
?>
<div
	class="tribe-block__tickets__item__quantity__unavailable"
>
	<?php esc_html_e( 'Sold Out', 'events-gutenberg' ); ?>
</div>