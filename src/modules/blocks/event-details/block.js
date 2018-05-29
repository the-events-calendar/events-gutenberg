/**
 * External dependencies
 */
import React from 'react';
import { union, without, isEmpty, noop, pick, identity } from 'lodash';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { select } from '@wordpress/data';

import {
	ToggleControl,
	TextControl,
	PanelBody,
} from '@wordpress/components';

import {
	RichText,
	PlainText,
	InspectorControls,
} from '@wordpress/editor';

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

import { totalSeconds, toMoment } from 'utils/moment';
import { HALF_HOUR_IN_SECONDS } from 'utils/time';
import { FORMATS } from 'utils/date';
import { store, STORE_NAME } from 'data/details';
import { VALID_PROPS as SUBTITLE_PROPS } from 'blocks/event-subtitle/block';

export const VALID_PROPS = [
	'eventOrganizers',
	'eventCurrencySymbol',
	'currencyPosition',
];

/**
 * Module Code
 */

export default class EventDetails extends Component {
	constructor( props ) {
		super( ...arguments );

		this.state = props;
		this.unsubscribe = noop;
	}

	componentDidMount() {
		this.unsubscribe = store.subscribe( () => {
			const state = store.getState();
			this.setState( pick( state, [ ...SUBTITLE_PROPS, ...VALID_PROPS ] ) );
		} );

		store.dispatch( {
			type: 'SET_INITIAL_STATE',
			values: pick( this.state, VALID_PROPS ),
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

		const organizers = select( STORE_NAME ).getOrganizersDetails();

		return (
			<MetaGroup groupKey="organizer">
				<RichText
					tagName="h3"
					className="tribe-events-single-section-title"
					value={ organizerTitle }
					onChange={ ( nextContent ) => setAttributes( { organizerTitle: nextContent } ) }
					focus={ focus && 'organizerTitle' === focus.editable ? focus : undefined }
					placeholder={ __( 'Organizer', 'events-gutenberg' ) }
					formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
				/>

				<EventOrganizers
					focus={ focus }
					organizers={ organizers }
					addOrganizer={ nextOrganizer => {
						store.dispatch( {
							type: 'ADD_ORGANIZER',
							organizer: nextOrganizer,
						} );
					} }
					removeOrganizer={ organizer => {
						store.dispatch( {
							type: 'REMOVE_ORGANIZER',
							organizer: organizer,
						} );
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
				placeholder={ __( 'Details', 'events-gutenberg' ) }
				formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
			/>
		);
	}

	renderStart() {
		const { startDate } = this.state;

		return (
			<div>
				<strong>{ __( 'Start: ', 'events-gutenberg' ) }</strong><br />
				<DatePicker
					changeDatetime={ this.setStartDay }
					datetime={ startDate }
				/>
				{ this.renderStartTime() }
			</div>
		);
	}

	setStartDay( date ) {
		store.dispatch( {
			type: 'SET_START_DATE',
			date,
		} );
	}

	renderStartTime() {
		const { allDay, startDate, dateTimeRangeSeparator } = this.state;
		const { time } = FORMATS.WP;

		const start = toMoment( startDate );
		const pickerProps = {
			onSelectItem: this.setStartTime,
			current: start,
			timeFormat: time,
		};

		if ( allDay ) {
			pickerProps.allDay = true;
		}

		return (
			<React.Fragment>
				<span>{ dateTimeRangeSeparator }</span>
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
		const { endDate } = this.state;
		return (
			<div>
				<strong>{ __( 'End: ', 'events-gutenberg' ) }</strong><br />
				<DatePicker
					changeDatetime={ this.setEndDate }
					datetime={ endDate }
				/>
				{ this.renderEndTime() }
			</div>
		);
	}

	setEndDate( date ) {
		store.dispatch( {
			type: 'SET_END_DATE',
			date,
		} );
	}

	renderEndTime() {
		const { allDay } = this.state;

		if ( allDay ) {
			return null;
		}

		const { startDate, endDate, dateTimeRangeSeparator } = this.state;
		const start = toMoment( startDate );
		const end = toMoment( endDate );
		const { time } = FORMATS.WP;

		return (
			<React.Fragment>
				<span>{ dateTimeRangeSeparator }</span>
				<TimePicker
					onSelectItem={ this.setEndTime }
					current={ end }
					minTime={ totalSeconds( start.add( HALF_HOUR_IN_SECONDS, 'seconds' ) ) }
					timeFormat={ time }
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
				<strong>{ __( 'Website: ', 'events-gutenberg' ) }</strong><br />
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
			<div className="tribe-editor__event-cost">
				<strong>{ __( 'Price: ', 'events-gutenberg' ) }</strong><br />
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
		);
	}
}
