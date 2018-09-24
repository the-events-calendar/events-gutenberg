/**
 * External dependencies
 */
import React from 'react';

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

const RSVPAttendeeRegistration = () => (
	<LabelWithModal
		className="tribe-editor__rsvp__attendee-registration"
		closeButtonLabel={ closeButtonLabel }
		label={ label }
		modalButtonLabel={ modalButtonLabel }
	/>
);

export default RSVPAttendeeRegistration;
