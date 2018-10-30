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
	{ label: constants.DAILY_LABEL, value: constants.DAILY },
	{ label: constants.WEEKLY_LABEL, value: constants.WEEKLY },
	{ label: constants.MONTHLY_LABEL, value: constants.MONTHLY },
	{ label: constants.YEARLY_LABEL, value: constants.YEARLY },
	{ label: constants.SINGLE_LABEL, value: constants.SINGLE },
];

//
// ─── RECURRENCE FREQUENCY OPTIONS ───────────────────────────────────────────────
//

/**
 * Creates options for select element from 1 to max
 * @param {number} max The last number in the options list
 */
export const createNumericalOptions = ( max ) => (
	Array( max ).fill().map( ( _, index ) => ( {
		label: String( index + 1 ),
		value: index + 1,
	} ) )
);

export const DAILY_RECURRENCE_FREQUENCY_OPTIONS = createNumericalOptions( 6 );
export const WEEKLY_RECURRENCE_FREQUENCY_OPTIONS = createNumericalOptions( 6 );
export const MONTHLY_RECURRENCE_FREQUENCY_OPTIONS = createNumericalOptions( 12 );
export const YEARLY_RECURRENCE_FREQUENCY_OPTIONS = createNumericalOptions( 6 );

//
// ─── SERIES ENDS OPTIONS ────────────────────────────────────────────────────────
//

export const SERIES_ENDS_OPTIONS = [
	{ label: constants.ON_LABEL, value: constants.DATE },
	{ label: constants.AFTER_LABEL, value: constants.COUNT },
	{ label: constants.NEVER_LABEL, value: constants.NEVER },
];

//
// ─── DAYS OF THE WEEK OPTIONS ────────────────────────────────────────
//

export const DAYS_OF_THE_WEEK_OPTIONS = [
	{ label: constants.MONDAY_LABEL, value: constants.MONDAY },
	{ label: constants.TUESDAY_LABEL, value: constants.TUESDAY },
	{ label: constants.WEDNESDAY_LABEL, value: constants.WEDNESDAY },
	{ label: constants.THURSDAY_LABEL, value: constants.THURSDAY },
	{ label: constants.FRIDAY_LABEL, value: constants.FRIDAY },
	{ label: constants.SATURDAY_LABEL, value: constants.SATURDAY },
	{ label: constants.SUNDAY_LABEL, value: constants.SUNDAY },
	{ label: constants.DAY_LABEL, value: constants.DAY },
];

//
// ─── DAYS AND WEEKS OF THE MONTH OPTIONS ────────────────────────────────────────
//

export const DAYS_OF_THE_MONTH_OPTIONS = constants.DAYS_OF_THE_MONTH.map(
	( value ) => ( { label: String( value ), value } )
);

export const WEEKS_OF_THE_MONTH_OPTIONS = [
	{ label: constants.FIRST_LABEL, value: constants.FIRST },
	{ label: constants.SECOND_LABEL, value: constants.SECOND },
	{ label: constants.THIRD_LABEL, value: constants.THIRD },
	{ label: constants.FOURTH_LABEL, value: constants.FOURTH },
	{ label: constants.FIFTH_LABEL, value: constants.FIFTH },
	{ label: constants.LAST_LABEL, value: constants.LAST },
];

export const MONTH_DAYS_OPTIONS = [
	...WEEKS_OF_THE_MONTH_OPTIONS,
	...DAYS_OF_THE_MONTH_OPTIONS,
];

//
// ─── MONTHS OF THE YEAR OPTIONS ─────────────────────────────────────────────────
//

export const MONTHS_OF_THE_YEAR_OPTIONS = [
	{
		label: constants.JANUARY_LABEL,
		tag: constants.JANUARY_ABBR,
		value: constants.JANUARY,
	},
	{
		label: constants.FEBRUARY_LABEL,
		tag: constants.FEBRUARY_ABBR,
		value: constants.FEBRUARY,
	},
	{
		label: constants.MARCH_LABEL,
		tag: constants.MARCH_ABBR,
		value: constants.MARCH,
	},
	{
		label: constants.APRIL_LABEL,
		tag: constants.APRIL_ABBR,
		value: constants.APRIL,
	},
	{
		label: constants.MAY_LABEL,
		tag: constants.MAY_ABBR,
		value: constants.MAY,
	},
	{
		label: constants.JUNE_LABEL,
		tag: constants.JUNE_ABBR,
		value: constants.JUNE,
	},
	{
		label: constants.JULY_LABEL,
		tag: constants.JULY_ABBR,
		value: constants.JULY,
	},
	{
		label: constants.AUGUST_LABEL,
		tag: constants.AUGUST_ABBR,
		value: constants.AUGUST,
	},
	{
		label: constants.SEPTEMBER_LABEL,
		tag: constants.SEPTEMBER_ABBR,
		value: constants.SEPTEMBER,
	},
	{
		label: constants.OCTOBER_LABEL,
		tag: constants.OCTOBER_ABBR,
		value: constants.OCTOBER,
	},
	{
		label: constants.NOVEMBER_LABEL,
		tag: constants.NOVEMBER_ABBR,
		value: constants.NOVEMBER,
	},
	{
		label: constants.DECEMBER_LABEL,
		tag: constants.DECEMBER_ABBR,
		value: constants.DECEMBER,
	},
];

//
// ─── RECURRING MULTI DAY OPTIONS ────────────────────────────────────────────────
//

export const RECURRING_MULTI_DAY_OPTIONS = [
	{ label: constants.NEXT_DAY_LABEL, value: constants.NEXT_DAY },
	{ label: constants.SECOND_DAY_LABEL, value: constants.SECOND_DAY },
	{ label: constants.THIRD_DAY_LABEL, value: constants.THIRD_DAY },
	{ label: constants.FOURTH_DAY_LABEL, value: constants.FOURTH_DAY },
	{ label: constants.FIFTH_DAY_LABEL, value: constants.FIFTH_DAY },
	{ label: constants.SIXTH_DAY_LABEL, value: constants.SIXTH_DAY },
	{ label: constants.SEVENTH_DAY_LABEL, value: constants.SEVENTH_DAY },
];
