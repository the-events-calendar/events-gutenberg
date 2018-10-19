/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { constants } from '@moderntribe/events-pro/data/blocks/recurring';
import { selectors } from '@moderntribe/events-pro/data/blocks/exception';
import { Fieldset } from '@moderntribe/events-pro/elements';
import RemoveField from '@moderntribe/events-pro/elements/remove-field/element';
import Singular from './singular';
import Daily from './daily';
import Weekly from './weekly';
import Monthly from './monthly';
import Yearly from './yearly';

export default class ExceptionField extends PureComponent {
	static propTypes = {
		onRemoveClick: PropTypes.func.isRequired,
		editException: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		type: PropTypes.string.isRequired,
	}

	handleRemove = () => this.props.onRemoveClick( this.props.index )
	handleTypeChange = ( option ) => this.props.editException( this.props.index, { type: option.value } )

	get typeOption() {
		return selectors.getTypeOption( this.props );
	}

	renderFieldType = () => {
		switch ( this.props.type ) {
			case constants.DAILY:
				return (
					<Daily
						{ ...this.props }
						typeOption={ this.typeOption }
						onTypeChange={ this.handleTypeChange }
					/>
				);
			case constants.WEEKLY:
				return (
					<Weekly
						{ ...this.props }
						typeOption={ this.typeOption }
						onTypeChange={ this.handleTypeChange }
					/>
				);
			case constants.MONTHLY:
				return (
					<Monthly
						{ ...this.props }
						typeOption={ this.typeOption }
						onTypeChange={ this.handleTypeChange }
					/>
				);
			case constants.YEARLY:
				return (
					<Yearly
						{ ...this.props }
						typeOption={ this.typeOption }
						onTypeChange={ this.handleTypeChange }
					/>
				);
			default:
				return (
					<Singular
						{ ...this.props }
						typeOption={ this.typeOption }
						onTypeChange={ this.handleTypeChange }
					/>
				);
		}
	}

	render() {
		return (
			<Fieldset>
				<RemoveField onClick={ this.handleRemove } />
				{ this.renderFieldType() }
			</Fieldset>
		);
	}
}
