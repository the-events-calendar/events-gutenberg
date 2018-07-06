/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import {
	Spinner,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependendencies
 */
import {
	SearchOrCreate,
} from 'elements';
import OrganizerDetails from './details';
import OrganizerForm from './details/form';
import { withSaveData, withDetails, withForm } from 'editor/hoc';
import OrganizerIcon from 'icons/organizer.svg';
import { actions, selectors } from 'data/blocks/organizers';
import { actions as detailsActions } from 'data/details';
import { toFields, toOrganizer } from 'elements/organizer-form/utils';

class Organizer extends Component {
	static propTypes = {
		details: PropTypes.object,
		create: PropTypes.bool,
		edit: PropTypes.bool,
		submit: PropTypes.bool,
		loading: PropTypes.bool,
		isSelected: PropTypes.bool,
		organizer: PropTypes.number,
		id: PropTypes.string,
		current: PropTypes.string,
		setPost: PropTypes.func,
		clear: PropTypes.func,
		createDraft: PropTypes.func,
		editPost: PropTypes.func,
	};

	constructor( props ) {
		super( ...arguments );
	}

	componentDidUpdate( prevProps ) {
		const {
			isSelected,
			edit,
			create,
			setSubmit,
		} = this.props;
		const unSelected = prevProps.isSelected && ! isSelected;
		if ( unSelected && ( edit || create ) ) {
			setSubmit();
		}
	}

	render() {
		return this.renderBlock();
	}

	renderBlock() {
		const { id } = this.props;
		return (
			<section key={ id }>
				{ this.renderContent() }
			</section>
		);
	}

	renderContent() {
		const { details, edit, create, loading } = this.props;

		if ( loading ) {
			return this.renderLoading();
		}

		if ( edit || create ) {
			return this.renderForm();
		}

		if ( isEmpty( details ) ) {
			return this.renderSearch();
		}

		return this.renderDetails();
	}

	renderForm() {
		const { fields, submit } = this.props;

		if ( submit ) {
			return this.renderLoading();
		}

		return (
			<OrganizerForm
				{ ...toFields( fields ) }
				submit={ this.onSubmit }
			/>
		);
	}

	renderLoading() {
		return (
			<div className="tribe-editor__spinner-container">
				<Spinner />
			</div>
		);
	}

	onSubmit = ( fields ) => {
		const {
			sendForm,
			setDetails,
			addOrganizerInClassic,
			addOrganizerInBlock,
			id,
		} = this.props;
		sendForm(
			toOrganizer( fields ),
			( body ) => {
				setDetails( body.id, body );
				addOrganizerInClassic( body.id );
				addOrganizerInBlock( id, body.id );
			},
		);
	};

	renderSearch() {
		const { id, isSelected, organizers, store, postType } = this.props;

		return (
			<SearchOrCreate
				name={ id }
				store={ store }
				postType={ postType }
				selected={ isSelected }
				icon={ <OrganizerIcon /> }
				placeholder={ __( 'Add or find an organizer', 'events-gutenberg' ) }
				onSelection={ this.selectItem }
				onSetCreation={ this.setDraftTitle }
				exclude={ organizers }
			/>
		);
	}

	renderDetails() {
		const { details } = this.props;
		return (
			<OrganizerDetails
				organizer={ details }
				selected={ this.props.isSelected }
				edit={ this.edit }
				remove={ this.remove }
			/>
		);
	}

	remove = () => {
		const { id, organizer, removeOrganizerInBlock } = this.props;
		removeOrganizerInBlock( id, organizer );
	};

	edit = () => {
		const { details, editEntry } = this.props;
		editEntry( details );
	};

	selectItem = ( organizerID, details ) => {
		const {
			id,
			addOrganizerInBlock,
			addOrganizerInClassic,
			setDetails,
		} = this.props;

		setDetails( organizerID, details );
		addOrganizerInClassic( organizerID );
		addOrganizerInBlock( id, organizerID );
	};

	setDraftTitle = ( title ) => {
		const { createDraft } = this.props;
		createDraft( {
			title: {
				rendered: title,
			},
		} );
	};
}

const mapStateToProps = ( state, props ) => {
	return {
		organizer: selectors.getOrganizerInBlock( state, props ),
		organizers: selectors.getOrganizersInClassic( state ),
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		...bindActionCreators( actions, dispatch ),
		...bindActionCreators( detailsActions, dispatch ),
		setInitialState( { id, get } ) {
			const organizer = get( 'organizer', undefined );
			dispatch( actions.addOrganizerInBlock( id, organizer ) );
			dispatch( actions.addOrganizerInClassic( organizer ) );
		},
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
	withDetails( 'organizer' ),
	withSaveData(),
	withForm( ( props ) => props.id ),
)( Organizer );
