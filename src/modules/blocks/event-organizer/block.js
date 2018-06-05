/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { noop, isEmpty, pick } from 'lodash';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import {
	Spinner,
	PanelBody,
	Dashicon,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';
import { select, dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependendencies
 */
import { store, STORE_NAME } from 'data/organizers/block';
import { STORE_NAME as EVENT_DETAILS_STORE } from 'data/details';
import {
	SearchOrCreate,
} from 'elements';
import OrganizerDetails from './details';
import OrganizerForm from './details/form';

export default class EventOrganizer extends Component {
	static defaultProps = {
		selected: false,
		id: '',
		setAttributes: noop,
		organizer: 0,
		current: '',
	};

	static propTypes = {
		selected: PropTypes.bool,
		id: PropTypes.string,
		setAttributes: PropTypes.func,
		organizer: PropTypes.number,
		current: PropTypes.string,
	};

	static getDerivedStateFromProps( nextProps, prevState ) {

		const { selected } = nextProps;
		const { create, edit } = prevState;
		if ( ! selected && ( create || edit ) ) {
			return { submit: true };
		}

		return null;
	}

	constructor( props ) {
		super( ...arguments );
		this.state = {
			...props,
			loading: !! props.organizer,
			edit: false,
			create: false,
			post: {},
			draft: {},
			submit: false,
		};
		this.unsubscribe = noop;
	}

	componentDidMount() {
		this.unsubscribe = store.subscribe( this.storeListener );

		const { id, organizer } = this.props;

		store.dispatch( {
			type: 'ADD_BLOCK',
			id,
			organizer,
		} );

		select( STORE_NAME ).getDetails( id, organizer );
	}

	storeListener = () => {
		const { id, setAttributes } = this.props;
		const organizers = JSON.stringify( select( STORE_NAME ).getOrganizers() );
		setAttributes( { organizers } );

		const block = select( STORE_NAME ).getBlock( id );
		const VALID_STATE = [ 'edit', 'create', 'post', 'draft', 'submit' ];
		let state = pick( block, VALID_STATE );
		if ( this.state.loading && this.props.organizer && ! isEmpty( state.post ) ) {
			state = {
				...state,
				loading: false,
			};
		}

		this.setState( state );
	};

	componentWillUnmount() {
		this.unsubscribe();

		store.dispatch( {
			type: 'REMOVE_BLOCK',
			id: this.props.id,
		} );
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
		const { post, edit, create, loading } = this.state;

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
		const { draft, submit } = this.state;

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
			<div className="tribe-editor__loader">
				<Spinner />
			</div>
		);
	}

	submit = ( fields ) => {
		const { create, edit } = this.state;
		if ( create ) {
			store.dispatch( {
				type: 'CREATE_DRAFT',
				id: this.props.id,
				payload: fields,
			} );
		} else if ( edit ) {
			store.dispatch( {
				type: 'EDIT_POST',
				id: this.props.id,
				payload: fields,
			} );
		}
	};

	renderSearch() {
		const { id, selected } = this.props;

		return (
			<SearchOrCreate
				id={ id }
				store={ store }
				storeName={ STORE_NAME }
				selected={ selected }
				icon={ <Dashicon icon="admin-users" size={ 22 } /> }
				placeholder={ __( 'Add or find an organizer', 'events-gutenberg' ) }
				onSelection={ this.selectItem }
				onSetCreation={ this.setDraftTitle }
			/>
		);
	}

	renderDetails() {
		const { post } = this.state;
		return (
			<OrganizerDetails
				organizer={ post }
				selected={ this.props.selected }
				edit={ this.edit }
				remove={ this.clear }
			/>
		);
	}

	edit = () => {
		const { post } = this.state;
		store.dispatch( {
			type: 'SET_DRAFT_POST',
			id: this.props.id,
			payload: post,
		} );
	};

	selectItem = ( item ) => {
		dispatch( EVENT_DETAILS_STORE ).addOrganizer( {
			...item,
			block: 'individual',
		} );
		store.dispatch( {
			type: 'SET_POST',
			id: this.props.id,
			payload: item,
		} );
	};

	setDraftTitle = ( title ) => {
		this.clear();
		store.dispatch( {
			type: 'SET_DRAFT_TITLE',
			id: this.props.id,
			title,
		} );
	};

	renderSettings() {
		const { selected } = this.props;

		if ( ! selected ) {
			return null;
		}

		const { post } = this.state;
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
		const { post } = this.state;

		if ( post && post.id ) {
			dispatch( EVENT_DETAILS_STORE ).maybeRemoveOrganizer( post );
		}

		store.dispatch( {
			type: 'CLEAR',
			id: this.props.id,
		} );
	};
}
