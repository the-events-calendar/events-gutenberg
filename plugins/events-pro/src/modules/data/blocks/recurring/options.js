/**
 * External Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import * as constants from './constants';

//
// ─── RECURRENCE TYPES OPTIONS ───────────────────────────────────────────────────
//

export const RECURRENCE_TYPE_RULES_OPTIONS = [
	{ label: __( 'Day', 'events-gutenberg' ), value: constants.DAILY },
	{ label: __( 'Week', 'events-gutenberg' ), value: constants.WEEKLY },
	{ label: __( 'Month', 'events-gutenberg' ), value: constants.MONTHLY },
	{ label: __( 'Year', 'events-gutenberg' ), value: constants.YEARLY },
	{ label: __( 'Single Occurrence', 'events-gutenberg' ), value: constants.SINGLE },
];

//
// ─── SERIES ENDS OPTIONS ────────────────────────────────────────────────────────
//

export const SERIES_ENDS_OPTIONS = [
	{ label: __( 'On', 'events-gutenberg' ), value: constants.ON },
	{ label: __( 'After', 'events-gutenberg' ), value: constants.AFTER },
	{ label: __( 'Never', 'events-gutenberg' ), value: constants.NEVER },
];

//
// ─── DAYS OF THE WEEK OPTIONS ────────────────────────────────────────
//

export const DAYS_OF_THE_WEEK = [
	{ label: constants.MONDAY_LABEL, value: constants.MONDAY },
	{ label: constants.TUESDAY_LABEL, value: constants.TUESDAY },
	{ label: constants.WEDNESDAY_LABEL, value: constants.WEDNESDAY },
	{ label: constants.THURSDAY_LABEL, value: constants.THURSDAY },
	{ label: constants.FRIDAY_LABEL, value: constants.FRIDAY },
	{ label: constants.SATURDAY_LABEL, value: constants.SATURDAY },
	{ label: constants.SUNDAY_LABEL, value: constants.SUNDAY },
];

//
// ─── DAYS AND WEEKS OF THE MONTH OPTIONS ────────────────────────────────────────
//

export const DAYS_OF_THE_MONTH_OPTIONS = constants.DAYS_OF_THE_MONTH.map(
	( value ) => ( { label: value, value } )
);

export const WEEKS_OF_THE_MONTH_OPTIONS = [
	{ label: __( 'First', 'events-gutenberg' ), value: constants.FIRST },
	{ label: __( 'Second', 'events-gutenberg' ), value: constants.SECOND },
	{ label: __( 'Third', 'events-gutenberg' ), value: constants.THIRD },
	{ label: __( 'Fourth', 'events-gutenberg' ), value: constants.FOURTH },
	{ label: __( 'Fifth', 'events-gutenberg' ), value: constants.FIFTH },
	{ label: __( 'Last', 'events-gutenberg' ), value: constants.LAST },
];

export const MONTH_DAYS_OPTIONS = [
	...WEEKS_OF_THE_MONTH_OPTIONS,
	...DAYS_OF_THE_MONTH_OPTIONS,
];
