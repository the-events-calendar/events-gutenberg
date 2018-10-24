/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

const Textarea = ( { className, ...rest } ) => (
	<textarea className={ classNames( 'tribe-editor__textarea', className ) } { ...rest } />
);

Textarea.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string.isRequired,
};

export default Textarea;
