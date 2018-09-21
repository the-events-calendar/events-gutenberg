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
import { Button } from '@moderntribe/common/elements';
import './style.pcss';

const AttendeesRegistration = ( props ) => {
	const {
		attendeeRegistrationLabel,
		attendeeButtonLabel,
		attendeeButtonClick,
	} = props;

	return (
		<div className="tribe-editor__tickets-attendee">
			<span>{ attendeeRegistrationLabel }</span>
			<Button className="tribe-editor__btn--label" onClick={ attendeeButtonClick }>
				{ attendeeButtonLabel }
			</Button>
		</div>
	);
};

AttendeesRegistration.propTypes = {
	attendeeRegistrationLabel: PropTypes.string,
	attendeeButtonLabel: PropTypes.string,
	attendeeButtonClick: PropTypes.func,
};

AttendeesRegistration.defaultProps = {
	attendeeRegistrationLabel: __( 'Attendee Registration', 'events-gutenberg' ),
	attendeeButtonLabel: __( '+Add', 'events-gutenberg' ),
	attendeeButtonClick: noop,
};

export default AttendeesRegistration;
