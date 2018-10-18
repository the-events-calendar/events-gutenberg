/**
 * External Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import * as constants from '@moderntribe/events-pro/data/blocks/recurring/constants';

export const EXCEPTION_OCCURRENCE_OPTIONS = [
	{ label: __( 'Daily', 'events-gutenberg' ), value: constants.DAILY },
	{ label: __( 'Weekly', 'events-gutenberg' ), value: constants.WEEKLY },
	{ label: __( 'Monthly', 'events-gutenberg' ), value: constants.MONTHLY },
	{ label: __( 'Yearly', 'events-gutenberg' ), value: constants.YEARLY },
	{ label: __( 'Single Exception', 'events-gutenberg' ), value: constants.SINGLE },
];
