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
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {
	DatePicker,
	TimePicker,
	TimezonePicker,
} from 'elements';
import './style.pcss';

import { getSetting } from 'editor/settings';

/**
 * Module Code
 */
// Fetches all the Editor Settings
const WPDateSettings = window.tribe_date_settings || {};

class EventSubtitle extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			...this.props,
		};
	}

	renderStart() {
		return (
			<React.Fragment>
				{ this.renderStartDate() }
				{ this.renderStartTime() }
			</React.Fragment>
		);
	}

	renderStartDate() {
		const { attributes, setAttributes } = this.props;
		return (
			<DatePicker
				changeDatetime={ ( date ) => {
					setAttributes( { startDate: date } );
				} }
				datetime={ attributes.startDate }
			/>
		);
	}

	renderStartTime() {
		const { attributes, setAttributes } = this.props;

		if ( this.isAllDay() ) {
			return null;
		}

		return (
			<React.Fragment>
				{ this.renderSeparator( 'date-time' ) }
				<TimePicker
					onSelectItem={ ( date, startAllDay = false, endAllDay = false ) => {
						if ( 'all-day' === date ) {
							setAttributes( {
								allDay: true,
								startDate: startAllDay,
								endDate: endAllDay,
							} );
						} else {
							setAttributes( { startDate: date } );
						}
					} }
					current={ attributes.startDate }
					timeFormat={ WPDateSettings.formats.time }
				/>
			</React.Fragment>
		);
	}

	renderEnd() {
		return (
			<React.Fragment>
				{ this.renderEndDate() }
				{ this.renderEndTime() }
			</React.Fragment>
		);
	}

	renderEndDate() {
		const { attributes, setAttributes } = this.props;

		if ( this.isSameDay() ) {
			return null;
		}

		return (
			<DatePicker
				changeDatetime={ ( date ) => {
					setAttributes( {
						endDate: date,
					} );
				} }
				datetime={ attributes.endDate }
			/>
		);
	}

	renderEndTime() {
		const { attributes, setAttributes } = this.props;

		if ( this.isAllDay() ) {
			return null;
		}

		return (
			<React.Fragment>
				{ this.isSameDay() ? null : this.renderSeparator( 'date-time' ) }
				<TimePicker
					onSelectItem={ ( date, startAllDay = false, endAllDay = false ) => {
						if ( 'all-day' === date ) {
							setAttributes( {
								allDay: true,
								startDate: startAllDay,
								endDate: endAllDay,
							} );
						} else {
							setAttributes( { endDate: date } );
						}
					} }
					current={ attributes.endDate }
					timeFormat={ WPDateSettings.formats.time }
				/>
			</React.Fragment>
		);
	}

	/**
	 * Test if the current start and end date are happening on the same day.
	 *
	 * @returns {boolean} if the event is happening on the same day
	 */
	isSameDay() {
		const { attributes } = this.props;
		const { startDate, endDate } = attributes;

		return moment( startDate ).isSame( endDate, 'day' );
	}

	/**
	 * Test if the current event is happening all day.
	 *
	 * @returns {boolean} true if is an all day event
	 */
	isAllDay() {
		const { attributes } = this.props;
		const { allDay } = attributes;
		return allDay;
	}

	renderTimezone() {
		const { attributes, setAttributes } = this.props;

		return (
			<TimezonePicker
				onSelectItem={ ( value ) => {
					setAttributes( { timezone: value } );
				} }
				current={ attributes.timezone }
				siteTimezone={ WPDateSettings.timezone }
			/>
		);
	}

	/**
	 * Renders a separator based on the type called
	 *
	 * @param {string} type - The type of separator
	 *
	 * @returns {ReactDOM} A React Dom Element null if none.
	 */
	renderSeparator( type ) {
		switch ( type ) {
			case 'date-time':
				return ( <span className="tribe-editor-events-subtitle__separator">{ getSetting( 'dateTimeSeparator', __( ' @ ', 'events-gutenberg' ) ) }</span> );
			case 'time-range':
				return ( <span className="tribe-editor-events-subtitle__separator">{ getSetting( 'timeRangeSeparator', __( ' - ', 'events-gutenberg' ) ) }</span> );
			case 'dash':
				return <span className="tribe-editor-events-subtitle__separator"> &mdash; </span>;
			case 'all-day':
				return <span className="tribe-editor-events-subtitle__separator"> ALL DAY</span>;
			case 'space':
				return <span className="tribe-editor-events-subtitle__separator">&nbsp;</span>;
			default:
				return null;
		}
	}

	/**
	 * Main label used to display the event
	 *
	 * @returns {ReactDOM} A React Dom Element null if none.
	 */
	renderLabel() {
		return (
			<h2 key="event-datetime" className="tribe-editor-block tribe-editor-events-subtitle">
				{ this.renderStart() }
				{ this.isSameDay() && this.isAllDay() ? null : this.renderSeparator( 'time-range' ) }
				{ this.renderEnd() }
				{ this.isAllDay() ? this.renderSeparator( 'all-day' ) : null }
				{ this.renderSeparator( 'space' ) }
				{ this.renderTimezone() }
			</h2>
		);
	}

	/**
	 * Controls being rendered on the sidebar.
	 *
	 * @returns {ReactDOM} A React Dom Element null if none.
	 */
	renderControls() {
		const { setAttributes, isSelected } = this.props;

		if ( ! isSelected ) {
			return null;
		}

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Date Time Settings', 'events-gutenberg' ) }>
					<ToggleControl
						label={ __( 'Is All Day Event', 'events-gutenberg' ) }
						checked={ this.isAllDay() }
						onChange={ ( value ) => setAttributes( { allDay: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	render() {
		return [ this.renderLabel(), this.renderControls() ];
	}
}

export default EventSubtitle;
