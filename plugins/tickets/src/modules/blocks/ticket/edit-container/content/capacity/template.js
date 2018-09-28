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
import './style.pcss';

export const TYPES = {
	unlimited: 'unlimited',
	independent: 'independent',
	shared: 'shared',
};

// todo: replace with custom select from Events Pro
const Select = ( { id, options, selected, onSelect } ) => {
	const ref = React.createRef();

	function onChange() {
		const { current } = ref;
		onSelect( current.value );
	}

	return (
		<select ref={ ref } id={ id } value={ selected } onChange={ onChange }>
			{ options.map( ( { name, value }, index ) => (
				<option key={ index } value={ value }>{ name }</option>
			) ) }
		</select>
	);
}

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
const Input = ( { id, input, shouldRender, ...props } ) => {
	const ref = React.createRef();

	function onChange() {
		const { current } = ref;
		input.onChange( current.value );
	}

	return ( shouldRender && (
		<div className="tribe-editor__container-panel__input-row">
			<label htmlFor={ id }>{ input.label }</label>
			<input
				type="number"
				id={ id }
				value={ input.value }
				onChange={ onChange }
				ref={ ref }
				{ ...props }
			/>
		</div>
	) );
}

Input.propTypes = {
	id: PropTypes.string,
	shouldRender: PropTypes.bool,
	input: PropTypes.shape( {
		value: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
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
		capacity: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
		independentLabel: PropTypes.string,
		sharedLabel: PropTypes.string,
		totalSharedCapacity: PropTypes.string,
		setTemporarilySharedCapacity: PropTypes.func,
		tmpSharedCapacity: PropTypes.string,
		onCapacityChange: PropTypes.func,
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
		capacity: 0,
		independentLabel: __( 'Number of tickets available', 'events-gutenberg' ),
		sharedLabel: __( '(optional) Limit sales of this ticket to:', 'events-gutenberg' ),
		totalSharedCapacity: '',
		tmpSharedCapacity: '',
	};

	constructor( props ) {
		super( props );
		this.ids = {
			select: uniqid( 'capacity-type-' ),
			capacity: uniqid( 'ticket-input-capacity-' ),
			globalShared: uniqid( 'ticket-input-global-shared-' ),
		};
	}

	render() {
		const {
			capacityLabel,
			capacityToolTip,
			capacityOptions,
			type,
			onSelectType,
			capacity,
			independentLabel,
			sharedLabel,
			totalSharedCapacity,
			setTemporarilySharedCapacity,
			tmpSharedCapacity,
			onCapacityChange,
		} = this.props;

		const inputProps = {
			onChange: onCapacityChange,
			label: independentLabel,
			value: capacity,
		};

		const extraInputProps = {};

		if ( type === TYPES.shared && ( totalSharedCapacity || tmpSharedCapacity ) ) {
			extraInputProps.max = totalSharedCapacity ? totalSharedCapacity : tmpSharedCapacity;
		}

		return (
			<div className="tribe-editor__container-panel__row">
				<LabelWithTooltip
					className="tribe-editor__container-panel__label"
					forId={ this.ids.select }
					isLabel={ true }
					label={ capacityLabel }
					tooltipText={ capacityToolTip }
					tooltipLabel={ <Dashicon icon="info-outline" /> }
				/>
				<div className="tribe-editor__container-panel__input-group">
					<Select
						selected={ type }
						options={ capacityOptions }
						onSelect={ onSelectType }
						id={ this.ids.select }
					/>
					<Input
						id={ this.ids.capacity }
						shouldRender={ type !== TYPES.unlimited }
						input={ inputProps }
						min="0"
						{ ...extraInputProps }
					/>
					<Input
						id={ this.ids.globalShared }
						shouldRender={ type === TYPES.shared && totalSharedCapacity === '' }
						input={ {
							onChange: setTemporarilySharedCapacity,
							label: sharedLabel,
							value: tmpSharedCapacity,
						} }
						min="0"
					/>
				</div>
			</div>
		);
	}
}

export default Capacity;