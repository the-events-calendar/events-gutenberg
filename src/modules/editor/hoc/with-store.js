/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { getStore } from 'data';

export default ( Component, additionalProps = {} ) => ( props ) => (
	<Component { ...props } { ...additionalProps } store={ getStore() } />
);
