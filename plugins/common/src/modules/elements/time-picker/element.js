/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { noop } from 'lodash';
import classNames from 'classnames';
import { ScrollTo, ScrollArea } from 'react-scroll-to';

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
} from '@moderntribe/events/editor/utils/time';
import {
	toFormat,
	setTimeInSeconds,
	totalSeconds,
} from '@moderntribe/events/editor/utils/moment';

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

		const label = current.format( 'HH:mm' );
		const additionalProps = {};
		if ( min ) {
			additionalProps.min = min.format( 'HH:mm' );
		}

		if ( max ) {
			additionalProps.max = max.format( 'HH:mm' );
		}

		return (
			<input
				name="google-calendar-label"
				className="tribe-editor__btn-input"
				type="time"
				value={ label }
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

		const startSeconds = totalSeconds( start );
		const endSeconds = totalSeconds( end );

		for ( let time = startSeconds; time <= endSeconds; time += step ) {
			items.push( {
				value: time,
				text: formatLabel( time ),
				isCurrent: time === totalSeconds( current ),
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
					{ renderItem( { text: __( 'All Day', 'events-gutenberg' ), value: 'all-day' }, onClose ) }
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
	current: moment(),
	step: HALF_HOUR_IN_SECONDS,
	timeFormat: 'H:i',
	allDay: false,
	onChange: noop,
	onClick: noop,
};

TimePicker.propTypes = {
	current: PropTypes.instanceOf( moment ),
	min: PropTypes.instanceOf( moment ),
	max: PropTypes.instanceOf( moment ),
	start: PropTypes.instanceOf( moment ).isRequired,
	end: PropTypes.instanceOf( moment ).isRequired,
	step: PropTypes.number,
	timeFormat: PropTypes.string,
	allDay: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default TimePicker;
