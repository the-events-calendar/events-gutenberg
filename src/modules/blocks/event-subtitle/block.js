/**
 * External dependencies
 */
import moment from 'moment';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { Dropdown } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	DatePicker,
	TimePicker,
	TimezonePicker,
} from 'elements'

import { getSetting } from 'editor/settings'

/**
 * Module Code
 */
// Fetches all the Editor Settings
const WPDateSettings = _wpDateSettings;

class EventSubtitle extends Component {
	constructor() {
		super( ...arguments );

		this.state = this.props
	}

	render() {
		const {
			attributes,
			setAttributes,
			focus,
			isSelected,
		} = this.props;

		return [
			<h2 key="event-datetime" className="tribe-editor-block tribe-editor-events-subtitle">
				<DatePicker
					changeDatetime={ ( date ) => {
						setAttributes( { startDate: date } )
					} }
					datetime={ attributes.startDate }
				/>
				<span>{ getSetting( 'dateTimeSeparator', __( ' @ ', 'the-events-calendar' ) ) }</span>
				<TimePicker
					onSelectItem={ ( date ) => {
						setAttributes( { startDate: date } )
					} }
					current={ attributes.startDate }
					timeFormat={ WPDateSettings.formats.time }
				/>
				<span>{ getSetting( 'timeRangeSeparator', __( ' - ', 'the-events-calendar' ) ) }</span>
				<DatePicker
					changeDatetime={ ( date ) => {
						setAttributes( { endDate: date } )
					} }
					datetime={ attributes.endDate }
				/>
				<span>{ getSetting( 'dateTimeSeparator', __( ' @ ', 'the-events-calendar' ) ) }</span>
				<TimePicker
					onSelectItem={ ( date ) => {
						setAttributes( { endDate: date } )
					} }
					current={ attributes.endDate }
					timeFormat={ WPDateSettings.formats.time }
				/>
				<span> &mdash; </span>
				<TimezonePicker
					onSelectItem={ ( value ) => {
						setAttributes( { timezone: value } )
					} }
					current={ attributes.timezone }
					siteTimezone={ WPDateSettings.timezone }
				/>
			</h2>
		]
	}
}

export default EventSubtitle;
