/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ImageUpload } from '@moderntribe/common/elements';

const RSVPHeaderImage = ( {
	image,
	isLoading,
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
		className: classNames(
			'tribe-editor__rsvp__image-upload',
			{ 'tribe-editor__rsvp__image-upload--loading': isLoading },
		),
		buttonLabel: __( 'Upload Image', 'events-gutenberg' ),
		image,
		onRemove,
		onSelect,
	};

	return (
		<Fragment>
			<ImageUpload { ...imageUploadProps } />
			{ isLoading && <Spinner /> }
		</Fragment>
	);
};

RSVPHeaderImage.propTypes = {
	image: PropTypes.shape( {
		alt: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		src: PropTypes.string.isRequired,
	} ).isRequired,
	isLoading: PropTypes.bool.isRequired,
	onRemove: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default RSVPHeaderImage;
