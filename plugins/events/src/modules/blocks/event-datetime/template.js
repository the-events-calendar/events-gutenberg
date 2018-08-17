/**
 * External dependencies
 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls, PlainText } from '@wordpress/editor';

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
} from '@moderntribe/events/elements';
import { getSetting, getConstants } from '@moderntribe/events/editor/settings';
import {
	roundTime,
	toMoment,
	toDate,
	toDateNoYear,
	toTime,
	isSameYear,
} from '@moderntribe/events/editor/utils/moment';
import {
	FORMATS,
	TODAY,
	timezonesAsSelectData
} from '@moderntribe/events/editor/utils/date';
import { HALF_HOUR_IN_SECONDS, DAY_IN_SECONDS } from '@moderntribe/events/editor/utils/time';
import './style.pcss';

/**
 * Module Code
 */

FORMATS.date = getSetting( 'dateWithYearFormat', __( 'F j', 'events-gutenberg' ) );

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
		showDateInput: PropTypes.bool,
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
		setDateInputVisibility: PropTypes.func,
		onKeyDown: PropTypes.func,
		onClick: PropTypes.func,
		onSelectDay: PropTypes.func,
		visibleMonth: PropTypes.instanceOf( Date ),
	};

	componentDidMount() {
		const { onKeyDown, onClick } = this.props;
		document.addEventListener( 'keydown', onKeyDown );
		document.addEventListener( 'click', onClick );
	}

	componentWillUnmount() {
		const { onKeyDown, onClick } = this.props;
		document.removeEventListener( 'keydown', onKeyDown );
		document.removeEventListener( 'click', onClick );
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
		const { start, end } = this.props;
		let startDate = toDate( toMoment( start ) );

		if ( isSameYear( start, end ) && isSameYear( start, TODAY ) ) {
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
		const { start, end, multiDay } = this.props;

		if ( ! multiDay ) {
			return null;
		}

		let endDate = toDate( toMoment( end ) );

		if ( isSameYear( start, end ) && isSameYear( start, TODAY ) ) {
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

	renderCalendars() {
		const {
			multiDay,
			start,
			end,
			visibleMonth,
			setVisibleMonth,
			onSelectDay,
		} = this.props;

		const monthProps = {
			onSelectDay: onSelectDay,
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

	renderStartTimePicker() {
		const {
			start,
			end,
			allDay,
			multiDay,
			onStartTimePickerChange,
			onStartTimePickerClick
		} = this.props;
		const startMoment = toMoment( start );
		const endMoment = toMoment( end );

		const pickerProps = {
			current: startMoment,
			start: startMoment.clone().startOf( 'day' ),
			end: startMoment.clone().endOf( 'day' ),
			onChange: onStartTimePickerChange,
			onClick: onStartTimePickerClick,
			timeFormat: FORMATS.WP.time,
			allDay,
		};

		if ( ! multiDay ) {
			pickerProps.end = roundTime( endMoment.clone().subtract( 1, 'minutes' ) );
			pickerProps.max = endMoment.clone().subtract( 1, 'minutes' );
		}

		let startDate = toDate( toMoment( start ) );
		if ( isSameYear( start, end ) && isSameYear( start, TODAY ) ) {
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
		const {
			start,
			end,
			multiDay,
			allDay,
			onEndTimePickerChange,
			onEndTimePickerClick,
		} = this.props;

		if ( ! multiDay && allDay ) {
			return null;
		}

		const startMoment = toMoment( start );
		const endMoment = toMoment( end );

		const pickerProps = {
			current: endMoment,
			start: endMoment.clone().startOf( 'day' ),
			end: roundTime( endMoment.clone().endOf( 'day' ) ),
			onChange: onEndTimePickerChange,
			onClick: onEndTimePickerClick,
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
		if ( isSameYear( start, end ) && isSameYear( start, TODAY ) ) {
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

	toggleTimeZoneVisibility = () => {
		const { showTimeZone, setTimeZoneVisibility } = this.props;
		setTimeZoneVisibility( ! showTimeZone );
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
			showDateInput,
			setDateInputVisibility,
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
				{
					showDateInput
					? (
						<DateInput
							onChange={ setNaturalLanguageLabel }
							setDateTime={ setDateTime }
							value={ naturalLanguageLabel }
							after={ this.renderExtras() }
						/>
					)
					: (
						<h2 className="tribe-editor__subtitle__headline">
							<button
								className="tribe-editor__btn--label"
								onClick={ () => {
									setDateInputVisibility( true );
									openDashboardDateTime();
								} }
							>
								{ this.renderStart() }
								{ ( multiDay || ! allDay ) && this.renderSeparator( 'time-range' ) }
								{ this.renderEnd() }
								{ allDay && this.renderSeparator( 'all-day' ) }
							</button>
							{ this.renderExtras() }
						</h2>
					)
				}
				{ this.renderDashboard() }
			</section>
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

	render() {
		return [ this.renderDate(), this.renderControls() ];
	}
}

export default EventDateTime;
