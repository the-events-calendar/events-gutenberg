<?php
$event_id = $this->get( 'post_id' );

$cost = tribe_get_formatted_cost();
?>
<div class="tribe-events-single-section tribe-events-event-cost tribe-clearfix">
	<?php do_action( 'tribe_events_single_event_cost_section_start' ); ?>
    <?php
    // Event Cost
    if ( ! empty( $cost ) ) : ?>
        <dt> <?php esc_html_e( 'Cost:', 'events-gutenberg' ) ?> </dt>
        <dd class="tribe-events-event-cost"> <?php esc_html_e( $cost ); ?> </dd>
    <?php endif ?>

	<?php do_action( 'tribe_events_single_event_cost_section_end' ); ?>
</div>
