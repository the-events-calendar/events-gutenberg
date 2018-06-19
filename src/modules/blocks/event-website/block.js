/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { withDispatch, withSelect } from '@wordpress/data';
import { Component, compose } from '@wordpress/element';
import { Dashicon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { RichText, UrlInput } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import withSaveData from 'editor/hoc/with-save-data';
import { STORE_NAME } from 'data/details';
import './style.pcss';

/**
 * Module Code
 */

const placeholder = __( 'Add Button Text', 'events-gutenberg' );

class EventWebsite extends Component {
	static propTypes = {
		isSelected: PropTypes.bool,
		setAttributes: PropTypes.func,
		setUrl: PropTypes.func,
		attributes: PropTypes.object,
		url: PropTypes.string,
		urlLabel: PropTypes.string,
	};

	constructor() {
		super( ...arguments );
	}

	onLabelChange = ( urlLabel ) => {
		this.props.setAttributes( { urlLabel } );
	}

	render() {
		return (
			<div
				key="event-website"
				className="tribe-editor__block tribe-editor__event-website"
			>
				{ this.renderLink() }
			</div>
		);
	}

	renderLink() {
		const { isSelected, urlLabel } = this.props;

		if ( ! isSelected && ! urlLabel ) {
			return this.renderPlaceholder( placeholder );
		}

		return [
			this.renderLabelInput( placeholder ),
			this.renderUrlInput(),
		];
	}

	renderUrlInput() {
		const { isSelected, url } = this.props;

		const buttonLabel = url
			? __( 'Edit Website', 'events-gutenberg' )
			: __( 'Insert Website', 'events-gutenberg' );

		if ( ! isSelected ) {
			return null;
		}

		return (
			<div key="tribe-events-website-url" className="tribe-editor__event-website__url">
				<Dashicon icon="admin-links" />
				<UrlInput
					autoFocus={ false }
					value={ url }
					onChange={ ( url ) => this.setWebsiteUrl( { url } ) }
				/>
			</div>
		);
	}

	renderLabelInput() {
		const { urlLabel } = this.props;

		return (
			<div key='tribe-events-website-label' className="tribe-editor__event-website__label">
				<RichText
					id="tribe-events-website-link"
					className="tribe-editor__event-website__label-text"
					format="string"
					tagName="h4"
					value={ urlLabel }
					onChange={ this.onLabelChange }
					placeholder={ placeholder }
					formattingControls={ [] }
				/>
			</div>
		);
	}

	renderPlaceholder( urlLabel ) {
		return (
			<button
				className="tribe-editor__event-website__label tribe-editor__event-website__label--placeholder"
			>
				{ urlLabel }
			</button>
		);
	}

	setWebsiteUrl = ( data ) => {
		const { url } = data;
		const { setUrl } = this.props;
		setUrl( url );
	};
}

export default compose( [
	withSelect( ( select, props ) => {
		const { get } = select( STORE_NAME );
		const { urlLabel } = props.attributes;
		return {
			url: get( 'url' ),
			urlLabel,
		};
	} ),
	withDispatch( ( dispatch, props ) => {
		const { setWebsiteUrl } = dispatch( STORE_NAME );
		return {
			setUrl: setWebsiteUrl,
			setInitialState() {
				const { attributes } = props;
				const { url } = attributes;
				setWebsiteUrl( url );
			},
		};
	} ),
	withSaveData(),
] )( EventWebsite );
