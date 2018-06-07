/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { noop, pick } from 'lodash';
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
	MetaGroup,
} from 'elements';

import { default as EventOrganizers } from './organizers';

import { toMoment, toDate, toTime } from 'utils/moment';
import { STORE_NAME as ORGANIZER_STORE } from 'data/organizers';
import { store, STORE_NAME as DETAILS_STORE } from 'data/details';

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
	};

	static propTypes = {
		eventOrganizers: PropTypes.array,
	};

	constructor( props ) {
		super( ...arguments );

		this.state = {
			...props,
			loading: ! ! props.eventOrganizers.length,
		};
		this.unsubscribe = noop;
	}

	componentDidMount() {
		this.unsubscribe = store.subscribe( () => {
			const { setAttributes } = this.props;
			const state = store.getState();
			// Pick relevant ones from store
			const attributes = {
				...pick( state, VALID_PROPS ),
				eventOrganizers: select( DETAILS_STORE ).getOrganizers(),
			};
			setAttributes( { eventOrganizers: select( DETAILS_STORE ).getOrganizers() } );
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
			<div key="event-details-box" className="tribe-editor__block tribe-editor__event-details">
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
		} = this.props;

		const organizersBlocks = select( ORGANIZER_STORE ).getOrganizersIds();

		return (
			<MetaGroup groupKey="organizer">
				<RichText
					tagName="h3"
					className="tribe-editor__events-section__headline"
					value={ organizerTitle }
					onChange={ ( nextContent ) => setAttributes( { organizerTitle: nextContent } ) }
					focus={ focus && 'organizerTitle' === focus.editable ? focus : undefined }
					placeholder={ __( 'Organizer', 'events-gutenberg' ) }
					formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
				/>
				<EventOrganizers
					focus={ focus }
					organizers={ eventOrganizers }
					organizersBlocks={ organizersBlocks }
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
		const { detailsTitle, setAttributes, setFocus } = this.props;
		return (
			<RichText
				tagName="h3"
				className="tribe-editor__events-section__headline"
				value={ detailsTitle }
				onChange={ ( nextContent ) => setAttributes( { detailsTitle: nextContent } ) }
				focus={ focus && 'detailsTitle' === focus.editable ? focus : undefined }
				placeholder={ __( 'Details', 'events-gutenberg' ) }
				formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
			/>
		);
	}

	renderStart() {
		const { startDate } = this.props;

		return (
			<div onClick={ this.toggleDashboard }>
				<strong>{ __( 'Start: ', 'events-gutenberg' ) }</strong><br/>
				{ toDate( toMoment( startDate ) ) }
				{ this.renderStartTime() }
			</div>
		);
	}

	renderStartTime() {
		const { allDay, startDate, dateTimeRangeSeparator } = this.props;

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
		const { endDate } = this.props;
		return (
			<div onClick={ this.toggleDashboard }>
				<strong>{ __( 'End: ', 'events-gutenberg' ) }</strong><br/>
				{ toDate( toMoment( endDate ) ) }
				{ this.renderEndTime() }
			</div>
		);
	}

	renderEndTime() {
		const { allDay } = this.props;

		if ( allDay ) {
			return null;
		}

		const { endDate, dateTimeRangeSeparator } = this.props;

		return (
			<React.Fragment>
				<span>{ dateTimeRangeSeparator }</span>
				{ toTime( toMoment( endDate ) ) }
			</React.Fragment>
		);
	}

	toggleDashboard = () => {
		store.dispatch( { type: 'TOGGLE_DASHBOARD' } );
	};

	renderWebsite() {
		const { eventUrl, setAttributes } = this.props;
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
		const { setAttributes, eventCost, currencyPosition, eventCurrencySymbol } = this.props;
		return (
			<div className="tribe-editor__event-cost">
				<strong>{ __( 'Price: ', 'events-gutenberg' ) }</strong><br/>
				{ 'prefix' === currencyPosition && <span>{ eventCurrencySymbol }</span> }
				<PlainText
					className={ classNames( 'tribe-editor__event-cost__value', `tribe-editor-cost-symbol-position-${ currencyPosition }` ) }
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
		const { isSelected, allDay, setAttributes, currencyPosition, eventCurrencySymbol } = this.props;

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
