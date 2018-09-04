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
	text,
} ) => {
	const attrs = {
		'aria-label': text,
	};

	return (
		<WpTooltip text={ text } position={ position}>
			<Button
				attrs={ attrs }
				className={ classNames( 'tribe-editor__tooltip-icon', iconClassName ) }
				label={ label }
			/>
		</WpTooltip>
	)
};

Tooltip.defaultProps = {
	position: 'top right',
};

Tooltip.propTypes = {
	label: PropTypes.node,
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
