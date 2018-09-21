/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import RSVPDurationLabel from '../rsvp-duration-label/container';
import RSVPDurationPicker from '../rsvp-duration-picker/container';
import './style.pcss';

const RSVPDuration = () => (
	<div className="tribe-editor__rsvp-duration">
		<RSVPDurationLabel />
		<RSVPDurationPicker />
	</div>
);

export default RSVPDuration;
