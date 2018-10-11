/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { constants } from '@moderntribe/events-pro/data/blocks/recurring';
import { Fieldset } from '@moderntribe/events-pro/src/modules/elements';
import RemoveField from '@moderntribe/events-pro/src/modules/elements/remove-field/element';
import Singular from '@moderntribe/events-pro/src/modules/elements/recurring-field/singular';

export default class RecurringField extends PureComponent {
	static propTypes = {
		onRemoveClick: PropTypes.func.isRequired,
		id: PropTypes.string.isRequired,
		fieldType: PropTypes.string.isRequired,
	}

	handleClick = () => this.props.onRemoveClick( this.props.id )

	renderFieldType = () => {
		switch ( this.props.fieldType ) {
			case constants.MONTHLY:
			case constants.DAILY:
			case constants.WEEKLY:
			case constants.YEARLY:
			default:
				return <Singular { ...this.props } />;
		}
	}

	render() {
		return (
			<Fieldset>
				<RemoveField onClick={ this.handleClick } />
				{ this.renderFieldType() }
			</Fieldset>
		);
	}
}
