/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import EventDetails from './block';
import { Icons } from 'elements';
import { withStore } from '@@tribe/common/hoc';

/**
 * Module Code
 */
export default {
	id: 'classic-event-details',
	title: __( 'Event Details Classic', 'events-gutenberg' ),
	description: __(
		'Display your event info together in one place -- just like in the Classic Editor..',
		'events-gutenberg'
	),
	icon: Icons.TEC,
	category: 'tribe-events',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		organizerTitle: {
			type: 'html',
			default: '',
		},
		detailsTitle: {
			type: 'html',
			default: '',
		},
		organizers: {
			type: 'array',
			source: 'meta',
			meta: '_EventOrganizerID',
		},
		allDay: {
			type: 'boolean',
			source: 'meta',
			meta: '_EventAllDay',
		},
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
		url: {
			type: 'string',
			source: 'meta',
			meta: '_EventURL',
		},
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

	edit: withStore()( EventDetails ),

	save( props ) {
		return null;
	},
};

