/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

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
		organizers: {
			type: 'object',
			source: 'meta',
			meta: '_EventOrganizerBlocks',
			default: 'no Name',
		},
	},

	edit: ( { attributes, setAttributes, isSelected, id } ) => {
		const { organizers } = attributes;
		return (
			<EventOrganizer
				id={ id }
				selected={ isSelected }
				set={ setAttributes }
				{ ...attributes }
			/>
		);
	},

	save() {
		return null;
	},
};
