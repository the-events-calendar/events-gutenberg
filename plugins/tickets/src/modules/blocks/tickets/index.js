/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InnerBlocks } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { BlockIcon } from '@moderntribe/common/elements';
import Tickets from './container';

/**
 * Module Code
 */
export default {
	id: 'event-tickets',
	title: __( 'Event Tickets', 'events-gutenberg' ),
	description: __( 'Basic ticket functionality', 'events-gutenberg' ),
	icon: BlockIcon,
	category: 'tribe-tickets',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {
		sharedCapacity: {
			type: 'string',
			source: 'meta',
			meta: '_tribe_ticket_capacity',
		},
		header: {
			type: 'string',
			source: 'meta',
			meta: '_tribe_ticket_header',
		}
	},

	edit: Tickets,
	save: () => (
		<div>
			<InnerBlocks.Content />
		</div>
	);
};
