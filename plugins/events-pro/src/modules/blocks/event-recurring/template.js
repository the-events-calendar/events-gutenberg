/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import RecurringForm from '@moderntribe/events-pro/elements/recurring-form/element';

export default class EventRecurring extends PureComponent {
	static propTypes = {}

	constructor( props ) {
		super( props );
	}
	render() {
		return (
			<RecurringForm />
		);
	}
}
