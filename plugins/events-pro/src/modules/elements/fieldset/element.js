/**
 * External Dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.pcss';

const Fieldset = ( { children, className } ) => (
	<fieldset className={ classnames( 'tribe-editor__events-pro__fieldset', className ) }>
		{ children }
	</fieldset>
);

Fieldset.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

export default Fieldset;
