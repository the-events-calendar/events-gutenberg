/**
 * External dependencies
 */
import { invert } from 'lodash';
import { __ } from '@wordpress/i18n';

//
// ─── RECURRENCE TYPES ───────────────────────────────────────────────────────────
//

export const DAILY = 'daily';
export const WEEKLY = 'weekly';
export const MONTHLY = 'monthly';
export const YEARLY = 'yearly';
export const SINGLE = 'single';

export const DAILY_LABEL = __( 'Day', 'events-gutenberg' );
export const WEEKLY_LABEL = __( 'Week', 'events-gutenberg' );
export const MONTHLY_LABEL = __( 'Month', 'events-gutenberg' );
export const YEARLY_LABEL = __( 'Year', 'events-gutenberg' );
export const SINGLE_LABEL = __( 'Single Recurrence', 'events-gutenberg' );

export const RECURRENCE_TYPES = [ DAILY, WEEKLY, MONTHLY, YEARLY, SINGLE ];

//
// ─── SERIES END TYPES ───────────────────────────────────────────────────────────
//

export const ON = 'on';
export const AFTER = 'after';
export const NEVER = 'never';

export const ON_LABEL = __( 'On', 'events-gutenberg' );
export const AFTER_LABEL = __( 'After', 'events-gutenberg' );
export const NEVER_LABEL = __( 'Never', 'events-gutenberg' );

export const DATE = 'date';
export const COUNT = 'count';

//
// ─── DAYS OF THE WEEK ───────────────────────────────────────────────────────────
//

export const SUNDAY = 'sunday';
export const MONDAY = 'monday';
export const TUESDAY = 'tuesday';
export const WEDNESDAY = 'wednesday';
export const THURSDAY = 'thursday';
export const FRIDAY = 'friday';
export const SATURDAY = 'saturday';

export const SUNDAY_LABEL = __( 'Sunday', 'events-gutenberg' );
export const MONDAY_LABEL = __( 'Monday', 'events-gutenberg' );
export const TUESDAY_LABEL = __( 'Tuesday', 'events-gutenberg' );
export const WEDNESDAY_LABEL = __( 'Wednesday', 'events-gutenberg' );
export const THURSDAY_LABEL = __( 'Thursday', 'events-gutenberg' );
export const FRIDAY_LABEL = __( 'Friday', 'events-gutenberg' );
export const SATURDAY_LABEL = __( 'Saturday', 'events-gutenberg' );

export const SUNDAY_ABBR = __( 'S', 'events-gutenberg' );
export const MONDAY_ABBR = __( 'M', 'events-gutenberg' );
export const TUESDAY_ABBR = __( 'T', 'events-gutenberg' );
export const WEDNESDAY_ABBR = __( 'W', 'events-gutenberg' );
export const THURSDAY_ABBR = __( 'T', 'events-gutenberg' );
export const FRIDAY_ABBR = __( 'F', 'events-gutenberg' );
export const SATURDAY_ABBR = __( 'S', 'events-gutenberg' );

export const SUNDAY_CHECKED = 'sundayChecked';
export const MONDAY_CHECKED = 'mondayChecked';
export const TUESDAY_CHECKED = 'tuesdayChecked';
export const WEDNESDAY_CHECKED = 'wednesdayChecked';
export const THURSDAY_CHECKED = 'thursdayChecked';
export const FRIDAY_CHECKED = 'fridayChecked';
export const SATURDAY_CHECKED = 'saturdayChecked';

export const DAYS_OF_THE_WEEK_PROP_KEYS = [
	SUNDAY_CHECKED,
	MONDAY_CHECKED,
	TUESDAY_CHECKED,
	WEDNESDAY_CHECKED,
	THURSDAY_CHECKED,
	FRIDAY_CHECKED,
	SATURDAY_CHECKED,
];

export const DAYS_OF_THE_WEEK_MAPPING_TO_STATE = {
	[ MONDAY ]: 1,
	[ TUESDAY ]: 2,
	[ WEDNESDAY ]: 3,
	[ THURSDAY ]: 4,
	[ FRIDAY ]: 5,
	[ SATURDAY ]: 6,
	[ SUNDAY ]: 7,
};

export const DAYS_OF_THE_WEEK_MAPPING_FROM_STATE = invert( DAYS_OF_THE_WEEK_MAPPING_TO_STATE );

export const DAYS_OF_THE_WEEK_PROP_KEY_MAPPING_FROM_STATE = {
	1: MONDAY_CHECKED,
	2: TUESDAY_CHECKED,
	3: WEDNESDAY_CHECKED,
	4: THURSDAY_CHECKED,
	5: FRIDAY_CHECKED,
	6: SATURDAY_CHECKED,
	7: SUNDAY_CHECKED,
};

//
// ─── DAYS OF THE MONTH ──────────────────────────────────────────────────────────
//

// returns an array from 1 - 31
export const DAYS_OF_THE_MONTH = Array( 31 ).fill().map( ( _, index ) => index + 1 );

export const DAY = 'day';
export const DAY_LABEL = __( 'Day', 'events-gutenberg' );

