<?php
/**
 * Renders the event price block
 *
 * @version TBD
 *
 */
$event_id = $this->get( 'post_id' );

$attributes = $this->attributes();
$cost       = tribe_get_formatted_cost();
?>
<div class="tribe-block tribe-block__event-price">
    <?php
    // Event Cost
    if ( ! empty( $cost ) ) : ?>
        <span class="tribe-block__event-price__cost"> <?php echo esc_html( $cost ); ?> </span>
    <?php endif; ?>
    <?php if ( ! empty( $attributes['costDescription'] ) ) : ?>
        <span class="tribe-block__event-price__description"> <?php echo esc_html( $attributes['costDescription'] ); ?> </span>
    <?php endif ?>
</div>
