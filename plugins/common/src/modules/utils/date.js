/**
 * External dependencies
 */
import { get, identity } from 'lodash';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	moment as momentUtil,
	timezone as timezoneUtil,
} from '@moderntribe/common/utils';

const WPDateSettings = get( window, 'tribe_date_settings', {} );
const { formats = {}, timezone = {} } = WPDateSettings;

export const FORMATS = {
	TIME: 'HH:mm:ss',
	DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
	WP: {
		time: 'g:i a',
		time24Hr: 'H:i',
		date: 'F j, Y',
		datetime: 'F j, Y g:i a',
		dateNoYear: 'F j',
		...formats,
	},
	TIMEZONE: {
		string: 'UTC',
		...timezone,
	},
	DATABASE: {
		date: 'Y-m-d',
		datetime: 'Y-m-d H:i:s',
		time: 'H:i:s',
	},
};

export const TODAY = new Date();

export const timezonesAsSelectData = () => {
	return timezones().map( ( tzone ) => ( {
		value: tzone.key,
		label: tzone.text,
	} ) );
};

export const timezones = () => {
	return timezoneUtil.getItems()
		.map( ( group ) => group.options || [] )
		.reduce( ( prev, current ) => [ ...prev, ...current ], [] );
};

export const toNaturalLanguage = ( params = {} ) => {
	const options = {
		date: null,
		format: {
			month: 'MMM',
			day: 'D',
			year: 'YYYY',
			time: 'h:mm a',
		},
		separator: '',
		...params,
	};

	const parsed = {
		text: '',
		moment: options.date && momentUtil.toMoment( options.date ),
		detail: {
			day: '',
			month: '',
			year: '',
			time: '',
		},
		isValid: false,
	};

	parsed.isValid = Boolean( parsed.moment && parsed.moment.isValid() );

	if ( parsed.isValid ) {
		parsed.detail = {
			month: `${ parsed.moment.format( options.format.month ) }`,
			day: `${ parsed.moment.format( options.format.day ) }`,
			year: `${ parsed.moment.format( options.format.year ) }`,
			time: `${ parsed.moment.format( options.format.time ) }`,
		};
		const { detail } = parsed;
		parsed.text = `${ detail.month } ${ detail.day } ${ detail.year } ${ options.separator } ${ detail.time }`;
	}
	return parsed;
};

export const rangeToNaturalLanguage = ( start = '', end = '', separators = {} ) => {
	const separatorOptions = {
		time: __( 'at', 'events-gutenberg' ),
		date: ' - ',
		...separators,
	}
	const from = toNaturalLanguage( { date: start, separator: separatorOptions.time } );
	const to = toNaturalLanguage( { date: end, separator: separatorOptions.time } );
	const parts = [ from.text ];

	if ( from.isValid && to.isValid ) {
		if ( momentUtil.isSameDay( from.moment, to.moment ) ) {
			/**
			 * If both dates are happening on the same day only the time is relevant on the secnod
			 * part of the string to keep string cleaner like: 'Oct 8 2018 at 12:00 pm - 12:30 pm'
			 * instead of 'Oct 8 2018 at 12:00 pm - Oct 8 2018 at 12:30 pm'
			 */
			parts.push( to.detail.time );
		} else if ( momentUtil.isSameMonth( from.moment, to.moment ) ) {
			/**
			 * If both dates are happening on the same month and not on the same day
			 * we don't need to show the same year twice like:  'Oct 8 2018 at 12:00 pm - Dec 20 12:30 pm'
			 * instead of  'Oct 8 2018 at 12:00 pm - December 24 2018 12:30 pm'
			 */
			parts.push( `${ to.detail.month } ${ to.detail.day } at ${ to.detail.time }` );
		} else {
			// Otherwise just use the full text
			parts.push( to.text );
		}
	}

	return parts.filter( identity ).join( separatorOptions.date );
};
