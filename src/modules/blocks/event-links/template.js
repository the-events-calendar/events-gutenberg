/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';

/**
 * WordPress dependencies
 */
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import LinkIcon from 'icons/link.svg';
import { sendValue } from 'editor/utils/input';
import './style.pcss';

/**
 * Module Code
 */

const googleCalendarPlaceholder = __( 'Google Calendar', 'events-gutenberg' );
const iCalExportPlaceholder = __( 'iCal Export', 'events-gutenberg' );

const EventLinks = ( props ) => {

	const buttonsAreDisabled = () => {
		const { hasGoogleCalendar, hasiCal } = props;
		return ! hasGoogleCalendar && ! hasiCal;
	};

	const renderPlaceholder= ( label ) => (
			<button className="tribe-editor__btn--link tribe-editor__btn--placeholder" disabled>
				<LinkIcon />
				{ label }
			</button>
		);

	const renderGoogleCalendar = () => {
		const { hasGoogleCalendar, googleCalendarLabel, setGoogleCalendarLabel } = props;

		if ( buttonsAreDisabled() ) {
			return renderPlaceholder( googleCalendarPlaceholder );
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
	};

	const renderiCal = () => {
		const { hasiCal, iCalLabel, setiCalLabel } = props;

		if ( buttonsAreDisabled() ) {
			return renderPlaceholder( iCalExportPlaceholder );
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
	};

	const renderButtons = () => (
		<div key="event-links" className="tribe-editor__block tribe-editor__events-link">
			{ renderGoogleCalendar() }
			{ renderiCal() }
		</div>
	);

	const renderControls = () => {
		const {
			hasGoogleCalendar,
			hasiCal,
			isSelected,
			toggleIcalLabel,
			toggleGoogleCalendar,
		} = props;

		return isSelected && (
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
	};

	return [
		renderButtons(),
		renderControls(),
	];

};

EventLinks.propTypes = {
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

export default EventLinks;
