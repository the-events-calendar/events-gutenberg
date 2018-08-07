/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isUndefined, isEqual } from 'lodash';

/**
 * Internal dependencies
 */
import { actions, thunks, selectors } from 'data/details';

export default ( key = 'id' ) => ( WrappedComponent ) => {
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
			this.details = {
				id: null,
				type: '',
			};
		}

		componentDidMount() {
			this.fetch();
		}

		componentDidUpdate() {
			this.fetch();
		}

		fetch() {
			if ( isUndefined( this.id ) || ! this.id ) {
				return;
			}

			const { setPostType, postType, fetchDetails } = this.props;
			const tmp = {
				id: this.id,
				type: postType,
			};

			if ( isEqual( this.details, tmp ) ) {
				return;
			}

			setPostType( this.id, postType );
			fetchDetails( this.id );
			this.details = tmp;
		}

		get id() {
			return this.props[ key ];
		}

		render() {
			return <WrappedComponent { ...this.props } />;
		}
	}

	const mapStateToProps = ( state, props ) => {
		const name = props[ key ];
		return {
			loading: selectors.getLoading( state, { name } ),
			details: selectors.getDetails( state, { name } ),
			volatile: selectors.getVolatile( state, { name } ),
		};
	};

	const mapDispatchToProps = ( dispatch ) => ( {
		...bindActionCreators( actions, dispatch ),
		...bindActionCreators( thunks, dispatch ),
	} );

	return connect( mapStateToProps, mapDispatchToProps )( WithDetails );
};
