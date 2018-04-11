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
import { query } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { toMomentFormat } from 'editor/utils/date';
import { getSetting } from 'editor/settings';

import './style.pcss';

/**
 * Module Code
 */
class DatePicker extends Component {
	constructor() {
		super( ...arguments );

		this.changeDatetime = this.props.changeDatetime.bind( this );

		this.onChange = this.onChange.bind( this );
		this.formatDate = this.formatDate.bind( this );

		this.renderToggle = this.renderToggle.bind( this );
		this.renderContent = this.renderContent.bind( this );
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
			format = `${ toMomentFormat( getSetting( 'dateWithYearFormat', __( 'F j, Y', 'the-events-calendar' ) ) ) }`;
		}

		return date.minutes( date.minutes() ).format( format );
	}

	renderContent( { onToggle, isOpen, onClose } ) {
		this.onClose = onClose.bind( this );

		return (
			<WPDatePicker key="date-picker" currentDate={ this.props.datetime } onChange={ this.onChange } />
		);
	}

	renderToggle( { onToggle, isOpen, onClose } ) {
		return (
			<button
				type="button"
				className="button-link"
				onClick={ onToggle }
				aria-expanded={ isOpen }
			>
				{ this.formatDate( this.props.datetime, true ) }
			</button>
		);
	}

	onChange( date ) {
		this.changeDatetime( this.formatDate( date ) );
		this.onClose();
	}

	render() {
		return (
			<Dropdown
				className="tribe-element-datepicker"
				position="bottom left"
				contentClassName="tribe-element-datepicker-dialog"
				renderToggle={ this.renderToggle }
				renderContent={ this.renderContent }
			/>
		);
	}
}

export default DatePicker;
