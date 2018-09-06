/**
 * External dependencies
 */
import { get, identity } from 'lodash';

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

export const toNaturalLanguage = ( date = null, format = { date: 'MMM D YYYY', time: 'h:mm a' } ) => {
	const parsed = {
		text: '',
		moment: date && momentUtil.toMoment( date ),
	};

	const { moment } = parsed;
	if ( moment && moment.isValid() ) {
		parsed.text = `${ moment.format( format.date ) } at ${ moment.format( format.time ) }`;
	}
	return parsed;
};

export const rangeToNaturalLanguage = ( start = '', end = '' ) => {
	const from = toNaturalLanguage( start );
	const to = toNaturalLanguage( end );
	const parts = [
		from.text,
		to.text,
	];
	return parts.filter( identity ).join( ' - ' );
}
