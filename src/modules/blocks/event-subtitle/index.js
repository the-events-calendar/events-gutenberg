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
import { noop, pick, get, isEqual } from 'lodash';

/**
 * Module Code
 */
export default {
	id: 'event-subtitle',
	title: __( 'Event Subtitle Classic', 'events-gutenberg' ),
	description: __(
		'The classic single event subtitle shows date, time, and price.',
		'events-gutenberg'
	),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
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
		dateTimeRangeSeparator: {
			type: 'string',
			source: 'meta',
			meta: '_EventDateTimeSeparator',
		},
		timeRangeSeparator: {
			type: 'string',
			source: 'meta',
			meta: '_EventTimeRangeSeparator',
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
			console.log( diff( attributes, prevAttributes )  );
			// setAttributes( diff( attributes, prevAttributes ) );
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
