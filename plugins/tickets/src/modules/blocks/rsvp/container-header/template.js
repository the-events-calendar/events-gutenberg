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
import RSVPCounters from '@moderntribe/tickets/blocks/rsvp/counters/container';
import { NumericLabel } from '@moderntribe/tickets/elements';
import './style.pcss';

const getTitle = (
	isDisabled,
	isSelected,
	onTempTitleChange,
	tempTitle,
	title,
) => (
	isSelected
		? <AutosizeInput
			className="tribe-editor__rsvp-container-header__title-input"
			value={ tempTitle }
			placeholder={ __( 'RSVP Title', 'events-gutenberg' ) }
			onChange={ onTempTitleChange }
			disabled={ isDisabled }
		/>
		: <h2 className="tribe-editor__rsvp-container-header__title">{ title }</h2>
);

const getDescription = (
	isDisabled,
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
			disabled={ isDisabled }
		/>
		: description && (
			<span className="tribe-editor__rsvp-container-header__description">
				{ description }
			</span>
		)
);

const getCapacityLabel = ( capacity ) => {
	// todo: should use _n to be translator friendly
	const singular = __( '%d available', 'events-gutenberg' );
	const plural = singular;

	return (
		<NumericLabel
			count={ capacity }
			singular={ singular }
			plural={ plural }
			useFallback={ false }
			className="tribe-editor__rsvp-container-header__capacity-label"
		/>
	)
};

const RSVPContainerHeader = ( {
	description,
	isDisabled,
	isSelected,
	onTempDescriptionChange,
	onTempTitleChange,
	tempDescription,
	tempTitle,
	title,
	available,
} ) => {
	return (
		<Fragment>
			<div className="tribe-editor__rsvp-container-header__header-details">
				{ getTitle(
					isDisabled,
					isSelected,
					onTempTitleChange,
					tempTitle,
					title,
				) }
				{ getDescription(
					isDisabled,
					isSelected,
					onTempDescriptionChange,
					tempDescription,
					description,
				) }
				{ getCapacityLabel( available ) }
			</div>
			<RSVPCounters />
		</Fragment>
	)
};

RSVPContainerHeader.propTypes = {
	available: PropTypes.number,
	description: PropTypes.string,
	isDisabled: PropTypes.bool.isRequired,
	isSelected: PropTypes.bool.isRequired,
	onTempDescriptionChange: PropTypes.func,
	onTempTitleChange: PropTypes.func,
	tempDescription: PropTypes.string,
	tempTitle: PropTypes.string,
	title: PropTypes.string,
};

export default RSVPContainerHeader;
