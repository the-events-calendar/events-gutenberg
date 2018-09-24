/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { ImageUpload } from '@moderntribe/common/elements';
import {
	Availability,
	ActionDashboard,
	CapacityTable,
	InactiveBlock,
	TicketForm,
} from '@moderntribe/tickets/elements';
import { LAYOUT } from '@moderntribe/tickets/elements/inactive-block/element';
import { TicketInactive } from '@moderntribe/tickets/icons';
import './style.pcss';

const inactiveBlockProps = {
	icon: <TicketInactive />,
	title: __( 'No Active Tickets', 'events-gutenberg' ),
	description: __(
		/* eslint-disable-next-line max-len */
		'The time is currently outside of the ticket sales window. Make adjustments to the start and end date to activate these tickets.',
		'events-gutenberg',
	),
	layout: LAYOUT.ticket,
};

const imageUploadProps = {
	title: __( 'Ticket Header Image', 'events-gutenberg' ),
	description: __(
		/* eslint-disable-next-line max-len */
		'Select an image from your Media Library to display on emailed tickets. For best results, use a .jpg, .png, or .gif at least 1160px wide.',
		'events-gutenberg'
	),
	buttonLabel: __( 'Upload Image', 'events-gutenberg' ),
	image: {
		id: 0,
		src: '',
		alt: '',
	},
};

const TicketsTemplate = ( props ) => {
	const {
		isSelected,
		available,
		total,
		footerActions,
		footerConfirmLabel,
		// @todo limit the usage of the available blocks for this one, however at this point the
		// appender button is only available on the paragraph block
		// see https://github.com/WordPress/gutenberg/issues/8589 once is resolved we should be able
		// to address this one and limit this to only this property
		allowedBlockTypes,
	} = props;

	const availability = isSelected && (
		<Availability available={ available } total={ total } />
	);

	const actionDashboard = isSelected && (
		<ActionDashboard
			actions={ footerActions }
			confirmLabel={ footerConfirmLabel }
		/>
	);

	return (
		<div
			className={ classNames(
				'tribe-editor__tickets-container',
				{ 'tribe-editor__tickets-container--selected': isSelected },
			) }
		>
			<div className="tribe-editor__tickets-body">
				<InnerBlocks />
				<InactiveBlock { ...inactiveBlockProps } />
			</div>
			<CapacityTable />
			<ImageUpload { ...imageUploadProps } />
			<TicketForm />
			{ availability }
			{ actionDashboard }
		</div>
	);
};

TicketsTemplate.propTypes = {
	isSelected: PropTypes.bool,
	footerActions: PropTypes.arrayOf( PropTypes.node ),
	footerConfirmLabel: PropTypes.string,
	allowedBlockTypes: PropTypes.arrayOf( PropTypes.string ),
};

TicketsTemplate.defaultProps = {
	isSelected: false,
	footerActions: [],
	footerConfirmLabel: __( 'Add Tickets', 'events-gutenberg' ),
	allowedBlockTypes: [],
};

export default TicketsTemplate;
