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

// @todo: no idea how to get an appropriate URL loaded in here
const attendeeRegistrationURL = 'edit.php?post_type=tribe_events&page=attendee-registration&ticket_id=80';

// @todo: replace this altogether.
const modalContent = __(
	'Adding Attendee Fields is not yet supported in the Gutenberg block editor.',
	'events-gutenberg',
);

// @todo: only show the link here after a ticket has been saved, having a ticket ID
const RSVPAttendeeRegistration = ( { isDisabled } ) => (
	<div>
		<LabelWithModal
			className="tribe-editor__rsvp__attendee-registration"
			closeButtonLabel={ closeButtonLabel }
			label={ label }
			modalButtonDisabled={ isDisabled }
			modalButtonLabel={ modalButtonLabel }
			modalContent={ modalContent }
		/>
		<div><a href={ attendeeRegistrationURL }>{ label }</a></div>
	</div>
);

RSVPAttendeeRegistration.propTypes = {
	isDisabled: PropTypes.bool,
};

export default RSVPAttendeeRegistration;
