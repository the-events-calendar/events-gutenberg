/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
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
	Spinner,
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

import { totalSeconds, toMoment, toDate, toTime } from 'utils/moment';
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
	static defaultProps = {
		eventOrganizers: [],
	}

	static propTypes = {
		eventOrganizers: PropTypes.array,
	}

	constructor( props ) {
		super( ...arguments );

		this.state = {
			...props,
			loading: !! props.eventOrganizers.length,
		};
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
					organizers={ eventOrganizers }
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
			<div onClick={ this.toggleDashboard }>
				<strong>{ __( 'Start: ', 'events-gutenberg' ) }</strong><br />
				{ toDate( toMoment( startDate ) ) }
				{ this.renderStartTime() }
			</div>
		);
	}

	renderStartTime() {
		const { allDay, startDate, dateTimeRangeSeparator } = this.state;

		if ( allDay ) {
			return null;
		}

		return (
			<React.Fragment>
				<span>{ dateTimeRangeSeparator }</span>
				<span>{ toTime( toMoment( startDate ) ) }</span>
			</React.Fragment>
		);
	}

	renderEnd() {
		const { endDate } = this.state;
		return (
			<div onClick={ this.toggleDashboard }>
				<strong>{ __( 'End: ', 'events-gutenberg' ) }</strong><br />
				{ toDate( toMoment( endDate ) ) }
				{ this.renderEndTime() }
			</div>
		);
	}

	renderEndTime() {
		const { allDay } = this.state;

		if ( allDay ) {
			return null;
		}

		const { endDate, dateTimeRangeSeparator } = this.state;

		return (
			<React.Fragment>
				<span>{ dateTimeRangeSeparator }</span>
				{ toTime( toMoment( endDate ) ) }
			</React.Fragment>
		);
	}

	toggleDashboard = () => {
		store.dispatch( { type: 'TOGGLE_DASHBOARD' } );
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
