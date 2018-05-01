/**
 * External dependencies
 */
import { isString, find, flatten, map, equals, noop } from 'lodash';
import { ScrollTo, ScrollArea } from "react-scroll-to";


/**
 * Module Code
 */
const options = 'tribe_blocks_editor_timezone_html' in window ? tribe_blocks_editor_timezone_html : '';
const $timezoneOpts = jQuery( options );

let timezoneOpts;

export function getTimezoneOpts() {
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

export function getItems( searchFor ) {
	let groups = getTimezoneOpts();

	if ( searchFor ) {
		let options = flatten( map( groups, 'options' ) );

		return find( options, searchFor );
	}

	return groups;
}

export function currentValue( current ) {

	if ( current ) {
		return current;
	}

	let timezone = siteTimezone.string ? siteTimezone.string : `UTC${ siteTimezone.offset }`;
	let search = { key: timezone };
	let items = this.getItems( search );

	if ( ! items ) {
		return __( 'Invalid Timezone', 'events-gutenberg' );
	}
	return items.key;
}
