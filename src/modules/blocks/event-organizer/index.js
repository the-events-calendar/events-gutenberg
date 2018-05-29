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
		organizers: {
			type: 'string',
			source: 'meta',
			meta: '_EventOrganizerBlocks',
		},
	},

	edit: ( { attributes, setAttributes, isSelected, id } ) => {
		const { organizers } = attributes;
		const index = select( 'core/editor' ).getBlockIndex( id );
		let organizer = 0;
		try {
			const blocks = JSON.parse( organizers );
			const results = blocks.filter( ( b ) => b.index === index );
			const block = results.length ? results[ 0 ] : {};
			organizer = get( block, 'organizer', 0 );
		} catch ( error ) {
			organizer = 0;
		}

		return (
			<EventOrganizer
				id={ id }
				selected={ isSelected }
				setAttributes={ setAttributes }
				organizer={ organizer }
				{ ...attributes }
			/>
		);
	},

	save() {
		return null;
	},
};
