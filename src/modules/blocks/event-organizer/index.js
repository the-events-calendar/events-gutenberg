/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';

/**
 *
 * Internal dependencies
 */
import EventOrganizer from './block';

export default {
	id: 'event-organizer',
	title: __( 'Event Organizer', 'events-gutenberg' ),
	description: __( 'Add multiple organizers to the Event', 'events-gutenberg' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		organizer: {
			type: 'html',
		},
	},

	edit: EventOrganizer,

	save() {
		return null;
	},
};
