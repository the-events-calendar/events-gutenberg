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
} from 'elements'
import './style.pcss';

import { getItems } from './../../elements/timezone-picker/element'

import { getSetting } from 'editor/settings'

/**
 * Module Code
 */
// Fetches all the Editor Settings
const WPDateSettings = window.tribe_date_settings || {};

class EventSubtitle extends Component {
	constructor() {
		super( ...arguments );

		const { attributes, setAttributes } = this.props;

		this.timezones = getItems()
			.map( (group) => group.options || [])
			.reduce( (prev, current) => [...prev, ...current], [] )

		this.state = {
			...this.props,
			dateTimeRangeSeparator: getSetting('dateTimeSeparator', __(' @ ', 'events-gutenberg')),
			timeRangeSeparator: getSetting('timeRangeSeparator', __(' - ', 'events-gutenberg')),
			timezone: attributes.timezone || 'UTC',
		}
	}


	start() {
		return<React.Fragment>
			{this.startDate()}
			{this.startTime()}
		</React.Fragment>
	}

	startDate() {
		const { attributes, setAttributes } = this.props;
		return <DatePicker
			changeDatetime={ ( date ) => {
				setAttributes( { startDate: date } )
			} }
			datetime={ attributes.startDate }
		/>
	}

	startTime() {
		const { attributes, setAttributes } = this.props;

		if ( this.isAllDay() ) {
			return null;
		}

		return <React.Fragment>
			{this.separator('date-time')}
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

	end() {
		return <React.Fragment>
			{this.endDate()}
			{this.endTime()}
		</React.Fragment>
	}

	endDate() {
		const { attributes, setAttributes } = this.props;

		if ( this.isSameDay() ) {
			return null;
		}

		return <DatePicker
			changeDatetime={(date) => {
				setAttributes({
					endDate: date
				})
			}}
			datetime={attributes.endDate}
		/>
	}

	endTime() {
		const { attributes, setAttributes } = this.props;

		if ( this.isAllDay() ) {
			return null;
		}

		return <React.Fragment>
			{this.isSameDay() ? null : this.separator('date-time')}
			<TimePicker
				onSelectItem={ ( date, startAllDay = false, endAllDay = false, args = {}) => {
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

	/**
	 * Test if the current start and end date are happening on the same day.
	 *
	 * @returns {boolean}
	 */
	isSameDay() {
		const { attributes } = this.props;
		const { startDate, endDate } = attributes;

		return moment(startDate).isSame(endDate, 'day');
	}

	/**
	 * Test if the current event is happening all day.
	 *
	 * @returns {boolean}
	 */
	isAllDay() {
		const { attributes } = this.props;
		const { allDay } = attributes;
		return allDay;
	}

	timezone() {
		return this.separator( 'timezone' );
	}

	/**
	 * Renders a separator based on the type called
	 *
	 * @param type
	 *
	 * @returns {*}
	 */
	separator( type ) {
		const { dateTimeRangeSeparator, timeRangeSeparator, timezone } = this.state;
		switch ( type ) {
			case 'date-time':
				return <span className='tribe-editor-events-subtitle__separator'>{ dateTimeRangeSeparator }</span>;
			case 'time-range':
				return <span className='tribe-editor-events-subtitle__separator'>{ timeRangeSeparator }</span>;
			case 'dash':
				return <span className='tribe-editor-events-subtitle__separator'> &mdash; </span>;
			case 'all-day':
				return <span className='tribe-editor-events-subtitle__separator'> ALL DAY</span>
			case 'space':
				return <span className='tribe-editor-events-subtitle__separator'>&nbsp;</span>
			case 'timezone':
				return <span className='tribe-editor-events-subtitle__separator'> { timezone } </span>
			default:
				return null;
		}
	}

	/**
	 * Main label used to display the event
	 *
	 * @returns {*}
	 */
	label() {
		return <h2 key="event-datetime" className="tribe-editor-block tribe-editor-events-subtitle">
			{this.start()}
			{this.isSameDay() && this.isAllDay() ? null : this.separator('time-range')}
			{this.end()}
			{this.isAllDay() ? this.separator('all-day') : null}
			{this.separator('space')}
			{this.timezone()}
		</h2>
	}

	/**
	 * Controls being rendered on the sidebar.
	 *
	 * @returns {*}
	 */
	controls() {
		const { setAttributes, isSelected } = this.props;
		const { timeRangeSeparator, dateTimeRangeSeparator, timezone } = this.state;

		if ( ! isSelected ) {
			return null;
		}

		return <InspectorControls key="inspector">
			<PanelBody title={ __( 'Date Time Settings', 'events-gutenberg' ) }>
				<TextControl
					label={ __( 'Date Time Separator', 'events-gutenberg' ) }
					value={dateTimeRangeSeparator}
					onChange={(value) => this.setState({ dateTimeRangeSeparator: value }) }
					/>
				<TextControl
					label={ __( 'Time Range Separator', 'events-gutenberg' ) }
					value={timeRangeSeparator}
					onChange={(value) => this.setState({ timeRangeSeparator: value })}
				/>
				<SelectControl
					label={ __( 'Time Zone', 'events-gutenberg' ) }
					value={timezone}
					onChange={(timezone) => this.setState({ timezone }) }
					options={this.timezones.map( (timezone) => {
						return {
							value: timezone.key,
							label: timezone.text,
						}
					})}
				/>
				<ToggleControl
					label={ __( 'Is All Day Event', 'events-gutenberg' ) }
					checked={ this.isAllDay() }
					onChange={ ( value ) => setAttributes( { allDay: value } ) }
				/>
			</PanelBody>
		</InspectorControls>
	}

	render() {
		return [ this.label(), this.controls() ]
	}
}

export default EventSubtitle;
