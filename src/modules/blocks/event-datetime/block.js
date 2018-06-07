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
	PlainText,
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
	'startDate',
	'endDate',
	'multiDay',
	'dateTimeRangeSeparator',
	'timeRangeSeparator',
	'timezone',
	'allDay',

	'currencySymbol',
	'currencyPosition',
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

		this.state = {
			...props,
			dashboardOpen: false,
		};
		this.storeListener = noop;
	}

	componentDidMount() {
		this.storeListener = store.subscribe( this.listener );

		const state = pick( this.state, VALID_PROPS );
		store.dispatch( {
			type: 'SET_INITIAL_STATE',
			values: state,
		} );
	}

	listener = () => {
		const state = store.getState();
		this.setState( {
			...pick( state, VALID_PROPS ),
			dashboardOpen: state.dashboardOpen,
		} );
	};

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

	renderPrice() {
		const { setAttributes, cost, currencyPosition, currencySymbol } = this.state;

		// Bail when not classic
		if ( ! tribe_blocks_editor ) {
			return null;
		}

		// Bail when not classic
		if ( ! tribe_blocks_editor.is_classic ) {
			return null;
		}

		return (
			<div className="tribe-editor__event-cost">
				{ 'prefix' === currencyPosition && <span>{ currencySymbol }</span> }
				<PlainText
					className={ classNames( 'tribe-editor__event-cost__value', `tribe-editor-cost-symbol-position-${ currencyPosition }` ) }
					value={ cost }
					placeholder={ __( 'Enter price', 'events-gutenberg' ) }
					onChange={ ( nextContent ) => setAttributes( { cost: nextContent } ) }
				/>
				{ 'suffix' === currencyPosition && <span>{ currencySymbol }</span> }
			</div>
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
		const { timezone, dateTimeRangeSeparator, timeRangeSeparator } = this.state;
		switch ( type ) {
			case 'date-time':
				return (
					<span className={ classNames( 'tribe-editor__separator', className ) }>{ dateTimeRangeSeparator }</span> );
			case 'time-range':
				return (
					<span className={ classNames( 'tribe-editor__separator', className ) }>{ timeRangeSeparator }</span> );
			case 'dash':
				return <span className={ classNames( 'tribe-editor__separator', className ) }> &mdash; </span>;
			case 'all-day':
				return <span className={ classNames( 'tribe-editor__separator', className ) }> ALL DAY</span>;
			case 'space':
				return <span className={ classNames( 'tribe-editor__separator', className ) }>&nbsp;</span>;
			case 'timezone':
				return <span className={ classNames( 'tribe-editor__separator', className ) }> { timezone } </span>;
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
			<div key="event-datetime" className="tribe-editor__subtitle">
				<h2 className="tribe-editor__subtitle__headline" onClick={ this.toggleDashboard }>
					{ this.renderStart() }
					{ this.isSameDay() && this.isAllDay() ? null : this.renderSeparator( 'time-range' ) }
					{ this.renderEnd() }
					{ this.isAllDay() ? this.renderSeparator( 'all-day' ) : null }
					{ this.renderSeparator( 'space' ) }
					{ this.renderTimezone() }
					{ this.renderPrice() }
				</h2>
				{ this.renderDashboard() }
			</div>
		);
	}

	toggleDashboard = () => {
		store.dispatch( { type: 'TOGGLE_DASHBOARD' } );
	};

	closeDashboard = () => {
		store.dispatch( { type: 'CLOSE_DASHBOARD' } );
	};

	renderDashboard() {
		const { dashboardOpen } = this.state;
		return (
			<Dashboard
				open={ dashboardOpen }
				onClose={ this.closeDashboard }
				overflow>
				<section className="tribe-editor__calendars">
					{ this.renderCalendars() }
				</section>
				<footer className="tribe-editor__subtitle__footer">
					<section>
						{ this.renderStartTimePicker() }
						{ this.renderSeparator( 'time-range', 'tribe-editor__time-picker__separator' ) }
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
				<span className="tribe-editor__time-picker__label">{ start.format( toFormat( date ) ) }</span>
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
				{ ! this.isSameDay() && <span className="tribe-editor__time-picker__label">{ end.format( toFormat( date ) ) }</span> }
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
		const { timeRangeSeparator, dateTimeRangeSeparator, timezone } = this.state;

		return ( <InspectorControls key="inspector">
			<PanelBody title={ __( 'Date Time Settings', 'events-gutenberg' ) }>
				<TextControl
					label={ __( 'Date Time Separator', 'events-gutenberg' ) }
					value={ dateTimeRangeSeparator }
					onChange={ ( value ) => this.setState( { dateTimeRangeSeparator: value } ) }
					onBlur={ this.setDateTimeSeparator }
				/>
				<TextControl
					label={ __( 'Time Range Separator', 'events-gutenberg' ) }
					value={ timeRangeSeparator }
					onChange={ ( value ) => this.setState( { timeRangeSeparator: value } ) }
					onBlur={ this.setTimeRangeSeparator }
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

	setDateTimeSeparator = () => {
		store.dispatch( {
			type: 'SET_DATE_TIME_SEPARATOR',
			separator: this.state.dateTimeRangeSeparator,
		} );
	};

	setTimeRangeSeparator = () => {
		store.dispatch( {
			type: 'SET_TIME_RANGE_SEPARATOR',
			separator: this.state.timeRangeSeparator,
		} );
	};

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
