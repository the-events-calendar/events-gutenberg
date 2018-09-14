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
import { NumericLabel } from '@moderntribe/tickets/elements';

const getCapacityLabel = ( capacity ) => {
	const singular = __( '%d available', 'events-gutenberg' );
	const plural = singular;
	const fallback = null;

	return (
		<NumericLabel
			count={ parseInt( capacity ) }
			singular={ singular }
			plural={ plural }
			fallback={ fallback }
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
			<h3 className="tribe-editor__rsvp-container-header__title">{ title }</h3>
			{ description && (
					<span className="tribe-editor__rsvp-container-header__description">
						{ description }
					</span>
			) }
			{ getCapacityLabel( capacity ) }
		</Fragment>
	)
};

RSVPContainerHeader.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	capacity: PropTypes.string,
};

export default RSVPContainerHeader;
