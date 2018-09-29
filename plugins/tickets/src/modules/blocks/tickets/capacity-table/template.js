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
import Row from './row/template';
import './style.pcss';

const CapacityTable = ( props ) => {
	const {
		title,
		sharedTickets,
		independentTickets,
		sharedLabel,
		independentLabel,
		totalLabel,
		totalCapacity,
		onSharedCapacityChange,
		sharedCapacity,
	} = props;

	const sharedData = getValues( sharedTickets );
	const independentData = getValues( independentTickets );

	const sharedInput = (
		<input
			onChange={ sendValue( onSharedCapacityChange ) }
			value={ sharedCapacity }
			type="number"
			min="0"
		/>
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
				right={ totalCapacity }
			/>
		</div>
	);
};

CapacityTable.propTypes = {
	title: PropTypes.string,
	sharedTickets: itemsSchema,
	sharedLabel: PropTypes.string,
	independentTickets: itemsSchema,
	independentLabel: PropTypes.string,
	totalLabel: PropTypes.string,
	totalCapacity: PropTypes.number,
	sharedCapacity: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	onSharedCapacityChange: PropTypes.func,
}

CapacityTable.defaultProps = {
	title: __( 'Capacity', 'events-gutenberg' ),
	sharedTickets: [],
	independentTickets: [],
	sharedLabel: __( 'Shared Capacity', 'events-gutenberg' ),
	independentLabel: __( 'Independent capacity', 'events-gutenberg' ),
	totalLabel: __( 'Total Capacity', 'events-gutenberg' ),
	totalCapacity: 0,
	onSharedCapacityChange: noop,
}

export default CapacityTable;
