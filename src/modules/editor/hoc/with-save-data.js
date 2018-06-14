/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
	noop,
	isEmpty,
	isArray,
	isObject,
	keys,
} from 'lodash';

/**
 * Wordpress dependencies
 */
import {
	Component,
	createHigherOrderComponent,
} from '@wordpress/element';

/**
 * Higher order component that updates the attributes of a component if any of the properties of the
 * attributes changes.
 *
 * Only updates the attributes that has changed with the new updates into the properties and only
 * the ones specified as attributes params otherwise will fallback to the property attributes of the
 * component to extract the keys of those to do the comparision.
 *
 * @param {object} attributes Set of attributes to only update fallback to this.props.attributes
 * @returns {function} Return a new HOC
 */
export default ( attributes = null ) => createHigherOrderComponent( ( WrappedComponent ) => {
	return class WithSaveData extends Component {
			static defaultProps = {
				setAttributes: noop,
				setInitialState: noop,
				attributes: {},
			};

			static propTypes = {
				setAttributes: PropTypes.func,
				setInitialState: PropTypes.func,
				attributes: PropTypes.object,
			};

			keys = [];

			constructor() {
				super( ...arguments );
				this.keys = this.generateKeys();
			}

			generateKeys() {
				const attr = attributes || this.props.attributes;

				if ( isArray( attr ) ) {
					return attr;
				}

				if ( isObject( attr ) ) {
					return keys( attr );
				}

				console.warn( 'Make sure attributes is from a valid type: Array or Object' );

				return [];
			}

			// At this point attributes has been set so no need to be set the initial state into the store here.
			componentDidMount() {
				const { setInitialState } = this.props;
				setInitialState();
			}

			componentDidUpdate( prevProps ) {
				if ( isEmpty( this.keys ) ) {
					return;
				}

				const result = this.diff( prevProps );
				if ( isEmpty( result ) ) {
					return;
				}

				const { setAttributes } = this.props;
				setAttributes( result );
			}

			// Diff with the properties that has changed only
			diff( prevProps ) {
				if ( ! isArray( this.keys ) ) {
					console.warn( 'Make sure your keys are an array' );
					return {};
				}

				const diff = {};
				this.keys.forEach( ( key ) => {
					if ( prevProps[ key ] !== this.props[ key ] ) {
						diff[ key ] = this.props[ key ];
					}
				} );
				return diff;
			}

			render() {
				return <WrappedComponent { ...this.props } />;
			}
	};
}, 'withSaveData' );