//
// ─── WEEKS OF THE MONTH ─────────────────────────────────────────────────────────
//

export const FIRST = 'first';
export const SECOND = 'second';
export const THIRD = 'third';
export const FOURTH = 'fourth';
export const FIFTH = 'fifth';
export const LAST = 'last';

export const FIRST_LABEL = __( 'First', 'events-gutenberg' );
export const SECOND_LABEL = __( 'Second', 'events-gutenberg' );
export const THIRD_LABEL = __( 'Third', 'events-gutenberg' );
export const FOURTH_LABEL = __( 'Fourth', 'events-gutenberg' );
export const FIFTH_LABEL = __( 'Fifth', 'events-gutenberg' );
export const LAST_LABEL = __( 'Last', 'events-gutenberg' );

export const WEEKS_OF_THE_MONTH = [ FIRST, SECOND, THIRD, FOURTH, FIFTH, LAST ];

//
// ─── MONTHS OF THE YEAR ─────────────────────────────────────────────────────────
//

export const JANUARY = 'january';
export const FEBRUARY = 'february';
export const MARCH = 'march';
export const APRIL = 'april';
export const MAY = 'may';
export const JUNE = 'june';
export const JULY = 'july';
export const AUGUST = 'august';
export const SEPTEMBER = 'september';
export const OCTOBER = 'october';
export const NOVEMBER = 'november';
export const DECEMBER = 'december';

export const JANUARY_LABEL = __( 'January', 'events-gutenberg' );
export const FEBRUARY_LABEL = __( 'February', 'events-gutenberg' );
export const MARCH_LABEL = __( 'March', 'events-gutenberg' );
export const APRIL_LABEL = __( 'April', 'events-gutenberg' );
export const MAY_LABEL = __( 'May', 'events-gutenberg' );
export const JUNE_LABEL = __( 'June', 'events-gutenberg' );
export const JULY_LABEL = __( 'July', 'events-gutenberg' );
export const AUGUST_LABEL = __( 'August', 'events-gutenberg' );
export const SEPTEMBER_LABEL = __( 'September', 'events-gutenberg' );
export const OCTOBER_LABEL = __( 'October', 'events-gutenberg' );
export const NOVEMBER_LABEL = __( 'November', 'events-gutenberg' );
export const DECEMBER_LABEL = __( 'December', 'events-gutenberg' );

export const JANUARY_ABBR = __( 'Jan', 'events-gutenberg' );
export const FEBRUARY_ABBR = __( 'Feb', 'events-gutenberg' );
export const MARCH_ABBR = __( 'Mar', 'events-gutenberg' );
export const APRIL_ABBR = __( 'Apr', 'events-gutenberg' );
export const MAY_ABBR = __( 'May', 'events-gutenberg' );
export const JUNE_ABBR = __( 'Jun', 'events-gutenberg' );
export const JULY_ABBR = __( 'Jul', 'events-gutenberg' );
export const AUGUST_ABBR = __( 'Aug', 'events-gutenberg' );
export const SEPTEMBER_ABBR = __( 'Sep', 'events-gutenberg' );
export const OCTOBER_ABBR = __( 'Oct', 'events-gutenberg' );
export const NOVEMBER_ABBR = __( 'Nov', 'events-gutenberg' );
export const DECEMBER_ABBR = __( 'Dec', 'events-gutenberg' );

export const MONTHS_OF_THE_YEAR_MAPPING_TO_STATE = {
	[ JANUARY ]: 1,
	[ FEBRUARY ]: 2,
	[ MARCH ]: 3,
	[ APRIL ]: 4,
	[ MAY ]: 5,
	[ JUNE ]: 6,
	[ JULY ]: 7,
	[ AUGUST ]: 8,
	[ SEPTEMBER ]: 9,
	[ OCTOBER ]: 10,
	[ NOVEMBER ]: 11,
	[ DECEMBER ]: 12,
};

export const MONTHS_OF_THE_YEAR_MAPPING_FROM_STATE = invert( MONTHS_OF_THE_YEAR_MAPPING_TO_STATE );

//
// ─── RECURRING MULTI DAY ────────────────────────────────────────────────────────
//

export const NEXT_DAY = 'next_day';
export const SECOND_DAY = 'second_day';
export const THIRD_DAY = 'third_day';
export const FOURTH_DAY = 'fourth_day';
export const FIFTH_DAY = 'fifth_day';
export const SIXTH_DAY = 'sixth_day';
export const SEVENTH_DAY = 'seventh_day';

export const NEXT_DAY_LABEL = __( 'Next day', 'events-gutenberg' );
export const SECOND_DAY_LABEL = __( '2nd day', 'events-gutenberg' );
export const THIRD_DAY_LABEL = __( '3rd day', 'events-gutenberg' );
export const FOURTH_DAY_LABEL = __( '4th day', 'events-gutenberg' );
export const FIFTH_DAY_LABEL = __( '5th day', 'events-gutenberg' );
export const SIXTH_DAY_LABEL = __( '6th day', 'events-gutenberg' );
export const SEVENTH_DAY_LABEL = __( '7th day', 'events-gutenberg' );
