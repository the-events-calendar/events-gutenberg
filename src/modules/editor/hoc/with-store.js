/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { getStore } from 'data';

export default ( additionalProps = {} ) => ( WrappedComponent ) => {

	const WithStore = ( props ) => {
		const extraProps = {
			...additionalProps,
			store: getStore(),
		};

		return <WrappedComponent { ...props } { ...extraProps } />;
	};

	return WithStore;

};
