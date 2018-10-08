/**
 * External Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import * as constants from './constants';

export const RECURRENCE_TYPE_RULES_OPTIONS = [
	{ label: __( 'Day', 'events-gutenberg' ), value: constants.DAILY },
	{ label: __( 'Week', 'events-gutenberg' ), value: constants.WEEKLY },
	{ label: __( 'Month', 'events-gutenberg' ), value: constants.MONTHLY },
	{ label: __( 'Year', 'events-gutenberg' ), value: constants.YEARLY },
	{ label: __( 'Single Occurrence', 'events-gutenberg' ), value: constants.SINGLE },
];

export const SERIES_ENDS_OPTIONS = [
	{ label: __( 'On', 'events-gutenberg' ), value: constants.ON },
	{ label: __( 'After', 'events-gutenberg' ), value: constants.AFTER },
	{ label: __( 'Never', 'events-gutenberg' ), value: constants.NEVER },
];
