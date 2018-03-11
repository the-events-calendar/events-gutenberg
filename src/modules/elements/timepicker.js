/**
 * External dependencies
 */
import moment from 'moment';
import { times, unescape, get, escapeRegExp, isString, find } from 'lodash';
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


/**
 * Module Code
 */

// Fetches all the Editor Settings
const DATA = tribe_blocks_editor_settings;

const toMomentFormat = ( format ) => {
	const strtr = ( str, pairs ) => {
		const substrs = Object.keys( pairs ).map( escapeRegExp )
		return str.split( RegExp( `(${ substrs.join( '|' ) })` ) )
			.map( part => pairs[ part ] || part )
			.join( '' )
	}

    const replacements = {
        'd': 'DD',
        'D': 'ddd',
        'j': 'D',
        'l': 'dddd',
        'N': 'E',
        'S': 'o',
        'w': 'e',
        'z': 'DDD',
        'W': 'W',
        'F': 'MMMM',
        'm': 'MM',
        'M': 'MMM',
        'n': 'M',
        't': '', // no equivalent
        'L': '', // no equivalent
        'o': 'YYYY',
        'Y': 'YYYY',
        'y': 'YY',
        'a': 'a',
        'A': 'A',
        'B': '', // no equivalent
        'g': 'h',
        'G': 'H',
        'h': 'hh',
        'H': 'HH',
        'i': 'mm',
        's': 'ss',
        'u': 'SSS',
        'e': 'zz', // deprecated since version 1.6.0 of moment.js
        'I': '', // no equivalent
        'O': '', // no equivalent
        'P': '', // no equivalent
        'T': '', // no equivalent
        'Z': '', // no equivalent
        'c': '', // no equivalent
        'r': '', // no equivalent
        'U': 'X',
    };

    return strtr( format, replacements );
}

const ONE_DAY = 86400;
const NOW = moment().format( 'X' ) - moment( '00:00:00', 'HH:mm:ss' ).format( 'X' );

class DateTime extends Component {
	constructor() {
		super( ...arguments );

		this.formatLabel = this.formatLabel.bind( this )
		this.getSeconds = this.getSeconds.bind( this )
		this.roundTime = this.roundTime.bind( this )
		this.renderList = this.renderList.bind( this )
		this.renderItem = this.renderItem.bind( this )
		this.renderDropdown = this.renderDropdown.bind( this )

		this.state = {
			...this.props,
			current: this.getSeconds( this.props.current ),
		}
	}

	static defaultProps = {
		onHover: () => {},
		onSelectItem: () => {},

		step: 30,
		minTime: undefined,
		maxTime: undefined,
		show2400: false,
		timeFormat: 'HH:mm',
		current: NOW,
	}

	get currentLabel() {
		let current = this.state.current;

		if ( current.value ) {
			current = current.value
		}

		return this.formatLabel( this.roundTime( current ) );
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

	getItems( searchFor, state ) {
		let items = [];

		if ( ! state ) {
			state = this.state
		}

		const {
			step,
			minTime,
			maxTime,
			show2400,
			timeFormat,
			current,
		} = state

		const currentValue = this.roundTime( current.value ? current.value : current )
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
		} = this.state

		return moment().startOf( 'day' ).add( seconds, 'seconds' ).format( timeFormat )
	}

	roundTime( seconds ) {
		if ( null === seconds ) {
			return null;
		}

		let {
			step,
			show2400,
		} = this.state

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
		const current = this.roundTime( nextState.current.value ? nextState.current.value : nextState.current )
		const currentItem = this.getItems( { 'value': current }, nextState )

		if ( currentItem && currentItem.index ) {
			this.scrollToCurrent( currentItem.index );
		}
	}

	renderItem( item ) {
		const { current, onSelectItem, onHover } = this.state;

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
					onSelectItem( item )
					this.setState( { current: item } )
					this.onClose()
				} }
			>
				{ item.text }
			</button>
		);
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