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

		if ( ! hasGoogleCalendar ) {
			return this.renderPlaceholder( __( 'Google Calendar', 'events-gutenberg' ) );
		}

		return (
			<div className="tribe-editor__btn--link tribe-events-gcal">
				<LinkIcon />
				<RichText
					id="tribe-event-google-calendar"
					format="string"
					tagName="h5"
					value={ googleCalendarLabel }
					onChange={ save( 'googleCalendarLabel' ) }
				/>
			</div>
		);
	}

	renderiCal() {
		const { hasiCal, iCalLabel, save } = this.props;

		if ( ! hasiCal ) {
			return this.renderPlaceholder( __( 'iCal Export', 'events-gutenberg' ) );
		}

		return (
			<div className="tribe-editor__btn--link tribe-events-ical">
				<LinkIcon />
				<RichText
					format="string"
					tagName="h5"
					id="tribe-event-ical"
					value={ iCalLabel }
					onChange={ save( 'iCalLabel' ) }
				/>
			</div>
		);
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
