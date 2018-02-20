/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	OrganizerForm,
} from 'elements'

/**
 * Module Code
 */
class EventOrganizers extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { focus } = this.props;

		if ( ! focus  ) {
			return null;
		}

		const icon = (
			<Dashicon icon='plus' />
		)

		const dropdownToggle = ( { onToggle, isOpen } ) => (
			<IconButton
				className='tribe-editor-button'
				label={ __( 'Add Organizer' ) }
				onClick={ onToggle }
				icon={ icon }
			/>
		)

		const dropdownContent = () => (
			<OrganizerForm />
		)

		const content = (
			<Dropdown
				className="tribe-editor-organizer-dropdown"
				position="bottom center"
				contentClassName="tribe-editor-dropdown__dialog"
				renderToggle={ dropdownToggle }
				renderContent={ dropdownContent }
			/>
		)

		return content
	}
}

export default EventOrganizers;
