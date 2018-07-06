/**
 * Import External dependencies
 */
import React from 'react';
import { noop } from 'lodash';
/**
 * WordPress dependencies
 */
import {
	Dashicon,
	IconButton,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.pcss';

const ActionsComponent = ( { block, onRemoveOrganizer = noop, focus } ) => {
	if ( block ) {
		return null;
	}

	return (
		<IconButton
			className="tribe-editor__btn tribe-editor__btn--action"
			label={ __( 'Remove Organizer', 'events-gutenberg' ) }
			onClick={ onRemoveOrganizer }
			icon={ 	<Dashicon icon="no" /> }
			aria-expanded={ focus }
		/>
	);
};

export default ActionsComponent;
