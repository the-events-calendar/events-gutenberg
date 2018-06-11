/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, compose } from '@wordpress/element';

import { withDispatch, withSelect } from '@wordpress/data';
import saveData from 'utils/save-data';

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
import { STORE_NAME as DETAILS_STORE } from 'data/details';

/**
 * Module Code
 */

class EventDetails extends Component {
	static defaultProps = {
		organizers: [],
	};

	static propTypes = {
		organizers: PropTypes.array,
	};

	constructor() {
		super( ...arguments );
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
			organizers,
			setAttributes,
			focus,
			addOrganizer,
			removeOrganizers,
		} = this.props;

		const organizersBlocks = [];

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
					organizers={ organizers }
					organizersBlocks={ organizersBlocks }
					addOrganizer={ addOrganizer }
					removeOrganizer={ removeOrganizers }
				/>
			</MetaGroup>
		);
	}

	renderTitle() {
		const { detailsTitle, setAttributes } = this.props;
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
		const { start, toggleDashboard } = this.props;

		return (
			<div onClick={ toggleDashboard }>
				<strong>{ __( 'Start: ', 'events-gutenberg' ) }</strong><br/>
				{ toDate( toMoment( start ) ) }
				{ this.renderStartTime() }
			</div>
		);
	}

	renderStartTime() {
		const { allDay, start, separatorDate } = this.props;

		if ( allDay ) {
			return null;
		}

		return (
			<React.Fragment>
				<span>{ separatorDate }</span>
				<span>{ toTime( toMoment( start ) ) }</span>
			</React.Fragment>
		);
	}

	renderEnd() {
		const { end, toggleDashboard } = this.props;
		return (
			<div onClick={ toggleDashboard }>
				<strong>{ __( 'End: ', 'events-gutenberg' ) }</strong><br/>
				{ toDate( toMoment( end ) ) }
				{ this.renderEndTime() }
			</div>
		);
	}

	renderEndTime() {
		const { allDay } = this.props;

		if ( allDay ) {
			return null;
		}

		const { end, separatorDate } = this.props;

		return (
			<React.Fragment>
				<span>{ separatorDate }</span>
				{ toTime( toMoment( end ) ) }
			</React.Fragment>
		);
	}

	renderWebsite() {
		const { url, setUrl } = this.props;
		return (
			<div>
				<strong>{ __( 'Website: ', 'events-gutenberg' ) }</strong><br/>
				<PlainText
					id="tribe-event-url"
					value={ url }
					placeholder={ __( 'Enter url', 'events-gutenberg' ) }
					onChange={ setUrl }
				/>
			</div>
		);
	}

	renderCost() {
		const { setAttributes, cost, currencyPosition, currencySymbol } = this.props;
		return (
			<div className="tribe-editor__event-cost">
				<strong>{ __( 'Price: ', 'events-gutenberg' ) }</strong><br/>
				{ 'prefix' === currencyPosition && <span>{ currencySymbol }</span> }
				<PlainText
					className={ classNames( 'tribe-editor__event-cost__value', `tribe-editor-cost-symbol-position-${ currencyPosition }` ) }
					value={ cost }
					placeholder={ __( 'Enter price', 'events-gutenberg' ) }
					onChange={ ( nextContent ) => setAttributes( { cost: nextContent } ) }
				/>
				{ 'suffix' === currencyPosition && <span>{ currencySymbol }</span> }
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
		const {
			isSelected,
			allDay,
			currencyPosition,
			currencySymbol,
			setCurrencySymbol,
			setAllDay,
			setCurrencyPosition,
		} = this.props;

		if ( ! isSelected ) {
			return null;
		}

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Date Time Settings', 'events-gutenberg' ) }>
					<ToggleControl
						label={ __( 'Is All Day Event', 'events-gutenberg' ) }
						checked={ allDay }
						onChange={ setAllDay }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Price Settings', 'events-gutenberg' ) }>
					<ToggleControl
						label={ __( 'Show symbol before', 'events-gutenberg' ) }
						checked={ 'prefix' === currencyPosition }
						onChange={ setCurrencyPosition }
					/>
					<TextControl
						label={ __( ' Currency Symbol', 'events-gutenberg' ) }
						value={ currencySymbol }
						placeholder={ __( 'E.g.: $', 'events-gutenberg' ) }
						onChange={ setCurrencySymbol }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}

export default compose( [
	withSelect( ( select, props ) => {
		const { get } = select( DETAILS_STORE );
		const { attributes } = props;
		const { detailsTitle, organizerTitle } = attributes;
		return {
			detailsTitle,
			organizerTitle,
			start: get( 'start' ),
			end: get( 'end' ),
			multiDay: get( 'multiDay' ),
			separatorDate: get( 'separatorDate' ),
			separatorTime: get( 'separatorTime' ),
			timezone: get( 'timezone' ),
			allDay: get( 'allDay' ),
			url: get( 'url' ),
			currencyPosition: get( 'currencyPosition' ),
			currencySymbol: get( 'currencySymbol' ),
		};
	} ),
	withDispatch( ( dispatch, props ) => {
		const {
			setInitialState,
			setWebsiteUrl,
			setAllDay,
			setCost,
			setCurrencySymbol,
			setCurrencyPosition,
			toggleDashboard,
			addOrganizer,
			removeOrganizer,
		} = dispatch( DETAILS_STORE );

		return {
			setInitialState() {
				setInitialState( props.attributes );
			},
			setUrl: setWebsiteUrl,
			setAllDay,
			setCurrencySymbol,
			setCurrencyPosition,
			setCost,
			toggleDashboard,
			addOrganizer,
			removeOrganizer,
		};
	} ),
	saveData(),
] )( EventDetails );
