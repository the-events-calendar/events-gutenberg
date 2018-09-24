/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Wordpress dependencies
 */
import { InnerBlocks } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import Availability from '../availability/element';

const TicketContainer = ( { isSelected } ) => (
	<div className="tribe-editor__ticket-container">
		<div className="tribe-editor__tickets-body">
			<InnerBlocks />
		</div>
		{ isSelected && <Availability available={ 48 } total={ 168 } /> }
	</div>
);

TicketContainer.propTypes = {
	isSelected: PropTypes.bool,
};

export default TicketContainer;
