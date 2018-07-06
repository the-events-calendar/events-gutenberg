/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isUndefined } from 'lodash';

/**
 * Internal dependencies
 */
import { actions, selectors } from 'data/details';

export default ( key ) => ( WrappedComponent ) => {
	class WithDetails extends Component {

		static propTypes = {
			setPostType: PropTypes.func,
			fetchDetails: PropTypes.func,
			postType: PropTypes.string,
			loading: PropTypes.bool,
			details: PropTypes.object,
		};

		constructor( props ) {
			super( props );
		}

		componentDidMount() {
			this.fetch();
		}

		componentDidUpdate() {
			this.fetch();
		}

		fetch() {
			if ( isUndefined( this.id ) ) {
				return;
			}
			const { setPostType, postType, fetchDetails } = this.props;
			setPostType( this.id, postType );
			fetchDetails( this.id );
		}

		get id() {
			return this.props[ key ];
		}

		render() {
			return <WrappedComponent { ...this.props } { ...this.aditionalProps() } />;
		}

		aditionalProps() {
			const { loading, details } = this.props;
			return {
				loading,
				details,
			};
		}
	}

	const mapStateToProps = ( state, props ) => {
		const name = props[ key ];
		return {
			loading: selectors.getLoading( state, { name } ),
			details: selectors.getDetails( state, { name } ),
		};
	};

	const mapDispatchToProps = ( dispatch ) => bindActionCreators( actions, dispatch );

	return compose( connect( mapStateToProps, mapDispatchToProps ) )( WithDetails );
};
