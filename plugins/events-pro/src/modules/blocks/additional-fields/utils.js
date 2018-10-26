/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { toBlockName } from '@moderntribe/common/utils/string';
import Container from './container';
import * as Fields from '@moderntribe/events-pro/blocks/additional-fields';
import { config } from '@moderntribe/common/src/modules/utils/globals';

export const FIELD_TYPES = {
	text: 'text',
	checkbox: 'checkbox',
	dropdown: 'dropdown',
	url: 'url',
	radio: 'radio',
	textarea: 'textarea',
};

export const FIELDS_SCHEMA = {
	text: {
		icon: 'editor-textcolor',
		container: Fields.Text,
		type: 'string',
	},
	url: {
		icon: 'admin-links',
		container: Fields.URL,
		type: 'string',
	},
	textarea: {
		icon: 'admin-comments',
		container: Fields.TextArea,
		type: 'string',
	},
	dropdown: {
		icon: 'randomize',
		container: Fields.Dropdown,
		type: 'array',
	},
	checkbox: {
		icon: 'yes',
		container: Fields.Checkbox,
		type: 'array',
	},
	radio: {
		icon: 'editor-ul',
		container: Fields.Radio,
		type: 'array',
	},
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
	const { name, label, type, values } = field;
	const schema = FIELDS_SCHEMA[ type ] || FIELDS_SCHEMA.text;
	const block = {
		id: `field-${ toBlockName( name ) }`,
		title: label,
		description: __(
			'Additional Field',
			'events-gutenberg',
		),
		icon: schema.icon,
		category: 'tribe-events-pro-additional-fields',
		keywords: [ 'event', 'events-gutenberg', 'tribe' ],

		supports: {
			html: false,
		},

		attributes: {
			isPristine: {
				type: 'boolean',
				default: true,
			},
			type: {
				type: 'string',
				default: '',
			},
			label: {
				type: 'string',
				default: '',
			},
			options: {
				type: schema.type,
				default: schema.type === 'string' ? '' : [],
			},
			metaKey: {
				type: 'string',
				default: '',
			},
			output: {
				type: 'string',
				default: '',
			},
			value: {
				type: 'string',
				source: 'meta',
				meta: name,
			},
			initialValues: {
				type: 'object',
				default: {
					metaKey: name,
					options: values,
					type,
					label,
				},
			},
		},
		edit: Container( schema.container ),
		save: () => null,
	};

	if ( type === FIELD_TYPES.checkbox ) {
		block.attributes.list = {
			type: 'array',
			source: 'meta',
			meta: `_${ name }`,
		};
	}
	return block;
};

/**
 * Extract the additional fields from the localized variable `tribe_js_config` and attempt to extract
 * any additional field and convert into a block.
 *
 * @since TBD
 *
 * @param {array} blocks An array of blocks where to append more blocks
 *
 * @returns {[]} An array with the merge of blocks an addiitional fields
 */
export const addAdditionalFields = ( blocks ) => {
	const eventsPro = config().events_pro || {};
	const additionalFields = eventsPro.additional_fields || [];
	const fields = additionalFields.map( ( field ) => fieldToBlock( field ) );
	return [ ...blocks, ...fields ];
};
