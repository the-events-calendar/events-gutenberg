/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wordpress dependencies
 */
import {
	TextControl,
	PanelBody,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Settings } from '../elements';
import './style.pcss';

const CheckboxSettings = ( props ) => {

	const {
		name,
		listDividerOnChange,
		listDividerValue,
		listEnderOnChange,
		listEnderValue,
	} = props;

	const After = () => (
		<PanelBody title={ __( 'Custom Dividers', 'events-gutenberg' ) }>
			<TextControl
				label={ __( 'List divider', 'events-gutenberg' ) }
				value={ listDividerValue }
				onChange={ listDividerOnChange }
				className="tribe-editor__additional-fields__divider-settings"
			/>
			<TextControl
				label={ __( 'List ender', 'events-gutenberg' ) }
				value={ listEnderValue }
				onChange={ listEnderOnChange }
				className="tribe-editor__additional-fields__divider-settings"
			/>
		</PanelBody>
	);

	return (
		<Settings name={ name } after={ <After /> } />
	);
};

CheckboxSettings.propTypes = {
	name: PropTypes.string.isRequired,
	listDividerValue: PropTypes.string,
	listDividerOnChange: PropTypes.func,
	listEnderValue: PropTypes.string,
	listEnderOnChange: PropTypes.func,
};

CheckboxSettings.defaultProps = {
	listDividerValue: ' , ',
	listEnderValue: ' & ',
};

export default CheckboxSettings;

