/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { constants } from '@moderntribe/events-pro/data/blocks/recurring';
import { Fieldset } from '@moderntribe/events-pro/elements';
import RemoveField from '@moderntribe/events-pro/elements/remove-field/element';
import Singular from './singular';
import Daily from './daily';
import Weekly from './weekly';
import Monthly from './monthly';
import Yearly from './yearly';

const {
	DAILY,
	WEEKLY,
	MONTHLY,
	YEARLY,
	RECURRENCE_TYPES,
} = constants;

export default class ExceptionField extends PureComponent {
	static propTypes = {
		index: PropTypes.number.isRequired,
		onRemoveClick: PropTypes.func.isRequired,
		type: PropTypes.oneOf( RECURRENCE_TYPES ).isRequired,
	}

	handleRemove = () => this.props.onRemoveClick( this.props.index )

	renderFieldType = () => {
		const { index, type } = this.props;
		switch ( type ) {
			case DAILY:
				return <Daily index={ index } />;
			case WEEKLY:
				return <Weekly index={ index } />;
			case MONTHLY:
				return <Monthly index={ index } />;
			case YEARLY:
				return <Yearly index={ index } />;
			default:
				return <Singular index={ index } />;
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
