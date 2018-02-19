/**
 * External dependencies
 */
import moment from 'moment';
import { connect } from 'react-redux';
import { times, unescape, get } from 'lodash';
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
import { Component, compose } from '@wordpress/element';
import {
	Placeholder,
	Spinner,
	DateTimePicker,
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

class DateTime extends Component {
	constructor() {
		super( ...arguments );

		this.onChange = this.onChange.bind( this );
		this.changeDatetime = this.props.changeDatetime.bind( this );
		this.formatDate = this.formatDate.bind( this );

		this.onChange( this.props.datetime );
	}

	formatDate( date, label = false ) {
		const format = label ? 'YYYY-MM-DD @ HH:mm' : 'YYYY-MM-DD HH:mm:00';

		if ( ! date ) {
			date = moment();
		}

		// Convert to moment
		if ( 'string' === typeof date ) {
			date = moment( date );
		}

		return date.minutes( round15( date.minutes() ) ).format( format );
	}

	onChange( date ) {
		// Start defaults to now
		var dateMoment = moment();

		// if we have the date we prep the moment
		if ( date ) {
			dateMoment = moment( date );
		}

		this.changeDatetime( this.formatDate( dateMoment ) );
	}

	render() {
		const dropdown = (
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
				renderContent={ () => <DateTimePicker key="datetime-picker" currentDate={ this.props.datetime } onChange={ this.onChange } /> }
			/>
		);

		const label = this.props.label ? <strong className='tribe-detail-label'>{ this.props.label } </strong> : '';

		return [
			<div
				key='tribe-element-datetime'
				className='tribe-element tribe-element__datetime'
			>
				{ label }
				{ dropdown }
			</div>
		];
	}
}

export default DateTime;
