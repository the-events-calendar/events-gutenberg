/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import InactiveBlock, { LAYOUT } from '@moderntribe/tickets/elements/inactive-block/element';
import { RSVPInactive } from '@moderntribe/tickets/icons';

const inactiveBlockProps = {
	className: 'tribe-editor__rsvp__inactive-block',
	title: __( 'No Active RSVP', 'events-gutenberg' ),
	icon: <RSVPInactive />,
	layout: LAYOUT.rsvp,
};

const RSVPInactiveBlock = ( { created } ) => {
	inactiveBlockProps.description = created
		? __(
			/* eslint-disable-next-line max-len */
			'The time is currently outside of the RSVP window. Make adjustments to the start and end date to activate this RSVP.',
			'events-gutenberg',
		)
		: __ (
			/* eslint-disable-next-line max-len */
			'The RSVP has not yet been created. Add a title and create the RSVP to activate this RSVP.',
			'events-gutenberg',
		);

	return <InactiveBlock { ...inactiveBlockProps } />
};

RSVPInactiveBlock.propTypes = {
	created: PropTypes.bool.isRequired,
};

export default RSVPInactiveBlock;
