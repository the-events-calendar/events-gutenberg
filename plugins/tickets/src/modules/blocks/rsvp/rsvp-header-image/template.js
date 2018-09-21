/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { ImageUpload } from '@moderntribe/common/elements';

const RSVPHeaderImage = ( {
	headerImageAlt,
	headerImageSrc,
	onRemove,
	onSelect
} ) => {
	const imageUploadProps = {
		title: __( 'Ticket Header Image', 'events-gutenberg' ),
		description: __(
			/* eslint-disable-next-line max-len */
			'Select an image from your Media Library to display on emailed tickets. For best results, use a .jpg, .png, or .gif at least 1160px wide.',
			'events-gutenberg'
		),
		className: 'tribe-editor__rsvp__image-upload',
		buttonLabel: __( 'Upload Image', 'events-gutenberg' ),
		onRemove: onRemove,
		onSelect: onSelect,
		imageAlt: headerImageAlt,
		imageSrc: headerImageSrc,
	};

	return <ImageUpload { ...imageUploadProps } />;
};

RSVPHeaderImage.propTypes = {
	headerImageAlt: PropTypes.string,
	headerImageSrc: PropTypes.string,
	onRemove: PropTypes.func,
	onSelect: PropTypes.func,
};

export default RSVPHeaderImage;
