/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { MediaUpload } from '@wordpress/editor';
import noop from 'lodash/noop';
import partial from 'lodash/partial';

/**
 * Internal dependencies
 */
import { Button } from '@moderntribe/common/elements';
import './style.pcss';

export const renderMediaUpload = ( { open } ) => (
	<Button
		onClick={ open }
		className={ [ 'tribe-editor__btn--label', 'tribe-editor__header-image__btn--upload' ] }
	>
		{ __( 'Upload Image', 'events-gutenberg' ) }
	</Button>
);

const HeaderImage = ( props ) => {
	const { title, description, buttonLabel, onSelect, mediaId, image, removeLabel } = props;

	const maybeRenderTitle = title && (
		<h3 className="tribe-editor__header-image__title">{ title }</h3>
	);

	const maybeRenderDescription = description && (
		<div className="tribe-editor__header-image__description">{ description }</div>
	);

	const maybeRenderImage = ( image && image.url ) && (
		<figure className="tribe-editor__header-image__display">
			<img src={ image.url } alt={ title } />
			<button className="tribe-editor__btn--label" onClick={ partial( onSelect, null ) }>
				{ removeLabel }
			</button>
		</figure>
	);

	return (
		<div className="tribe-editor__header-image">
			{ maybeRenderTitle }
			<div className="tribe-editor__header-image__content">
				{ maybeRenderDescription }
				<MediaUpload
					onSelect={ onSelect }
					type="image"
					value={ mediaId }
					render={ renderMediaUpload }
				/>
			</div>
			{ maybeRenderImage }
		</div>
	);
};

HeaderImage.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	mediaId: PropTypes.number,
	onSelect: PropTypes.func.isRequired,
	removeLabel: PropTypes.string,
	image: PropTypes.shape( {
		height: PropTypes.number,
		width: PropTypes.number,
		url: PropTypes.string,
		orientation: PropTypes.string,
	} ),
};

HeaderImage.defaultProps = {
	title: __( 'Header Image', 'events-gutenberg' ),
	description: __(
		/* eslint-disable-next-line max-len */
		'Select an image from your Media Library to display on emailed tickets. For best results, use a .jpg, .png, or .gif at least 1160px wide.',
		'events-gutenberg'
	),
	removeLabel: __( 'Remove', 'events-gutenberg' ),
	onSelect: noop,
};

export default HeaderImage;
