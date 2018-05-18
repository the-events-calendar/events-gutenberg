/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
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
			<div key="event-links" className="tribe-editor-block tribe-editor-events-link">
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
			<div className="tribe-events-btn-link tribe-events-gcal">
				{ this.renderIcon() }
				<PlainText
					id="tribe-event-google-calendar"
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
			<div className="tribe-events-btn-link tribe-events-ical">
				{ this.renderIcon() }
				<PlainText
					type="text"
					id="tribe-event-ical"
					value={ iCalLabel }
					onChange={ ( nextContent ) => this.setState( { iCalLabel: nextContent } ) }
				/>
			</div>
		);
	}

	renderPlaceholder( label ) {
		return (
			<button className="tribe-events-btn-link tribe-events-btn-link--placeholder" disabled>
				{ this.renderIcon() }
				{ label }
			</button>
		);
	}

	renderIcon() {
		return (
			<svg width="26" height="15" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12.6 7.576H9.227v1.732H12.6v3.742a.2.2 0 0 1-.198.2H1.918a.199.199 0 0 1-.198-.2V5.092c0-.111.089-.201.198-.201h10.485a.2.2 0 0 1 .198.2v2.485zm5.755-3.86l-.066.067L17.16 4.93l2.601 2.646H14.33V2.843a.797.797 0 0 0-.79-.803h-.74c-.034.003-.32.004-.856.004V.804a.797.797 0 0 0-.79-.804c-.446 0-.8.36-.8.803v1.24H3.992V.804A.797.797 0 0 0 3.202 0c-.447 0-.8.36-.8.803v1.24h-.796c-.041 0-.058-.003-.075-.003H.79c-.436 0-.79.36-.79.803V3.91c0 .055.006.108.016.16v8.978a.36.36 0 0 0-.008.082v1.067c0 .443.354.803.79.803h.74a12956.843 12956.843 0 0 1 12.01 0c.437 0 .79-.36.79-.803V13.13a.36.36 0 0 0-.008-.082v-3.74h5.43l-2.599 2.643 1.192 1.215L23 8.44l-4.645-4.725z"
					fill="#009FD4"
					fillRule="evenodd"
				/>
			</svg>
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
