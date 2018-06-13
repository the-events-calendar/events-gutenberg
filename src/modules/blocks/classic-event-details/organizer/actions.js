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
import {
	compose,
} from '@wordpress/element';

/**
 * Internal dependencies
 */
import { STORE_NAME } from 'data/organizers';

const ActionsComponent = ( { isBlock, onRemoveOrganizer = noop } ) => {

	if ( isBlock ) {
		return null;
	}

	const icon = (
		<Dashicon icon="no"/>
	);

	return (
		<IconButton
			className="tribe-editor__btn"
			label={ __( 'Remove Organizer', 'events-gutenberg' ) }
			onClick={ onRemoveOrganizer }
			icon={ icon }
			aria-expanded={ focus }
			style={ { position: 'absolute', right: 0, top: '-5px' } }
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
