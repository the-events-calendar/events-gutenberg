/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	noop,
} from 'lodash';

/**
 * Higher order component that updates the attributes of a component if any of the properties of the
 * attributes changes.
 *
 * Only updates the attributes that has changed with the new updates into the properties and only
 * the ones specified as attributes params otherwise will fallback to the property attributes of the
 * component to extract the keys of those to do the comparision.
 *
 * @param {object} selectedAttributes Set of attributes to only update fallback to this.props.attributes
 * @returns {function} Return a new HOC
 */
export default () => ( WrappedComponent ) => {
	class WithSelected extends Component {
		static defaultProps = {
			isSelected: false,
			onBlockFocus: noop,
			onBlockBlur: noop,
		};

		static propTypes = {
			onBlockFocus: PropTypes.func,
			onBlockBlur: PropTypes.func,
			isSelected: PropTypes.bool,
		};

		componentDidMount() {
			const { isSelected, onBlockFocus, onBlockBlur } = this.props;
			if ( isSelected ) {
				onBlockFocus();
			} else {
				onBlockBlur();
			}
		}

		componentDidUpdate( prevProps ) {
			const { isSelected, onBlockFocus, onBlockBlur } = this.props;

			if ( prevProps.isSelected === isSelected ) {
				return;
			}

			if ( isSelected ) {
				onBlockFocus();
			} else {
				onBlockBlur();
			}
		}

		render() {
			return <WrappedComponent { ...this.props } />;
		}
	}

	WithSelected.displayName = `WithIsSelected( ${ WrappedComponent.displayName || WrappedComponent.name || 'Component ' }`;

	return WithSelected;
};

