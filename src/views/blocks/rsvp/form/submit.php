<?php
/**
 * This template renders the RSVP ticket form submit input
 *
 * @version TBD
 *
 */
$must_login = ! is_user_logged_in() && tribe( 'tickets.rsvp' )->login_required();
?>
<?php if ( $must_login ) : ?>
	<a href="<?php echo esc_url( tribe( 'tickets' )->get_login_url() ); ?>">
		<?php esc_html_e( 'Login to RSVP', 'events-gutenberg' ); ?>
	</a>
<?php else : ?>
	<button
		type="submit"
		name="tickets_process"
		value="1"
		class="tribe-button rsvp-submit"
	>
	<?php esc_html_e( 'Submit RSVP', 'events-gutenberg' ); ?>
	</button>
<?php endif; ?>