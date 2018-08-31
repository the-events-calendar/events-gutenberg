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
import Singular from '@moderntribe/events-pro/src/modules/elements/exception-field/singular';

export default class RecurringField extends PureComponent {
	static propTypes = {
		removeField: PropTypes.func.isRequired,
		id: PropTypes.string.isRequired,
	}

	handleClick = () => this.props.removeField( this.props.id )

	renderFieldType = () => {
		// TODO: Incorporate fieldType
		switch ( this.props.fieldType ) {
			case constants.DAILY:
			case constants.WEEKLY:
			case constants.MONTHLY:
			case constants.YEARLY:
			default:
				return <Singular />;
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
