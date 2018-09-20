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

const mapStateToProps = ( state, ownProps ) => ( {
	isSelected: ownProps.isSelected,
	title: 'Balcony',
	description: 'General admission',
	price: 125,
	sold: 71,
	available: 156,
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
	),
	withSaveData(),
)( Template );

