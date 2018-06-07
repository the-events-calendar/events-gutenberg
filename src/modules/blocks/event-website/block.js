/**
 * External dependencies
 */
import classNames from 'classnames';
import { noop, pick } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import {
	PanelBody,
	ToggleControl,
	IconButton,
	Dashicon,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
	PlainText,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */

import { store } from 'data/details';
import './style.pcss';

/**
 * Module Code
 */

export const VALID_PROPS = [
	'url',
];

export default class EventWebsite extends Component {
	constructor( props ) {
		super( ...arguments );

		this.state = props;
		this.unsubscribe = noop;
	}

	componentDidMount() {
		this.unsubscribe = store.subscribe( () => {
			const state = store.getState();
			this.setState( pick( state, VALID_PROPS ) );
		} );

		store.dispatch( {
			type: 'SET_INITIAL_STATE',
			values: pick( this.state, VALID_PROPS ),
		} );
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		return [ this.renderButton(), this.renderControls() ];
	}

	renderButton() {
		return (
			<div key="event-website" className="tribe-editor__block tribe-editor-event-website">
				{ this.renderLink() }
			</div>
		);
	}

	renderLink() {
		const { isSelected, eventUrlLabel } = this.props;
		const placeholder = __( 'Add Event Website', 'events-gutenberg' );

		if ( ! isSelected && ! eventUrlLabel ) {
			return this.renderPlaceholder( placeholder );
		}

		return [
			this.renderLabelInput( placeholder ),
			this.renderUrlInput()
		];
	}

	renderUrlInput() {
		const { setAttributes } = this.state;
		const { isSelected, url } = this.props;

		const buttonLabel = url ? __( 'Edit Website', 'events-gutenberg' ) : __( 'Insert Website', 'events-gutenberg' );

		if ( ! isSelected ) {
			return null;
		}

		return (
			<div key='tribe-events-website-url' className="tribe-editor__event-website__url">
				<Dashicon icon="admin-links" />
				<PlainText
					id="tribe-events-website-link"
					value={ url }
					onChange={ ( nextContent ) => this.setWebsiteUrl( { url: nextContent } ) }
					placeholder={ buttonLabel }
				/>
			</div>
		);
	}

	renderLabelInput( placeholder ) {
		const { setAttributes } = this.state;
		const { eventUrlLabel } = this.props;

		return (
			<div key='tribe-events-website-label' className="tribe-editor__event-website">
				<PlainText
					id="tribe-events-website-link"
					value={ eventUrlLabel }
					onChange={ ( nextContent ) => setAttributes( { eventUrlLabel: nextContent } ) }
					placeholder={ __( 'Add Event Website', 'events-gutenberg' ) }
				/>
			</div>
		)
	}

	renderPlaceholder( eventUrlLabel ) {
		return (
			<button className="tribe-editor__event-website tribe-editor__event-website--placeholder" disabled>
				{ eventUrlLabel }
			</button>
		);
	}

	setWebsiteUrl = ( data ) => {
		const { url } = data;

		store.dispatch( {
			type: 'SET_WEBSITE_URL',
			url,
		} );
	};

	renderControls() {
		const { isSelected } = this.props;

		if ( ! isSelected ) {
			return null;
		}

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Website Settings', 'events-gutenberg' ) }>

				</PanelBody>
			</InspectorControls>
		);
	}
}
