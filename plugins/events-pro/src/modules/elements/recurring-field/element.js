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
import Singular from '@moderntribe/events-pro/src/modules/elements/recurring-field/singular';

export default class RecurringField extends PureComponent {
	static propTypes = {}

	renderFieldType = () => {
		switch ( this.props.field ) {
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
				{ this.renderFieldType() }
			</Fieldset>
		);
	}
}
