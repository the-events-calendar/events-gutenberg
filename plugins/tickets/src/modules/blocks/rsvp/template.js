/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import RSVPContainer from './container/container';
import RSVPDashboard from './dashboard/container';
import RSVPInactiveBlock from './inactive-block/container';
import './style.pcss';

const RSVP = ( { created, isInactive, isSelected } ) => (
	! isSelected && ( ( created && isInactive ) || ! created )
		? <RSVPInactiveBlock />
		: (
			<div className={ classNames(
				'tribe-editor__rsvp',
				{ 'tribe-editor__rsvp--selected': isSelected },
			) }>
				<RSVPContainer isSelected={ isSelected } />
				<RSVPDashboard isSelected={ isSelected } />
			</div>
		)
);

RSVP.propTypes = {
	created: PropTypes.bool.isRequired,
	isInactive: PropTypes.bool.isRequired,
	isSelected: PropTypes.bool.isRequired,
};

export default RSVP;
