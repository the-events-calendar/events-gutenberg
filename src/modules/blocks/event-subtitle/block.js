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
	DateTime,
} from 'elements'

/**
 * Module Code
 */
class EventSubtitle extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { attributes, focus, setAttributes } = this.props;

		return [
			<h2 key="event-datetime" className="tribe-editor-block tribe-editor-events-subtitle">
				<DateTime
					changeDatetime={ ( date ) => setAttributes( { startDate: date } ) }
					datetime={ attributes.startDate }
				/>
				<span>{ __( ' - ', 'the-events-calendar' ) }</span>
				<DateTime
					changeDatetime={ ( date ) => setAttributes( { endDate: date } ) }
					datetime={ attributes.endDate }
				/>
			</h2>
		]
	}
}

export default EventSubtitle;
