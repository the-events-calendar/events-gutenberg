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


/**
 * Module Code
 */

// Fetches all the Editor Settings
const DATA = tribe_blocks_editor_settings;

function round15( minute ) {
	let intervals = [ 15, 30, 45, 59, 0 ];
	let closest;
	let min = 90;

	for ( let i = 0; i < intervals.length; i++ ) {
		let iv = intervals[ i ];
		let maybeMin = Math.abs( minute - iv );

		if ( maybeMin < min ) {
			min = maybeMin;
			closest = iv;
		}
	}

	if ( 59 === closest ) {
		closest = 0;
	}

	return closest;
}

const toMomentFormat = ( format ) => {
	const strtr = ( str, pairs ) => {
		const substrs = Object.keys( pairs ).map( escapeRegExp )
		return str.split( RegExp( `(${ substrs.join( '|' ) })` ) )
			.map( part => pairs[ part ] || part )
			.join( '' )
	}

    const replacements = {
        'd': 'DD',
        'D': 'ddd',
        'j': 'D',
        'l': 'dddd',
        'N': 'E',
        'S': 'o',
        'w': 'e',
        'z': 'DDD',
        'W': 'W',
        'F': 'MMMM',
        'm': 'MM',
        'M': 'MMM',
        'n': 'M',
        't': '', // no equivalent
        'L': '', // no equivalent
        'o': 'YYYY',
        'Y': 'YYYY',
        'y': 'YY',
        'a': 'a',
        'A': 'A',
        'B': '', // no equivalent
        'g': 'h',
        'G': 'H',
        'h': 'hh',
        'H': 'HH',
        'i': 'mm',
        's': 'ss',
        'u': 'SSS',
        'e': 'zz', // deprecated since version 1.6.0 of moment.js
        'I': '', // no equivalent
        'O': '', // no equivalent
        'P': '', // no equivalent
        'T': '', // no equivalent
        'Z': '', // no equivalent
        'c': '', // no equivalent
        'r': '', // no equivalent
        'U': 'X',
    };

    return strtr( format, replacements );
}

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
			format = `${ toMomentFormat( DATA.dateWithYearFormat || 'F j, Y' ) }`
		}

		return date.minutes( round15( date.minutes() ) ).format( format );
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
