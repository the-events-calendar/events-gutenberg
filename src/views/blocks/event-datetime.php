<?php

if ( ! function_exists( 'tribe_is_same_day' ) ) {
	function tribe_is_same_day( $date_1, $date_2 ) {
		$date_1_formatted = date( 'Y-m-d', strtotime( $date_1 ) );
		$date_2_formatted = date( 'Y-m-d', strtotime( $date_2 ) );
		return $date_1_formatted == $date_2_formatted;
	}
}

if ( ! function_exists( 'tribe_is_same_year' ) ) {
	function tribe_is_same_year( $date_1, $date_2 ) {
		$date_1_year = date( 'Y', strtotime( $date_1 ) );
		$date_2_year = date( 'Y', strtotime( $date_2 ) );
		return $date_1_year == $date_2_year;
	}
}

if ( ! function_exists( 'tribe_get_event_date_time' ) ) {
	function tribe_get_event_date_time( $date, $date_format, $time_format ) {
		$timestamp = strtotime( $date );

		return [
			'date' => date( $date_format, $timestamp ),
			'time' => date( $time_format, $timestamp ),
		];
	}
}

$event_id = get_the_ID();

$start = get_post_meta( $event_id, '_EventStartDate' )[0];
$end = get_post_meta( $event_id, '_EventEndDate' )[0];
$timezone = get_post_meta( $event_id, '_EventTimezone' )[0];
$separator_date = get_post_meta( $event_id, '_EventDateTimeSeparator' )[0];
$separator_time = get_post_meta( $event_id, '_EventTimeRangeSeparator' )[0];
$all_day = (boolean) get_post_meta( $event_id, '_EventAllDay' )[0];
$same_day = tribe_is_same_day( $start, $end );
$show_year = ! tribe_is_same_year( $start, $end ) || ! tribe_is_same_year( $start, date( 'Y-m-d H:i:s' ) );

$same_day = false;
$all_day = false;

$date_format_with_year = 'F j, Y';
$date_format_no_year = 'F j';
$time_format = 'g:i a';
$date_format = $show_year ? $date_format_with_year : $date_format_no_year;

$start_date_time = tribe_get_event_date_time( $start, $date_format, $time_format );
$end_date_time = tribe_get_event_date_time( $end, $date_format, $time_format );

?>

<?php $event_id = $this->get( 'post_id' ); ?>
<div class="tribe-events-schedule tribe-clearfix">
	<h2 class="tribe-events-schedule__date">
		<?php echo '<span class="tribe-events-schedule__start-date">' . $start_date_time['date'] . '</span>'; ?>

		<?php if ( ! $all_day ) : ?>
			<?php echo '<span class="tribe-events-schedule__date-separator">' . $separator_date . '</span>'; ?>
			<?php echo '<span class="tribe-events-schedule__start-time">' . $start_date_time['time'] . '</span>'; ?>
		<?php elseif ( $same_day ) : ?>
			<?php echo '<span class="tribe-events-schedule__all-day">All day</span>'; ?>
		<?php endif; ?>

		<?php if ( ! $all_day || ! $same_day ) : ?>
			<?php echo '<span class"tribe-events-schedule__time-separator">' . $separator_time . '</span>'; ?>
		<?php endif; ?>

		<?php if ( ! $same_day ) : ?>
			<?php echo '<span class="tribe-events-schedule__end-date">' . $end_date_time['date'] . '</span> '; ?>

			<?php if ( ! $all_day ) : ?>
				<?php echo '<span class="tribe-events-schedule__date-separator">' . $separator_date . '</span>'; ?>
				<?php echo '<span class="tribe-events-schedule__start-time">' . $end_date_time['time'] . '</span>'; ?>
			<?php endif; ?>

		<?php elseif ( ! $all_day ) : ?>
			<?php echo '<span class="tribe-events-schedule__start-time">' . $end_date_time['time'] . '</span>'; ?>
		<?php endif; ?>

		<?php if ( ! $all_day ) : ?>
			<?php echo '<span class="tribe-events-schedule__timezone">' . $timezone . '</span>'; ?>
		<?php endif; ?>
	</h2>
	<?php if ( tribe_get_cost() && tribe( 'gutenberg.editor' )->post_is_from_classic_editor( $event_id ) ) : ?>
		<span class="tribe-events-cost"><?php echo tribe_get_cost( null, true ) ?></span>
	<?php endif; ?>
</div>
