/**
 * External dependencies
 */
import moment from 'moment';
import { isString, find, noop, get } from 'lodash';
import { stringify } from 'querystringify';
import classNames from 'classnames';
import { ScrollTo, ScrollArea } from 'react-scroll-to';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import {
	Placeholder,
	Spinner,
	Dropdown,
	Dashicon,
} from '@wordpress/components';
import { query } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

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
		seconds: totalSeconds( moment() ),
		hasAllDay: true,
		allDay: false,
	};

	constructor( props ) {
		super( ...arguments );

		const current = roundTime( props.current || moment() );
		this.state = {
			allDay: props.allDay,
			current,
			seconds: totalSeconds( current ),
		};
		this.onSelectItem = this.props.onSelectItem.bind( this );
	}

	static getDerivedStateFromProps( nextProps, prevState ) {
		const { current } = nextProps;
		if ( ! current || ! ( current instanceof moment ) ) {
			return null;
		}

		return {
			allDay: get( nextProps, 'allDay', prevState.allDay ),
			current,
			seconds: totalSeconds( current ),
			minTime: get( nextProps, 'minTime', prevState.minTime ),
		};
	}

	get currentLabel() {
		const { allDay, seconds } = this.state;
		return allDay ? 'All Day' : this.formatLabel( seconds );
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

		const { seconds } = this.state;

		const currentValue = seconds;
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
		const { allDay } = this.state;
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
			const { current } = this.state;
			const state = {
				allDay: value === 'all-day',
				seconds: 0,
				current: setTimeInSeconds( moment(), 0 ),
			};

			if ( ! state.allDay ) {
				state.seconds = value;
				state.current = setTimeInSeconds( moment(), value );
			}

			const callback = () => {
				this.onSelectItem( state );
				this.onClose();
			};

			this.setState( state, callback );
		};
	}

	renderDropdown = ( { onToggle, isOpen, onClose } ) => {
		this.onClose = onClose.bind( this );

		return (
			<ScrollTo>
				{ () => {
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
				} }
			</ScrollTo>
		);
	}

	render() {
		const dropdown = (
			<Dropdown
				className="tribe-element-timepicker-label"
				position="bottom center"
				contentClassName="tribe-editor__timepicker__dialog"
				renderToggle={ ( { onToggle, isOpen } ) => (
					<button
						type="button"
						className="button-link"
						onClick={ onToggle }
						aria-expanded={ isOpen }
					>
						{ this.currentLabel }
						<Dashicon className="btn--icon" icon={ isOpen ? 'arrow-up' : 'arrow-down' } />
					</button>
				) }
				renderContent={ this.renderDropdown }
			/>
		);

		return [
			<div
				key="tribe-element-timepicker"
				className="tribe_editor__timepicker"
			>
				{ dropdown }
			</div>,
		];
	}
}
