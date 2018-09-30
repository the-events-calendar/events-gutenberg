/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { LabelWithModal } from '@moderntribe/common/elements';
import './style.pcss';

/* eslint-disable-next-line max-len */
const AttendeesRegistration = ( { attendeeRegistrationLabel, attendeeButtonLabel, closeButtonLabel } ) => (
	<LabelWithModal
		className="tribe-editor__ticket__attendee-registration"
		closeButtonLabel={ closeButtonLabel }
		label={ attendeeRegistrationLabel }
		modalButtonLabel={ attendeeButtonLabel }
	/>
);

AttendeesRegistration.propTypes = {
	attendeeRegistrationLabel: PropTypes.string,
	attendeeButtonLabel: PropTypes.string,
	closeButtonLabel: PropTypes.string,
	attendeeButtonClick: PropTypes.func,
};

AttendeesRegistration.defaultProps = {
	attendeeRegistrationLabel: __( 'Attendee Registration', 'events-gutenberg' ),
	attendeeButtonLabel: __( '+Add', 'events-gutenberg' ),
	closeButtonLabel: __( 'close', 'events-gutenberg' ),
	attendeeButtonClick: noop,
};

export default AttendeesRegistration;
