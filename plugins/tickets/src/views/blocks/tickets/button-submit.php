<?php
/**
 * This template renders the buy button for the
 * list of all tickets in the Event
 *
 * @version TBD
 *
 */
$must_login = ! is_user_logged_in() && $ticket->get_provider()->login_required();
?>
<button
	class="tribe-block__tickets__buy"
	type="submit"
	<?php disabled( $must_login ); ?>
>
	<?php esc_html_e( 'Add to cart', 'events-gutenberg' ); ?>
</button>