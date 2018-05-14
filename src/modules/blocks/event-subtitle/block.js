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
	CheckBox,
	Month,
} from 'elements';
import './style.pcss';

import { getItems } from './../../elements/timezone-picker/element';

import { getSetting } from 'editor/settings';
import classNames from 'classnames';
import { replaceDate, toFormat, setTimeInSeconds, toMoment, roundTime } from 'utils/moment';
import { FORMATS } from 'utils/date';
import { DAY_IN_SECONDS, HOUR_IN_SECONDS, MINUTE_IN_SECONDS } from 'editor/utils/time';
import { totalSeconds } from 'editor/utils/moment';

/**
 * Module Code
 */
class EventSubtitle extends Component {
	constructor() {
		super( ...arguments );

		const { attributes } = this.props;

		this.dashboardRef = React.createRef();

		this.timezones = getItems()
			.map( ( group ) => group.options || [] )
			.reduce( ( prev, current ) => [ ...prev, ...current ], [] );

		const { timezone, startDate, endDate } = attributes;

		const now = roundTime( moment() );
		this.state = {
			...this.props,
			dateTimeRangeSeparator: getSetting( 'dateTimeSeparator', __( ' @ ', 'events-gutenberg' ) ),
			timeRangeSeparator: getSetting( 'timeRangeSeparator', __( ' - ', 'events-gutenberg' ) ),
			timezone: timezone || 'UTC',
			startDate: startDate || this.format( now ),
			endDate: endDate || this.format( now.add( 30, 'm' ) ),
			allDay: false,
			multiDay: false,
			isDashboardOpen: false,
		};
	}

	format = ( date ) => {
		const { datetime } = FORMATS.WP;
		return date.format( toFormat( datetime ) );
	};

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
		const { time } = FORMATS.WP;

		if ( this.isAllDay() ) {
			return null;
		}

		const start = moment( startDate );

		return (
			<React.Fragment>
				{ this.renderSeparator( 'date-time' ) }
				{ start.format( toFormat( time ) ) }
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
		const { time } = FORMATS.WP;

		if ( this.isAllDay() ) {
			return null;
		}

		return (
			<React.Fragment>
				{ this.isSameDay() ? null : this.renderSeparator( 'date-time' ) }
				{ moment( endDate ).format( toFormat( time ) ) }
			</React.Fragment>
		);
	}

	/**
	 * Test if the current start and end date are happening on the same day.
	 *
	 * @returns {boolean} if the event is happening on the same day
	 */
	isSameDay( start, end ) {
		const { startDate, endDate } = this.state;
		return moment( start || startDate ).isSame( end || endDate, 'day' );
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
				return (
					<span className={ classNames( 'tribe-editor-events-subtitle__separator', className ) }>{ getSetting( 'dateTimeSeparator', __( ' @ ', 'events-gutenberg' ) ) }</span> );
			case 'time-range':
				return (
					<span className={ classNames( 'tribe-editor-events-subtitle__separator', className ) }>{ getSetting( 'timeRangeSeparator', __( ' - ', 'events-gutenberg' ) ) }</span> );
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
			<Dashboard
				ref={ this.dashboardRef }
				onClose={ () => this.setState( { isDashboardOpen: false } ) }
				onOpen={ () => this.setState( { isDashboardOpen: true } ) }
				overflow>
				<section className="tribe-editor__calendars">
					{ this.renderCalendars() }
				</section>
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

	renderCalendars() {
		const { isDashboardOpen, multiDay, startDate, endDate } = this.state;

		return (
			<Month
				withRange={ multiDay }
				from={ moment( startDate ).toDate() }
				to={ this.isSameDay() ? undefined : moment( endDate ).toDate() }
				onSelectDay={ ( data ) => {
					const { startDate, endDate, multiDay } = this.state;
					const { from, to } = data;
					const state = {
						startDate: this.format( replaceDate( moment( startDate ), toMoment( from ) ) ),
						endDate: this.format( replaceDate( moment( startDate ).add( 30, 'minutes' ), toMoment( from ) ) ),
					};

					if ( multiDay && to ) {
						state.endDate = this.format( replaceDate( moment( endDate ), toMoment( to ) ) );
					}

					if ( moment( state.endDate ).isSameOrBefore( state.startDate ) ) {
						state.endDate = this.format( moment( state.startDate ).add( 30, 'minutes' ) );
						state.multiDay = ! this.isSameDay( state.startDate, state.endDate );
					}

					this.setState( state );
				} }
			/>
		);
	}

	renderStartTimePicker() {
		const { startDate, allDay } = this.state;
		const { time, date } = FORMATS.WP;
		const start = moment( startDate );
		return (
			<React.Fragment>
				<span className="time-picker-date-label">{ start.format( toFormat( date ) ) }</span>
				<TimePicker
					onSelectItem={ ( data ) => {
						const { seconds, allDay } = data;
						const { startDate, endDate } = this.state;
						const from = setTimeInSeconds( moment( startDate ), seconds );
						const state = {
							allDay,
							startDate: this.format( from ),
						}

						if ( allDay ) {
							// state.endDate = this.format( setTimeInSeconds( from, seconds + (MINUTE_IN_SECONDS * 30) ) );
							state.endDate = this.format( moment( from ).endOf( 'day' ) );
							state.multiDay = false;
						} else {
							state.multiDay = ! this.isSameDay( from );
							state.endDate = roundTime( moment( endDate ) );
						}

						if ( state.endDate && moment( state.endDate ).isSameOrBefore( from ) ) {
							state.endDate = this.format( setTimeInSeconds( from, seconds + (MINUTE_IN_SECONDS * 30) ) );
							state.multiDay = ! this.isSameDay( state.startDate, state.endDate );
						}

						this.setState( state );
					} }
					current={ start }
					allDay={ allDay }
					timeFormat={ time }
				/>
			</React.Fragment>
		);
	}

	renderEndTimePicker() {

		if ( this.isAllDay() ) {
			return null;
		}

		const { time, date } = FORMATS.WP;

		const end = moment( this.state.endDate );
		const start = moment( this.state.startDate );
		return (
			<React.Fragment>
				{ !this.isSameDay() && <span className="time-picker-date-label">{ end.format( toFormat( date ) ) }</span> }
				<TimePicker
					onSelectItem={ ( state ) => {
						const { seconds, allDay } = state;
						const { startDate } = this.state;
						const to = setTimeInSeconds( moment( startDate ), seconds );
						this.setState( {
							allDay,
							endDate: this.format( to ),
							multiDay: ! this.isSameDay( startDate, to ),
						} );
					} }
					current={ end }
					minTime={ totalSeconds( start.add( 30, 'minutes' ) ) }
					timeFormat={ time }
				/>
			</React.Fragment>
		);
	}

	renderMultidayCheckbox() {
		const { multiDay } = this.state;
		return (
			<CheckBox
				label={ __( 'Multi-Day', 'events-gutenberg' ) }
				checked={ multiDay }
				onChange={ ( multiDay ) => {
					const { startDate } = this.state;
					const start = moment( startDate );
					const isLastBlock = start.hour() === 23 && start.minute() === 30;
					const state = {
						multiDay
					};
					if ( ! multiDay && isLastBlock ) {
						state.startDate = this.format( start.subtract( 30, 'minutes' ) );
						state.endDate = this.format( moment( startDate ) );
					}
					this.setState( state );
				} }
			/>
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

		if ( !isSelected ) {
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
