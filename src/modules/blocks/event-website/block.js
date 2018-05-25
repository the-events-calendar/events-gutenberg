/**
 * External dependencies
 */
import classNames from 'classnames';

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

import './style.pcss';

/**
 * Module Code
 */
export default class EventWebsite extends Component {
	constructor() {
		super( ...arguments );

		const { attributes } = this.props;
		const { label, eventUrl } = attributes;

		this.state = {
			label: label || undefined,
			eventUrl: eventUrl || undefined,
		};
	}

	render() {
		return [ this.renderButton(), this.renderControls() ];
	}

	renderButton() {
		return (
			<div key="event-website" className="tribe-editor-block tribe-editor-event-website">
				{ this.renderLink() }
			</div>
		);
	}

	renderLink() {
		const { label } = this.state;
		const { isSelected } = this.props;
		const placeholder = __( 'Add Event Website', 'events-gutenberg' );

		if ( ! isSelected && ! label ) {
			return this.renderPlaceholder( placeholder );
		}

		return [
			this.renderLabelInput( placeholder ),
			this.renderUrlInput()
		];
	}

	renderUrlInput() {
		const { attributes } = this.props;
		const { eventUrl } = attributes

		const buttonLabel = eventUrl ? __( 'Edit Website' ) : __( 'Insert Website' );

		return (
			<div key='tribe-events-website-url' className="tribe-events-website-url">
				<Dashicon icon="admin-links" />
				<PlainText
					id="tribe-events-website-link"
					value={ eventUrl }
					onChange={ ( nextContent ) => this.setState( { eventUrl: nextContent } ) }
					placeholder={ __( 'Website URL', 'events-gutenberg' ) }
				/>
			</div>
		);
	}

	renderLabelInput( placeholder ) {
		const { label } = this.state;
		const { isSelected } = this.props;

		return (
			<div key='tribe-events-website-label' className="tribe-events-website-link tribe-events-website">
				<PlainText
					id="tribe-events-website-link"
					value={ label }
					onChange={ ( nextContent ) => this.setState( { label: nextContent } ) }
					placeholder={ __( 'Add Event Website', 'events-gutenberg' ) }
				/>
			</div>
		)
	}

	renderPlaceholder( label ) {
		return (
			<button className="tribe-events-website-link tribe-events-website-link--placeholder" disabled>
				{ label }
			</button>
		);
	}

	renderControls() {
		const { label } = this.state;
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
