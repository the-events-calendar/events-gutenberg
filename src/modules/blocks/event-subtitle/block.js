/**
 * External dependencies
 */
import moment from 'moment';
import React from 'react';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

import {
	Dropdown,
	ToggleControl,
	PanelBody,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
} from '@wordpress/blocks'

/**
 * Internal dependencies
 */
import {
	DatePicker,
	TimePicker,
	TimezonePicker,
} from 'elements'

import { getSetting } from 'editor/settings'

/**
 * Module Code
 */
// Fetches all the Editor Settings
const WPDateSettings = _wpDateSettings;

class EventSubtitle extends Component {
	constructor() {
		super( ...arguments );

		this.state = this.props
	}

	render() {
		const {
			attributes,
			setAttributes,
			focus,
			isSelected,
		} = this.props;

		return [
			<h2 key="event-datetime" className="tribe-editor-block tribe-editor-events-subtitle">
				<DatePicker
					changeDatetime={ ( date ) => {
						setAttributes( { startDate: date } )
					} }
					datetime={ attributes.startDate }
				/>
				{ ! attributes.allDay &&
					<React.Fragment>
						<span>{ getSetting( 'dateTimeSeparator', __( ' @ ', 'the-events-calendar' ) ) }</span>
						<TimePicker
							onSelectItem={ ( date, startAllDay = false, endAllDay = false ) => {
								if ( 'all-day' === date ) {
									setAttributes( {
										allDay: true,
										startDate: startAllDay,
										endDate: endAllDay,
									} )
								} else {
									setAttributes( { startDate: date } )
								}
							} }
							current={ attributes.startDate }
							timeFormat={ WPDateSettings.formats.time }
						/>
					</React.Fragment>
				}
				<span>{ getSetting( 'timeRangeSeparator', __( ' - ', 'the-events-calendar' ) ) }</span>
				<DatePicker
					changeDatetime={ ( date ) => {
						setAttributes( { endDate: date } )
					} }
					datetime={ attributes.endDate }
				/>
				{ ! attributes.allDay &&
					<React.Fragment>
						<span>{ getSetting( 'dateTimeSeparator', __( ' @ ', 'the-events-calendar' ) ) }</span>
						<TimePicker
							onSelectItem={ ( date, startAllDay = false, endAllDay = false ) => {
								if ( 'all-day' === date ) {
									setAttributes( {
										allDay: true,
										startDate: startAllDay,
										endDate: endAllDay,
									} )
								} else {
									setAttributes( { endDate: date } )
								}
							} }
							current={ attributes.endDate }
							timeFormat={ WPDateSettings.formats.time }
						/>
					</React.Fragment>
				}
				<span> &mdash; </span>
				<TimezonePicker
					onSelectItem={ ( value ) => {
						setAttributes( { timezone: value } )
					} }
					current={ attributes.timezone }
					siteTimezone={ WPDateSettings.timezone }
				/>
			</h2>,
			isSelected && (
				<InspectorControls key="inspector">
					<PanelBody title={ __( 'Date Time Settings', 'the-events-calendar' ) }>
						<ToggleControl
							label={ __( 'Is All Day Event', 'the-events-calendar' ) }
							checked={ attributes.allDay }
							onChange={ ( value ) => setAttributes( { allDay: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
			)
		]
	}
}

export default EventSubtitle;
