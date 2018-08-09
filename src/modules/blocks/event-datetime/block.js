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
	ToggleControl,
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
	Month,
	DateInput,
	Upsell,
	TimeZone,
} from 'elements';
import './style.pcss';

import {
	actions as dateTimeActions,
	thunks as dateTimeThunks,
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

import { getSetting, getConstants } from 'editor/settings';
import classNames from 'classnames';
import {
	roundTime,
	toMoment,
	toDate,
	toDateNoYear,
	toTime,
} from 'utils/moment';
import { FORMATS, timezonesAsSelectData, TODAY } from 'utils/date';
import { HALF_HOUR_IN_SECONDS, DAY_IN_SECONDS } from 'utils/time';
import withSaveData from 'editor/hoc/with-save-data';
import { hasClass, searchParent } from 'utils/dom';

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
		timeZone: PropTypes.string,
		showTimeZone: PropTypes.bool,
		timeZoneLabel: PropTypes.string,
		setTimeZoneLabel: PropTypes.func,
		setTimeZoneVisibility: PropTypes.func,
		currencyPosition: PropTypes.oneOf( [ 'prefix', 'suffix', '' ] ),
		currencySymbol: PropTypes.string,
		naturalLanguageLabel: PropTypes.string,
		setInitialState: PropTypes.func,
		setCost: PropTypes.func,
		openDashboardDateTime: PropTypes.func,
		setStartTime: PropTypes.func,
		setEndTime: PropTypes.func,
		setAllDay: PropTypes.func,
		setMultiDay: PropTypes.func,
		setDates: PropTypes.func,
		setDateTime: PropTypes.func,
		setTimeZone: PropTypes.func,
		setSeparatorTime: PropTypes.func,
		setSeparatorDate: PropTypes.func,
		closeDashboardDateTime: PropTypes.func,
		setVisibleMonth: PropTypes.func,
		setNaturalLanguageLabel: PropTypes.func,
		visibleMonth: PropTypes.instanceOf( Date ),
	};

	componentDidMount() {
		document.addEventListener( 'keydown', this.onKeyDown );
		document.addEventListener( 'click', this.onClick );
	}

	componentWillUnmount() {
		document.removeEventListener( 'keydown', this.onKeyDown );
		document.removeEventListener( 'click', this.onClick );
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
		if ( ! tribe_blocks_editor || ! tribe_blocks_editor.is_classic ) {
			return null;
		}

		return (
			<div
				key="tribe-editor-event-cost"
				className="tribe-editor__event-cost"
			>
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
		let startDate = toDate( toMoment( start ) );

		if ( this.isSameYear() && this.isSameYear( TODAY ) ) {
			startDate = toDateNoYear( toMoment( start ) );
		}

		return (
			<span className="tribe-editor__subtitle__headline-date">{ startDate }</span>
		);
	}

	renderStartTime() {
		const { start, allDay } = this.props;

		if ( allDay ) {
			return null;
		}

		return (
			<React.Fragment>
				{ this.renderSeparator( 'date-time' ) }
				{ toTime( toMoment( start ), FORMATS.WP.time ) }
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
		const { multiDay } = this.props;

		if ( ! multiDay ) {
			return null;
		}

		const { end } = this.props;
		let endDate = toDate( toMoment( end ) );

		if ( this.isSameYear() && this.isSameYear( TODAY ) ) {
			endDate = toDateNoYear( toMoment( end ) );
		}

		return (
			<span className="tribe-editor__subtitle__headline-date">{ endDate }</span>
		);
	}

	renderEndTime() {
		const { end, multiDay, allDay } = this.props;

		if ( allDay ) {
			return null;
		}

		return (
			<React.Fragment>
				{ multiDay && this.renderSeparator( 'date-time' ) }
				{ toTime( toMoment( end ), FORMATS.WP.time ) }
			</React.Fragment>
		);
	}

	isSameYear( start = this.props.start, end = this.props.end ) {
		return toMoment( start ).isSame( toMoment( end ), 'year' );
	}

	renderTimezone() {
		return this.renderSeparator( 'timeZone' );
	}

	/**
	 * Renders a separator based on the type called
	 *
	 * @param {string} type - The type of separator
	 *
	 * @returns {ReactDOM} A React Dom Element null if none.
	 */
	renderSeparator( type, className ) {
		const {
			timeZone,
			separatorDate,
			separatorTime,
			setTimeZoneLabel,
			timeZoneLabel,
			showTimeZone,
		} = this.props;
		switch ( type ) {
			case 'date-time':
				return (
					<span className={ classNames( 'tribe-editor__separator', className ) }>
						{ ' '.concat( separatorDate, ' ' ) }
					</span>
				);
			case 'time-range':
				return (
					<span className={ classNames( 'tribe-editor__separator', className ) }>
						{ ' '.concat( separatorTime, ' ' ) }
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
			case 'timeZone':
				return showTimeZone && (
					<span
						key="time-zone-separator"
						className={ classNames( 'tribe-editor__separator', className ) }>
						<TimeZone
							value={ timeZoneLabel }
							placeholder={ timeZoneLabel }
							onChange={ setTimeZoneLabel }
						/>
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
	renderDate() {
		const {
			multiDay,
			allDay,
			isSelected,
			openDashboardDateTime,
			setDateTime,
			setNaturalLanguageLabel,
			naturalLanguageLabel,
		} = this.props;
		return (
			<section
				key="event-datetime"
				className="tribe-editor__subtitle tribe-editor__date-time"
			>
				<DateInput
					selected={ isSelected }
					onClickHandler={ openDashboardDateTime }
					onChange={ setNaturalLanguageLabel }
					setDateTime={ setDateTime }
					value={ naturalLanguageLabel }
					after={ this.renderExtras() }
				>
					<h2 className="tribe-editor__subtitle__headline">
						<button
							className="tribe-editor__btn--label"
							onClick={ openDashboardDateTime }
						>
							{ this.renderStart() }
							{ ( multiDay || ! allDay ) && this.renderSeparator( 'time-range' ) }
							{ this.renderEnd() }
							{ allDay && this.renderSeparator( 'all-day' ) }
						</button>
						{ this.renderExtras() }
					</h2>
				</DateInput>
				{ this.renderDashboard() }
			</section>
		);
	}

	renderExtras() {
		return [ this.renderTimezone(), this.renderPrice() ];
	}

	renderDashboard() {
		const { dashboardOpen, multiDay, allDay } = this.props;
		const hideUpsell = getConstants().hide_upsell === 'true';

		return (
			<Dashboard open={ dashboardOpen }>
				<Fragment>
					<section className="tribe-editor__calendars">
						{ this.renderCalendars() }
					</section>
					<footer className="tribe-editor__subtitle__footer">
						<div className="tribe-editor__subtitle__footer-date">
							<div className="tribe-editor__subtitle__time-pickers">
								{ this.renderStartTimePicker() }
								{
									( multiDay || ! allDay ) &&
									this.renderSeparator( 'time-range', 'tribe-editor__time-picker__separator' )
								}
								{ this.renderEndTimePicker() }
							</div>
							<div className="tribe-editor__subtitle__footer-multiday">
								{ this.renderMultiDayToggle() }
							</div>
						</div>
						{ ! hideUpsell && <Upsell/> }
					</footer>
				</Fragment>
			</Dashboard>
		);
	}

	/* TODO: This needs to move to logic component wrapper */
	onKeyDown = ( e ) => {
		const ESCAPE_KEY = 27;
		if ( e.keyCode === ESCAPE_KEY ) {
			this.props.closeDashboardDateTime();
		}
	};

	/* TODO: This needs to move to logic component wrapper */
	onClick = ( e ) => {
		const { target } = e;
		if (
			! this.isTargetInBlock( target ) &&
			! this.isValidChildren( target )
		) {
			this.props.closeDashboardDateTime();
		}
	};

	/* TODO: This needs to move to logic component wrapper */
	isTargetInBlock = ( target ) => (
		searchParent( target, ( testNode ) => {
			if ( testNode.classList.contains( 'editor-block-list__block' ) ) {
				return Boolean( testNode.querySelector( '.tribe-editor__date-time' ) );
			}
			return false;
		} )
	);

	isValidChildren = ( target ) => {
		const targets = [
			'tribe-editor__timepicker__dialog',
			'edit-post-sidebar',
			'trigger-dashboard-datetime',
		];
		return searchParent( target, ( testNode ) => hasClass( testNode, targets ) );
	};

	renderCalendars() {
		const { multiDay, start, end, visibleMonth, setVisibleMonth } = this.props;
		const monthProps = {
			onSelectDay: this.setDays,
			withRange: multiDay,
			from: toMoment( start ).toDate(),
			month: visibleMonth,
			setVisibleMonth,
		};

		if ( multiDay ) {
			monthProps.to = toMoment( end ).toDate();
		}

		return (
			<Month { ...monthProps } />
		);
	}

	setDays = ( data ) => {
		const { from, to } = data;
		const { start, end, setDates } = this.props;
		setDates( { start, end, to, from } );
	};

	startTimePickerOnChange = ( e ) => {
		const { start, end, setStartTime } = this.props;
		const [ hour, minute ] = e.target.value.split( ':' );

		const startMoment = toMoment( start );
		const max = toMoment( end ).clone().subtract( 1, 'minutes' );

		const copy = startMoment.clone();
		copy.set( 'hour', parseInt( hour, 10 ) );
		copy.set( 'minute', parseInt( minute, 10 ) );
		copy.set( 'second', 0 );

		if ( copy.isAfter( max ) ) {
			return;
		}

		const seconds = copy.diff( startMoment.clone().startOf( 'day' ), 'seconds' );
		setStartTime( { start, seconds } );
	};

	startTimePickerOnClick = ( value, onClose ) => {
		const { start, end, setStartTime, setAllDay } = this.props;
		const isAllDay = value === 'all-day';
		const seconds = isAllDay ? 0 : value;

		if ( ! isAllDay ) {
			setStartTime( { start, seconds } );
		}

		setAllDay( { start, end, isAllDay } );
		onClose();
	};

	endTimePickerOnChange = ( e ) => {
		const { start, end, setEndTime } = this.props;
		const [ hour, minute ] = e.target.value.split( ':' );

		const endMoment = toMoment( end );
		const min = toMoment( start ).clone().add( 1, 'minutes' );

		const copy = endMoment.clone();
		copy.set( 'hour', parseInt( hour, 10 ) );
		copy.set( 'minute', parseInt( minute, 10 ) );
		copy.set( 'second', 0 );

		if ( copy.isBefore( min ) ) {
			return;
		}

		const seconds = copy.diff( endMoment.clone().startOf( 'day' ), 'seconds' );
		setEndTime( { end, seconds } );
	};

	endTimePickerOnClick = ( value, onClose ) => {
		const { start, end, setEndTime, setAllDay } = this.props;
		const isAllDay = value === 'all-day';
		const seconds = isAllDay ? DAY_IN_SECONDS - 1 : value;

		if ( ! isAllDay ) {
			setEndTime( { end, seconds } );
		}

		setAllDay( { start, end, isAllDay } );
		onClose();
	};

	renderStartTimePicker() {
		const { start, allDay, multiDay, end } = this.props;
		const startMoment = toMoment( start );
		const endMoment = toMoment( end );

		const pickerProps = {
			current: startMoment,
			start: startMoment.clone().startOf( 'day' ),
			end: startMoment.clone().endOf( 'day' ),
			onChange: this.startTimePickerOnChange,
			onClick: this.startTimePickerOnClick,
			timeFormat: FORMATS.WP.time,
			allDay,
		};

		if ( ! multiDay ) {
			pickerProps.end = roundTime( endMoment.clone().subtract( 1, 'minutes' ) );
			pickerProps.max = endMoment.clone().subtract( 1, 'minutes' );
		}

		let startDate = toDate( toMoment( start ) );
		if ( this.isSameYear() && this.isSameYear( TODAY ) ) {
			startDate = toDateNoYear( toMoment( start ) );
		}

		return (
			<React.Fragment>
				<span className="tribe-editor__time-picker__label">{ startDate }</span>
				<TimePicker { ...pickerProps } />
			</React.Fragment>
		);
	}

	renderEndTimePicker() {
		const { start, end, multiDay, allDay } = this.props;

		if ( ! multiDay && allDay ) {
			return null;
		}

		const startMoment = toMoment( start );
		const endMoment = toMoment( end );

		const pickerProps = {
			current: endMoment,
			start: endMoment.clone().startOf( 'day' ),
			end: roundTime( endMoment.clone().endOf( 'day' ) ),
			onChange: this.endTimePickerOnChange,
			onClick: this.endTimePickerOnClick,
			timeFormat: FORMATS.WP.time,
			allDay,
		};


		if ( ! multiDay ) {
			// if the start time has less than half an hour left in the day
			if ( endMoment.clone().add( 1, 'days' ).startOf( 'day' ).diff( startMoment, 'seconds' ) <= HALF_HOUR_IN_SECONDS ) {
				pickerProps.start = endMoment.clone().endOf( 'day' );
			} else {
				pickerProps.start = roundTime( startMoment ).add( 30, 'minutes' );
			}
			pickerProps.min = startMoment.clone().add( 1, 'minutes' );
		}

		let endDate = toDate( toMoment( end ) );
		if ( this.isSameYear() && this.isSameYear( TODAY ) ) {
			endDate = toDateNoYear( toMoment( end ) );
		}

		return (
			<React.Fragment>
				{ multiDay && <span className="tribe-editor__time-picker__label">{ endDate }</span> }
				<TimePicker { ...pickerProps } />
			</React.Fragment>
		);
	}

	multiDayToggleOnChange = ( checked ) => {
		const { start, end, setMultiDay } = this.props;
		setMultiDay( { start, end, checked } );
	};

	renderMultiDayToggle() {
		const { multiDay } = this.props;
		return (
			<ToggleControl
				label={ __( 'Multi-Day', 'events-gutenberg' ) }
				checked={ multiDay }
				onChange={ this.multiDayToggleOnChange }
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
			timeZone,
			setTimeZone,
			setSeparatorTime,
			setSeparatorDate,
			showTimeZone,
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
					value={ timeZone }
					onChange={ setTimeZone }
					options={ timezonesAsSelectData() }
					className="tribe-editor__date-time__time-zone-setting"
				/>
				<ToggleControl
					label={ __( 'Show Time Zone', 'events-gutenberg' ) }
					checked={ showTimeZone }
					onChange={ this.toggleTimeZoneVisibility }
				/>
			</PanelBody>
		</InspectorControls> );
	}

	toggleTimeZoneVisibility = () => {
		const { showTimeZone, setTimeZoneVisibility } = this.props;
		setTimeZoneVisibility( ! showTimeZone );
	}

	render() {
		return [ this.renderDate(), this.renderControls() ];
	}
}

const mapStateToProps = ( state ) => {
	return {
		dashboardOpen: UISelectors.getDashboardDateTimeOpen( state ),
		visibleMonth: UISelectors.getVisibleMonth( state ),
		start: dateTimeSelectors.getStart( state ),
		end: dateTimeSelectors.getEnd( state ),
		naturalLanguageLabel: dateTimeSelectors.getNaturalLanguageLabel( state ),
		multiDay: dateTimeSelectors.getMultiDay( state ),
		allDay: dateTimeSelectors.getAllDay( state ),
		separatorDate: dateTimeSelectors.getDateSeparator( state ),
		separatorTime: dateTimeSelectors.getTimeSeparator( state ),
		showTimeZone: dateTimeSelectors.getTimeZoneVisibility( state ),
		timeZone: dateTimeSelectors.getTimeZone( state ),
		timeZoneLabel: dateTimeSelectors.getTimeZoneLabel( state ),
		cost: priceSelectors.getPrice( state ),
		currencySymbol: priceSelectors.getSymbol( state ),
		currencyPosition: priceSelectors.getPosition( state ),
	};
};

const mapDispatchToProps = ( dispatch ) => ( {
	...bindActionCreators( dateTimeActions, dispatch ),
	...bindActionCreators( dateTimeThunks, dispatch ),
	...bindActionCreators( UIActions, dispatch ),
	...bindActionCreators( priceActions, dispatch ),
	setInitialState( props ) {
		dispatch( priceActions.setInitialState( props ) );
		dispatch( dateTimeThunks.setInitialState( props ) );
		dispatch( UIActions.setInitialState( props ) );
	},
} );

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( EventDateTime );
