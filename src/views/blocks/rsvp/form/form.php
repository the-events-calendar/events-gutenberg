<?php
/**
 * This template renders the RSVP ticket form
 *
 * @version TBD
 *
 */
$ticket_id = $this->get( 'ticket_id' );
?>
<form
	name="tribe-rsvp-form"
	data-product-id="<?php echo esc_attr( $ticket_id ); ?>"
>
	<input type="hidden" name="product_id[]" value="<?php echo esc_attr( absint( $ticket_id ) ); ?>">
	<!-- Maybe add nonce over here? Try to leave templates as clean as possible -->

	<div class="left">
		<?php $this->template( 'blocks/rsvp/form/quantity', array( 'ticket' => $ticket ) ); ?>
	</div>

	<div class="right">
		<?php $this->template( 'blocks/rsvp/form/name' ); ?>

		<?php $this->template( 'blocks/rsvp/form/email' ); ?>

		<?php $this->template( 'blocks/rsvp/form/submit' ); ?>
	</div>

</form>
