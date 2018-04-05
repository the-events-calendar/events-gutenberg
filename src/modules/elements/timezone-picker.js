/**
 * External dependencies
 */
import moment from 'moment';
import { isString, find, flatten, map, equals } from 'lodash';
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
import { query } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

const options = 'tribe_blocks_editor_timezone_html' in window ? tribe_blocks_editor_timezone_html : '';
const $timezoneOpts = jQuery( options );

let timezoneOpts;

/**
 * Module Code
 */
class TimezonePicker extends Component {
	constructor() {
		super( ...arguments );

		this.renderList = this.renderList.bind( this );
		this.renderItem = this.renderItem.bind( this );
		this.renderDropdown = this.renderDropdown.bind( this );

		this.onSelectItem = this.props.onSelectItem.bind( this );

		this.onSelectItem( this.props.current );
	}

	static defaultProps = {
		onHover: () => {},
		onSelectItem: () => {},

		current: false,
	}

	getTimezoneOpts() {
		// Verify if we have it in cache solved
		if ( timezoneOpts ) {
			return timezoneOpts;
		}

		let groups = [];
		let number = 0;

		$timezoneOpts.each( function( index, item ) {
			let $group = jQuery( item );

			if ( ! $group.is( 'optgroup' ) ) {
				return;
			}

			number++;

			let label = $group.attr( 'label' );
			let group = {
				key: label,
				text: label,
				options: []
			};

			$group.find( 'option' ).each( function( optIndex, optionEl ) {
				number++;

				let $option = jQuery( optionEl );
				group.options.push( {
					key: $option.val(),
					text: $option.text(),
					index: number,
				} );
			} );

			groups.push( group );
		} );

		// Save it in a cache
		timezoneOpts = groups;

		return groups;
	}

	getItems( searchFor, props ) {
		let groups = this.getTimezoneOpts();

		if ( ! props ) {
			props = this.props;
		}

		const {
			current,
		} = props;

		if ( searchFor ) {
			let result;
			let options = flatten( map( groups, 'options' ) );

			return find( options, searchFor );
		}

		return groups;
	}

	renderList() {
		const { focus } = this.props;

		return this.getItems().map( this.renderGroup, this );
	}

	renderGroup( group ) {
		const { onHover } = this.props;

		const itemClasses = {
			'tribe-element-timezone-picker-group': true,
		};

		return (
			<ul
				key={ `timezone-${ group.key }` }
				role="menuitem"
				className={ classNames( itemClasses ) }
			>
				<li className='tribe-element-timezone-picker-group-label'>{ group.text }</li>
				{ group.options.map( this.renderItem, this ) }
			</ul>
		);
	}

	renderItem( item ) {
		const { onHover } = this.props;

		const itemClasses = {
			'tribe-element-timezone-picker-item': true,
			'tribe-current': equals( item.key, this.props.current ),
		};

		console.warn( equals( item.key, this.props.current ) );

		return (
			<li
				key={ `timezone-${ item.key }` }
				className={ classNames( itemClasses ) }
			>
				<button
					role="menuitem"
					value={ item.key }
					onClick={ () => {
						this.onSelectItem( item.key );
						this.onClose();
					} }
				>
					{ item.text }
				</button>
			</li>
		);
	}

	renderDropdown( { onToggle, isOpen, onClose } ) {
		this.onClose = onClose.bind( this );

		return (
			<ScrollTo>
				{ ( scroll, scrollById ) => {
					this.scrollToCurrent = ( ( index ) => {
						index = index - 2;
						if ( 0 > index ) {
							index = 0;
						}
						scrollById( 'tribe-element-timezone-picker-items', 0, 31 * index );
					} ).bind( this );

					return (
						<ScrollArea
							id='tribe-element-timezone-picker-items'
							key='tribe-element-timezone-picker-items'
							role="menu"
							className={ classNames( 'tribe-element-timezone-picker-items' ) }
						>
							{ this.renderList() }
						</ScrollArea>
					);
				} }
			</ScrollTo>
		);
	}

	scrollToCurrent() {}

	componentDidUpdate( nextProps, nextState ) {
		const currentItem = this.getItems( { key: nextProps.current }, nextProps );

		if ( currentItem && currentItem.index ) {
			this.scrollToCurrent( currentItem.index );
		}
	}

	get currentValue() {
		const {
			current,
			siteTimezone,
		} = this.props;

		if ( current ) {
			return current;
		}

		let timezone = siteTimezone.string ? siteTimezone.string : `UTC${ siteTimezone.offset }`;
		let search = { key: timezone };
		let items = this.getItems( search );

		if ( ! items ) {
			return __( 'Invalid Timezone', 'the-events-calendar' );
		}

		return items.key;
	}

	render() {
		const dropdown = (
			<Dropdown
				className="tribe-element-timezone-picker-label"
				position="bottom center"
				contentClassName="tribe-element-timezone-picker-dialog"
				renderToggle={ ( { onToggle, isOpen } ) => (
					<button
						type="button"
						className="button-link"
						onClick={ onToggle }
						aria-expanded={ isOpen }
					>
						{ this.currentValue }
					</button>
				) }
				renderContent={ this.renderDropdown }
			/>
		);

		return [
			<div
				key='tribe-element-timezone-picker'
				className='tribe-element tribe-element-timezone-picker'
			>
				{ dropdown }
			</div>
		];
	}
}

export default TimezonePicker;
