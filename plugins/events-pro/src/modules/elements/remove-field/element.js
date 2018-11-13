/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import TrashIcon from '@moderntribe/events-pro/src/resources/icons/trash.svg';
import './style.pcss';

const RemoveField = ( { onClick } ) => (
	<button
		className="tribe-editor__events-pro__remove-field"
		onClick={ onClick }
		type="button"
	>
		<TrashIcon />
	</button>
);

RemoveField.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default RemoveField;
