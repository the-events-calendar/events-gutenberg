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
	SelectControl,
	TextControl,
	FormToggle,
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
	Dashboard,
} from 'elements';
import './style.pcss';

import { getItems } from './../../elements/timezone-picker/element';

import { getSetting } from 'editor/settings';
import { toMomentFormat } from 'editor/utils/date';
import classNames from 'classnames';

/**
 * Module Code
 */
// Fetches all the Editor Settings
const WPDateSettings = window.tribe_date_settings || {};

class EventSubtitle extends Component {
	constructor() {
		super( ...arguments );

		const { attributes } = this.props;

		this.dashboardRef = React.createRef();

		this.timezones = getItems()
			.map( ( group ) => group.options || [] )
			.reduce( ( prev, current ) => [ ...prev, ...current ], [] );

		this.formats = {
			datetime: 'F j, Y g:i a',
			time: 'g:i a',
			...WPDateSettings.formats,
			date: getSetting( 'dateWithYearFormat', __( 'F j', 'events-gutenberg' ) ),
		};

		const { timezone, startDate, endDate } = attributes;
		const { datetime } = this.formats;

		this.state = {
			...this.props,
			dateTimeRangeSeparator: getSetting( 'dateTimeSeparator', __( ' @ ', 'events-gutenberg' ) ),
			timeRangeSeparator: getSetting( 'timeRangeSeparator', __( ' - ', 'events-gutenberg' ) ),
			timezone: timezone || 'UTC',
			startDate: startDate || this.getNow().format( toMomentFormat( datetime ) ),
			endDate: endDate || this.getNow().add( 30, 'm' ).add( 1, 'd' ).format( toMomentFormat( datetime ) ),
			allDay: false,
		};
	}

	getNow() {
		const now = moment();
		let minutes = now.minute();
		if ( minutes >= 30 ) {
			minutes = ( minutes % 30 );
		}
		return now.subtract( minutes, 'm' );
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
		const { startDate } = this.state;
		return (
			<DatePicker
				changeDatetime={ ( date ) => this.setState( { startDate: date } ) }
				datetime={ startDate }
			/>
		);
	}

