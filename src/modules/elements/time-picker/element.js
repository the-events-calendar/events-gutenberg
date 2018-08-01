/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isString, find, noop } from 'lodash';
import classNames from 'classnames';
import { ScrollTo, ScrollArea } from 'react-scroll-to';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import {
	Dropdown,
	Dashicon,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.pcss';
import { DAY_IN_SECONDS, HALF_HOUR_IN_SECONDS, MINUTE_IN_SECONDS } from 'utils/time';
import { toFormat, setTimeInSeconds, totalSeconds, roundTime } from 'utils/moment';

export default class TimePicker extends Component {
	static defaultProps = {
		current: moment(),
		min: undefined,
		max: undefined,
		start: undefined,
		end: undefined,
		step: HALF_HOUR_IN_SECONDS,
		timeFormat: 'H:i',
		allDay: false,
		onChange: noop,
		onClick: noop,
	};

	static propTypes = {
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

	renderLabel = ( onToggle ) => {
		const { allDay, current, min, max, onChange } = this.props;

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
	}

	toggleDropdown = ({ onToggle, isOpen }) => (
		<div className="tribe-editor__timepicker-label-container">
			{ this.renderLabel( onToggle ) }
			<button
				type="button"
				aria-expanded={ isOpen }
				onClick={ onToggle }
			>
				<Dashicon className="btn--icon" icon={ isOpen ? 'arrow-up' : 'arrow-down' } />
			</button>
		</div>
	);

	getItems = () => {
		const { current, start, end, step } = this.props;
		const items = [];

		const startSeconds = totalSeconds( start );
		const endSeconds = totalSeconds( end );

		for ( let time = startSeconds; time < endSeconds; time += step ) {
			items.push( {
				value: time,
				text: this.formatLabel( time ),
				isCurrent: time === totalSeconds( current ),
			} );
		}

		return items;
	}

	formatLabel = ( seconds ) => {
		const { timeFormat } = this.props;
		return setTimeInSeconds( moment(), seconds ).format( toFormat( timeFormat ) );
	};

	renderItem = ( item, onClose ) => {
		const { allDay, onClick } = this.props;
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

	renderDropdownContent = ({ onClose }) => (
		<ScrollTo>
			{ () => (
				<ScrollArea
					id="tribe-element-timepicker-items"
					key="tribe-element-timepicker-items"
					role="menu"
					className={ classNames( 'tribe-editor__timepicker__items' ) }
				>
					{ this.renderItem( { text: 'All Day', value: 'all-day' }, onClose ) }
					{ this.getItems().map( ( item ) => this.renderItem( item, onClose ) ) }
				</ScrollArea>
			) }
		</ScrollTo>
	);

	render() {
		return (
			<div
				key="tribe-element-timepicker"
				className="tribe-editor__timepicker"
			>
				<Dropdown
					className="tribe-element-timepicker-label"
					position="bottom center"
					contentClassName="tribe-editor__timepicker__dialog"
					renderToggle={ this.toggleDropdown }
					renderContent={ this.renderDropdownContent }
				/>
			</div>
		);
	}
}
