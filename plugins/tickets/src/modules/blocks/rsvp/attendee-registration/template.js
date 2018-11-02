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

const RSVPAttendeeRegistration = ( {
	attendeeRegistrationURL,
	isDisabled,
} ) => {
	const modalContent = (
		<iframe
			className="tribe-editor__rsvp__attendee-registration-iframe"
			src={ attendeeRegistrationURL }
		/>
	);

	return (
		<LabelWithModal
			className="tribe-editor__rsvp__attendee-registration"
			closeButtonLabel={ closeButtonLabel }
			label={ label }
			modalButtonDisabled={ isDisabled }
			modalButtonLabel={ modalButtonLabel }
			modalClassName="tribe-editor__rsvp__attendee-registration-modal"
			modalContent={ modalContent }
			modalOverlayClassName="tribe-editor__rsvp__attendee-registration-modal-overlay"
		/>
	);
};

RSVPAttendeeRegistration.propTypes = {
	attendeeRegistrationURL: PropTypes.string,
	isDisabled: PropTypes.bool,
};

export default RSVPAttendeeRegistration;
