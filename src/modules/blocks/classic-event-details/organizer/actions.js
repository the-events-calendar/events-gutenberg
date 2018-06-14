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
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { STORE_NAME } from 'data/organizers';
import './style.pcss';

const ActionsComponent = ( { isBlock, onRemoveOrganizer = noop, focus } ) => {

	if ( isBlock ) {
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

export default compose( [
	withSelect( ( select, props ) => {
		const { isBlock } = select( STORE_NAME );
		return {
			isBlock: isBlock( props.id ),
		};
	} ),
] )( ActionsComponent );
