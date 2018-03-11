/**
 * External dependencies
 */
import moment from 'moment';
import { isString, find } from 'lodash';
import { stringify } from 'querystringify';
import classNames from 'classnames';
import { ScrollTo, ScrollArea } from "react-scroll-to";

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import {
	Placeholder,
	Spinner,
	Dropdown,
} from '@wordpress/components';
import { query } from '@wordpress/data'
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { toMomentFormat } from 'editor/utils/date'

/**
 * Module Code
 */
const ONE_DAY = 86400;
const NOW = moment().format( 'X' ) - moment( '00:00:00', 'HH:mm:ss' ).format( 'X' );

class DateTime extends Component {
	constructor() {
		super( ...arguments );

		this.formatLabel = this.formatLabel.bind( this )
		this.getSeconds = this.getSeconds.bind( this )
		this.changeTime = this.changeTime.bind( this )
		this.roundTime = this.roundTime.bind( this )
		this.renderList = this.renderList.bind( this )
		this.renderItem = this.renderItem.bind( this )
		this.renderDropdown = this.renderDropdown.bind( this )

		this.onSelectItem = this.props.onSelectItem.bind( this );

		this.onSelectItem( this.props.current )
	}

	static defaultProps = {
		onHover: () => {},
		onSelectItem: () => {},

		step: 30,
		minTime: undefined,
		maxTime: undefined,
		show2400: false,
		timeFormat: 'H:i',
		current: NOW,
	}

	get currentLabel() {
		return this.formatLabel( this.roundTime( this.getSeconds( this.props.current ) ) );
	}

	getSeconds( datetime, onInvalid = moment() ) {
		let currentDate = moment( datetime, 'YYYY-MM-DD HH:mm:ss' )

		// On invalid date we reset to today
		if ( ! currentDate.isValid() ) {
			currentDate = onInvalid
		}

		// Gets the seconds from the start if the day
		return currentDate.format( 'X' ) - currentDate.startOf( 'day' ).format( 'X' );
	}

	changeTime( original, seconds ) {
		let originalMoment = moment( original, 'YYYY-MM-DD HH:mm:ss' )
		// On invalid date we reset to today
		if ( ! originalMoment.isValid() ) {
			originalMoment = moment()
		}

		const nextMoment = originalMoment.startOf( 'day' ).add( seconds, 'seconds' )
		return nextMoment.format( 'YYYY-MM-DD HH:mm:ss' )
	}

	getItems( searchFor, props ) {
		let items = [];

		if ( ! props ) {
			props = this.props
		}

		const {
			step,
			minTime,
			maxTime,
			show2400,
			timeFormat,
			current,
		} = props

		const currentValue = this.roundTime( this.getSeconds( current ) )
		let start = minTime ? minTime : 0;
		let end = maxTime ? maxTime : ( start + ONE_DAY - 1 );

		// make sure the end time is greater than start time, otherwise there will be no list to show
		if ( end < start ) {
			end += ONE_DAY;
		}

		// show a 24:00 option when using military time
		if ( end === ONE_DAY - 1 && isString( timeFormat ) && show2400 ) {
			end = ONE_DAY;
		}

		for ( let item = start, index = 0; item <= end; index++, item += step * 60 ) {
			items.push( {
				index: index,
				value: item,
				datetime: this.changeTime( current, item ),
				text: this.formatLabel( item ),
				isDisabled: false,
				isCurrent: item === currentValue,
			} )
		}

		if ( searchFor ) {
			return find( items, searchFor )
		}

		return items;
	}

	formatLabel( seconds ) {
		const {
			timeFormat
		} = this.props

		return moment().startOf( 'day' ).add( seconds, 'seconds' ).format( toMomentFormat( timeFormat ) )
	}

	roundTime( seconds ) {
		if ( null === seconds ) {
			return null;
		}

		let {
			step,
			show2400,
		} = this.props

		let offset = seconds % ( step *60 ); // step is in minutes

		if ( offset >= step * 30 ) {
			// if offset is larger than a half step, round up
			seconds += ( step * 60 ) - offset;
		} else {
			// round down
			seconds -= offset;
		}

		if ( seconds == ONE_DAY && show2400 ) {
			return seconds;
		}

		return seconds % ONE_DAY;
	}

	renderList() {
		const { focus } = this.props;

		return this.getItems().map( this.renderItem, this );
	}

	renderItem( item ) {
		const { onHover } = this.props;

		const itemClasses = {
			'tribe-element-timepicker-item': true,
			'tribe-current': item.isCurrent,
		}

		return (
			<button
				key={ `time-${ item.value }` }
				role="menuitem"
				className={ classNames( itemClasses ) }
				value={ item.value }
				onClick={ () => {
					this.onSelectItem( item.datetime )
					this.onClose()
				} }
			>
				{ item.text }
			</button>
		);
	}

	renderDropdown( { onToggle, isOpen, onClose } ) {
		this.onClose = onClose.bind( this );

		return (
			<ScrollTo>
				{ ( scroll, scrollById ) => {
					this.scrollToCurrent = ( ( index ) => {
						index = index - 2
						if ( 0 > index ) {
							index = 0
						}
						scrollById( 'tribe-element-timepicker-items', 0, 31 * index )
					} ).bind( this );

					return (
						<ScrollArea
							id='tribe-element-timepicker-items'
							role="menu"
							className={ classNames( 'tribe-element-timepicker-items' ) }
						>
							{ this.renderList() }
						</ScrollArea>
					);
				}}
			</ScrollTo>
		);
	}

	scrollToCurrent() {}

	componentDidUpdate( nextProps, nextState ) {
		const current = this.roundTime( this.getSeconds( nextProps.current ) )
		const currentItem = this.getItems( { 'value': current }, nextProps )

		if ( currentItem && currentItem.index ) {
			this.scrollToCurrent( currentItem.index );
		}
	}

	render() {
		const dropdown = (
			<Dropdown
				className="tribe-element-timepicker-label"
				position="bottom center"
				contentClassName="tribe-element-timepicker-dialog"
				renderToggle={ ( { onToggle, isOpen } ) => (
					<button
						type="button"
						className="button-link"
						onClick={ onToggle }
						aria-expanded={ isOpen }
					>
						{ this.currentLabel }
					</button>
				) }
				renderContent={ this.renderDropdown }
			/>
		);

		return [
			<div
				key='tribe-element-timepicker'
				className='tribe-element tribe-element-timepicker'
			>
				{ dropdown }
			</div>
		];
	}
}

export default DateTime;