	renderStartTime() {
		const { startDate } = this.state;
		const { time } = this.formats;

		if ( this.isAllDay() ) {
			return null;
		}

		const start = moment( startDate );

		return (
			<React.Fragment>
				{ this.renderSeparator( 'date-time' ) }
				{ start.format( toMomentFormat( time ) ) }
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
		const { endDate } = this.state;

		if ( this.isSameDay() ) {
			return null;
		}

		return (
			<DatePicker
				changeDatetime={ ( date ) => this.setState( { endDate: date } ) }
				datetime={ endDate }
			/>
		);
	}

	renderEndTime() {
		const { endDate } = this.state;
		const { time } = this.formats;

		if ( this.isAllDay() ) {
			return null;
		}

		return (
			<React.Fragment>
				{ this.isSameDay() ? null : this.renderSeparator( 'date-time' ) }
				{ moment( endDate ).format( toMomentFormat( time ) ) }
			</React.Fragment>
		);
	}

	/**
	 * Test if the current start and end date are happening on the same day.
	 *
	 * @returns {boolean} if the event is happening on the same day
	 */
	isSameDay() {
		const { startDate, endDate } = this.state;

		return moment( startDate ).isSame( endDate, 'day' );
	}

	/**
	 * Test if the current event is happening all day.
	 *
	 * @returns {boolean} true if is an all day event
	 */
	isAllDay() {
		const { allDay } = this.state;
		return allDay;
	}

	renderTimezone() {
		return this.renderSeparator( 'timezone' );
	}

	/**
	 * Renders a separator based on the type called
	 *
	 * @param {string} type - The type of separator
	 *
	 * @returns {ReactDOM} A React Dom Element null if none.
	 */
	renderSeparator( type, className ) {
		const { timezone } = this.state;
		switch ( type ) {
			case 'date-time':
				return ( <span className={ classNames( 'tribe-editor-events-subtitle__separator', className ) }>{ getSetting( 'dateTimeSeparator', __( ' @ ', 'events-gutenberg' ) ) }</span> );
			case 'time-range':
				return ( <span className={ classNames( 'tribe-editor-events-subtitle__separator', className ) }>{ getSetting( 'timeRangeSeparator', __( ' - ', 'events-gutenberg' ) ) }</span> );
			case 'dash':
				return <span className={ classNames( 'tribe-editor-events-subtitle__separator', className ) }> &mdash; </span>;
			case 'all-day':
				return <span className={ classNames( 'tribe-editor-events-subtitle__separator', className ) }> ALL DAY</span>;
			case 'space':
				return <span className={ classNames( 'tribe-editor-events-subtitle__separator', className ) }>&nbsp;</span>;
			case 'timezone':
				return <span className={ classNames( 'tribe-editor-events-subtitle__separator', className ) }> { timezone } </span>;
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
			<div key="event-datetime" className="event-subtitle-container">
				<h2 className="tribe-editor-block tribe-editor-events-subtitle" onClick={ () => this.dashboardRef.current.toggle() }>
					{ this.renderStart() }
					{ this.isSameDay() && this.isAllDay() ? null : this.renderSeparator( 'time-range' ) }
					{ this.renderEnd() }
					{ this.isAllDay() ? this.renderSeparator( 'all-day' ) : null }
					{ this.renderSeparator( 'space' ) }
					{ this.renderTimezone() }
				</h2>
				{ this.renderDashboard() }
			</div>
		);
	}

	renderDashboard() {
		return (
			<Dashboard ref={ this.dashboardRef } overflow>
				<footer className="event-subtitle-dashboard-footer">
					<section className="tribe-subtitle-dashboard-footer-picker-group">
						{ this.renderStartTimePicker() }
						{ this.renderSeparator( 'time-range', 'time-picker-separator' ) }
						{ this.renderEndTimePicker() }
					</section>
					<section>
						{ this.renderMultidayCheckbox() }
					</section>
				</footer>
			</Dashboard>
		);
	}

	renderStartTimePicker() {
		const { startDate } = this.state;
		const { time, date } = this.formats;
		return (
			<React.Fragment>
				<span className="time-picker-date-label">{ moment( startDate ).format( toMomentFormat( date ) ) }</span>
				<TimePicker
					onSelectItem={ ( date, startAllDay = false, endAllDay = false ) => {
						if ( 'all-day' === date ) {
							this.setState( {
								allDay: true,
								startDate: startAllDay,
								endDate: endAllDay,
							} );
						} else {
							this.setState( { allDay: false, startDate: date } );
						}
					} }
					current={ startDate }
					timeFormat={ time }
				/>
			</React.Fragment>
		);
	}

	renderEndTimePicker() {
		const { startDate, endDate } = this.state;
		const { datetime, time, date } = this.formats;

		return (
			<React.Fragment>
				{ ! this.isSameDay() && <span className="time-picker-date-label">{ moment( endDate ).format( toMomentFormat( date ) ) }</span> }
				<TimePicker
					onSelectItem={ ( date, startAllDay = false, endAllDay = false ) => {
						if ( 'all-day' === date ) {
							this.setState( {
								allDay: true,
								startDate: startAllDay,
								endDate: endAllDay,
							} );
						} else {
							let normalizedDate = date;
							if ( moment( normalizedDate ).isSameOrBefore( startDate ) ) {
								normalizedDate = moment( startDate ).add( 30, 'm' ).format( toMomentFormat( datetime ) );
							}
							this.setState( { allDay: false, endDate: normalizedDate } );
						}
					} }
					current={ endDate }
					timeFormat={ time }
				/>
			</React.Fragment>
		);
	}

	renderMultidayCheckbox() {
		return (
			<React.Fragment>
				{ __( 'Multi-Day', 'events-gutenberg' ) }
			</React.Fragment>
		);
	}

	/**
	 * Controls being rendered on the sidebar.
	 *
	 * @returns {ReactDOM} A React Dom Element null if none.
	 */
	renderControls() {
		const { isSelected } = this.props;
		const { timeRangeSeparator, dateTimeRangeSeparator, timezone } = this.state;

		if ( ! isSelected ) {
			return null;
		}

		return ( <InspectorControls key="inspector">
			<PanelBody title={ __( 'Date Time Settings', 'events-gutenberg' ) }>
				<TextControl
					label={ __( 'Date Time Separator', 'events-gutenberg' ) }
					value={ dateTimeRangeSeparator }
					onChange={ ( value ) => this.setState( { dateTimeRangeSeparator: value } ) }
				/>
				<TextControl
					label={ __( 'Time Range Separator', 'events-gutenberg' ) }
					value={ timeRangeSeparator }
					onChange={ ( value ) => this.setState( { timeRangeSeparator: value } ) }
				/>
				<SelectControl
					label={ __( 'Time Zone', 'events-gutenberg' ) }
					value={ timezone }
					onChange={ ( tzone ) => this.setState( { timezone: tzone } ) }
					options={ this.timezones.map( ( tzone ) => {
						return {
							value: tzone.key,
							label: tzone.text,
						};
					} ) }
				/>
				<ToggleControl
					label={ __( 'Is All Day Event', 'events-gutenberg' ) }
					checked={ this.isAllDay() }
					onChange={ ( value ) => this.setState( { allDay: value } ) }
				/>
			</PanelBody>
		</InspectorControls> );
	}

	render() {
		return [ this.renderLabel(), this.renderControls() ];
	}
}

export default EventSubtitle;
