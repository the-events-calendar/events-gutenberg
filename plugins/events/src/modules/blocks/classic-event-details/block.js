/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import AutosizeInput from 'react-input-autosize';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';

import withSaveData from '@@tribe/common/hoc/with-save-data';

import {
	ToggleControl,
	TextControl,
	PanelBody,
} from '@wordpress/components';

import {
	PlainText,
	InspectorControls,
} from '@wordpress/editor';

/**
 * Internal dependencies
 */
import {
	TermsList,
	MetaGroup,
} from '@@tribe/events/elements';

import { default as EventOrganizers } from './organizers';

import { toMoment, toDate, toTime } from '@@tribe/events/editor/utils/moment';
import { actions as dateTimeActions, selectors as dateTimeSelectors } from '@@tribe/events/data/blocks/datetime';
import { actions as priceActions, selectors as priceSelectors } from '@@tribe/events/data/blocks/price';
import { actions as websiteActions, selectors as websiteSelectors } from '@@tribe/events/data/blocks/website';
import { actions as classicActions, selectors as classicSelectors } from '@@tribe/events/data/blocks/classic';
import {
	actions as organizersActions,
	selectors as organizerSelectors,
} from '@@tribe/events/data/blocks/organizers';
import { actions as UIActions } from '@@tribe/events/data/ui';
import { sendValue } from '@@tribe/events/editor/utils/input';
import { FORMATS } from '@@tribe/events/editor/utils';

/**
 * Module Code
 */

class EventDetails extends Component {
	static propTypes = {
		organizerTitle: PropTypes.string,
		url: PropTypes.string,
		start: PropTypes.string,
		end: PropTypes.string,
		separatorDate: PropTypes.string,
		cost: PropTypes.string,
		currencyPosition: PropTypes.string,
		currencySymbol: PropTypes.string,
		detailsTitle: PropTypes.string,
		allDay: PropTypes.bool,
		isSelected: PropTypes.bool,
		setOrganizerTitle: PropTypes.func,
		setDetailsTitle: PropTypes.func,
		setWebsite: PropTypes.func,
		setCost: PropTypes.func,
		toggleDashboardDateTime: PropTypes.func,
		setSymbol: PropTypes.func,
		togglePosition: PropTypes.func,
		setAllDay: PropTypes.func,
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
			setOrganizerTitle,
			store,
		} = this.props;

		return (
			<MetaGroup groupKey="organizer">
				<AutosizeInput
					className="tribe-editor__events-section__headline"
					value={ organizerTitle }
					placeholder={ __( 'Organizer', 'events-gutenberg' ) }
					onChange={ sendValue( setOrganizerTitle ) }
				/>
				<EventOrganizers store={ store }/>
			</MetaGroup>
		);
	}

	renderTitle() {
		const { detailsTitle, setDetailsTitle } = this.props;
		return (
			<AutosizeInput
				className="tribe-editor__events-section__headline trigger-dashboard-datetime"
				value={ detailsTitle }
				placeholder={ __( 'Details', 'events-gutenberg' ) }
				onChange={ sendValue( setDetailsTitle ) }
			/>
		);
	}

	renderStart() {
		const { start, toggleDashboardDateTime } = this.props;

		return (
			<div>
				<button
					className="tribe-editor__btn--label trigger-dashboard-datetime"
					onClick={ toggleDashboardDateTime }
				>
					<strong>{ __( 'Start: ', 'events-gutenberg' ) }</strong>
					{ toDate( toMoment( start ), FORMATS.WP.date ) }
					{ this.renderStartTime() }
				</button>
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
				<span>{ toTime( toMoment( start ), FORMATS.WP.time ) }</span>
			</React.Fragment>
		);
	}

	renderEnd() {
		const { end, toggleDashboardDateTime } = this.props;
		return (
			<div>
				<button
					className="tribe-editor__btn--label trigger-dashboard-datetime"
					onClick={ toggleDashboardDateTime }
				>
					<strong>{ __( 'End: ', 'events-gutenberg' ) }</strong>
					{ toDate( toMoment( end ), FORMATS.WP.date ) }
					{ this.renderEndTime() }
				</button>
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
				{ toTime( toMoment( end ), FORMATS.WP.time ) }
			</React.Fragment>
		);
	}

	renderWebsite() {
		const { url, setWebsite } = this.props;
		return (
			<div>
				<strong>{ __( 'Website: ', 'events-gutenberg' ) }</strong><br/>
				<PlainText
					id="tribe-event-url"
					value={ url }
					placeholder={ __( 'Enter url', 'events-gutenberg' ) }
					onChange={ setWebsite }
				/>
			</div>
		);
	}

	renderCost() {
		const { setCost, cost, currencyPosition, currencySymbol } = this.props;
		const textClassName = classNames( [
			'tribe-editor__event-cost__value',
			`tribe-editor-cost-symbol-position-${ currencyPosition }`,
		] );
		return (
			<div className="tribe-editor__event-cost">
				<strong>{ __( 'Price: ', 'events-gutenberg' ) }</strong><br/>
				{ 'prefix' === currencyPosition && <span>{ currencySymbol }</span> }
				<PlainText
					className={ textClassName }
					value={ cost }
					placeholder={ __( 'Enter price', 'events-gutenberg' ) }
					onChange={ setCost }
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
			togglePosition,
			setAllDay,
			setSymbol,
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
						onChange={ togglePosition }
					/>
					<TextControl
						label={ __( ' Currency Symbol', 'events-gutenberg' ) }
						value={ currencySymbol }
						placeholder={ __( 'E.g.: $', 'events-gutenberg' ) }
						onChange={ setSymbol }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		start: dateTimeSelectors.getStart( state ),
		end: dateTimeSelectors.getEnd( state ),
		multiDay: dateTimeSelectors.getMultiDay( state ),
		allDay: dateTimeSelectors.getAllDay( state ),
		separatorDate: dateTimeSelectors.getDateSeparator( state ),
		separatorTime: dateTimeSelectors.getTimeSeparator( state ),
		timezone: dateTimeSelectors.getTimeZone( state ),
		cost: priceSelectors.getPrice( state ),
		currencyPosition: priceSelectors.getPosition( state ),
		currencySymbol: priceSelectors.getSymbol( state ),
		url: websiteSelectors.getUrl( state ),
		detailsTitle: classicSelectors.detailsTitleSelector( state ),
		organizerTitle: classicSelectors.organizerTitleSelector( state ),
		organizers: organizerSelectors.getOrganizersInClassic( state ),
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		...bindActionCreators( dateTimeActions, dispatch ),
		...bindActionCreators( UIActions, dispatch ),
		...bindActionCreators( priceActions, dispatch ),
		...bindActionCreators( websiteActions, dispatch ),
		...bindActionCreators( classicActions, dispatch ),
		setInitialState( props ) {
			dispatch( priceActions.setInitialState( props ) );
			dispatch( UIActions.setInitialState( props ) );
			dispatch( websiteActions.setInitialState( props ) );
			dispatch( dateTimeActions.setInitialState( props ) );
			dispatch( classicActions.setInitialState( props ) );
			const { get } = props;
			dispatch( organizersActions.setOrganizersInClassic( get( 'organizers', [] ) ) );
		},
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( EventDetails );
