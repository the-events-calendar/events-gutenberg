<?php $event_id = $this->get( 'post_id' ); ?>
<div class="tribe-events-single-section tribe-events-event-meta secondary tribe-clearfix">
	<?php do_action( 'tribe_events_single_event_meta_secondary_section_start' ); ?>

	<?php $this->template( 'blocks/parts/venue' ); ?>
	<?php $this->template( 'blocks/parts/map' ); ?>

	<?php do_action( 'tribe_events_single_event_meta_secondary_section_end' ); ?>
</div>
