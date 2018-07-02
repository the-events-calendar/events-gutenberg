/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';

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

import {
	actions as dateTimeActions,
	selectors as dateTimeSelectors,
} from 'data/blocks/datetime';
import {
	actions as UIActions,
	selectors as UISelectors,
} from 'data/ui';
import {
	selectors as priceSelectors,
	actions as priceActions,
} from 'data/blocks/price';

import { getSetting } from 'editor/settings';
import classNames from 'classnames';
import { toFormat, toMoment, totalSeconds, toDate } from 'utils/moment';
import { FORMATS, timezonesAsSelectData } from 'utils/date';
import { HALF_HOUR_IN_SECONDS } from 'utils/time';
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
		setDate: PropTypes.func,
		setStartTime: PropTypes.func,
		setEndTime: PropTypes.func,
		toggleMultiDay: PropTypes.func,
		setTimeZone: PropTypes.func,
		setSeparatorTime: PropTypes.func,
		setSeparatorDate: PropTypes.func,
		closeDashboard: PropTypes.func,
		setVisibleMonth: PropTypes.func,
		visibleMonth: PropTypes.instanceOf( Date ),
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
		return this.props.allDay;
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
					<span className={ classNames( 'tribe-editor__separator', className ) }>
						{ separatorDate }
					</span>
				);
			case 'time-range':
				return (
					<span className={ classNames( 'tribe-editor__separator', className ) }>
						{ separatorTime }
					</span>
				);
			case 'dash':
				return (
					<span className={ classNames( 'tribe-editor__separator', className ) }> &mdash; </span>
				);
			case 'all-day':
				return (
					<span className={ classNames( 'tribe-editor__separator', className ) }> ALL DAY</span>
				);
			case 'space':
				return (
					<span className={ classNames( 'tribe-editor__separator', className ) }>&nbsp;</span>
				);
			case 'timezone':
				return (
					<span className={ classNames( 'tribe-editor__separator', className ) }>
						{ timezone }
					</span>
				);
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
				overflow
			>
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
		const { multiDay, start, end, visibleMonth, setVisibleMonth } = this.props;
		const monthProps = {
			onSelectDay: this.setDays,
			withRange: multiDay,
			from: toMoment( start ).toDate(),
			month: visibleMonth,
			setVisibleMonth,
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
		const { setDate } = this.props;
		setDate( from, to );
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

		if ( allDay ) {
			setAllDay( allDay );
		} else {
			setStartTime( seconds );
		}
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
		if ( allDay ) {
			setAllDay( allDay );
		} else {
			setEndTime( seconds );
		}
	};

	renderMultidayCheckbox() {
		const { multiDay, toggleMultiDay } = this.props;
		return (
			<CheckBox
				label={ __( 'Multi-Day', 'events-gutenberg' ) }
				checked={ multiDay }
				onChange={ toggleMultiDay }
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
				/>
				<TextControl
					label={ __( 'Time Range Separator', 'events-gutenberg' ) }
					value={ separatorTime }
					onChange={ setSeparatorTime }
				/>
				<SelectControl
					label={ __( 'Time Zone', 'events-gutenberg' ) }
					value={ timezone }
					onChange={ setTimeZone }
					options={ timezonesAsSelectData() }
				/>
			</PanelBody>
		</InspectorControls> );
	}

	render() {
		return [ this.renderLabel(), this.renderControls() ];
	}
}

const mapStateToProps = ( state ) => {
	return {
		dashboardOpen: UISelectors.getDashboardOpen( state ),
		visibleMonth: UISelectors.getVisibleMonth( state ),
		start: dateTimeSelectors.getStart( state ),
		end: dateTimeSelectors.getEnd( state ),
		multiDay: dateTimeSelectors.getMultiDay( state ),
		allDay: dateTimeSelectors.getAllDay( state ),
		separatorDate: dateTimeSelectors.getDateSeparator( state ),
		separatorTime: dateTimeSelectors.getTimeSeparator( state ),
		timezone: dateTimeSelectors.getTimeZone( state ),
		cost: priceSelectors.getPrice( state ),
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		...bindActionCreators( dateTimeActions, dispatch ),
		...bindActionCreators( UIActions, dispatch ),
		...bindActionCreators( priceActions, dispatch ),
		setInitialState( props ) {
			dispatch( priceActions.setInitialState( props ) );
			dispatch( dateTimeActions.setInitialState( props ) );
			dispatch( UIActions.setInitialState( props ) );
		},
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( EventDateTime );
