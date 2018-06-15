/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
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

/**
 * Module Code
 */
export default class EventLinks extends Component {
	constructor() {
		super( ...arguments );

		const { attributes } = this.props;
		const { icalExportLabel, iCalLabel } = attributes;

		this.state = {
			hasiCal: true,
			iCalLabel: iCalLabel || __( 'iCal Export', 'events-gutenberg' ),
			hasGoogleCalendar: true,
			googleCalendarLabel: icalExportLabel || __( 'Google Calendar', 'events-gutenberg' ),
		};
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
		const { hasGoogleCalendar, googleCalendarLabel } = this.state;

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
					onChange={ ( nextContent ) => this.setState( { googleCalendarLabel: nextContent } ) }
				/>
			</div>
		);
	}

	renderiCal() {
		const { hasiCal, iCalLabel } = this.state;

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
					onChange={ ( nextContent ) => this.setState( { iCalLabel: nextContent } ) }
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
		const { hasGoogleCalendar, hasiCal } = this.state;
		const { isSelected } = this.props;

		if ( ! isSelected ) {
			return null;
		}

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Share Settings', 'events-gutenberg' ) }>
					<ToggleControl
						label={ __( 'Google Calendar', 'events-gutenberg' ) }
						checked={ hasGoogleCalendar }
						onChange={ ( value ) => this.setState( { hasGoogleCalendar: value } ) }
					/>
					<ToggleControl
						label={ __( 'iCal', 'events-gutenberg' ) }
						checked={ hasiCal }
						onChange={ ( value ) => this.setState( { hasiCal: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
