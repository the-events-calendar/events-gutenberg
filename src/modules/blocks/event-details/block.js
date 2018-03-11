/**
 * External dependencies
 */
import moment from 'moment';
import { union, without, isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data'
import { __ } from '@wordpress/i18n';
import { Component, compose } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon
} from '@wordpress/components';

import {
	RichText,
	PlainText,
} from '@wordpress/blocks'

/**
 * Internal dependencies
 */
import {
	TermsList,
	OrganizerForm,
	DatePicker,
	TimePicker,
	MetaGroup,
} from 'elements'

import { default as EventOrganizers } from './organizers'

/**
 * Module Code
 */

const DATA = tribe_blocks_editor_settings;

class EventDetails extends Component {
	constructor() {
		super( ...arguments );
		this.state = this.props.attributes
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
		const { attributes, setAttributes, focus, setFocus } = this.props;
		const reverseCurrencySymbolPositon = '1' == DATA.reverseCurrencyPosition;
		const currencySymbol = (
			<PlainText
				className="tribe-editor__event-cost-currency"
				value={ attributes.eventCurrencySymbol }
				placeholder={ __( '$', 'the-events-calendar' ) }
				onChange={ ( nextContent ) => setAttributes( { eventCurrencySymbol: nextContent } ) }
			/>
		)

		const content = (
			<div key="event-details-box" className="tribe-editor-block tribe-editor-event__details">
				<MetaGroup groupKey='event-details'>
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
						onFocus={ ( focusValue ) => setFocus( { editable: 'detailsTitle', ...focusValue } ) }
						placeholder={ __( 'Details', 'the-events-calendar' ) }
						formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
					/>

					<div>
						<strong>{ __( 'Start: ', 'the-events-calendar' ) }</strong><br />
						<DatePicker
							changeDatetime={ ( date ) => setAttributes( { startDate: date } ) }
							datetime={ attributes.startDate }
						/>
						<span>{ DATA.dateTimeSeparator || ' @ ' }</span>
						<TimePicker
							onSelectItem={ ( item ) => {
								setAttributes( { startDate: this.changeTime( attributes.startDate, item ) } )
							} }
							current={ attributes.startDate }
						/>
					</div>

					<div>
						<strong>{ __( 'End: ', 'the-events-calendar' ) }</strong><br />
						<DatePicker
							changeDatetime={ ( date ) => setAttributes( { endDate: date } ) }
							datetime={ attributes.endDate }
						/>
						<span>{ DATA.dateTimeSeparator || ' @ ' }</span>
						<TimePicker
							onSelectItem={ ( item ) => {
								setAttributes( { endDate: this.changeTime( attributes.endDate, item ) } )
							} }
							current={ attributes.endDate }
						/>
					</div>


					<div>
						<strong>{ __( 'Website: ', 'the-events-calendar' ) }</strong><br />
						<PlainText
							id="tribe-event-url"
							value={ attributes.eventUrl }
							placeholder={ __( 'Enter url', 'the-events-calendar' ) }
							onChange={ ( nextContent ) => setAttributes( { eventUrl: nextContent } ) }
						/>
					</div>

					<div className='tribe-editor__event-cost'>
						<strong>{ __( 'Price: ', 'the-events-calendar' ) }</strong><br />
						{ ! reverseCurrencySymbolPositon &&
							currencySymbol
						}
						<PlainText
							className="tribe-editor__event-cost-value"
							value={ attributes.eventCost }
							placeholder={ __( 'Enter price', 'the-events-calendar' ) }
							onChange={ ( nextContent ) => setAttributes( { eventCost: nextContent } ) }
						/>
						{ reverseCurrencySymbolPositon &&
							currencySymbol
						}
					</div>

					<TermsList
						slug="tribe_events_cat"
						label={ __( 'Event Category:', 'the-events-calendar' ) }
					/>

					<TermsList
						slug="tags"
						label={ __( 'Event Tags:', 'the-events-calendar' ) }
					/>
				</MetaGroup>
				<MetaGroup groupKey='organizer'>
					<RichText
						tagName="h3"
						className="tribe-events-single-section-title"
						value={ attributes.organizerTitle }
						onChange={ ( nextContent ) => setAttributes( { organizerTitle: nextContent } ) }
						focus={ focus && 'organizerTitle' === focus.editable ? focus : undefined }
						onFocus={ ( focusValue ) => setFocus( { editable: 'organizerTitle', ...focusValue } ) }
						placeholder={ __( 'Organizer', 'the-events-calendar' ) }
						formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
					/>

					<EventOrganizers
						focus={ focus }
						addOrganizer={ nextOrganizer => setAttributes( { eventOrganizers: union( attributes.eventOrganizers, [ nextOrganizer.id ] ) } ) }
						removeOrganizer={ organizer => {
							let organizers = without( attributes.eventOrganizers, organizer.id )

							// If none are there we remove existing
							if ( isEmpty( organizers ) ) {
								organizers = [ 0 ]
							}
							setAttributes( { eventOrganizers: organizers } )
						} }
					/>
				</MetaGroup>
			</div>
		)

		return content
	}
}

export default EventDetails;
