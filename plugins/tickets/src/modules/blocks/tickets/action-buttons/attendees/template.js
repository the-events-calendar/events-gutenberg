/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { User as UserIcon } from '@moderntribe/common/src/modules/icons';

const AttendeesActionButton = ( { href, hasProviders } ) => ( hasProviders && (
	<a
		className="tribe-editor__action-link"
		href={ href }
		target="_blank"
		rel="noopener noreferrer"
	>
		<UserIcon />
		<span>{ __( 'Attendees', 'events-gutenberg' ) }</span>
	</a>
) );

AttendeesActionButton.propTypes = {
	href: PropTypes.string.isRequired,
	hasProviders: PropTypes.bool,
};

export default AttendeesActionButton;
