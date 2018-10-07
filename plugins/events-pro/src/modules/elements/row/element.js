/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.pcss';

const Row = ( { children, className } ) => (
	<div className={ classnames( 'tribe-editor__events-pro__row', className ) }>
		{ children }
	</div>
);

Row.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default Row;
