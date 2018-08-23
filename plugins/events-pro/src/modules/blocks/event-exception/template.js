/**
 * External dependencies
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import ExceptionForm from '@moderntribe/events-pro/elements/exception-form/element';

export default class EventException extends PureComponent {
	static propTypes = {}

	constructor( props ) {
		super( props );
	}
	render() {
		return (
			<ExceptionForm />
		);
	}
}
