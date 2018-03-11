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

		this.setAttributes = this.setAttributes.bind( this );

		this.state = this.props
	}

	setAttributes( attributes ) {
		// Set attributes to Blocks List
		this.state.setAttributes( attributes )

		this.setState( ( prevState ) => ( {
			attributes: { ...prevState.attributes, ...attributes },
		} ) );
	}

	render() {
		const { attributes, setAttributes, focus } = this.props;
		return [
			<h2 key="event-datetime" className="tribe-editor-block tribe-editor-events-subtitle">
				<DatePicker
					changeDatetime={ ( date ) => {
						setAttributes( { startDate: date } )
					} }
					datetime={ attributes.startDate }
				/>
				<span>{ DATA.dateTimeSeparator || ' @ ' }</span>
				<TimePicker
					onSelectItem={ ( date ) => {
						setAttributes( { startDate: date } )
					} }
					current={ attributes.startDate }
				/>
				<span>{ DATA.timeRangeSeparator || ' - ' }</span>
				<DatePicker
					changeDatetime={ ( date ) => {
						setAttributes( { endDate: date } )
					} }
					datetime={ attributes.endDate }
				/>
				<span>{ DATA.dateTimeSeparator || ' @ ' }</span>
				<TimePicker
					onSelectItem={ ( date ) => {
						setAttributes( { endDate: date } )
					} }
					current={ attributes.endDate }
				/>
			</h2>
		]
	}
}

export default EventSubtitle;
