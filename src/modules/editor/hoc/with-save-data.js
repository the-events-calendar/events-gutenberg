/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	noop,
	isEmpty,
	isArray,
	isObject,
	keys,
} from 'lodash';
import isShallowEqual from '@wordpress/is-shallow-equal';

/**
 * Wordpress dependencies
 */
import { select } from '@wordpress/data';

/**
 * Higher order component that updates the attributes of a component if any of the properties of the
 * attributes changes.
 *
 * Only updates the attributes that has changed with the new updates into the properties and only
 * the ones specified as attributes params otherwise will fallback to the property attributes of the
 * component to extract the keys of those to do the comparision.
 *
 * @param {object} selectedAtrributes Set of attributes to only update fallback to this.props.attributes
 * @returns {function} Return a new HOC
 */
export default ( selectedAtrributes = null ) => ( WrappedComponent ) => {
	class WithSaveData extends Component {
			static defaultProps = {
				attributes: {},
				setInitialState: noop,
				setAttributes: noop,
				name: '',
				isolated: false,
			};

			static propTypes = {
				setAttributes: PropTypes.func,
				setInitialState: PropTypes.func,
				attributes: PropTypes.object,
				name: PropTypes.string,
				isolated: PropTypes.bool,
			};

			keys = [];
			saving = null;

			constructor( props ) {
				super( props );
				this.keys = this.generateKeys();
			}

			generateKeys() {
				if ( isArray( this.attrs ) ) {
					return this.attrs;
				}

				if ( isObject( this.attrs ) ) {
					return keys( this.attrs );
				}

				console.warn( 'Make sure attributes is from a valid type: Array or Object' );

				return [];
			}

			// At this point attributes has been set so no need to be set the initial state into the store here.
			componentDidMount() {
				const { setInitialState, attributes = {}, isolated } = this.props;
				const count = this.countSameBlocks();

				// Prevent to set the initial state for blocks that are copies from others
				// overwrite this with isolated: true as property of the block
				if ( count > 1 && ! isolated ) {
					return;
				}

				setInitialState( {
					...this.props,
					get( key, defaultValue ) {
						return key in attributes ? attributes[ key ] : defaultValue;
					},
				} );
			}

			countSameBlocks( ) {
				const { name = '' } = this.props;
				return select( 'core/editor' ).getBlocks()
					.filter( ( block ) => block.name === name )
					.length;
			}

			componentDidUpdate() {
				const diff = this.calculateDiff();
				if ( isShallowEqual( this.saving, diff ) ) {
					return;
				}

				this.saving = diff;
				if ( isEmpty( diff ) ) {
					return;
				}
				this.props.setAttributes( diff );
			}

			calculateDiff() {
				const attributes = this.attrs;
				return this.keys.reduce( ( diff, key ) => {
					if ( key in this.props && attributes[ key ] !== this.props[ key ] ) {
						diff[ key ] = this.props[ key ];
					}
					return diff;
				}, {} );
			}

			get attrs() {
				return selectedAtrributes || this.props.attributes || {};
			}

			render() {
				return <WrappedComponent { ...this.props } />;
			}
	}

	WithSaveData.displayName = `WithSaveData( ${ WrappedComponent.displayName || WrappedComponent.name || 'Component ' }`;

	return WithSaveData;
};

