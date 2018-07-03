/**
 * External dependencies
 */
import Proptypes from 'prop-types';
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

/**
 * Internal dependencies
 */
import './style.pcss';
import { DAY_IN_SECONDS, MINUTE_IN_SECONDS } from 'utils/time';
import { toFormat, setTimeInSeconds } from 'utils/moment';
import { roundTime, totalSeconds } from 'editor/utils/moment';

export default class TimePicker extends Component {
	static defaultProps = {
		onHover: noop,
		onSelectItem: noop,
		step: 30,
		minTime: undefined,
		maxTime: undefined,
		show2400: false,
		timeFormat: 'H:i',
		current: moment(),
		hasAllDay: true,
		allDay: false,
	};

	static propTypes = {
		current: Proptypes.instanceOf( moment ),
	};

	constructor() {
		super( ...arguments );
	}

	get seconds() {
		const current = roundTime( this.props.current );
		return totalSeconds( current );
	}

	get currentLabel() {
		const { allDay } = this.props;
		return allDay ? 'All Day' : this.formatLabel( this.seconds );
	}

	getItems( searchFor, props = this.props ) {
		const items = [];

		const {
			step,
			minTime,
			maxTime,
			show2400,
			timeFormat,
		} = props;

		const currentValue = this.seconds;

		const start = minTime ? minTime : 0;
		let end = maxTime ? maxTime : ( start + DAY_IN_SECONDS - 1 );

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
				isCurrent: item === currentValue,
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
	}

	renderList = () => {
		return this.getItems().map( this.renderItem );
	}

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
	}

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
	}

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

	toggleDropdown = ( { onToggle, isOpen }  ) => {
		return (
			<button
				type="button"
				className="button-link"
				onClick={ onToggle }
				aria-expanded={ isOpen }
			>
				{ this.currentLabel }
				<Dashicon className="btn--icon" icon={ isOpen ? 'arrow-up' : 'arrow-down' } />
			</button>
		);
	}

	renderDropdownContent = ( { onToggle, isOpen, onClose } ) => {
		this.onClose = onClose.bind( this );
		return (
			<ScrollTo>
				{ this.scrollArea }
			</ScrollTo>
		);
	}

	scrollArea = () => {
		return [
			this.props.hasAllDay && this.renderItem( { text: 'All Day', value: 'all-day' } ),
			<ScrollArea
				id="tribe-element-timepicker-items"
				key="tribe-element-timepicker-items"
				role="menu"
				className={ classNames( 'tribe-editor__timepicker__items' ) }
			>
				{ this.renderList() }
			</ScrollArea>,
		];
	}
}
