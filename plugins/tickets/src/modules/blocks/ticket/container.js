/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { compose } from 'redux';
import React from 'react';

/**
 * Internal dependencies
 */
import Template from './template';

import { withSaveData, withStore } from '@moderntribe/common/src/modules/hoc';
import { actions } from '@moderntribe/tickets/data/blocks/ticket';
import * as selectors from '../../data/blocks/ticket/selectors';

const mapStateToProps = ( state, ownProps ) => ( {
	title: 'Balcony',
	description: 'General admission',
	price: 125,
	sold: 71,
	available: 156,
	isEditing: true,
	isBlockSelected: selectors.getParentOrChildSelected( state ),
	...ownProps,
} );

const mapDispatchToProps = ( dispatch ) => ( {
	setIsSelected( selected ) {
		dispatch( actions.setChildBlockSelected( selected ) );
	}
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	withSaveData(),
)( Template );

