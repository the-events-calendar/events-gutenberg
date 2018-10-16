/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.pcss';

export const SIZES = {
	medium: 'medium',
	small: 'small',
};

const Paragraph = ( { children, size, className } ) => (
	<div
		className={
			classNames(
				'tribe-editor__paragraph',
				`tribe-editor__paragraph--${ size }`,
				className,
			)
		}
	>
		{ children }
	</div>
);

Paragraph.propTypes = {
	children: PropTypes.node.isRequired,
	size: PropTypes.oneOf( Object.keys( SIZES ) ),
};

Paragraph.defaultProps = {
	size: SIZES.medium,
};

export default Paragraph;
