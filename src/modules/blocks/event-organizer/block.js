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
import { withSaveData, withDetails } from 'editor/hoc';
import OrganizerIcon from 'icons/organizer.svg';
import { actions, selectors as organizerSelectors, selectors } from 'data/blocks/organizers';
import { actions as detailsActions } from 'data/details';

class Organizer extends Component {
	static propTypes = {
		details: PropTypes.object,
		draft: PropTypes.object,
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
		setDraftTitle: PropTypes.func,
		setDraftPost: PropTypes.func,
	};

	constructor( props ) {
		super( ...arguments );
	}

	componentDidUpdate( prevProps ) {
		const {
			isSelected,
			edit,
			create,
			sendForm,
		} = this.props;
		const unSelected = prevProps.isSelected && ! isSelected;
		if ( unSelected && ( edit || create ) ) {
			sendForm();
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
		const { draft, submit } = this.props;

		if ( submit ) {
			return this.renderLoading();
		}

		return (
			<OrganizerForm
				{ ...draft }
				submit={ this.submit }
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

	submit = ( fields ) => {
		const { id, create, edit, createDraft, editPost } = this.props;
		if ( create ) {
			createDraft( id, fields );
		} else if ( edit ) {
			editPost( id, fields );
		}
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
		const { id, organizer, removeOrganizerInBlock } = this.props;;
		removeOrganizerInBlock( id, organizer );
	};

	edit = () => {
		const { id, details, setDraftPost } = this.props;
		setDraftPost( id, details );
	};

	selectItem = ( organizerID, details ) => {
		const {
			id,
			addOrganizerInBlock,
			addOrganizerInClassic,
			setDetails
		} = this.props;

		setDetails( organizerID, details );
		addOrganizerInClassic( organizerID );
		addOrganizerInBlock( id, organizerID );
	};

	setDraftTitle = ( title ) => {
		const { id, setDraftTitle } = this.props;
		this.clear();
		setDraftTitle( id, title );
	};

	clear = () => {
		const { id, clear } = this.props;
		clear( id );
	};
}

const mapStateToProps = ( state, props ) => {
	return {
		organizer: selectors.getOrganizerInBlock( state, props ),
		organizers: selectors.getOrganizersInClassic( state ),
	}
} ;

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
)( Organizer );
