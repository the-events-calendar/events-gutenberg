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
import { DAY_IN_SECONDS, MINUTE_IN_SECONDS } from 'utils/time';
import { toFormat, setTimeInSeconds, totalSeconds, roundTime } from 'utils/moment';

export default class TimePicker extends Component {
	static defaultProps = {
		onHover: noop,
		onSelectItem: noop,
		step: 30,
		min: undefined,
		max: undefined,
		show2400: false,
		timeFormat: 'H:i',
		current: moment(),
		hasAllDay: true,
		allDay: false,
	};

	static propTypes = {
		current: PropTypes.instanceOf( moment ),
		allDay: PropTypes.bool,
		onSelectItem: PropTypes.func,
		timeFormat: PropTypes.string,
		min: PropTypes.instanceOf( moment ),
	};

	constructor() {
		super( ...arguments );
	}

	renderLabel( onToggle ) {
		const { allDay, current, min, max } = this.props;

		if ( allDay ) {
			return (
				<button
					className="tribe-editor__timepicker__all-day-btn"
					onClick={ onToggle }>
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
				onChange={ this.setTime }
				{ ...additionalProps }
			/>
		);
	}

	setTime = ( e ) => {
		const newValue = e.target.value;
		const parts = newValue.split( ':' );
		const [ hour, minute ] = parts;

		const { onSelectItem, current, min, max } = this.props;
		const copy = current.clone();
		copy.set( 'hour', parseInt( hour, 10 ) );
		copy.set( 'minute', parseInt( minute, 10 ) );

		const start = current.clone().startOf( 'day' );

		const isBefore = min && copy.isBefore( min );
		const isAfter = max && copy.isAfter( max );
		if ( isBefore || isAfter ) {
			return;
		}

		onSelectItem( {
			allDay: false,
			seconds: copy.diff( start, 'seconds' ),
		} );
	};

	getItems( searchFor, props = this.props ) {
		const items = [];

		const {
			step,
			min,
			max,
			show2400,
			timeFormat,
		} = props;

		const { current } = this.props;

		let start = 0;
		if ( min ) {
			const roundStart = roundTime( min );
			if ( roundStart.isS( min ) ) {
				roundStart.add( 30, 'minutes' );
			}
			start = totalSeconds( roundStart );
		}
		let end = max ? totalSeconds( max ) : ( start + DAY_IN_SECONDS - 1 );

		// make sure the end time is greater than start time,
		// otherwise there will be no list to show
		if ( end < start ) {
			end += DAY_IN_SECONDS;
		}

		// show a 24:00 option when using military time
		if ( end === DAY_IN_SECONDS - 1 && isString( timeFormat ) && show2400 ) {
			end = DAY_IN_SECONDS;
		}

		for ( let item = start, index = 0; item <= end; index++, item += step * MINUTE_IN_SECONDS ) {
			items.push( {
				index: index,
				value: item,
				text: this.formatLabel( item ),
				isDisabled: false,
				isCurrent: item === current,
			} );
		}

		if ( searchFor ) {
			return find( items, searchFor );
		}

		return items;
	}

	formatLabel = ( seconds ) => {
		const { timeFormat } = this.props;
		return setTimeInSeconds( moment(), seconds ).format( toFormat( timeFormat ) );
	};

	renderList = () => {
		return this.getItems().map( this.renderItem );
	};

	renderItem = ( item ) => {
		const { allDay } = this.props;
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
				onClick={ this.handleSelection( item ) }
			>
				{ item.text }
			</button>
		);
	};

	handleSelection = ( item ) => {
		return () => {
			const { value } = item;
			const data = {
				allDay: value === 'all-day',
				seconds: 0,
			};

			if ( ! data.allDay ) {
				data.seconds = value;
			}

			this.props.onSelectItem( data );
			this.onClose();
		};
	};

	render() {
		return (
			<div
				key="tribe-element-timepicker"
				className="tribe-editor__timepicker"
			>
				{ this.renderDropdown() }
			</div>
		);
	}

	renderDropdown() {
		return (
			<Dropdown
				className="tribe-element-timepicker-label"
				position="bottom center"
				contentClassName="tribe-editor__timepicker__dialog"
				renderToggle={ this.toggleDropdown }
				renderContent={ this.renderDropdownContent }
			/>
		);
	}

	toggleDropdown = ( { onToggle, isOpen } ) => {
		return (
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
	};

	renderDropdownContent = ( { onToggle, isOpen, onClose } ) => {
		this.onClose = onClose.bind( this );
		return (
			<ScrollTo>
				{ this.scrollArea }
			</ScrollTo>
		);
	};

	scrollArea = () => (
		<ScrollArea
			id="tribe-element-timepicker-items"
			key="tribe-element-timepicker-items"
			role="menu"
			className={ classNames( 'tribe-editor__timepicker__items' ) }
		>
			{ this.props.hasAllDay && this.renderItem( { text: 'All Day', value: 'all-day' } ) }
			{ this.renderList() }
		</ScrollArea>
	);
}
