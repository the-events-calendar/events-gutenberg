<?php
// don't show on password protected posts
if ( post_password_required() ) {
	return;
}

$attributes = $this->get( 'attributes', array() );

remove_filter( 'the_content', 'do_blocks', 9 );
?>

<div class="tribe-events-cal-links">
	<a
		class="tribe-events-gcal tribe-events-button"
		href="<?php echo Tribe__Events__Main::instance()->esc_gcal_url( tribe_get_gcal_link() ); ?>"
		title="<?php esc_attr_e( 'Add to Google Calendar', 'the-events-calendar' ); ?>"
	>
		<?php if ( empty( $attributes['googleCalendarLabel'] ) || ! is_string( $attributes['googleCalendarLabel'] ) ) : ?>
		+ <?php esc_html_e( 'Google Calendar', 'the-events-calendar' ); ?>
		<?php else : ?>
			<?php echo esc_html( $attributes['googleCalendarLabel'] ) ?>
		<?php endif; ?>
	</a>
	<a
		class="tribe-events-ical tribe-events-button"
		href="<?php echo esc_url( tribe_get_single_ical_link() ); ?>"
		title="<?php esc_attr_e( 'Download .ics file', 'the-events-calendar' ); ?>"
	>
		<?php if ( empty( $attributes['icalExportLabel'] ) || ! is_string( $attributes['icalExportLabel'] ) ) : ?>
			+ <?php esc_html_e( 'iCal Export', 'the-events-calendar' ); ?>
		<?php else : ?>
			<?php echo esc_html( $attributes['icalExportLabel'] ) ?>
		<?php endif; ?>
	</a>
</div>

<?php add_filter( 'the_content', 'do_blocks', 9 );
