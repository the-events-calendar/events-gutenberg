/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { MediaUpload } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { Button } from '@moderntribe/common/elements';
import './style.pcss';

export const renderMediaUpload = ( label ) => ( { open } ) => (
	<Button
		onClick={ open }
		className={ [ 'tribe-editor__button--sm', 'tribe-editor__image-upload__upload-button' ] }
	>
		{ label }
	</Button>
);

const ImageUpload = ( { title, description, buttonLabel, onSelect, mediaId } ) => (
	<div className="tribe-editor__image-upload">
		{ title && <h3 className="tribe-editor__image-upload__title">{ title }</h3> }
		<div className="tribe-editor__image-upload__content">
			{ description && (
				<p className="tribe-editor__image-upload__description">{ description }</p>
			) }
			<MediaUpload
				onSelect={ onSelect }
				type="image"
				value={ mediaId }
				render={ renderMediaUpload( buttonLabel ) }
			/>
		</div>
	</div>
);

ImageUpload.propTypes = {
	buttonLabel: PropTypes.string,
	description: PropTypes.string,
	mediaId: PropTypes.number,
	onSelect: PropTypes.func.isRequired,
	title: PropTypes.string,
};

ImageUpload.defaultProps = {
	onSelect: noop,
};

export default ImageUpload;
