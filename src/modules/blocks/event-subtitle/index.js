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
import { removeEmptyStrings, castBooleanStrings } from 'utils/object';
import { noop, pick, get } from 'lodash';

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
	},

	useOnce: true,

	edit: ( props ) => {
		const setAttributes = get( props, 'setAttributes', noop );
		store.subscribe( () => {
			const state = store.getState();
			setAttributes( pick( state, VALID_PROPS ) );
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
