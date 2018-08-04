/**
 * External dependencies
 */
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import { getStore } from '@@plugins/events/data';

export default ( additionalProps = {} ) => ( WrappedComponent ) => {
	class WithStore extends Component {
		constructor( props ) {
			super( props );
		}

		render() {
			const extraProps = {
				...additionalProps,
				store: getStore(),
			};
			return <WrappedComponent { ...this.props } { ...extraProps } />;
		}
	}
	return WithStore;
};
