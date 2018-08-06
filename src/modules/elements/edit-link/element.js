/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { config } from 'editor/utils/globals';
import './style.pcss';

const EditLink = ( { id, label, target } ) => {
	const admin = get( config(), 'admin_url', '' );
	if ( ! admin || ! id ) {
		return null;
	}

	const extraProps = {
		rel: '_blank' === target ? 'noreferrer noopener' : undefined,
	};

	return (
		<a
			className="tribe-editor__edit-link"
			href={ `${ admin }post.php?post=${ id }&action=edit` }
			target={ target }
			{ ...extraProps }
		>
			{ label }
		</a>
	);
};

EditLink.propTypes = {
	id: PropTypes.number,
	label: PropTypes.string,
	target: PropTypes.string,
};

EditLink.defaultProps = {
	id: 0,
	label: __( 'Edit', 'events-gutenberg' ),
	target: '_blank',
};

export default EditLink;
