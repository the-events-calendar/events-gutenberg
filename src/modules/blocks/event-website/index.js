/**
 * External dependencies
 */
import { get, noop, pick, isEqual } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import EventWebsite from './block';
import { store } from 'data/details';
import { VALID_PROPS } from './block';
import { castBooleanStrings, removeEmptyStrings, diff } from 'utils/object';

/**
 * Module Code
 */
export default {
	id: 'event-website',
	title: __( 'Event Website', 'events-gutenberg' ),
	description: __(
		'Display a button to control the Event Website link.',
		'events-gutenberg'
	),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		eventUrlLabel: {
			type: 'html',
		},
		url: {
			type: 'string',
			source: 'meta',
			meta: '_EventURL',
		},
	},

	useOnce: true,

	edit: ( props ) => {
		// Remove any old subscription if component is rendered again
		if ( typeof this.unsubscribe === 'function' ) {
			this.unsubscribe();
		}

		this.unsubscribe = store.subscribe( () => {
			const setAttributes = get( props, 'setAttributes', noop );
			const state = store.getState();
			// Pick relevant ones from store
			const attributes = pick( state, VALID_PROPS );
			// Pick relevant ones from the current attributes
			const prevAttributes = pick( get( props, 'attributes', {} ), VALID_PROPS );
			// Updates the attributes with changes
			setAttributes( diff( attributes, prevAttributes ) );
		} );

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

		return <EventWebsite { ...properties } />;
	},

	save( props ) {
		return null;
	},
};

