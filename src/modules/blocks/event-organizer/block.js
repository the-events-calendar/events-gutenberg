/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component, compose } from '@wordpress/element';
import {
	Spinner,
	PanelBody,
	Dashicon,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';
import { withSelect, withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependendencies
 */
import { STORE_NAME } from 'data/organizers';
import { STORE_NAME as EVENT_DETAILS_STORE } from 'data/details';
import {
	SearchOrCreate,
} from 'elements';
import OrganizerDetails from './details';
import OrganizerForm from './details/form';
import withSaveData from 'editor/hoc/with-save-data';

class Organizer extends Component {

	static propTypes = {
		post: PropTypes.object,
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
			sendForm
		} = this.props;
		const unSelected = prevProps.isSelected && ! isSelected;
		if ( unSelected && ( edit || create ) ) {
			sendForm();
		}
	}

	componentWillUnmount() {
		const { remove } = this.props;
		remove();
	}

	render() {
		return [ this.renderBlock(), this.renderSettings() ];
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
		const { post, edit, create, loading } = this.props;

		if ( loading ) {
			return this.renderLoading();
		}

		if ( edit || create ) {
			return this.renderForm();
		}

		if ( isEmpty( post ) ) {
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
		const { id, isSelected, organizers } = this.props;

		return (
			<SearchOrCreate
				id={ id }
				storeName={ STORE_NAME }
				selected={ isSelected }
				icon={ <Dashicon icon="admin-users" size={ 22 } /> }
				placeholder={ __( 'Add or find an organizer', 'events-gutenberg' ) }
				onSelection={ this.selectItem }
				onSetCreation={ this.setDraftTitle }
				exclude={ organizers }
			/>
		);
	}

	renderDetails() {
		const { post, remove } = this.props;
		return (
			<OrganizerDetails
				organizer={ post }
				selected={ this.props.isSelected }
				edit={ this.edit }
				remove={ remove }
			/>
		);
	}

	edit = () => {
		const { id, post, setDraftPost } = this.props;
		setDraftPost( id, post );
	};

	selectItem = ( item ) => {
		const { id, setPost } = this.props;
		setPost( id, item );
	};

	setDraftTitle = ( title ) => {
		const { id, setDraftTitle } = this.props;
		this.clear();
		setDraftTitle( id, title );
	};

	renderSettings() {
		const { isSelected } = this.props;

		if ( ! isSelected ) {
			return null;
		}

		const { post } = this.props;
		const buttonProps = {
			onClick: this.clear,
		};

		if ( isEmpty( post ) ) {
			buttonProps.disabled = true;
		}

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Organizer Settings', 'events-gutenberg' ) }>
					<button { ...buttonProps }>
						{ __( 'Remove Organizer', 'events-gutenberg' ) }
					</button>
				</PanelBody>
			</InspectorControls>
		);
	}

	clear = () => {
		const { id, clear } = this.props;

		clear( id );
	};
}

export default compose( [
	withSelect( ( select, props ) => {
		const {
			getByID,
			getDetails,
		} = select( STORE_NAME );
		const organizer = getByID( props.id, 'organizer' );

		const { get } = select( EVENT_DETAILS_STORE );
		return {
			post: getDetails( props.id, organizer ),
			draft: getByID( props.id, 'draft' ),
			create: getByID( props.id, 'create' ),
			edit: getByID( props.id, 'edit' ),
			submit: getByID( props.id, 'submit' ),
			loading: getByID( props.id, 'loading' ),
			organizer,
			organizers: get( 'organizers' ),
		};
	} ),
	withDispatch( ( dispatch, props ) => {
		const {
			setPost,
			clear,
			createDraft,
			editPost,
			setDraftTitle,
			setDraftPost,
			submit,
			setOrganizer,
			removeDraft,
		} = dispatch( STORE_NAME );

		const {
			addOrganizer,
			removeOrganizer,
		} = dispatch( EVENT_DETAILS_STORE );

		return {
			setPost( id, item ) {
				setPost( id, item );
				addOrganizer( item.id );
			},
			clear,
			createDraft,
			editPost,
			setDraftTitle,
			setDraftPost,
			remove() {
				const { post } = props;
				const { volatile } = post;

				removeOrganizer( post.id );
				if ( volatile ) {
					removeDraft( props.id );
				} else {
					clear( props.id );
				}
			},
			sendForm() {
				submit( props.id );
			},
			setInitialState() {
				const { id, attributes } = props;
				const { organizer } = attributes;
				if ( organizer ) {
					setOrganizer( id, organizer );
					addOrganizer( organizer );
				}
			},
		};
	} ),
	withSaveData(),
] )( Organizer );
