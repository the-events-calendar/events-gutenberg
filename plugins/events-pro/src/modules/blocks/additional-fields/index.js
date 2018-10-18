/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	Preview,
} from './elements';

import { Placeholder } from '@moderntribe/common/elements';

/**
 * Module Code
 */

export default {
	id: 'additional-fields',
	title: __( 'Text', 'events-gutenberg' ),
	description: __(
		'Additional Field',
		'events-gutenberg',
	),
	icon: 'editor-textcolor',
	category: 'tribe-events-pro-additional-fields',
	keywords: [ 'event', 'events-gutenberg', 'tribe' ],

	supports: {
		html: false,
	},

	attributes: {},
	edit: () => (
		<div>
			<Placeholder>Add refreshments</Placeholder>
			<Preview name={ 'Refreshments' }>
				consectetur ea est laboris sint <a href="#">in aliqua incididunt</a> asdas asdas
			</Preview>
		</div>
	),
	save: () => null,
};

/**
 * Icons:
 * Text: 'editor-textcolor',
 * Text Area: 'comments'
 * CheckBox: 'yes'
 * Radio Button: 'editor-ul'
 * Dropdown: 'randomize'
 * url: 'admin-links'
 */
