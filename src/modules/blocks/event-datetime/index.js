/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import { withStore } from 'editor/hoc';
import EventDateTime from './block';
import { Icons } from 'elements';
import { config } from 'editor/utils/globals';
const timeZone = get( config(), 'timeZone', {} );

/**
 * Module Code
 */
export default {
	id: 'event-datetime',
	title: __( 'Event Date Time', 'events-gutenberg' ),
	description: __(
		'Define the date, time, and duration for your event.',
		'events-gutenberg'
	),
	icon: Icons.TEC,
	category: 'tribe-events',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		start: {
			type: 'string',
			source: 'meta',
			meta: '_EventStartDate',
		},
		end: {
			type: 'string',
			source: 'meta',
			meta: '_EventEndDate',
		},
		allDay: {
			type: 'boolean',
			source: 'meta',
			meta: '_EventAllDay',
		},
		timeZone: {
			type: 'string',
			source: 'meta',
			meta: '_EventTimezone',
		},
		separatorDate: {
			type: 'string',
			source: 'meta',
			meta: '_EventDateTimeSeparator',
		},
		separatorTime: {
			type: 'string',
			source: 'meta',
			meta: '_EventTimeRangeSeparator',
		},
		showTimeZone: {
			type: 'boolean',
			default: get( timeZone, 'show_time_zone', false ),
		},
		timeZoneLabel: {
			type: 'string',
			default: get( timeZone, 'label', '' ),
		},
		// Only Available for classic users
		cost: {
			type: 'string',
			source: 'meta',
			meta: '_EventCost',
		},
		currencySymbol: {
			type: 'string',
			source: 'meta',
			meta: '_EventCurrencySymbol',
		},
		currencyPosition: {
			type: 'string',
			source: 'meta',
			meta: '_EventCurrencyPosition',
		},
	},

	edit: withStore()( EventDateTime ),

	save( props ) {
		return null;
	},
};
