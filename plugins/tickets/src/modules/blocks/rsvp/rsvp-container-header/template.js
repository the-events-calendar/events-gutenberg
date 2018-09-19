/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import RSVPCounters from '@moderntribe/tickets/blocks/rsvp/rsvp-counters/container';
import { NumericLabel } from '@moderntribe/tickets/elements';
import './style.pcss';

const getCapacityLabel = ( capacity ) => {
	const singular = __( '%d available', 'events-gutenberg' );
	const plural = singular;

	return (
		<NumericLabel
			count={ parseInt( capacity ) }
			singular={ singular }
			plural={ plural }
			className="tribe-editor__rsvp-container-header__capacity-label"
		/>
	)
};

const RSVPContainerHeader = ( {
	title,
	description,
	capacity,
} ) => {
	return (
		<Fragment>
			<div className="tribe-editor__rsvp-container-header__header-details">
				<h2 className="tribe-editor__rsvp-container-header__title">{ title }</h2>
				{ description && (
						<span className="tribe-editor__rsvp-container-header__description">
							{ description }
						</span>
				) }
				{ getCapacityLabel( capacity ) }
			</div>
			<RSVPCounters />
		</Fragment>
	)
};

RSVPContainerHeader.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	capacity: PropTypes.string,
};

export default RSVPContainerHeader;
