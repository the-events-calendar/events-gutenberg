/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.pcss';

const AddField = ( { children, noBorder, onClick } ) => (
	<aside className={ classnames( 'tribe-events-pro__add-field', {
		'tribe-events-pro__add-field--no-border': noBorder,
	} ) }
	>
		<button
			className="tribe-events-pro__add-field__button"
			onClick={ onClick }
			type="button"
		>
			<span className="tribe-events-pro__add-field__button__plus">+</span>
			<span>{ children }</span>
		</button>
	</aside>
);

AddField.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	noBorder: PropTypes.bool,
};

export default AddField;
