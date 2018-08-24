/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import AddField from '@moderntribe/events-pro/elements/add-field/element';
import RecurringForm from '@moderntribe/events-pro/elements/recurring-form/element';
import ExceptionForm from '@moderntribe/events-pro/elements/exception-form/element';
import RecurringAddField from '@moderntribe/events-pro/elements/recurring-add-field/element';
import ExceptionAddField from '@moderntribe/events-pro/elements/exception-add-field/element';

export default class EventRecurring extends PureComponent {
	static propTypes = {
		isRepeatBlockVisible: PropTypes.bool.isRequired,
		toggleRepeatBlocksVisibility: PropTypes.func.isRequired,
	}

	renderRepeatAddField() {
		return (
			<AddField onClick={ this.props.toggleRepeatBlocksVisibility }>
				{ __( 'Repeat This Event', 'events-gutenberg' ) }
			</AddField>
		);
	}

	renderRepeatBlock() {
		return (
			<section>
				<RecurringForm />
				<ExceptionForm />

				<footer>
					<RecurringAddField />
					<ExceptionAddField />
				</footer>
			</section>
		);
	}

	render() {
		return (
			this.props.isRepeatBlockVisible
				? this.renderRepeatBlock()
				: this.renderRepeatAddField()
		);
	}
}
