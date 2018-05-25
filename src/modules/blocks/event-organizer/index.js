/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 *
 * Internal dependencies
 * */

export default {
	id: 'event-organizer',
	title: __(  'Event Organizer', 'events-gutenberg' ),
	description: __( 'Add multiple organizers to the Event', 'events-gutenberg' ),
	icon: 'calendar',
	category: 'common',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		name: {
			type: 'array',
			source: 'meta',
			meta: '_EventOrganizerBlocks',
		},
	},

	useOnce: true,

	edit: () => {
		return <span>This is my block</span>;
	},

	save() {
		return null;
	},
};
