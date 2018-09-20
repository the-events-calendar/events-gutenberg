/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Template from './Template';
import { withSaveData, withStore } from '@moderntribe/common/src/modules/hoc';
import { ActionButton } from '@moderntribe/tickets/elements';
import { selectors, actions } from '@moderntribe/tickets/data/blocks/ticket';
import {
	Cog as CogIcon,
	Tag as TagIcon,
	User as UserIcon,
} from '@moderntribe/common/src/modules/icons';

const mapStateToProps = ( state, ownProps ) => ( {
	isSelected: true,
	available: 48,
	total: 166,
	footerActions: [
		<ActionButton icon={ <CogIcon /> }>
			{ __( 'Settings', 'events-gutenberg' ) }
		</ActionButton>,
		<ActionButton icon={ <UserIcon /> }>
			{ __( 'Attendees', 'events-gutenberg' ) }
		</ActionButton>,
		<ActionButton icon={ <TagIcon /> }>
			{ __( 'Orders', 'events-gutenberg' ) }
		</ActionButton>,
	],
	allowedBlockTypes: [ 'tribe/event-tickets', 'tribe/event-tickets-ticket',  'core/image' ],
	headerImageId: selectors.getImageID( state ),
	headerImage: selectors.getHeaderSize( state, { size: 'large' } ),
} );

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
	setHeaderImage( image ) {
		dispatch( actions.setHeader( image ) );
	},
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withSaveData(),
)( Template );
