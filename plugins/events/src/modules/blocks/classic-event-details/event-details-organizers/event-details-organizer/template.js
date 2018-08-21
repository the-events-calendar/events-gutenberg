/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { unescape, trim, isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Dashicon, IconButton } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { Loading } from '@moderntribe/events/elements';
import './style.pcss';

/**
 * Module Code
 */

const EventDetailsOrganizer = ( props ) => {
	const getOrganizerName = ( { title } ) => {
		const { rendered = __( '(Untitled)', 'events-gutenberg' ) } = title;
		return trim( unescape( rendered ) );
	};

	const getOrganizerRemoveButton = ( {
		organizerId,
		block,
		volatile,
		onRemoveClick,
	} ) => (
		! ( block || volatile ) &&
		<IconButton
			className="tribe-editor__btn tribe-editor__btn--action"
			label={ __( 'Remove Organizer', 'events-gutenberg' ) }
			onClick={ onRemoveClick( organizerId ) }
			icon={ <Dashicon icon="no" /> }
		/>
	);
	console.log(props.focus);
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

EventDetailsOrganizer.propTypes = {
	details: PropTypes.object,
	isLoading: PropTypes.bool,
	organizerId: PropTypes.number,
	block: PropTypes.bool,
	volatie: PropTypes.bool,
	onRemoveClick: PropTypes.func,
};

export default EventDetailsOrganizer;
