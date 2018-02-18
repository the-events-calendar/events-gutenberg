/**
 * External dependencies
 */
import moment from 'moment';
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { Component, compose } from '@wordpress/element';
import {
	DateTimePicker,
	Dropdown,
	withAPIData
} from '@wordpress/components';
import { RichText, PlainText } from '@wordpress/blocks'
import { select } from '@wordpress/data'
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	TermsList, OrganizerForm
} from 'elements'

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
class EventDetails extends Component {
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
		const { attributes, setAttributes, focus, setFocus } = this.props;

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

		const focusDetailTitle = ( focusValue ) => setFocus( { editable: 'detailsTitle', ...focusValue } );

		const organizerExistingDropdown = (
			<Dropdown
				className="tribe-editor-organizer-dropdown"
				position="bottom center"
				contentClassName="tribe-editor-dropdown__dialog"
				renderToggle={ ( { onToggle, isOpen } ) => (
					<button
						type="button"
						className="button-secondary"
						onClick={ onToggle }
						aria-expanded={ isOpen }
					>
						{ __( 'Add Existing', 'the-events-calendar' ) }
					</button>
				) }
				renderContent={ () => ( <OrganizerForm /> ) }
			/>
		);

		const organizerCreateDropdown = (
			<Dropdown
				className="tribe-editor-organizer-dropdown"
				position="bottom center"
				contentClassName="tribe-editor-dropdown__dialog"
				renderToggle={ ( { onToggle, isOpen } ) => (
					<button
						type="button"
						className="button-secondary"
						onClick={ onToggle }
						aria-expanded={ isOpen }
					>
						{ __( 'Create', 'the-events-calendar' ) }
					</button>
				) }
				renderContent={ () => ( <OrganizerForm /> ) }
			/>
		);

		const urlField = (
			<PlainText
				id="tribe-event-url"
				value={ attributes.eventUrl }
				placeholder={ __( 'Write event website here…', 'the-events-calendar' ) }
				onChange={ ( nextContent ) => {
					setAttributes( {
						eventUrl: nextContent
					} );
				} }
			/>
		);

		const DetailsBox = (
			<div
				className="tribe-events-meta-group tribe-events-meta-group-details"
			>
				<RichText
					tagName="h3"
					className="tribe-events-single-section-title"
					value={ attributes.detailsTitle }
					onChange={ ( nextContent ) => {
						if ( ! nextContent ) {
							nextContent = __( 'Details', 'the-events-calendar' );
						}

						setAttributes( {
							detailsTitle: nextContent
						} );
					} }
					focus={ focus && 'detailsTitle' === focus.editable ? focus : undefined }
					onFocus={ focusDetailTitle }
					placeholder={ __( 'Details', 'the-events-calendar' ) }
					formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
				/>
				<div>
					<strong>Start: </strong><br />
					{ startDropdown }
				</div>

				<div>
					<strong>End: </strong><br />
					{ endDropdown }
				</div>

				<div>
					<strong>Website: </strong>
					{ urlField }
				</div>

				<TermsList label={ __( 'Event Category:', 'the-events-calendar' ) } slug="tribe_events_cat" />

				<TermsList label={ __( 'Event Tags:', 'the-events-calendar' ) } slug="tags" />

			</div>
		);

		const focusOrganizerTitle = ( focusValue ) => setFocus( { editable: 'organizerTitle', ...focusValue } );

		const OrganizerBox = (
			<div
				className="tribe-events-meta-group tribe-events-meta-group-organizer"
			>
				<RichText
					tagName="h3"
					className="tribe-events-single-section-title"
					value={ attributes.organizerTitle }
					onChange={ ( nextContent ) => {
						setAttributes( {
							organizerTitle: nextContent
						} );
					} }
					focus={ focus && 'organizerTitle' === focus.editable ? focus : undefined }
					onFocus={ focusOrganizerTitle }
					placeholder={ __( 'Organizer', 'the-events-calendar' ) }
					formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
				/>
				{ organizerExistingDropdown }
				{ organizerCreateDropdown }
			</div>
		);

		return [
			<div key="event-details-box" className="tribe-editor-block tribe-editor-events-details">
				{ DetailsBox }
				{ OrganizerBox }
			</div>
		];
	}
}

export default EventDetails;
