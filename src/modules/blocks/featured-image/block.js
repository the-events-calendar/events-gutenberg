/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, compose } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { Placeholder, Spinner, withAPIData } from '@wordpress/components';

import {
	InspectorControls,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */

/**
 * Module Code
 */

class FeaturedImage extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		return [
			this.renderUI(),
		];
	}

	renderUI() {
		return (
			<section key="featured-image" className="tribe-editor__block">
				<div className="tribe-editor__featured-image">
					{ this.renderImage() }
				</div>
			</section>
		);
	}

	renderImage() {
		const { image } = this.props;
		if ( null === image ) {
			return this.renderPlaceholder();
		}

		if ( undefined === image ) {
			return this.renderLoading();
		}

		return (
			<img src={ image.source_url } />
		);
	}

	renderPlaceholder() {
		return (
			<Placeholder
				style={ { minHeight: 150 } }
				key="placeholder"
				icon="format-image"
				instructions={ __( 'Use the Featured Image section on your Sidebar to setup an image here', 'events-gutenberg' ) }
			>
			</Placeholder>
		);
	}

	renderLoading() {
		return (
			<Placeholder
				style={ { minHeight: 150 } }
				key="placeholder"
				instructions={ __( 'Loading the Image', 'events-gutenberg' ) }
			>
				<Spinner/>
			</Placeholder>
		);
	}
}

const applySelect = withSelect( ( select, props ) => {
	const { getMedia, getPostType } = select( 'core' );
	const { getEditedPostAttribute } = select( 'core/editor' );
	const featuredImageId = getEditedPostAttribute( 'featured_media' );

	return {
		image: featuredImageId ? getMedia( featuredImageId ) : null,
	};
} );

export default applySelect( FeaturedImage );
