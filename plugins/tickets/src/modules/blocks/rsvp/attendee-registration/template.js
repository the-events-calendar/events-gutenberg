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
import { LabelWithModal } from '@moderntribe/common/elements';
import './style.pcss';

const closeButtonLabel = __( 'close', 'events-gutenberg' );

const label = __( 'Attendee Registration', 'events-gutenberg' );

const modalButtonLabel = __( '+ Add', 'events-gutenberg' );

const modalContent = __(
	'Adding Attendee Fields is not yet supported in the Gutenberg block editor.',
	'events-gutenberg',
);

const RSVPAttendeeRegistration = ( { isDisabled } ) => (
	<LabelWithModal
		className="tribe-editor__rsvp__attendee-registration"
		closeButtonLabel={ closeButtonLabel }
		label={ label }
		modalButtonDisabled={ isDisabled }
		modalButtonLabel={ modalButtonLabel }
		modalContent={ modalContent }
	/>
);

RSVPAttendeeRegistration.propTypes = {
	isDisabled: PropTypes.bool,
};

export default RSVPAttendeeRegistration;
