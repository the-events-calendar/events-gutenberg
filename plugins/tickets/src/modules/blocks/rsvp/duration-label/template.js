/**
 * External dependencies
 */
import React from 'react';

/**
 * WordPress dependencies
 */
import { Dashicon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { LabelWithTooltip } from '@moderntribe/tickets/elements';
import './style.pcss';

const tooltipLabel = (
	<Dashicon
		className="tribe-editor__rsvp-duration__duration-tooltip-label"
		icon="info-outline"
	/>
);

const RSVPDurationLabel = ( { tooltipDisabled } ) => (
	<LabelWithTooltip
		className="tribe-editor__rsvp-duration__duration-label"
		label="Duration"
		tooltipDisabled={ tooltipDisabled }
		tooltipLabel={ tooltipLabel }
		// @TODO: get tooltip text based on post type
		tooltipText={ 'By default, sales will begin as soon as you save the ticket and end when the event begins' }
	/>
);

export default RSVPDurationLabel;
