/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import './style.pcss';

const AddField = ( { children, onClick } ) => {
	return (
		<section className="tribe-events-pro__add-field">
			<button
				className="tribe-events-pro__add-field__button"
				onClick={ onClick }
				type="button"
			>
				<span className="tribe-events-pro__add-field__button__plus">+</span>
				<span>{ children }</span>
			</button>
		</section>
	);
};

AddField.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default AddField;
