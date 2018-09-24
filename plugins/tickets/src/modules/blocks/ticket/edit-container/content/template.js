/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Capacity from './capacity/template';
import AdvancedOptions from './advanced-options/template';
import AttendeesRegistration from './attendees-registration/template';

import './style.pcss';

const TicketEditContent = () => (
	<div className="tribe-editor__ticket-container__content">
		<Capacity />
		<AdvancedOptions />
		<AttendeesRegistration />
	</div>
);

export default TicketEditContent;
