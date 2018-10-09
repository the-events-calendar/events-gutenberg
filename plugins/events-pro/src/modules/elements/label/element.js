/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.pcss';

const Label = ( { children, className } ) => (
	<div className={ classnames( 'tribe-editor__events-pro__label', className ) }>
		<span className="tribe-editor__events-pro__label-text">{ children }</span>
	</div>
);

Label.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default Label;
