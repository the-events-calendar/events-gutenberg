/**
 * External dependencies
 */
import { unescape, trim, } from 'lodash';

import { __ } from '@wordpress/i18n';

export default ( { title } ) => {
	const { rendered = __( '(Untitled)', 'events-gutenberg' ) } = title;

	return trim( unescape( rendered ) );
};
