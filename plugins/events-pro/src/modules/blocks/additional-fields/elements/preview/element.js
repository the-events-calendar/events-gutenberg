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

const Preview = ( { name, children, className } ) => (
	<div className={ classNames( 'tribe-editor__additional-fields__preview', className ) }>
		<Heading level={ 2 } className="tribe-editor__additional-fields__preview-title">
			{ name }
		</Heading>
		<Paragraph>{ children }</Paragraph>
	</div>
);

Preview.propTypes = {
	name: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
}

export default Preview;
