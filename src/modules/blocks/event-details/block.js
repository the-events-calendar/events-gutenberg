/**
 * External dependencies
 */
import moment from 'moment';
import { union, without, isEmpty, noop, equals } from 'lodash';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';
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

import { store } from 'data/details';

import {
	RichText,
	PlainText,
	InspectorControls,
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import {
	TermsList,
	OrganizerForm,
	DatePicker,
	TimePicker,
	MetaGroup,
} from 'elements';

import { default as EventOrganizers } from './organizers';
import { getSetting } from 'editor/settings';
import { totalSeconds } from 'utils/moment';
import { HALF_HOUR_IN_SECONDS } from 'utils/time';

/**
 * Module Code
 */
const WPDateSettings = window.tribe_date_settings;

class EventDetails extends Component {

	static defaultProps = {
		currencyPosition: '1' == getSetting( 'reverseCurrencyPosition', 0 ) ? 'suffix' : 'prefix',
		eventCurrencySymbol: getSetting( 'defaultCurrencySymbol', __( '$', 'events-gutenberg' ) ),
	}

	constructor( props ) {
		super( ...arguments );

		this.state = props;
		this.unsubscribe = noop;
	}

	componentDidMount() {
		this.unsubscribe = store.subscribe( () => {
			this.setState( store.getState() );
		} );
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		return [ this.renderBlock(), this.renderControls() ];
	}

	renderBlock() {
		return (
			<div key="event-details-box" className="tribe-editor-block tribe-editor-event-details">
				{ this.renderDetails() }
				{ this.renderOrganizer() }
			</div>
		);
	}

	renderDetails() {
		return (
			<MetaGroup groupKey="event-details">
				{ this.renderTitle() }
				{ this.renderStart() }
				{ this.renderEnd() }
				{ this.renderWebsite() }
				{ this.renderCost() }
				{ this.renderCategory() }
				{ this.renderTags() }
			</MetaGroup>
		);
	}

	renderOrganizer() {
		const {
			organizerTitle,
			eventOrganizers,
			setAttributes,
			setFocus,
			focus,
		} = this.state;

		return (
			<MetaGroup groupKey="organizer">
				<RichText
					tagName="h3"
					className="tribe-events-single-section-title"
					value={ organizerTitle }
					onChange={ ( nextContent ) => setAttributes( { organizerTitle: nextContent } ) }
					focus={ focus && 'organizerTitle' === focus.editable ? focus : undefined }
					onFocus={ ( focusValue ) => setFocus( { editable: 'organizerTitle', ...focusValue } ) }
					placeholder={ __( 'Organizer', 'events-gutenberg' ) }
					formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
				/>

				<EventOrganizers
					focus={ focus }
					addOrganizer={ nextOrganizer => setAttributes( { eventOrganizers: union( eventOrganizers, [ nextOrganizer.id ] ) } ) }
					removeOrganizer={ organizer => {
						let organizers = without( eventOrganizers, organizer.id );

						// If none are there we remove existing
						if ( isEmpty( organizers ) ) {
							organizers = [ 0 ];
						}
						setAttributes( { eventOrganizers: organizers } );
					} }
				/>
			</MetaGroup>
		);
	}

	renderTitle() {
		const { detailsTitle, setAttributes, setFocus } = this.state;
		return (
			<RichText
				tagName="h3"
				className="tribe-events-single-section-title"
				value={ detailsTitle }
				onChange={ ( nextContent ) => setAttributes( { detailsTitle: nextContent } ) }
				focus={ focus && 'detailsTitle' === focus.editable ? focus : undefined }
				onFocus={ ( focusValue ) => setFocus( { editable: 'detailsTitle', ...focusValue } ) }
				placeholder={ __( 'Details', 'events-gutenberg' ) }
				formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
			/>
		)
	}

	renderStart() {
		const { setAttributes, startDate } = this.state;
		return (
			<div>
				<strong>{ __( 'Start: ', 'events-gutenberg' ) }</strong><br/>
				<DatePicker
					changeDatetime={ ( date ) => {
						setAttributes( { startDate: date } );
					} }
					datetime={ startDate }
				/>
				{ this.renderStartTime() }
			</div>
		);
	}

	renderStartTime() {
		const { allDay, startDate } = this.state;

		const start = moment( startDate );
		const pickerProps = {
			onSelectItem: this.setStartTime,
			current: start,
			timeFormat: WPDateSettings.formats.time,
		};

		if ( allDay ) {
			pickerProps.allDay = true;
		}

		return (
			<React.Fragment>
				<span>{ getSetting( 'dateTimeSeparator', __( ' @ ', 'events-gutenberg' ) ) }</span>
				<TimePicker { ...pickerProps } />
			</React.Fragment>
		);
	}

	setStartTime = ( data ) => {
		const { seconds, allDay } = data;
		this.setAllDay( allDay );

		store.dispatch( {
			type: 'SET_START_TIME',
			seconds,
		} );
	};

	renderEnd() {
		const { endDate, setAttributes } = this.state;
		return (
			<div>
				<strong>{ __( 'End: ', 'events-gutenberg' ) }</strong><br/>
				<DatePicker
					changeDatetime={ ( date ) => {
						setAttributes( { endDate: date } );
					} }
					datetime={ endDate }
				/>
				{ this.renderEndTime() }
			</div>
		);
	}

	renderEndTime() {
		const { allDay, startDate, endDate } = this.state;

		if ( allDay ) {
			return null;
		}

		const start = moment( startDate );
		const end = moment( endDate );

		return (
			<React.Fragment>
				<span>{ getSetting( 'dateTimeSeparator', __( ' @ ', 'events-gutenberg' ) ) }</span>
				<TimePicker
					onSelectItem={ this.setEndTime }
					current={ end }
					minTime={ totalSeconds( start.add( HALF_HOUR_IN_SECONDS, 'seconds' ) ) }
					timeFormat={ WPDateSettings.formats.time }
				/>
			</React.Fragment>
		);
	}

	setEndTime = ( data ) => {
		const { seconds, allDay } = data;
		this.setAllDay( allDay );

		store.dispatch( {
			type: 'SET_END_TIME',
			seconds,
		} );
	};

	setAllDay( allDay ) {
		store.dispatch( {
			type: 'SET_ALL_DAY',
			allDay,
		} );
	}

	renderWebsite() {
		const { eventUrl, setAttributes } = this.state;
		return (
			<div>
				<strong>{ __( 'Website: ', 'events-gutenberg' ) }</strong><br/>
				<PlainText
					id="tribe-event-url"
					value={ eventUrl }
					placeholder={ __( 'Enter url', 'events-gutenberg' ) }
					onChange={ ( nextContent ) => setAttributes( { eventUrl: nextContent } ) }
				/>
			</div>
		);
	}

	renderCost() {
		const { setAttributes, eventCost, currencyPosition, eventCurrencySymbol } = this.state;
		return (
			<div className='tribe-editor__event-cost'>
				<strong>{ __( 'Price: ', 'events-gutenberg' ) }</strong><br/>
				{ 'prefix' === currencyPosition && <span>{ eventCurrencySymbol }</span> }
				<PlainText
					className={ classNames( 'tribe-editor__event-cost-value', `tribe-editor-cost-symbol-position-${ currencyPosition }` ) }
					value={ eventCost }
					placeholder={ __( 'Enter price', 'events-gutenberg' ) }
					onChange={ ( nextContent ) => setAttributes( { eventCost: nextContent } ) }
				/>
				{ 'suffix' === currencyPosition && <span>{ eventCurrencySymbol }</span> }
			</div>
		);
	}

	renderCategory() {
		return (
			<TermsList
				slug="tribe_events_cat"
				label={ __( 'Event Category:', 'events-gutenberg' ) }
			/>
		);
	}

	renderTags() {
		return (
			<TermsList
				slug="tags"
				label={ __( 'Event Tags:', 'events-gutenberg' ) }
			/>
		);
	}

	renderControls() {
		const { isSelected, allDay, setAttributes, currencyPosition, eventCurrencySymbol } = this.state;

		if ( ! isSelected ) {
			return null;
		}

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Date Time Settings', 'events-gutenberg' ) }>
					<ToggleControl
						label={ __( 'Is All Day Event', 'events-gutenberg' ) }
						checked={ allDay }
						onChange={ ( value ) => setAttributes( { allDay: value } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Price Settings', 'events-gutenberg' ) }>
					<ToggleControl
						label={ __( 'Show symbol before', 'events-gutenberg' ) }
						checked={ 'prefix' === currencyPosition }
						onChange={ ( value ) => setAttributes( { eventCurrencyPosition: value ? 'prefix' : 'suffix' } ) }
					/>
					<TextControl
						label={ __( ' Currency Symbol', 'events-gutenberg' ) }
						value={ eventCurrencySymbol }
						placeholder={ __( 'E.g.: $', 'events-gutenberg' ) }
						onChange={ ( value ) => setAttributes( { eventCurrencySymbol: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		)
	}
}

export default EventDetails;
