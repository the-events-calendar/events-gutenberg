/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AutosizeInput from 'react-input-autosize';

/**
 * WordPress dependencies
 */
import { Dashicon } from '@wordpress/components';
import { UrlInput } from '@wordpress/editor';
import { sendValue } from 'editor/utils/input';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.pcss';

const placeholder = __( 'Add Button Text', 'events-gutenberg' );

const EventWebsite = ({ isSelected, url, urlLabel, setWebsite, setLabel }) => {

	const renderUrlInput = () => {
		if ( ! isSelected ) {
			return null;
		}

		return (
			<div key="tribe-events-website-url" className="tribe-editor__event-website__url">
				<Dashicon icon="admin-links" />
				<UrlInput
					autoFocus={ false }
					value={ url }
					onChange={ setWebsite }
				/>
			</div>
		);
	}

	const renderLabelInput = () => {
		const containerClassNames = classNames( {
			'tribe-editor__event-website__label': true,
			'tribe-editor__event-website__label--selected': isSelected,
		} );

		const isEmpty = urlLabel.trim() === '';
		const inputClassNames = classNames( {
			'tribe-editor__event-website__label-text': true,
			'tribe-editor__event-website__label-text--empty': isEmpty && isSelected,
		} );

		return (
			<div
				key="tribe-events-website-label"
				className={ containerClassNames }
			>
				<AutosizeInput
					id="tribe-events-website-link"
					className={ inputClassNames }
					value={ urlLabel }
					placeholder={ placeholder }
					onChange={ sendValue( setLabel ) }
				/>
			</div>
		);
	}

	const renderPlaceholder = ( placeholder ) => {
		const classes = [
			'tribe-editor__event-website__label',
			'tribe-editor__event-website__label--placeholder',
		];
		return (
			<button className={ classNames( classes ) }>
				{ placeholder }
			</button>
		);
	}

	const renderLink = () => {
		if ( ! isSelected && ! urlLabel ) {
			return renderPlaceholder( placeholder );
		}

		return [
			renderLabelInput( placeholder ),
			renderUrlInput(),
		];
	}

	return (
		<div className="tribe-editor__block tribe-editor__event-website">
			{ renderLink() }
		</div>
	);
}

EventWebsite.propTypes = {
	isSelected: PropTypes.bool,
	url: PropTypes.string,
	urlLabel: PropTypes.string,
	setWebsite: PropTypes.func,
	setLabel: PropTypes.func,
}

export default EventWebsite;
