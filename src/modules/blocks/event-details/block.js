/**
 * External dependencies
 */
import moment from 'moment';
import { union, without, isEmpty } from 'lodash';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data'
import { __ } from '@wordpress/i18n';
import { Component, compose } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon,
	ToggleControl,
	TextControl,
	PanelBody,
} from '@wordpress/components';

import {
	RichText,
	PlainText,
	InspectorControls,
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
const WPDateSettings = _wpDateSettings;

class EventDetails extends Component {
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
		const {
			attributes,
			setAttributes,
			focus,
			setFocus,
			isSelected
		} = this.props;

		let currencyPosition = '1' == DATA.reverseCurrencyPosition ? 'suffix' : 'prefix';

		// If we have it saved we replace it
		if ( attributes.eventCurrencyPosition ) {
			currencyPosition = attributes.eventCurrencyPosition;
		}

		let eventCurrencySymbol = __( '$', 'the-events-calendar' );
		if ( attributes.eventCurrencySymbol ) {
			eventCurrencySymbol = attributes.eventCurrencySymbol;
		}
		eventCurrencySymbol = (
			<span>{ eventCurrencySymbol }</span>
		);

		const content = [
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
							timeFormat={ WPDateSettings.formats.time }
						/>
					</div>

					<div>
						<strong>{ __( 'End: ', 'the-events-calendar' ) }</strong><br />
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
							timeFormat={ WPDateSettings.formats.time }
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
						{ 'prefix' === currencyPosition &&
							eventCurrencySymbol
						}
						<PlainText
							className={ classNames( 'tribe-editor__event-cost-value', `tribe-editor-cost-symbol-position-${ currencyPosition }` ) }
							value={ attributes.eventCost }
							placeholder={ __( 'Enter price', 'the-events-calendar' ) }
							onChange={ ( nextContent ) => setAttributes( { eventCost: nextContent } ) }
						/>
						{ 'suffix' === currencyPosition &&
							eventCurrencySymbol
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
			</div>,
			isSelected && (
				<InspectorControls key="inspector">
					<PanelBody title={ __( 'Venue Map Settings' ) }>
						<ToggleControl
							label={ __( 'Show symbol before', 'the-events-calendar' ) }
							checked={ 'prefix' === currencyPosition ? true : false  }
							onChange={ ( value ) => setAttributes( { eventCurrencyPosition: value ? 'prefix' : 'suffix' } ) }
						/>
						<TextControl
							label={ __( ' Currency Symbol', 'the-events-calendar' ) }
							value={ attributes.eventCurrencySymbol }
							placeholder={ __( '$', 'the-events-calendar' ) }
							onChange={ ( value ) => setAttributes( { eventCurrencySymbol: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
			)
		]

		return content
	}
}

export default EventDetails;
