/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { BlockIcon } from '@moderntribe/common/elements';

/**
 * Module Code
 */
export default {
	id: 'event-rsvp',
	title: __( 'RSVP', 'events-gutenberg' ),
	description: __(
		'RSVP block',
		'events-gutenberg',
	),
	icon: BlockIcon,
	category: 'tribe-tickets',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {},

	edit: () => <div>{ 'RSVP Block' }</div>,

	save: () => null,
};
