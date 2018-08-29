/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.pcss';

const Row = ( { children, className } ) => {
	return (
		<div className={ classnames( 'tribe-events-pro__row', className ) }>
			{ children }
		</div>
	);
};

Row.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default Row;
