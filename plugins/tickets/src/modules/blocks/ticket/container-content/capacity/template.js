/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { includes } from 'lodash';
import uniqid from 'uniqid';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Dashicon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { constants, options } from '@moderntribe/tickets/data/ticket';
import {
	LabeledItem,
	LabelWithTooltip,
	NumberInput,
} from '@moderntribe/tickets/elements';
import './style.pcss';

const {
	INDEPENDENT,
	SHARED,
	TICKET_TYPES_VALUES,
	TICKET_TYPES,
} = constants;
const { CAPACITY_TYPE_OPTIONS } = options;

/**
 * @todo: replace with custom select from Events Pro
 */
const Select = ( { className, id, onChange, value } ) => (
	<select
		id={ id }
		className={ className }
		value={ value }
		onChange={ onChange }
	>
		{ CAPACITY_TYPE_OPTIONS.map( ( { label, value }, index ) => (
			<option key={ index } value={ value }>{ label }</option>
		) ) }
	</select>
);

Select.propTypes = {
	id: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string,
};

// Custom input for this type of form
const LabeledNumberInput = ( {
	className,
	id,
	label,
	...props,
} ) => (
	<LabeledItem
		className={ classNames(
			'tribe-editor__labeled-number-input',
			className,
		) }
		forId={ id }
		label={ label }
		isLabel={ true }
	>
		<NumberInput { ...props } />
	</LabeledItem>
);

LabeledNumberInput.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
};

class Capacity extends PureComponent {
	static propTypes = {
		sharedCapacity: PropTypes.string,
		tempCapacityType: PropTypes.oneOf( TICKET_TYPES_VALUES ),
		tempCapacity: PropTypes.string,
		tempSharedCapacity: PropTypes.string,
		onTempCapacityChange: PropTypes.func,
		onTempCapacityTypeChange: PropTypes.func,
		onTempSharedCapacityChange: PropTypes.func,
	};

	constructor( props ) {
		super( props );
		this.ids = {
			select: uniqid( 'capacity-type-' ),
			capacity: uniqid( 'capacity-' ),
			sharedCapacity: uniqid( 'shared-capacity-' ),
		};
	}

	getInputs = () => {
		const {
			sharedCapacity,
			tempCapacityType,
			tempCapacity,
			tempSharedCapacity,
			onTempCapacityChange,
			onTempSharedCapacityChange,
		} = this.props;

		const inputs = [];

		// If capacity type is shared and does not have shared capacity
		if ( tempCapacityType === TICKET_TYPES[ SHARED ] && sharedCapacity === '' ) {
			inputs.push(
				<LabeledNumberInput
					className="tribe-editor__ticket__shared-capacity-input"
					id={ this.ids.sharedCapacity }
					label={ __( 'Set shared capacity:', 'events-gutenberg' ) }
					value={ tempSharedCapacity }
					onChange={ onTempSharedCapacityChange }
					min="0"
				/>
			);
		}

		// If capacity type is shared or independent
		if ( includes(
			[ TICKET_TYPES[ SHARED ], TICKET_TYPES[ INDEPENDENT ] ],
			tempCapacityType,
		) ) {
			const extraProps = {};

			if (
				tempCapacityType === TICKET_TYPES[ SHARED ]
					&& ( sharedCapacity || tempSharedCapacity )
			) {
				extraProps.max = sharedCapacity ? sharedCapacity : tempSharedCapacity;
			}

			extraProps.label = tempCapacityType === TICKET_TYPES[ SHARED ]
				? __( '(optional) Limit sales of this ticket to:', 'events-gutenberg' )
				: __( 'Number of tickets available', 'events-gutenberg' );

			inputs.push(
				<LabeledNumberInput
					className="tribe-editor__ticket__capacity-input"
					id={ this.ids.capacity }
					value={ tempCapacity }
					onChange={ onTempCapacityChange }
					min="0"
					{ ...extraProps }
				/>
			);
		}

		return inputs;
	};

	render() {
		const {
			tempCapacityType,
			onTempCapacityTypeChange,
		} = this.props;

		return (
			<div className="tribe-editor__ticket__capacity">
				<LabelWithTooltip
					className="tribe-editor__ticket__capacity-label-with-tooltip"
					forId={ this.ids.select }
					isLabel={ true }
					label={ __( 'Ticket Capacity', 'events-gutenberg' ) }
					tooltipText={ __(
						'Ticket capacity will only be used by attendees buying this ticket type',
						'events-gutenberg',
					) }
					tooltipLabel={ <Dashicon icon="info-outline" /> }
				/>
				<div className="tribe-editor__ticket__capacity-form">
					<Select
						className="tribe-editor__ticket__capacity-type-select"
						id={ this.ids.select }
						onChange={ onTempCapacityTypeChange }
						value={ tempCapacityType }
					/>
					{ this.getInputs() }
				</div>
			</div>
		);
	}
}

export default Capacity;
