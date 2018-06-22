<?php
// don't show on password protected posts
if ( post_password_required() ) {
	return;
}

$attributes = $this->attributes( array(
	'googleCalendarLabel' => __( '+ Google Calendar', 'events-gutenberg' ),
	'iCalLabel' => __( '+ iCal Export', 'events-gutenberg' ),
	'hasiCal' => true,
	'hasGoogleCalendar' => true,
) );

$should_render = ! $attributes['hasGoogleCalendar'] && ! $attributes['hasiCal'];

remove_filter( 'the_content', 'do_blocks', 9 );
?>

<?php if ( ! $should_render ) : ?>
    <div class="tribe-events-cal-links">
		
		<?php if ( $attributes['hasGoogleCalendar'] ) : ?>
            <a
                    class="tribe-events-gcal tribe-events-button"
                    href="<?php echo Tribe__Events__Main::instance()->esc_gcal_url( tribe_get_gcal_link() ); ?>"
                    title="<?php esc_attr_e( 'Add to Google Calendar', 'events-gutenberg' ); ?>"
            >
				<?php echo esc_html( $attributes['googleCalendarLabel'] ) ?>
            </a>
		<?php endif; ?>
		
		<?php if ( $attributes['hasiCal'] ) : ?>
            <a
                    class="tribe-events-ical tribe-events-button"
                    href="<?php echo esc_url( tribe_get_single_ical_link() ); ?>"
                    title="<?php esc_attr_e( 'Download .ics file', 'events-gutenberg' ); ?>"
            >
				<?php echo esc_html( $attributes['iCalLabel'] ) ?>
            </a>
		<?php endif; ?>
    </div>
<?php endif; ?>

<?php add_filter( 'the_content', 'do_blocks', 9 );
