/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import AutosizeInput from 'react-input-autosize';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import LinkIcon from 'icons/link.svg';
import './style.pcss';

import withSaveData from 'editor/hoc/with-save-data';
import { actions, selectors } from 'data/blocks/sharing';
import { sendValue } from 'editor/utils/input';

/**
 * Module Code
 */

const googleCalendarPlaceholder = __( 'Google Calendar', 'events-gutenberg' );
const iCalExportPlaceholder = __( 'iCal Export', 'events-gutenberg' );

class EventLinks extends Component {
	static propTypes = {
		hasGoogleCalendar: PropTypes.bool,
		hasiCal: PropTypes.bool,
		isSelected: PropTypes.bool,
		googleCalendarLabel: PropTypes.string,
		iCalLabel: PropTypes.string,
		setiCalLabel: PropTypes.func,
		setGoogleCalendarLabel: PropTypes.func,
		toggleIcalLabel: PropTypes.func,
		toggleGoogleCalendar: PropTypes.func,
	};

	constructor() {
		super( ...arguments );
	}

	render() {
		return [ this.renderButtons(), this.renderControls() ];
	}

	renderButtons() {
		return (
			<div key="event-links" className="tribe-editor__block tribe-editor__events-link">
				{ this.renderGoogleCalendar() }
				{ this.renderiCal() }
			</div>
		);
	}

	renderGoogleCalendar() {
		const { hasGoogleCalendar, googleCalendarLabel, setGoogleCalendarLabel } = this.props;

		if ( this.buttonsAreDisabled() ) {
			return this.renderPlaceholder( googleCalendarPlaceholder );
		}

		if ( ! hasGoogleCalendar ) {
			return null;
		}

		return (
			<div className="tribe-editor__btn--link tribe-events-gcal">
				<LinkIcon />
				<AutosizeInput
					name="google-calendar-label"
					className="tribe-editor__btn-input"
					value={ googleCalendarLabel }
					placeholder={ googleCalendarPlaceholder }
					onChange={ sendValue( setGoogleCalendarLabel ) }
				/>
			</div>
		);
	}

	renderiCal() {
		const { hasiCal, iCalLabel, setiCalLabel } = this.props;

		if ( this.buttonsAreDisabled() ) {
			return this.renderPlaceholder( iCalExportPlaceholder );
		}

		if ( ! hasiCal ) {
			return null;
		}

		return (
			<div className="tribe-editor__btn--link tribe-events-ical">
				<LinkIcon />
				<AutosizeInput
					id="tribe-event-ical"
					name="tribe-event-ical"
					className="tribe-editor__btn-input"
					value={ iCalLabel }
					placeholder={ iCalExportPlaceholder }
					onChange={ sendValue( setiCalLabel ) }
				/>
			</div>
		);
	}

	buttonsAreDisabled = () => {
		const { hasGoogleCalendar, hasiCal } = this.props;
		return ! hasGoogleCalendar && ! hasiCal;
	};

	renderPlaceholder( label ) {
		return (
			<button className="tribe-editor__btn--link tribe-editor__btn--placeholder" disabled>
				<LinkIcon />
				{ label }
			</button>
		);
	}

	renderControls() {
		const {
			hasGoogleCalendar,
			hasiCal,
			isSelected,
			toggleIcalLabel,
			toggleGoogleCalendar,
		} = this.props;

		if ( ! isSelected ) {
			return null;
		}

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Share Settings', 'events-gutenberg' ) }>
					<ToggleControl
						label={ __( 'Google Calendar', 'events-gutenberg' ) }
						checked={ hasGoogleCalendar }
						onChange={ toggleGoogleCalendar }
					/>
					<ToggleControl
						label={ __( 'iCal', 'events-gutenberg' ) }
						checked={ hasiCal }
						onChange={ toggleIcalLabel }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}

const mapStateToProps = ( state ) => ( {
	iCalLabel: selectors.iCalLabelSelector( state ),
	hasiCal: selectors.hasIcalSelector( state ),
	googleCalendarLabel: selectors.googleCalendarLabelSelector( state ),
	hasGoogleCalendar: selectors.hasGooglecalendarLabel( state ),
} );

const mapDispatchToProps = ( dispatch ) => bindActionCreators( actions, dispatch );

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( EventLinks );
