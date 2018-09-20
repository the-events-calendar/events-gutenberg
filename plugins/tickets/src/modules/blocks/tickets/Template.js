/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InnerBlocks } from '@wordpress/editor';
import noop from 'lodash/noop';

/**
 * Internal dependencies
 */
import {
	Availability,
	ActionDashboard,
	TicketForm,
	InactiveBlock,
	CapacityTable,
	HeaderImage,
} from '@moderntribe/tickets/elements';
import { TICKET } from '@moderntribe/tickets/elements/inactive-block/element';
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
	layout: TICKET,
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
		sharedCapacity,
		setHeaderImage,
		headerImageId,
		headerImage,
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
			<HeaderImage onSelect={ setHeaderImage } mediaId={ headerImageId } image={ headerImage } />
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
	setHeaderImage: PropTypes.func,
	headerImageId: PropTypes.number,
	headerImage: PropTypes.shape( {
		height: PropTypes.number,
		width: PropTypes.number,
		url: PropTypes.string,
		orientation: PropTypes.string,
	} ),
};

TicketsTemplate.defaultProps = {
	isSelected: false,
	footerActions: [],
	footerConfirmLabel: __( 'Add Tickets', 'events-gutenberg' ),
	allowedBlockTypes: [],
	setHeaderImage: noop,
};

export default TicketsTemplate;
