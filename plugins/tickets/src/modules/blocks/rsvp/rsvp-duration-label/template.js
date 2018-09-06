/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { LabelWithTooltip } from '@moderntribe/tickets/elements';

const RSVPDurationLabel = () => (
	<LabelWithTooltip
		className="tribe-editor__rsvp-duration__duration-label"
		label="Duration"
		// @TODO: get dashicon for tooltip label
		tooltipLabel={ 'icon' }
		// @TODO: get tooltip text based on post type
		tooltipText={ 'By default, sales will begin as soon as you save the ticket and end when the event begins' }
	/>
);

export default RSVPDurationLabel;
