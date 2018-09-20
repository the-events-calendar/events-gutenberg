/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';

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
	isSelected: ownProps.isSelected,
	available: 48,
	total: 166,
	footerActions: [
		<ActionButton icon={ <CogIcon /> }>Settings</ActionButton>,
		<ActionButton icon={ <UserIcon /> }>Attendees </ActionButton>,
		<ActionButton icon={ <TagIcon /> }>Orders</ActionButton>,
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
