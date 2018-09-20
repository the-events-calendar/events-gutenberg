/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import uniqid from 'uniqid';

/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Dashicon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { LabelWithTooltip } from '@moderntribe/tickets/elements';

export const TYPES = {
	unlimited: 'unlimited',
	independent: 'independent',
	shared: 'shared',
};

// todo: replace with custom select from Events Pro
const Select = ( { id, options, selected, onSelect } ) => (
	<select id={ id } value={ selected } onChange={ onSelect }>
		{ options.map( ( { name, value }, index ) => (
			<option key={ index } value={ value }>{ name }</option>
		) ) }
	</select>
);

Select.propTypes = {
	id: PropTypes.string,
	selected: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	options: PropTypes.arrayOf( PropTypes.shape( {
		name: PropTypes.string,
		value: PropTypes.string,
	} ) ).isRequired,
};

// Custom input for this type of form
const Input = ( { id, type, input, selected } ) => ( type === selected && (
	<div className="tribe-editor__tickets-form__input-row">
		<label htmlFor={ id }>{ input.label }</label>
		<input
			type="number"
			id={ id }
			value={ input.value }
			onChange={ input.onChange }
		/>
	</div>
) );

Input.propTypes = {
	id: PropTypes.string,
	type: PropTypes.oneOf( Object.keys( TYPES ) ),
	selected: PropTypes.oneOf( Object.keys( TYPES ) ),
	input: PropTypes.shape( {
		value: PropTypes.number,
		onChange: PropTypes.func.isRequired,
		label: PropTypes.string,
	} ),
};

class Capacity extends PureComponent {
	static propTypes = {
		capacityLabel: PropTypes.string,
		capacityToolTip: PropTypes.string,
		type: PropTypes.oneOf( Object.keys( TYPES ) ),
		capacityOptions: PropTypes.arrayOf( PropTypes.shape( {
			name: PropTypes.string,
			value: PropTypes.oneOf( Object.keys( TYPES ) ),
		} ) ),
		onSelectType: PropTypes.func,
		independent: PropTypes.shape( {
			value: PropTypes.number,
			onChange: PropTypes.func.isRequired,
			label: PropTypes.string,
		} ),
		shared: PropTypes.shape( {
			value: PropTypes.number,
			onChange: PropTypes.func.isRequired,
			label: PropTypes.string,
		} ),
	};

	static defaultProps = {
		capacityLabel: __( 'Ticket Capacity', 'events-gutenberg' ),
		capacityToolTip: __(
			'Ticket capacity will only be used by attendees buying this ticket type',
			'events-gutenberg',
		),
		type: TYPES.independent,
		capacityOptions: [
			{ name: __( 'Share capacity with other tickets', 'events-gutenberg' ), value: TYPES.shared },
			{
				name: __( 'Set capacity for this ticket only', 'events-gutenberg' ),
				value: TYPES.independent,
			},
			{ name: __( 'unlimited', 'events-gutenberg' ), value: TYPES.unlimited },
		],
		onSelectType: noop,
		independent: {
			value: 0,
			onChange: noop,
			label: __( 'Number of tickets available', 'events-gutenberg' ),
		},
		shared: {
			value: 0,
			onChange: noop,
			label: __( '(optional) Limit sales of this ticket to:', 'events-gutenberg' ),
		},
	};

	constructor( props ) {
		super( props );
		this.ids = {
			select: uniqid( 'capacity-type-' ),
			independent: uniqid( `ticket-input-independent-` ),
			shared: uniqid( `ticket-input-shared-` ),
		};
	}

	render() {
		const {
			capacityLabel,
			capacityToolTip,
			capacityOptions,
			type,
			onSelectType,
			independent,
			shared,
		} = this.props;

		return (
			<div className="tribe-editor__tickets-form__row">
				<LabelWithTooltip
					className="tribe-editor__tickets-form__label"
					id={ this.ids.select }
					label={ capacityLabel }
					tooltipText={ capacityToolTip }
					tooltipLabel={ <Dashicon icon="info-outline" /> }
				/>
				<div className="tribe-editor__tickets-form__input-group">
					<Select
						selected={ type }
						options={ capacityOptions }
						onSelect={ onSelectType }
						id={ this.ids.select }
					/>
					<Input
						id={ this.ids.shared }
						selected={ type }
						input={ shared }
						type={ TYPES.shared }
					/>
					<Input
						id={ this.ids.independent }
						selected={ type }
						input={ independent }
						type={ TYPES.independent }
					/>
				</div>
			</div>
		);
	}
}

export default Capacity;
