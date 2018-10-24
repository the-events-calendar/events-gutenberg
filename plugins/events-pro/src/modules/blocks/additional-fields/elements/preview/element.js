/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isArray from 'lodash/isArray';

/**
 * Internal dependencies
 */
import {
	Heading,
	Paragraph,
} from '@moderntribe/common/elements';
import './style.pcss';

const Preview = ( { name, children, className } ) => {
	/**
	 * Pass the control into the caller to decide how to render each child on an array, can be
	 * a set of multiple paragraphs and to avoid the need to group a set of paragraphs inside another
	 * we leave the control to the caller if is an array.
	 */
	const body = isArray( children ) ? children : <Paragraph>{ children }</Paragraph>;
	return (
		<div className={ classNames( 'tribe-editor__additional-fields__preview', className ) }>
			<Heading level={ 2 } className="tribe-editor__additional-fields__preview-title">
				{ name }
			</Heading>
			{ body }
		</div>
	);
};

Preview.propTypes = {
	name: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Preview;
