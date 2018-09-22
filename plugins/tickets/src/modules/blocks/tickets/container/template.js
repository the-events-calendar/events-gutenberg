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
import TicketEditContainer from '../edit-container/template';
import Availability from '../availability/element';

const TicketContainer = ( { isSelected } ) => {

	const availability = isSelected && (
		<Availability available={ 48 } total={ 168 } />
	);

	return (
		<Fragment>
			<div className="tribe-editor__tickets-body">
				<InnerBlocks />
			</div>
			{ availability }
			<TicketEditContainer />
		</Fragment>
	);
};

TicketContainer.propTypes = {
	isSelected: PropTypes.bool,
};

export default TicketContainer;
