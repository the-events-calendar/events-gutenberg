/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { NumericLabel } from '@moderntribe/tickets/elements';
import './style.pcss';

const getTitle = ( isSelected, onTempTitleChange, tempTitle, title ) => (
	isSelected
		? <AutosizeInput
			className="tribe-editor__rsvp-container-header__title-input"
			value={ tempTitle }
			placeholder={ __( 'RSVP Title', 'events-gutenberg' ) }
			onChange={ onTempTitleChange }
		/>
		: <h2 className="tribe-editor__rsvp-container-header__title">{ title }</h2>
);

const getDescription = (
	isSelected,
	onTempDescriptionChange,
	tempDescription,
	description,
) => (
	isSelected
		? <AutosizeInput
			className="tribe-editor__rsvp-container-header__description-input"
			value={ tempDescription }
			placeholder={ __( 'description', 'events-gutenberg' ) }
			onChange={ onTempDescriptionChange }
		/>
		: description && (
			<span className="tribe-editor__rsvp-container-header__description">
				{ description }
			</span>
		)
);

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
	capacity,
	description,
	isSelected,
	onTempDescriptionChange,
	onTempTitleChange,
	tempDescription,
	tempTitle,
	title,
} ) => {
	return (
		<Fragment>
			<div className="tribe-editor__rsvp-container-header__header-details">
				{ getTitle( isSelected, onTempTitleChange, tempTitle, title ) }
				{ getDescription(
					isSelected,
					onTempDescriptionChange,
					tempDescription,
					description,
				) }
				{ getCapacityLabel( capacity ) }
			</div>
			<div className="tribe-editor__rsvp-container-header__counters">
			</div>
		</Fragment>
	)
};

RSVPContainerHeader.propTypes = {
	capacity: PropTypes.string,
	description: PropTypes.string,
	isSelected: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
};

export default RSVPContainerHeader;
