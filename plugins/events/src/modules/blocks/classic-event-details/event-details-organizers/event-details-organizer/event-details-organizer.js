/**
 * External dependencies
 */
import React from 'react';
import { unescape, trim, isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Dashicon, IconButton } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { withDetails } from '@moderntribe/common/hoc';
import { Loading } from '@moderntribe/events/elements';
import './style.pcss';

const Item = ( props ) => {
	const getOrganizerName = ( { title } ) => {
		const { rendered = __( '(Untitled)', 'events-gutenberg' ) } = title;
		return trim( unescape( rendered ) );
	};

	const getOrganizerRemoveButton = ( {
		block,
		volatile,
		onRemoveClick,
		focus
	} ) => (
		! ( block || volatile ) &&
		<IconButton
			className="tribe-editor__btn tribe-editor__btn--action"
			label={ __( 'Remove Organizer', 'events-gutenberg' ) }
			onClick={ onRemoveClick }
			icon={ <Dashicon icon="no" /> }
			aria-expanded={ focus }
		/>
	);

	const { isLoading, details } = props;

	if ( isLoading || isEmpty( details ) ) {
		return <li><Loading className="tribe-editor__spinner--item" /></li>;
	}

	return (
		<li>
			{ getOrganizerName( props.details ) }
			{ getOrganizerRemoveButton( props ) }
		</li>
	);
};

export default withDetails( 'id' )( Item );
