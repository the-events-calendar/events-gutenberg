/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { Tooltip } from '@moderntribe/common/elements';

const RSVPDuration = ( {
	label,
	tooltipIcon,
	tooltipText,
} ) => {
	return (
		<div className="tribe-editor__rsvp-duration">
			<div className="tribe-editor__rsvp-duration__label">
				<span className="tribe-editor__rsvp-duration__label-text">
					{ label }
				</span>
				{/* @TODO: Fill in with icon */}
				<Tooltip label={ 'icon' } text="placeholder text" />
			</div>
			{/* <DateTimeRangePicker /> */}
			</div>
	);
};

RSVPDuration.propTypes = {
	label: PropTypes.string,
	tooltipIcon: PropTypes.node,
	tooltipText: PropTypes.string,
};

export default RSVPDuration;
