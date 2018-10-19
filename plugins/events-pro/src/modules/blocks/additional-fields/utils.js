/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { toBlockName } from '@moderntribe/common/utils/string';
import { Radio } from './radio';
import { TextArea } from './text-area';
import { TextTemplate } from './text';
import { Dropdown } from './dropdown';
import { URL } from './url';
import { Checkbox } from './checkbox';

export const FIELD_TYPES = {
	text: 'text',
	checkbox: 'checkbox',
	dropdown: 'dropdown',
	url: 'url',
	radio: 'radio',
	textarea: 'textarea',
};

/**
 * Returns the name of the icon to be used, uses the set from dashicons to represent the different
 * types of fields.
 *
 * @since TBD
 *
 * @param {string} type Type of the field
 * @returns {string} The name of the icon to be used for that field type
 */
export const getIcon = ( type ) => {
	const icons = {
		text: 'editor-textcolor',
		textarea: 'admin-comments',
		checkbox: 'yes',
		radio: 'editor-ul',
		dropdown: 'randomize',
		url: 'admin-links',
	};
	return icons[ type ] || icons.text;
};

export const getContainer = ( type ) => {
	const templates = {
		text: TextTemplate,
		textarea: TextArea,
		checkbox: Checkbox,
		radio: Radio,
		dropdown: Dropdown,
		url: URL,
	};
	return templates[ type ] || templates.text;
};

/**
 * Function used to return the configuration of a new block using the data from an additional field
 *
 * @since TBD
 *
 * @param {object} field An object with the fields of the field to be created as block
 *
 * @returns {object} Returns an object that represents the block
 */
export const fieldToBlock = ( field ) => {
	const { name, label, type } = field;
	return {
		id: `field-${ toBlockName( name ) }`,
		title: label,
		description: __(
			'Additional Field',
			'events-gutenberg',
		),
		icon: getIcon( type ),
		category: 'tribe-events-pro-additional-fields',
		keywords: [ 'event', 'events-gutenberg', 'tribe' ],

		supports: {
			html: false,
		},

		attributes: {
			isPristine: {
				type: 'boolean',
				default: false,
			},
		},
		edit: getContainer( type ),
		save: () => null,
	};
};
