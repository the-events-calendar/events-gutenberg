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
import { LabelWithLink } from '@moderntribe/common/elements';
import './style.pcss';

const label = __( 'Attendee Registration', 'events-gutenberg' );

const linkText = __( '+ Add', 'events-gutenberg' );

const RSVPAttendeeRegistration = ( {
	attendeeRegistrationURL,
	isDisabled,
} ) => (
	<LabelWithLink
		className="tribe-editor__rsvp__attendee-registration"
		label={ label }
		linkDisabled={ isDisabled }
		linkHref={ attendeeRegistrationURL }
		linkTarget="_blank"
		linkText={ linkText }
	/>
);

RSVPAttendeeRegistration.propTypes = {
	attendeeRegistrationURL: PropTypes.string,
	isDisabled: PropTypes.bool,
};

export default RSVPAttendeeRegistration;
