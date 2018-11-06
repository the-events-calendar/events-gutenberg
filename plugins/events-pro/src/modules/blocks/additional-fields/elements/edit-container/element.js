/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import {
	Heading,
	Paragraph,
} from '@moderntribe/common/elements';
import './style.pcss';

const EditContainer = ( { name, children, className } ) => (
	<div className={ classNames( 'tribe-editor__additional-fields__edit', className ) }>
		<div className="tribe-editor__aditional-fields__content">
			<Heading level={ 2 } className="tribe-editor__additional-fields__edit-title">
				{ name }
			</Heading>
			<Paragraph>{ children }</Paragraph>
		</div>
	</div>
);

EditContainer.propTypes = {
	name: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default EditContainer;
