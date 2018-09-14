/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import noop from 'lodash/noop';

/**
 * Internal dependencies
 */
import { sendValue } from '@moderntribe/common/utils/input';
import itemsSchema, { getValues } from './schema';
import { toLabel } from './utils';
import Row from './capacity-row';
import './style.pcss';

const CapacityTable = ( props ) => {
	const {
		title,
		shared,
		independent,
		sharedLabel,
		independentLabel,
		totalLabel,
		total,
		onSharedCapacityChange,
	} = props;

	const sharedData = getValues( shared );
	const independentData = getValues( independent );

	const sharedInput = (
		<input onChange={ sendValue( onSharedCapacityChange ) } value={ sharedData.total } />
	);

	return (
		<div className="tribe-editor__capacity">
			{ title && <h3 className="tribe-editor__capacity__title">{ title }</h3> }
			<Row
				label={ sharedLabel }
				items={ toLabel( sharedData.names ) }
				right={ sharedInput }
			/>
			<Row
				label={ independentLabel }
				items={ toLabel( independentData.names ) }
				right={ independentData.total }
			/>
			<Row
				label={ totalLabel }
				right={ total }
			/>
		</div>
	);
};

CapacityTable.propTypes = {
	title: PropTypes.string,
	shared: itemsSchema,
	sharedLabel: PropTypes.string,
	independent: itemsSchema,
	independentLabel: PropTypes.string,
	totalLabel: PropTypes.string,
	total: PropTypes.number,
	onSharedCapacityChange: PropTypes.func,
}

CapacityTable.defaultProps = {
	title: __( 'Capacity', 'events-gutenberg' ),
	shared: [],
	independent: [],
	sharedLabel: __( 'Shared Capacity', 'events-gutenberg' ),
	independentLabel: __( 'Independent capacity', 'events-gutenberg' ),
	totalLabel: __( 'Total Capacity', 'events-gutenberg' ),
	total: 0,
	onSharedCapacityChange: noop,
}

export default CapacityTable;
