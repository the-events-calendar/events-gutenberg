/**
 * External dependencies
 */
import {
	find,
	flatten,
	map,
	get,
} from 'lodash';

/**
 * Wordpress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Module Code
 */
const options = get( window, 'tribe_blocks_editor_timezone_html', '' );
const $timezoneOpts = jQuery( options );

let timezoneOpts;

export function getTimezoneOpts() {
	// Verify if we have it in cache solved
	if ( timezoneOpts ) {
		return timezoneOpts;
	}

	const groups = [];
	let number = 0;

	$timezoneOpts.each( function( index, item ) {
		const $group = jQuery( item );

		if ( ! $group.is( 'optgroup' ) ) {
			return;
		}

		number++;

		const label = $group.attr( 'label' );
		const group = {
			key: label,
			text: label,
			options: [],
		};

		$group.find( 'option' ).each( function( optIndex, optionEl ) {
			number++;

			const $option = jQuery( optionEl );
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
	const groups = getTimezoneOpts();

	if ( searchFor ) {
		const opts = flatten( map( groups, 'options' ) );
		return find( opts, searchFor );
	}

	return groups;
}

export function currentValue( current ) {
	if ( current ) {
		return current;
	}

	const timezone = siteTimezone.string ? siteTimezone.string : `UTC${ siteTimezone.offset }`;
	const search = { key: timezone };
	const items = this.getItems( search );

	if ( ! items ) {
		return __( 'Invalid Timezone', 'events-gutenberg' );
	}
	return items.key;
}
