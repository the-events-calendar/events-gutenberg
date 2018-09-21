/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import TicketsDashboard from './dashboard/template';
import TicketsContainer from './container/template';
import './style.pcss';

/*
	const {
		isSelected,
		// @todo limit the usage of the available blocks for this one, however at this point the
		// appender button is only available on the paragraph block
		// see https://github.com/WordPress/gutenberg/issues/8589 once is resolved we should be able
		// to address this one and limit this to only this property
		allowedBlockTypes,
	} = props;
	*/

const TicketsTemplate = ( { isSelected } ) => (
	<div
		className={ classNames(
			'tribe-editor__tickets-container',
			{ 'tribe-editor__tickets-container--selected': isSelected },
		) }
	>
		<TicketsContainer isSelected={ isSelected } />
		<TicketsDashboard isSelected={ isSelected } isSettingsOpen={ true } />
	</div>
);

TicketsTemplate.propTypes = {
	isSelected: PropTypes.bool,
};

TicketsTemplate.defaultProps = {
	isSelected: false,
};

export default TicketsTemplate;
