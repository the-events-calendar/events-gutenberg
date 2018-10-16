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
import Singular from './singular';
import Daily from './daily';
import Weekly from './weekly';
import Monthly from './monthly';
import Yearly from './yearly';

export default class RecurringField extends PureComponent {
	static propTypes = {
		onRemoveClick: PropTypes.func.isRequired,
		id: PropTypes.string.isRequired,
		index: PropTypes.number.isRequired,
		type: PropTypes.string.isRequired,
	}

	handleClick = () => this.props.onRemoveClick( this.props.index )

	renderFieldType = () => {
		switch ( this.props.type ) {
			case constants.DAILY:
				return <Daily { ...this.props } />;
			case constants.WEEKLY:
				return <Weekly { ...this.props } />;
			case constants.MONTHLY:
				return <Monthly { ...this.props } />;
			case constants.YEARLY:
				return <Yearly { ...this.props } />;
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
