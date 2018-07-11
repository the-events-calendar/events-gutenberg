/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { actions, selectors } from 'data/forms';

export default ( args ) => ( WrappedComponent ) => {
	class WithForm extends Component {
		static propTypes = {
			registerForm: PropTypes.func,
			postType: PropTypes.string,
		};

		constructor( props ) {
			super( props );
		}

		componentDidMount() {
			const name = args( this.props );
			const { registerForm, postType } = this.props;
			registerForm( name, postType );
		}

		render() {
			return <WrappedComponent { ...this.props } { ...this.aditionalProps() } />;
		}

		aditionalProps() {
			const {
				createDraft,
				sendForm,
				setSubmit,
				editEntry,
				maybeRemoveEntry,
			} = this.props;
			const name = args( this.props );
			return {
				createDraft( fieldsObject ) {
					createDraft( name, fieldsObject );
				},
				editEntry( fieldsObject ) {
					editEntry( name, fieldsObject );
				},
				sendForm( fieldsObject, callback ) {
					sendForm( name, fieldsObject, callback );
				},
				setSubmit() {
					setSubmit( name );
				},
				maybeRemoveEntry( details ) {
					maybeRemoveEntry( name, details );
				},
			};
		}
	}

	const mapStateToProps = ( state, props ) => {
		const name = args( props );
		const modifiedProps = { name };
		return {
			edit: selectors.getFormEdit( state, modifiedProps ),
			create: selectors.getFormCreate( state, modifiedProps ),
			fields: selectors.getFormFields( state, modifiedProps ),
			submit: selectors.getFormSubmit( state, modifiedProps ),
		};
	};

	const mapDispatchToProps = ( dispatch ) => bindActionCreators( actions, dispatch );

	return connect( mapStateToProps, mapDispatchToProps )( WithForm );
};
