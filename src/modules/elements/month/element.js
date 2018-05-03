import moment from 'moment';
import { Component } from '@wordpress/element';
import {
	DatePicker as WPDatePicker,
} from '@wordpress/components';

import './style.pcss';

export default class Month extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		return (
			<WPDatePicker
				monthsShown={2}
				minDate={moment()}
				showDisabledMonthNavigation
				calendarClassName="tribe-calendar__month"
			/>
		);
	}
}