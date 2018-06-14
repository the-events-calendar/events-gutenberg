/**
 * External dependencies
 */
import React from 'react';
import { noop, isFunction } from 'lodash';

/**
 * Wordpress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/element';

/**
 * Higher order component to Attach new properties into a component.
 *
 * Example of usage:
 *
 * compose(
 *  withProperties( ( props ) => {
 *     return {
 *       newProperty: value
 *       anotherProperty: value
 *     };
 *  });
 * );
 *
 * @param {function} extendedProperties A function that returns the new properties to be attached
 * @returns {function} Function to compose with other component
 */
export default ( extendedProperties = noop ) => createHigherOrderComponent( ( WrappedComponent ) => {
	return ( props ) => {
		const newProps = isFunction( extendedProperties ) ? extendedProperties( props ) : {};
		return <WrappedComponent { ...props } { ...newProps } />;
	};
}, 'withProperties' );
