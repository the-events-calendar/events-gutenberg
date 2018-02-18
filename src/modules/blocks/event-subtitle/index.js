/**
 * External dependencies
 */
import moment from 'moment';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { DateTimePicker, Dropdown } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
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

/**
 * Block Code
 */
class EventSubtitle extends Component {
	constructor() {
		super( ...arguments );
		const { attributes, setAttributes } = this.props;

		this.onChangeEnd = this.onChangeEnd.bind( this );
		this.onChangeStart = this.onChangeStart.bind( this );
		this.formatDate = this.formatDate.bind( this );

		this.onChangeStart( attributes.startDate );
		this.onChangeEnd( attributes.endDate );
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

	onChangeStart( date ) {
		const { attributes, setAttributes } = this.props;

		// Start defaults to now
		var dateMoment = moment();

		// if we have the date we prep the moment
		if ( date ) {
			dateMoment = moment( date );
		}

		setAttributes( {
			startDate: this.formatDate( dateMoment )
		} );
	}

	onChangeEnd( date ) {
		const { attributes, setAttributes } = this.props;

		// End defaults to now + 2h
		var dateMoment = moment().add( 2, 'hours' );

		// if we have the date we prep the moment
		if ( date ) {
			dateMoment = moment( date );
		}

		setAttributes( {
			endDate: this.formatDate( dateMoment )
		} );
	}

	render() {
		const { attributes, focus, setAttributes } = this.props;

		const startDropdown = (
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
						{ this.formatDate( attributes.startDate, true ) }
					</button>
				) }
				renderContent={ () => <DateTimePicker key="start-datetime-picker" currentDate={ attributes.startDate } onChange={ this.onChangeStart } /> }
			/>
		);

		const endDropdown = (
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
						{ this.formatDate( attributes.endDate, true ) }
					</button>
				) }
				renderContent={ () => <DateTimePicker key="end-datetime-picker" currentDate={ attributes.endDate } onChange={ this.onChangeEnd } /> }
			/>
		);

		return [
			<h2 key="event-datetime" className="tribe-editor-block tribe-editor-events-subtitle">
				{ startDropdown }
				<span> - </span>
				{ endDropdown }
			</h2>
		];//
	}
}

export default {
	id: 'event-subtitle',
	title: __( 'Event Subtitle', 'the-events-calendar' ),
	description: __( 'Configuration for the Event Date Time', 'the-events-calendar' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'the-events-calendar', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		startDate: {
			type: 'string',
			source: 'meta',
			meta: '_EventStartDate',
		},
		endDate: {
			type: 'string',
			source: 'meta',
			meta: '_EventEndDate',
		}
	},

	useOnce: true,

	edit: EventSubtitle,

	save( props ) {
		return null;
	}
};

