/**
 * External dependencies
 */
import moment from 'moment';
import { times, unescape, get, escapeRegExp } from 'lodash';
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
import { Component, compose } from '@wordpress/element';
import {
	Placeholder,
	Spinner,
	DatePicker as WPDatePicker,
	Dropdown,
	withAPIData,
} from '@wordpress/components';
import { query } from '@wordpress/data'
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { toMomentFormat } from 'editor/utils/date'
import { getSetting } from 'editor/settings'

/**
 * Module Code
 */

// Fetches all the Editor Settings
const DATA = tribe_blocks_editor_settings;

class DatePicker extends Component {
	constructor() {
		super( ...arguments );

		this.onChange = this.onChange.bind( this );
		this.changeDatetime = this.props.changeDatetime.bind( this );
		this.formatDate = this.formatDate.bind( this );

		this.onChange( this.props.datetime );
	}

	formatDate( date, label = false ) {
		// Defaults to the non-label format
		let format = 'YYYY-MM-DD HH:mm:00';

		if ( ! date ) {
			date = moment();
		}

		// Convert to moment
		if ( 'string' === typeof date ) {
			date = moment( date );
		}

		// on Invalid date we reset to now
		if ( ! date.isValid() ) {
			date = moment();
		}

		if ( label ) {
			format = `${ toMomentFormat( getSetting( 'dateWithYearFormat', __( 'F j, Y', 'the-events-calendar' ) ) ) }`
		}

		return date.minutes( date.minutes() ).format( format );
	}

	onChange( date ) {
		// Start defaults to now
		let dateMoment = moment();

		// if we have the date we prep the moment
		if ( date ) {
			dateMoment = moment( date );
		}

		this.changeDatetime( this.formatDate( dateMoment ) );
	}

	render() {
		return (
			<Dropdown
				className="tribe-editor-datetime"
				position="bottom left"
				contentClassName="tribe-editor-datetime__dialog"
				renderToggle={ ( { onToggle, isOpen } ) => (
					<button
						type="button"
						className="button-link"
						onClick={ onToggle }
						aria-expanded={ isOpen }
					>
						{ this.formatDate( this.props.datetime, true ) }
					</button>
				) }
				renderContent={ () => <WPDatePicker key="date-picker" currentDate={ this.props.datetime } onChange={ this.onChange } /> }
			/>
		);
	}
}

export default DatePicker;
