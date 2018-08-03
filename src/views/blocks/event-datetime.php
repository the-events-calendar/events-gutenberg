<?php

/**
 * Checks if the two dates provided are on the same day.
 *
 * @param string $date_1 A date/time string. See `strtotime` for valid formats.
 * @param string $date_2 A date/time string. See `strtotime` for valid formats.
 *
 * @return bool True if same day.
 */
if ( ! function_exists( 'tribe_is_same_day' ) ) {
	function tribe_is_same_day( $date_1, $date_2 ) {
		$date_1_formatted = date( 'Y-m-d', wp_strtotime( $date_1 ) );
		$date_2_formatted = date( 'Y-m-d', wp_strtotime( $date_2 ) );
		return $date_1_formatted == $date_2_formatted;
	}
}

/**
 * Checks if the two dates provided are in the same year.
 *
 * @param string $date_1 A date/time string. See `strtotime` for valid formats.
 * @param string $date_2 A date/time string. See `strtotime` for valid formats.
 *
 * @return bool True if same year.
 */
if ( ! function_exists( 'tribe_is_same_year' ) ) {
	function tribe_is_same_year( $date_1, $date_2 ) {
		$date_1_year = date( 'Y', wp_strtotime( $date_1 ) );
		$date_2_year = date( 'Y', wp_strtotime( $date_2 ) );
		return $date_1_year == $date_2_year;
	}
}

/**
 * Returns an array with date and time of date provided
 *
 * @param string $date        A date/time string. See `strtotime` for valid formats.
 * @param string $date_format A date format. See `strtotime` for valid formats.
 * @param string $time_format A time format. See `strtotime` for valid formats.
 *
 * @return array Array with date and time.
 */
if ( ! function_exists( 'tribe_get_event_date_time' ) ) {
	function tribe_get_event_date_time( $date, $date_format, $time_format ) {
		$timestamp = wp_strtotime( $date );

		return array(
			'date' => date( $date_format, $timestamp ),
			'time' => date( $time_format, $timestamp ),
		);
	}
}

$event_id = get_the_ID();

$start = get_post_meta( $event_id, '_EventStartDate', true );
$end = get_post_meta( $event_id, '_EventEndDate', true );
$timezone = get_post_meta( $event_id, '_EventTimezone', true );
$separator_date = get_post_meta( $event_id, '_EventDateTimeSeparator', true );
$separator_time = get_post_meta( $event_id, '_EventTimeRangeSeparator', true );
$all_day = (boolean) get_post_meta( $event_id, '_EventAllDay', true );
$same_day = tribe_is_same_day( $start, $end );
$show_year = ! tribe_is_same_year( $start, $end ) || ! tribe_is_same_year( $start, date( 'Y-m-d H:i:s' ) );

$date_format_with_year = 'F j, Y';
$date_format_no_year = 'F j';
$time_format = 'g:i a';
$date_format = $show_year ? $date_format_with_year : $date_format_no_year;

$start_date_time = tribe_get_event_date_time( $start, $date_format, $time_format );
$end_date_time = tribe_get_event_date_time( $end, $date_format, $time_format );

?>

<?php $event_id = $this->get( 'post_id' ); ?>
<div class="tribe-events-schedule tribe-clearfix">
	<h2 class="tribe-events-schedule__datetime">
		<span class="tribe-events-schedule__date tribe-events-schedule__date--start">
			<?php echo $start_date_time['date']; ?>
		</span>

		<?php if ( ! $all_day ) : ?>
			<span class="tribe-events-schedule__separator tribe-events-schedule__separator--date">
				<?php echo $separator_date; ?>
			</span>
			<span class="tribe-events-schedule__time tribe-events-schedule__time--start">
				<?php echo $start_date_time['time']; ?>
			</span>
		<?php elseif ( $same_day ) : ?>
			<span class="tribe-events-schedule__all-day"><?php echo __( 'All day', 'events-gutenberg' ); ?></span>
		<?php endif; ?>

		<?php if ( ! $all_day || ! $same_day ) : ?>
			<span class="tribe-events-schedule__separator tribe-events-schedule__separator--time">
				<?php echo $separator_time; ?>
			</span>
		<?php endif; ?>

		<?php if ( ! $same_day ) : ?>
			<span class="tribe-events-schedule__date tribe-events-schedule__date--end">
				<?php echo $end_date_time['date']; ?>
			</span>

			<?php if ( ! $all_day ) : ?>
				<span class="tribe-events-schedule__separator tribe-events-schedule__separator--date">
					<?php echo $separator_date; ?>
				</span>
				<span class="tribe-events-schedule__time tribe-events-schedule__time--end">
					<?php echo $end_date_time['time']; ?>
				</span>
			<?php endif; ?>

		<?php elseif ( ! $all_day ) : ?>
			<span class="tribe-events-schedule__time tribe-events-schedule__time--end">
				<?php echo $end_date_time['time']; ?>
			</span>
		<?php endif; ?>

		<span class="tribe-events-schedule__timezone"><?php echo $timezone; ?></span>
	</h2>
</div>
