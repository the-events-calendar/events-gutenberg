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
	QueryControls,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';
import { select, subscribe } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependendencies
 */
import { store, STORE_NAME } from 'data/organizers/block';
import {
	SearchOrCreate,
} from 'elements';
import OrganizerDetails from './details';
import OrganizerForm from './details/form';
import './style.pcss';

export default class EventOrganizer extends Component {
	static defaultProps = {
		selected: false,
		id: '',
		setAttributes: noop,
		organizer: 0,
	};

	static propTypes = {
		selected: PropTypes.bool,
		id: PropTypes.string,
		setAttributes: PropTypes.func,
		organizer: PropTypes.number,
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
		store.dispatch( {
			type: 'ADD_BLOCK',
			id: this.props.id,
		} );

		store.dispatch( {
			type: 'ADD_BLOCK_ID',
			id: this.props.id,
		} );
	}

	storeListener = () => {
		const { id } = this.props;
		const block = select( STORE_NAME ).getBlock( id );
		const VALID_STATE = [ 'edit', 'create', 'post', 'draft', 'submit' ];
		const state = pick( block, VALID_STATE );

		console.log( store.getState() );
		const organizers = select( STORE_NAME ).getOrganizers();
		const { setAttributes } = this.props;
		setAttributes({ organizers: JSON.stringify( organizers ) });
		this.setState( state );

		const ROOT_ID = select( 'core/editor' ).getBlockRootUID( this.props.id );
		console.log( 'ROOT: ' + ROOT_ID);
			// You could use this opportunity to test whether the derived result of a
			// selector has subsequently changed as the result of a state update.
		console.log( select( 'core/editor').getBlockOrder( this.props.id ) );
		console.log( select( 'core/editor').getBlockOrder( ) );
	};

	componentWillUnmount() {
		this.unsubscribe();

		store.dispatch( {
			type: 'REMOVE_BLOCK',
			id: this.props.id,
		} );

		store.dispatch( {
			type: 'REMOVE_BLOCK_ID',
			id: this.props.id,
		} );

		// TODO: remove block manually from attributes.
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
		const { post, edit, create } = this.state;

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
			return (
				<div className="tribe-event-organizer__loader-container">
					<Spinner />
				</div>
			);
		}

		return (
			<OrganizerForm
				{ ...draft }
				submit={ this.submit }
			/>
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
		store.dispatch( {
			type: 'ADD_ORGANIZER',
			block: this.props.id,
			organizer: item.id,
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
					<QueryControls
						onOrderChange={ ( value ) => console.log( value )  }
						onOrderByChange={ ( value ) => console.log( value )  }
						onCategoryChange={ ( value ) => console.log( value )  }
						onNumberOfItemsChange={ ( value ) => console.log( value ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	clear = () => {
		const { post } = this.state;
		if ( post && post.id ) {
			store.dispatch( {
				type: 'REMOVE_ORGANIZER',
				block: this.props.id,
				organizer: post.id,
			} );
		}

		store.dispatch( {
			type: 'CLEAR',
			id: this.props.id,
		} );
	};
}
