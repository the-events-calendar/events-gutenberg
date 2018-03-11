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
} from 'elements'

/**
 * Module Code
 */
// Fetches all the Editor Settings
const DATA = tribe_blocks_editor_settings;

class EventSubtitle extends Component {
	constructor() {
		super( ...arguments );
	}

	changeTime( current, item ) {
		let currentDate = moment( current, 'YYYY-MM-DD HH:mm:ss' )
		// On invalid date we reset to today
		if ( ! currentDate.isValid() ) {
			currentDate = moment()
		}

		const nextDatetime = currentDate.startOf( 'day' ).add( item.value, 'seconds' )
		return nextDatetime.format( 'YYYY-MM-DD HH:mm:ss' )
	}

	render() {
		const { attributes, focus, setAttributes } = this.props;

		return [
			<h2 key="event-datetime" className="tribe-editor-block tribe-editor-events-subtitle">
				<DatePicker
					changeDatetime={ ( date ) => {
						setAttributes( { startDate: date } )
						this.setState( { startDate: date } )
					} }
					datetime={ attributes.startDate }
				/>
				<span>{ DATA.dateTimeSeparator || ' @ ' }</span>
				<TimePicker
					onSelectItem={ ( item ) => {
						const startDate = this.changeTime( attributes.startDate, item );
						setAttributes( { startDate: startDate } )
						this.setState( { startDate: startDate } )
					} }
					current={ attributes.startDate }
				/>
				<span>{ DATA.timeRangeSeparator || ' - ' }</span>
				<DatePicker
					changeDatetime={ ( date ) => {
						setAttributes( { endDate: date } )
						this.setState( { endDate: date } )
					} }
					datetime={ attributes.endDate }
				/>
				<span>{ DATA.dateTimeSeparator || ' @ ' }</span>
				<TimePicker
					onSelectItem={ ( item ) => {
						const endDate = this.changeTime( attributes.endDate, item );
						setAttributes( { endDate: endDate } )
						this.setState( { endDate: endDate } )
					} }
					current={ attributes.endDate }
				/>
			</h2>
		]
	}
}

export default EventSubtitle;
