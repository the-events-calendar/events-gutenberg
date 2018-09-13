/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { MediaUpload } from '@wordpress/editor';
import { noop } from 'lodash';

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

const HeaderImage = ( { title, description, buttonLabel, onSelect, mediaId } ) => (
	<div className="tribe-editor__header-image">
		{ title && <h3 className="tribe-editor__header-image__title">{ title }</h3> }
		<div className="tribe-editor__header-image__content">
			{ description && (
				<div className="tribe-editor__header-image__description">{ description }</div>
			) }
			<MediaUpload
				onSelect={ onSelect }
				type="image"
				value={ mediaId }
				render={ renderMediaUpload }
			/>
		</div>
	</div>
);

HeaderImage.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	mediaId: PropTypes.number,
	onSelect: PropTypes.func.isRequired,
};

HeaderImage.defaultProps = {
	title: __( 'Header Image', 'events-gutenberg' ),
	/* eslint-disable max-len */
	description: __(
		'Select an image from your Media Library to display on emailed tickets. For best results, use a .jpg, .png, or .gif at least 1160px wide.',
		'events-gutenberg'
	),
	onSelect: noop,
};

export default HeaderImage;
