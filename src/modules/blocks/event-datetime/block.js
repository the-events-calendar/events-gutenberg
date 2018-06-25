/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { Component, compose } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';

import {
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
import { STORE_NAME } from 'data/details';
import withSaveData from 'editor/hoc/with-save-data';

FORMATS.date = getSetting( 'dateWithYearFormat', __( 'F j', 'events-gutenberg' ) );

/**
 * Module Code
 */

class EventDateTime extends Component {

	static propTypes = {
		allDay: PropTypes.bool,
		multiDay: PropTypes.bool,
		dashboardOpen: PropTypes.bool,
		cost: PropTypes.string,
		start: PropTypes.string,
		end: PropTypes.string,
		separatorDate: PropTypes.string,
		separatorTime: PropTypes.string,
		timezone: PropTypes.string,
		currencySymbol: PropTypes.string,
		currencyPosition: PropTypes.string,
		setInitialState: PropTypes.func,
		setCost: PropTypes.func,
		setAllDay: PropTypes.func,
		toggleDashboard: PropTypes.func,
		setStartDate: PropTypes.func,
		setEndDate: PropTypes.func,
		setStartTime: PropTypes.func,
		setEndTime: PropTypes.func,
		setMultiDay: PropTypes.func,
		setTimeZone: PropTypes.func,
		setSeparatorTime: PropTypes.func,
		setSeparatorDate: PropTypes.func,
	};

	constructor() {
		super( ...arguments );
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
		const { cost, currencyPosition, currencySymbol, setCost } = this.props;

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
					onChange={ setCost }
				/>
				{ 'suffix' === currencyPosition && <span>{ currencySymbol }</span> }
			</div>
		);
	}

	renderStartDate() {
		const { start } = this.props;

		return (
			<span>{ toDate( toMoment( start ) ) }</span>
		);
	}

	renderStartTime() {
		const { start } = this.props;
		const { time } = FORMATS.WP;

		if ( this.isAllDay() ) {
			return null;
		}

		const startMoment = toMoment( start );

		return (
			<React.Fragment>
				{ this.renderSeparator( 'date-time' ) }
				{ startMoment.format( toFormat( time ) ) }
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

		const { end } = this.props;
		return (
			<span>{ toDate( toMoment( end ) ) }</span>
		);
	}

	renderEndTime() {
		const { end } = this.props;
		const { time } = FORMATS.WP;

		if ( this.isAllDay() ) {
			return null;
		}

		return (
			<React.Fragment>
				{ this.isSameDay() ? null : this.renderSeparator( 'date-time' ) }
				{ toMoment( end ).format( toFormat( time ) ) }
			</React.Fragment>
		);
	}

	/**
	 * Test if the current start and end date are happening on the same day.
	 *
	 * @returns {boolean} if the event is happening on the same day
	 */
	isSameDay( start, end ) {
		return toMoment( start || this.props.start )
			.isSame( toMoment( end || this.props.end ), 'day' );
	}

	/**
	 * Test if the current event is happening all day.
	 *
	 * @returns {boolean} true if is an all day event
	 */
	isAllDay() {
		const { allDay } = this.props;
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
		const { timezone, separatorDate, separatorTime } = this.props;
		switch ( type ) {
			case 'date-time':
				return (
					<span className={ classNames( 'tribe-editor__separator', className ) }>{ separatorDate }</span> );
			case 'time-range':
				return (
					<span className={ classNames( 'tribe-editor__separator', className ) }>{ separatorTime }</span> );
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
				<h2 className="tribe-editor__subtitle__headline" onClick={ this.props.toggleDashboard }>
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

	renderDashboard() {
		const { dashboardOpen } = this.props;
		return (
			<Dashboard
				open={ dashboardOpen }
				onClose={ this.props.closeDashboard }
				targets={ [ 'DayPicker-Week', 'DayPicker-Day' ] }
				overflow>
				<Fragment>
					<section className="tribe-editor__calendars">
						{ this.renderCalendars() }
					</section>
					<footer className="tribe-editor__subtitle__footer">
						<section>
							{ this.renderStartTimePicker() }
							{ this.isAllDay() ? null : this.renderSeparator( 'time-range', 'tribe-editor__time-picker__separator' ) }
							{ this.renderEndTimePicker() }
						</section>
						<section>
							{ this.renderMultidayCheckbox() }
						</section>
					</footer>
				</Fragment>
			</Dashboard>
		);
	}

	renderCalendars() {
		const { multiDay, start, end } = this.props;
		const monthProps = {
			onSelectDay: this.setDays,
			withRange: multiDay,
			from: toMoment( start ).toDate(),
			month: toMoment( start ).startOf( 'month' ).toDate(),
		};

		if ( ! this.isSameDay() ) {
			monthProps.to = toMoment( end ).toDate();
		}

		return (
			<Month { ...monthProps } />
		);
	}

	setDays = ( data ) => {
		const { from, to } = data;
		const { setStartDate, setEndDate } = this.props;

		setStartDate( toDateTime( toMoment( from ) ) );
		setEndDate( to ? toDateTime( toMoment( to ) ) : to );
	};

	renderStartTimePicker() {
		const { start, allDay } = this.props;
		const { time, date } = FORMATS.WP;
		const startMoment = toMoment( start );
		const pickerProps = {
			onSelectItem: this.setStartTime,
			current: startMoment,
			timeFormat: time,
		};

		if ( allDay ) {
			pickerProps.allDay = true;
		}

		return (
			<React.Fragment>
				<span className="tribe-editor__time-picker__label">{ startMoment.format( toFormat( date ) ) }</span>
				<TimePicker { ...pickerProps } />
			</React.Fragment>
		);
	}

	setStartTime = ( data ) => {
		const { seconds, allDay } = data;
		const { setAllDay, setStartTime } = this.props;

		setAllDay( allDay );
		setStartTime( seconds );
	};

	renderEndTimePicker() {
		if ( this.isAllDay() ) {
			return null;
		}

		const { time, date } = FORMATS.WP;
		const start = toMoment( this.props.start );
		const end = toMoment( this.props.end );
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
		const { setAllDay, setEndTime } = this.props;

		setAllDay( allDay );
		setEndTime( seconds );
	};

	renderMultidayCheckbox() {
		const { multiDay, setMultiDay } = this.props;
		return (
			<CheckBox
				label={ __( 'Multi-Day', 'events-gutenberg' ) }
				checked={ multiDay }
				onChange={ setMultiDay }
			/>
		);
	}

	/**
	 * Controls being rendered on the sidebar.
	 *
	 * @returns {ReactDOM} A React Dom Element null if none.
	 */
	renderControls() {
		const {
			separatorTime,
			separatorDate,
			timezone,
			setTimeZone,
			setSeparatorTime,
			setSeparatorDate,
		} = this.props;

		return ( <InspectorControls key="inspector">
			<PanelBody title={ __( 'Date Time Settings', 'events-gutenberg' ) }>
				<TextControl
					label={ __( 'Date Time Separator', 'events-gutenberg' ) }
					value={ separatorDate }
					onChange={ setSeparatorDate }
					className="tribe-editor__date-time__date-time-separator-setting"
					maxLength="2"
				/>
				<TextControl
					label={ __( 'Time Range Separator', 'events-gutenberg' ) }
					value={ separatorTime }
					onChange={ setSeparatorTime }
					className="tribe-editor__date-time__time-range-separator-setting"
					maxLength="2"
				/>
				<SelectControl
					label={ __( 'Time Zone', 'events-gutenberg' ) }
					value={ timezone }
					onChange={ setTimeZone }
					options={ timezonesAsSelectData() }
					className="tribe-editor__date-time__time-zone-setting"
				/>
			</PanelBody>
		</InspectorControls> );
	}

	render() {
		return [ this.renderLabel(), this.renderControls() ];
	}
}

export default compose( [
	withSelect( ( select ) => {
		const { get } = select( STORE_NAME );
		return {
			start: get( 'start' ),
			end: get( 'end' ),
			multiDay: get( 'multiDay' ),
			separatorDate: get( 'separatorDate' ),
			separatorTime: get( 'separatorTime' ),
			timezone: get( 'timezone' ),
			allDay: get( 'allDay' ),
			dashboardOpen: get( 'dashboardOpen' ),
			cost: get( 'cost' ),
		};
	} ),
	withDispatch( ( dispatch, props ) => {
		const {
			setInitialState,
			toggleDashboard,
			closeDashboard,
			setMultiDay,
			setAllDay,
			setTimezone,
			setStartDate,
			setEndDate,
			setStartTime,
			setEndTime,
			setSeparatorDate,
			setSeparatorTime,
			setCost,
		} = dispatch( STORE_NAME );

		return {
			setInitialState() {
				setInitialState( props.attributes );
			},
			toggleDashboard,
			closeDashboard,
			setMultiDay,
			setAllDay,
			setTimezone,
			setStartDate,
			setEndDate,
			setStartTime,
			setEndTime,
			setSeparatorDate,
			setSeparatorTime,
			setCost,
		};
	} ),
	withSaveData(),
] )( EventDateTime );
