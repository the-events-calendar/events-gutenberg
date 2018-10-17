/**
 * WordPress dependencies
 */
import React, { Fragment } from 'react';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	Preview,
	EditContainer,
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
		<Fragment>
			<Placeholder>Add refreshments</Placeholder>
			<Preview name={ 'Refreshments' }>
				consectetur ea est laboris sint <a href="#">in aliqua incididunt</a> asdas asdas
			</Preview>
			<EditContainer name={ 'Refreshments' }>
				<input className="" type="text" />
				<textarea rows={ 5 } className="tribe-editor__additional-fields__edit-input--large">
					fugiat amet proident occaecat dolore non dolore tempor sunt anim ut incididunt est
				</textarea>
				<fieldset className="tribe-editor__additional-fields__edit--horizontal-fields">
					<input type="checkbox" id="scales" name="feature" value="scales" checked />
					<label htmlFor="scales">Scales</label>
					<input type="checkbox" id="horns" name="feature" value="horns" />
					<label htmlFor="horns">Horns</label>
					<input type="checkbox" id="claws" name="feature" value="claws" />
					<label htmlFor="claws">Claws</label>
				</fieldset>
				<input className="" type="url" name="url" id="url" />
				<select id="pet-select">
					<option value="">--Please choose an option--</option>
					<option value="dog">Dog</option>
					<option value="cat">Cat</option>
					<option value="hamster">Hamster</option>
					<option value="parrot">Parrot</option>
					<option value="spider">Spider</option>
					<option value="goldfish">Goldfish</option>
				</select>
				<fieldset className="tribe-editor__additional-fields__edit--horizontal-fields">
					<input type="radio" id="huey" name="drone" value="huey" checked />
					<label htmlFor="huey">Huey</label>
					<input type="radio" id="dewey" name="drone" value="dewey" />
					<label htmlFor="dewey">Dewey</label>
					<input type="radio" id="louie" name="drone" value="louie" />
					<label htmlFor="louie">Louie</label>
				</fieldset>
			</EditContainer>
		</Fragment>
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
