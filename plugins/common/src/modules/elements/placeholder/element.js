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

const Placeholder = ( { children, className } ) => (
	<div className={ classNames( 'tribe-editor__additional-fields__placeholder', className ) }>
		{ children }
	</div>
);

Placeholder.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.oneOfType(
		PropTypes.string,
		PropTypes.array,
		PropTypes.object,
	),
};

Placeholder.defaultProps = {
	className: [],
};

export default Placeholder;
