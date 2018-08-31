/**
 * External Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import * as constants from '@moderntribe/events-pro/data/blocks/recurring/constants';

export const EXCEPTION_OCCURRENCE_OPTIONS = [
	{ label: __( 'Single Exception', 'events-gutenberg' ), value: constants.SINGLE },
];
