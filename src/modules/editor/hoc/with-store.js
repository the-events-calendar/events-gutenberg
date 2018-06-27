/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { getStore } from 'data';

export default ( Component ) => ( props ) => (
	<Component { ...props } store={ getStore() } />
);
