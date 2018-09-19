/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
import { Close as CloseIcon } from '@moderntribe/common/icons';
import './style.pcss';

export const renderImageUploadButton = ( label ) => ( { open } ) => (
	<Button
		onClick={ open }
		className={ [ 'tribe-editor__button--sm', 'tribe-editor__image-upload__upload-button' ] }
	>
		{ label }
	</Button>
);

export const renderImage = ( imageAlt, imageSrc, onRemove ) => (
	<div className="tribe-editor__image-upload__image-wrapper">
		<img
			src={ imageSrc }
			alt={ imageAlt }
			className="tribe-editor__image-upload__image"
		/>
		<Button
			className="tribe-editor__image-upload__remove-button"
			onClick={ onRemove }
		>
			<CloseIcon />
			<span className="tribe-editor__image-upload__remove-button-text">
				{ __( 'remove', 'events-gutenberg' ) }
			</span>
		</Button>
	</div>
);

const ImageUpload = ( {
	buttonLabel,
	className,
	description,
	imageAlt,
	imageSrc,
	onRemove,
	onSelect,
	title,
} ) => (
	<div className={ classNames(
		'tribe-editor__image-upload',
		{ 'tribe-editor__image-upload--has-image': imageSrc },
		className,
	) }>
		{ title && <h3 className="tribe-editor__image-upload__title">{ title }</h3> }
		<div className="tribe-editor__image-upload__content">
			{ description && (
				<p className="tribe-editor__image-upload__description">{ description }</p>
			) }
			{
				imageSrc
					? renderImage( imageAlt, imageSrc, onRemove )
					: (
						<MediaUpload
							onSelect={ onSelect }
							type="image"
							render={ renderImageUploadButton( buttonLabel ) }
						/>
					)
			}
		</div>
	</div>
);

ImageUpload.propTypes = {
	buttonLabel: PropTypes.string,
	className: PropTypes.string,
	description: PropTypes.string,
	imageAlt: PropTypes.string,
	imageSrc: PropTypes.string,
	onRemove: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	title: PropTypes.string,
};

ImageUpload.defaultProps = {
	onRemove: noop,
	onSelect: noop,
};

export default ImageUpload;
