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
const Input = ( { id, type, input, selected, ...props } ) => {
	const ref = React.createRef();

	function onChange() {
		const { current } = ref;
		input.onChange( current.value );
	}

	return ( type === selected && (
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
	type: PropTypes.oneOf( Object.keys( TYPES ) ),
	selected: PropTypes.oneOf( Object.keys( TYPES ) ),
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
		independentValue: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
		independentOnChange: PropTypes.func.isRequired,
		independentLabel: PropTypes.string,
		sharedValue: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
		sharedOnChange: PropTypes.func.isRequired,
		sharedLabel: PropTypes.string,
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
		independentValue: 0,
		independentLabel: __( 'Number of tickets available', 'events-gutenberg' ),
		sharedValue: 0,
		sharedLabel: __( '(optional) Limit sales of this ticket to:', 'events-gutenberg' ),
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
			independentValue,
			independentOnChange,
			independentLabel,
			sharedValue,
			sharedLabel,
			sharedOnChange,
		} = this.props;

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
						id={ this.ids.shared }
						selected={ type }
						input={ { onChange: sharedOnChange, label: sharedLabel, value: sharedValue } }
						type={ TYPES.shared }
						min="0"
					/>
					<Input
						id={ this.ids.independent }
						selected={ type }
						input={ {
							onChange: independentOnChange,
							label: independentLabel,
							value: independentValue,
						} }
						type={ TYPES.independent }
						min="0"
					/>
				</div>
			</div>
		);
	}
}

export default Capacity;
