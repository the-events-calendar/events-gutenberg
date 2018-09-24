/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Image = ( {
	alt,
	className,
	src,
	...props,
} ) => (
	<img
		src={ src }
		alt={ alt }
		className={ classNames( 'tribe-editor__image', className ) }
		{ ...props }
	/>
);

Image.propTypes = {
	alt: PropTypes.string.isRequired,
	className: PropTypes.string,
	src: PropTypes.string.isRequired,
};

export default Image;
