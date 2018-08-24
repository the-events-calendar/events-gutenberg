/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import RecurringForm from '@moderntribe/events-pro/elements/recurring-form/element';
import ExceptionForm from '@moderntribe/events-pro/elements/exception-form/element';
import RecurringAddField from '@moderntribe/events-pro/elements/recurring-add-field/element';
import ExceptionAddField from '@moderntribe/events-pro/elements/exception-add-field/element';

export default class EventRecurring extends PureComponent {
	static propTypes = {}

	constructor( props ) {
		super( props );

		console.warn( props );
	}

	render() {
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
}
