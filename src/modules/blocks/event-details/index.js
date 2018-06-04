/**
 * External dependencies
 */
import { get, noop, pick, isEqual } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import EventDetails, { VALID_PROPS } from './block';
import { store, STORE_NAME } from 'data/details';
import { castBooleanStrings, removeEmptyStrings, diff } from 'utils/object';

/**
 * Module Code
 */
export default {
	id: 'event-details',
	title: __( 'Event Details Classic', 'events-gutenberg' ),
	description: __(
		'Set your event’s date and time. You can also add price, event website, and organizers.',
		'events-gutenberg'
	),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		organizerTitle: {
			type: 'html',
		},
		eventOrganizers: {
			type: 'array',
			source: 'meta',
			meta: '_EventOrganizerID',
		},
		detailsTitle: {
			type: 'html',
		},
		allDay: {
			type: 'boolean',
			source: 'meta',
			meta: '_EventAllDay',
		},
		startDate: {
			type: 'string',
			source: 'meta',
			meta: '_EventStartDate',
		},
		endDate: {
			type: 'string',
			source: 'meta',
			meta: '_EventEndDate',
		},
		eventUrl: {
			type: 'string',
			source: 'meta',
			meta: '_EventURL',
		},
		eventCost: {
			type: 'string',
			source: 'meta',
			meta: '_EventCost',
		},
		eventCurrencySymbol: {
			type: 'string',
			source: 'meta',
			meta: '_EventCurrencySymbol',
		},
		eventCurrencyPosition: {
			type: 'string',
			source: 'meta',
			meta: '_EventCurrencyPosition',
		},
	},

	useOnce: true,

	edit: ( props ) => {

		const allowedProperties = pick(
			props, [ 'isSelected', 'setFocus', 'setAttributes', 'focus' ]
		);
		const attributes = castBooleanStrings(
			removeEmptyStrings(
				get( props, 'attributes', {} )
			)
		);
		const properties = {
			...allowedProperties,
			...attributes,
		};

		return <EventDetails { ...properties } />;
	},

	save( props ) {
		return null;
	},
};

