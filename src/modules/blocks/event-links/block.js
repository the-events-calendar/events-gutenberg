/**
 * External dependencies
 */
import React from 'react';

/**
 * WordPress dependencies
 */
import { Component, compose } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
	RichText,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */
import LinkIcon from 'icons/link.svg';
import './style.pcss';

import withSaveData from 'editor/hoc/with-save-data';
import withProperties from 'editor/hoc/with-properties';

/**
 * Module Code
 */

const googleCalendarPlaceholder = __( 'Google Calendar', 'events-gutenberg' );
const iCalExportPlaceholder = __( 'iCal Export', 'events-gutenberg' );

class EventLinks extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {
		return [ this.renderButtons(), this.renderControls() ];
	}

	renderButtons() {
		return (
			<div key="event-links" className="tribe-editor__block tribe-editor__events-link">
				{ this.renderGoogleCalendar() }
				{ this.renderiCal() }
			</div>
		);
	}

	renderGoogleCalendar() {
		const { hasGoogleCalendar, googleCalendarLabel, save } = this.props;

		if ( this.buttonsAreDisabled() ) {
			return this.renderPlaceholder( googleCalendarPlaceholder );
		}

		if ( ! hasGoogleCalendar ) {
			return null;
		}

		return (
			<div className="tribe-editor__btn--link tribe-events-gcal">
				<LinkIcon />
				<RichText
					id="tribe-event-google-calendar"
					format="string"
					tagName="h5"
					value={ googleCalendarLabel }
					placeholder={ googleCalendarPlaceholder }
					onChange={ save( 'googleCalendarLabel' ) }
				/>
			</div>
		);
	}

	renderiCal() {
		const { hasiCal, iCalLabel, save } = this.props;

		if ( this.buttonsAreDisabled() ) {
			return this.renderPlaceholder( iCalExportPlaceholder );
		}

		if ( ! hasiCal ) {
			return null;
		}

		return (
			<div className="tribe-editor__btn--link tribe-events-ical">
				<LinkIcon />
				<RichText
					format="string"
					tagName="h5"
					id="tribe-event-ical"
					value={ iCalLabel }
					placeholder={ iCalExportPlaceholder }
					onChange={ save( 'iCalLabel' ) }
				/>
			</div>
		);
	}

	buttonsAreDisabled = () => {
		const { hasGoogleCalendar, hasiCal } = this.props;
		return ! hasGoogleCalendar && ! hasiCal;
	}

	renderPlaceholder( label ) {
		return (
			<button className="tribe-editor__btn--link tribe-editor__btn--placeholder" disabled>
				<LinkIcon />
				{ label }
			</button>
		);
	}

	renderControls() {
		const { hasGoogleCalendar, hasiCal, isSelected, save } = this.props;

		if ( ! isSelected ) {
			return null;
		}

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Share Settings', 'events-gutenberg' ) }>
					<ToggleControl
						label={ __( 'Google Calendar', 'events-gutenberg' ) }
						checked={ hasGoogleCalendar }
						onChange={ save( 'hasGoogleCalendar' ) }
					/>
					<ToggleControl
						label={ __( 'iCal', 'events-gutenberg' ) }
						checked={ hasiCal }
						onChange={ save( 'hasiCal' ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}

export default compose( [
	withProperties( ( props ) => {
		const { attributes, setAttributes } = props;
		return {
			...attributes,
			save( key ) {
				return ( value ) => {
					setAttributes( { [ key ]: value } );
				};
			},
		};
	} ),
	withSaveData(),
] )( EventLinks );
