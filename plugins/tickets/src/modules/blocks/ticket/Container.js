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

const mapStateToProps = ( state, props ) => ( {
	isSelected: props.isSelected,
} );

export default compose(
	withStore(),
	connect(
		mapStateToProps,
	),
	withSaveData(),
)( Template );

