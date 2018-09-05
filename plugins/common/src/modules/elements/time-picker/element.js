/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { noop } from 'lodash';
import classNames from 'classnames';
import { ScrollTo, ScrollArea } from 'react-scroll-to';
import TimeFormat from 'hh-mm-ss';

/**
 * WordPress dependencies
 */
import {
	Dropdown,
	Dashicon,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.pcss';
import {
	HALF_HOUR_IN_SECONDS,
	HH_MM_SS_TIME_FORMAT,
} from '@moderntribe/events/editor/utils/time';
import {
	toFormat,
	setTimeInSeconds,
} from '@moderntribe/events/editor/utils/moment';
import { TribePropTypes } from '@moderntribe/common/utils';

const TimePicker = ( {
	current,
	min,
	max,
	start,
	end,
	step,
	timeFormat,
	allDay,
	onChange,
	onClick,
	showAllDay,
} ) => {
	const renderLabel = ( onToggle ) => {
		if ( allDay ) {
			return (
				<button
					className="tribe-editor__timepicker__all-day-btn"
					onClick={ onToggle }
				>
					{ __( 'All Day', 'events-gutenberg' ) }
				</button>
			);
		}

		const additionalProps = {};
		if ( min ) {
			additionalProps.min = min;
		}

		if ( max ) {
			additionalProps.max = max;
		}

		return (
			<input
				name="google-calendar-label"
				className="tribe-editor__btn-input"
				type="time"
				value={ current }
				onChange={ onChange }
				{ ...additionalProps }
			/>
		);
	};

	const toggleDropdown = ({ onToggle, isOpen }) => (
		<div className="tribe-editor__timepicker-label-container">
			{ renderLabel( onToggle ) }
			<button
				type="button"
				aria-expanded={ isOpen }
				onClick={ onToggle }
			>
				<Dashicon className="btn--icon" icon={ isOpen ? 'arrow-up' : 'arrow-down' } />
			</button>
		</div>
	);

	const getItems = () => {
		const items = [];

		const startSeconds = TimeFormat.toS( start, HH_MM_SS_TIME_FORMAT );
		const endSeconds = TimeFormat.toS( end, HH_MM_SS_TIME_FORMAT );

		for ( let time = startSeconds; time <= endSeconds; time += step ) {
			items.push( {
				value: time,
				text: formatLabel( time ),
				isCurrent: time === TimeFormat.toS( current, HH_MM_SS_TIME_FORMAT ),
			} );
		}

		return items;
	}

	const formatLabel = ( seconds ) => {
		return setTimeInSeconds( moment(), seconds ).format( toFormat( timeFormat ) );
	};

	const renderItem = ( item, onClose ) => {
		const itemClasses = {
			'tribe-editor__timepicker__item': true,
			'tribe-editor__timepicker__item--current': item.isCurrent && ! allDay,
		};

		return (
			<button
				key={ `time-${ item.value }` }
				role="menuitem"
				className={ classNames( itemClasses ) }
				value={ item.value }
				onClick={ () => onClick( item.value, onClose ) }
			>
				{ item.text }
			</button>
		);
	};

	const renderDropdownContent = ({ onClose }) => (
		<ScrollTo>
			{ () => (
				<ScrollArea
					id="tribe-element-timepicker-items"
					key="tribe-element-timepicker-items"
					role="menu"
					className={ classNames( 'tribe-editor__timepicker__items' ) }
				>
					{ showAllDay && renderItem(
						{ text: __( 'All Day', 'events-gutenberg' ), value: 'all-day' },
						onClose,
					) }
					{ getItems().map( ( item ) => renderItem( item, onClose ) ) }
				</ScrollArea>
			) }
		</ScrollTo>
	);

	return (
		<div
			key="tribe-element-timepicker"
			className="tribe-editor__timepicker"
		>
			<Dropdown
				className="tribe-element-timepicker-label"
				position="bottom center"
				contentClassName="tribe-editor__timepicker__dialog"
				renderToggle={ toggleDropdown }
				renderContent={ renderDropdownContent }
			/>
		</div>
	);
}

TimePicker.defaultProps = {
	step: HALF_HOUR_IN_SECONDS,
	timeFormat: 'H:i',
	allDay: false,
	onChange: noop,
	onClick: noop,
};

TimePicker.propTypes = {
	/**
	 * TribePropTypes.timeFormat check for string formatted as a time
	 * using 24h clock in hh:mm format
	 * e.g. 00:24, 03:57, 21:12
	 */
	current: TribePropTypes.timeFormat.isRequired,
	min: TribePropTypes.timeFormat,
	max: TribePropTypes.timeFormat,
	start: TribePropTypes.timeFormat.isRequired,
	end: TribePropTypes.timeFormat.isRequired,
	step: PropTypes.number,
	timeFormat: PropTypes.string,
	allDay: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
	showAllDay: PropTypes.bool,
};

export default TimePicker;
