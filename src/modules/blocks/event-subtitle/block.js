/**
 * External dependencies
 */
import React from 'react';

import { noop, pick } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

import {
	ToggleControl,
	PanelBody,
	SelectControl,
	TextControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */
import {
	TimePicker,
	Dashboard,
	CheckBox,
	Month,
} from 'elements';
import './style.pcss';

import { getSetting } from 'editor/settings';
import classNames from 'classnames';
import { toFormat, toMoment, totalSeconds, toDateTime, toDate } from 'utils/moment';
import { FORMATS, timezonesAsSelectData } from 'utils/date';
import { HALF_HOUR_IN_SECONDS } from 'utils/time';
import { store, DEFAULT_STATE } from 'data/details';

FORMATS.date = getSetting( 'dateWithYearFormat', __( 'F j', 'events-gutenberg' ) );
export const VALID_PROPS = [
	'timezone',
	'startDate',
	'endDate',
	'allDay',
	'multiDay',
	'dateTimeRangeSeparator',
	'timeRangeSeparator',
];

/**
 * Module Code
 */

export default class EventSubtitle extends Component {

	static defaultProps = pick(
		DEFAULT_STATE,
		VALID_PROPS,
	);

	constructor( props ) {
		super( ...arguments );

		this.dashboardRef = React.createRef();

		this.state = props;
		this.storeListener = noop;
	}

	componentDidMount() {
		this.storeListener = store.subscribe( () => {
			const state = store.getState();
			this.setState( pick( state, VALID_PROPS ) );
		} );

		const state = pick( this.state, VALID_PROPS );

		store.dispatch( {
			type: 'SET_INITIAL_STATE',
			values: state,
		} );
	}

	componentWillUnmount() {
		this.storeListener();
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
			<span>{ toDate( toMoment( startDate ) ) }</span>
		);
	}

	renderStartTime() {
		const { startDate } = this.state;
		const { time } = FORMATS.WP;

		if ( this.isAllDay() ) {
			return null;
		}

		const start = toMoment( startDate );

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
		if ( this.isSameDay() ) {
			return null;
		}

		const { endDate } = this.state;
		return (
			<span>{ toDate( toMoment( endDate ) ) }</span>
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
				{ toMoment( endDate ).format( toFormat( time ) ) }
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
		return toMoment( start || startDate )
			.isSame( toMoment( end || endDate ), 'day' );
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
		const { multiDay, startDate, endDate } = this.state;
		const monthProps = {
			onSelectDay: this.setDays,
			withRange: multiDay,
			from: toMoment( startDate ).toDate(),
		};

		if ( ! this.isSameDay() ) {
			monthProps.to = toMoment( endDate ).toDate();
		}

		return (
			<Month { ...monthProps } />
		);
	}

	setDays = ( data ) => {
		const { from, to } = data;

		store.dispatch( {
			type: 'SET_START_DATE',
			date: toDateTime( toMoment( from ) ),
		} );

		store.dispatch( {
			type: 'SET_END_DATE',
			date: to ? toDateTime( toMoment( to ) ) : to,
		} );
	};

	renderStartTimePicker() {
		const { startDate, allDay } = this.state;
		const { time, date } = FORMATS.WP;
		const start = toMoment( startDate );
		const pickerProps = {
			onSelectItem: this.setStartTime,
			current: start,
			timeFormat: time,
		};

		if ( allDay ) {
			pickerProps.allDay = true;
		}

		return (
			<React.Fragment>
				<span className="time-picker-date-label">{ start.format( toFormat( date ) ) }</span>
				<TimePicker { ...pickerProps } />
			</React.Fragment>
		);
	}

	setStartTime = ( data ) => {
		const { seconds, allDay } = data;
		this.setAllDay( allDay );

		store.dispatch( {
			type: 'SET_START_TIME',
			seconds,
		} );
	};

	renderEndTimePicker() {

		if ( this.isAllDay() ) {
			return null;
		}

		const { time, date } = FORMATS.WP;
		const start = toMoment( this.state.startDate );
		const end = toMoment( this.state.endDate );
		const pickerProps = {
			current: end,
			onSelectItem: this.setEndTime,
			minTime: totalSeconds( start.add( HALF_HOUR_IN_SECONDS, 'seconds' ) ),
			timeFormat: time,
		};

		return (
			<React.Fragment>
				{ ! this.isSameDay() && <span className="time-picker-date-label">{ end.format( toFormat( date ) ) }</span> }
				<TimePicker { ...pickerProps } />
			</React.Fragment>
		);
	}

	setEndTime = ( data ) => {
		const { seconds, allDay } = data;
		this.setAllDay( allDay );

		store.dispatch( {
			type: 'SET_END_TIME',
			seconds,
		} );
	};

	renderMultidayCheckbox() {
		const { multiDay } = this.state;
		return (
			<CheckBox
				label={ __( 'Multi-Day', 'events-gutenberg' ) }
				checked={ multiDay }
				onChange={ this.setMultiDay }
			/>
		);
	}

	setMultiDay = ( multiDay ) => {
		store.dispatch( {
			type: 'SET_MULTI_DAY',
			multiDay,
		} );
	};

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
					onChange={ this.setTimeZone }
					options={ timezonesAsSelectData() }
				/>
				<ToggleControl
					label={ __( 'Is All Day Event', 'events-gutenberg' ) }
					checked={ this.isAllDay() }
					onChange={ this.setAllDay }
				/>
			</PanelBody>
		</InspectorControls> );
	}

	setTimeZone( timezone ) {
		store.dispatch( {
			type: 'SET_TIME_ZONE',
			timezone,
		} );
	};

	setAllDay( allDay ) {
		store.dispatch( {
			type: 'SET_ALL_DAY',
			allDay,
		} );
	}

	render() {
		return [ this.renderLabel(), this.renderControls() ];
	}
}
