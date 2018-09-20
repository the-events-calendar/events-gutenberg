/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import RSVPContainer from './rsvp-container/template';
import RSVPDashboard from './rsvp-dashboard/container';
import './style.pcss';

const RSVP = ( { isSelected } ) => (
	<div className={ classNames(
		'tribe-editor__rsvp',
		{ 'tribe-editor__rsvp--selected': isSelected },
	) }>
		<RSVPContainer isSelected={ isSelected } />
		<RSVPDashboard isSelected={ isSelected } />
	</div>
);

RSVP.propTypes = {
	isSelected: PropTypes.bool.isRequired,
};

export default RSVP;
