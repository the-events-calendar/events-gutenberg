/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { Tooltip as WpTooltip } from '@wordpress/components';

const Tooltip = ( {
	label,
	labelClassName,
	position,
	text,
} ) => (
	<WpTooltip text={ text } position={ position }>
		<Button
			aria-label={ text }
			className={ classNames( 'tribe-editor__tooltip-label', labelClassName ) }
			label={ label }
		/>
	</WpTooltip>
);

Tooltip.defaultProps = {
	position: 'top right',
};

Tooltip.propTypes = {
	label: PropTypes.node,
	labelClassName: PropTypes.string,
	position: PropTypes.oneOf( [
		'top left',
		'top center',
		'top right',
		'bottom left',
		'bottom center',
		'bottom right',
	] ),
	text: PropTypes.string.isRequired,
};
