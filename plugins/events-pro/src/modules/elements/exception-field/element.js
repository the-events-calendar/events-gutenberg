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
import './style.pcss';

export default class ExceptionField extends PureComponent {
	static propTypes = {
		onRemoveClick: PropTypes.func.isRequired,
		id: PropTypes.string.isRequired,
		fieldType: PropTypes.string.isRequired,
	}

	handleRemove = () => this.props.onRemoveClick( this.props.id )

	renderFieldType = () => {
		switch ( this.props.fieldType ) {
			case constants.DAILY:
			case constants.WEEKLY:
			case constants.MONTHLY:
			case constants.YEARLY:
			default:
				return <Singular { ...this.props } />;
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
