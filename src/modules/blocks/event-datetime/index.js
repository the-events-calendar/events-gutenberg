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
import EventSubtitle, { VALID_PROPS } from './block';
import { store } from 'data/details';
import { removeEmptyStrings, castBooleanStrings, diff } from 'utils/object';
import { noop, pick, get } from 'lodash';

/**
 * Module Code
 */
export default {
	id: 'event-datetime',
	title: __( 'Event Date Time', 'events-gutenberg' ),
	description: __(
		'The single event shows date and time',
		'events-gutenberg'
	),
	icon: 'calendar',
	category: 'common',
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
		timezone: {
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

		// Only Avail for classic users
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

	useOnce: true,

	edit: ( props ) => {

		// Remove old subscription to avoid multiple renders of old references
		if ( typeof this.unsubscribe === 'function' ) {
			this.unsubscribe();
		}

		this.unsubscribe = store.subscribe( () => {
			const setAttributes = get( props, 'setAttributes', noop );
			const state = store.getState();
			// Filter to only the ones that are valid for this component
			const attributes = pick( state, VALID_PROPS );
			// Filter the attributes as well to the ones relevant to this component
			const prevAttributes = pick( get( props, 'attributes', {} ), VALID_PROPS );
			// Update only the attributes with changes
			setAttributes( diff( attributes, prevAttributes ) );
		} );

		const allowedProperties = pick( props, [ 'isSelected' ] );
		const attributes = castBooleanStrings(
			removeEmptyStrings(
				get( props, 'attributes', {} )
			)
		);

		const properties = {
			...allowedProperties,
			...attributes,
		};

		return <EventSubtitle { ...properties } />;
	},

	save( props ) {
		return null;
	},
};
