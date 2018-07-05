<?php
/**
 * Renders the event organizer block
 *
 * @version TBD
 *
 */
$event_id = $this->get( 'post_id' );

$attributes   = $this->attributes();
$organizer_id = $attributes['organizer'];

if ( empty( $organizer_id ) ) {
	return;
}

$phone   = tribe_get_organizer_phone( $organizer_id );
$website = tribe_get_organizer_website_link( $organizer_id );
$email   = tribe_get_organizer_email( $organizer_id );

?>
<div class="tribe-block__organizer__details tribe-clearfix">
	<div class="tribe-block__organizer__title">
		<h3><?php echo tribe_get_organizer( $organizer_id ); ?></h3>
	</div>
	<?php if ( ! empty( $phone ) ) : ?>
		<p><?php echo esc_html( $phone ); ?></p>
	<?php endif; ?>
	<?php if ( ! empty( $website ) ) : ?>
		<p><?php echo $website; ?></p>
	<?php endif; ?>
	<?php if ( ! empty( $email ) ) : ?>
		<p><?php echo esc_html( $email ); ?></p>
	<?php endif; ?>
</div>
