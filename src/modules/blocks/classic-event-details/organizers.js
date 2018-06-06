/**
 * External dependencies
 */
import { unescape, union, uniqueId, noop, identity, find, isEmpty, isNumber, difference } from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect, select } from '@wordpress/data';
import { Component, compose } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon,
	Spinner,
	Placeholder,
	withAPIData,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	OrganizerForm,
	SearchPosts,
} from 'elements';
import { store, STORE_NAME } from 'data/organizers';

function CreateDropdown( { ...props } ) {
	const { addOrganizer } = props;

	const icon = (
		<Dashicon icon="plus" />
	);

	const dropdownToggle = ( { onToggle, isOpen } ) => (
		<IconButton
			className="tribe-editor__btn"
			label={ __( 'Create Organizer' ) }
			onClick={ onToggle }
			icon={ icon }
			aria-expanded={ isOpen }
		/>
	);

	const dropdownContent = ( { onToggle, isOpen, onClose } ) => (
		<OrganizerForm
			addOrganizer={ addOrganizer }
			onClose={ onClose }
		/>
	);

	const content = (
		<Dropdown
			className="tribe-editor__organizer__dropdown"
			position="bottom center"
			contentClassName="tribe-editor-dropdown__dialog"
			renderToggle={ dropdownToggle }
			renderContent={ dropdownContent }
		/>
	);

	return content;
}

function OrganizerActions( { ...props } ) {
	const { visible, organizer, onClick } = props;

	if ( ! visible ) {
		return null;
	}

	const icon = (
		<Dashicon icon="no"/>
	);

	return (
		<IconButton
			className="tribe-editor__btn"
			label={ __( 'Remove Organizer' ) }
			onClick={ onClick }
			icon={ icon }
			aria-expanded={ focus }
			style={ { position: 'absolute', right: 0, top: '-5px' } }
		/>
	);
}

/**
 * Module Code
 */
export default class EventOrganizers extends Component {
	static defaultProps = {
		organizers: [],
	};

	static propTypes = {
		organizers: PropTypes.array,
	};

	constructor( props ) {
		super( ...arguments );
		this.state = {
			loading: isLoading( props.organizers ),
		};
		this.skip = [];
	}

	static getDerivedStateFromProps( props, state ) {
		const { organizers } = props;
		if ( ! organizers ) {
			return null;
		}

		if ( ! state.loading ) {
			return null;
		}

		return {
			loading: isLoading( organizers ),
		};
	}

	componentDidMount() {
		select( STORE_NAME ).fetchDetails( this.props.organizers );
	}

	componentDidUpdate() {
		this.skip = [];
	}

	renderOrganizerName( organizer ) {
		if ( ! organizer.title ) {
			return __( '(Untitled)', 'events-gutenberg' );
		}

		return unescape( organizer.title.rendered ).trim();
	}

	renderOrganizerList() {
		const { organizers } = this.props;
		return (
			<ul className={ classNames( 'tribe-editor__organizer__list' ) }>
				{ organizers.map( ( organizer, index ) => this.renderOrganizerListItem( organizer, index + 1 === organizers.length, 0 ) ) }
			</ul>
		);
	}

	renderOrganizerListItem( organizer, isLast, level ) {
		const { removeOrganizer } = this.props;
		return (
			<li
				key={ uniqueId( organizer.id || organizer ) }
			>
				{ this.renderOrganizerName( organizer ) }
				<OrganizerActions
					visible={ ! this.isFromBlock( organizer ) }
					organizer={ organizer }
					onClick={ () => removeOrganizer( organizer ) }
				/>
			</li>
		);
	}

	isFromBlock = ( organizer ) => {
		const { block, id } = organizer;

		// Recent created block
		if ( block && block === 'individual' ) {
			return true;
		}

		const { organizersBlocks } = this.props;
		const valid = difference( organizersBlocks, this.skip );
		const found = find( valid, ( item ) => item === id );
		if ( found ) {
			this.skip.push( found );
			return true;
		}
		return false;
	}

	render() {
		return [ this.renderList(), this.renderActions() ];
	}

	renderList() {
		const { loading } = this.state;

		if ( loading ) {
			return (
				<Placeholder style={ { minHeight: 50 } } key="placeholder">
					<Spinner/>
				</Placeholder>
			);
		}

		return (
			<div key="organizer-list">
				{ this.renderOrganizerList() }
			</div>
		);
	}

	renderActions() {
		const { focus, addOrganizer } = this.props;
		const { loading } = this.state;

		if ( loading ) {
			return null;
		}

		return (
			<div key="organizer-actions">
				<SearchPosts
					key="organizer-search-dropdown"
					postType="tribe_organizer"
					searchLabel={ __( 'Search for an organizer', 'events-gutenberg' ) }
					iconLabel={ __( 'Add existing Organizer', 'events-gutenberg' ) }
					store={ store }
					storeName={ STORE_NAME }
					focus={ true }
					onSelectItem={ addOrganizer }
					searchable={ true }
					exclude={ this.normalizeOrganizers() }
				/>
				<CreateDropdown
					key="organizer-create-dropdown"
					focus={ this.hasOrganizers() ? focus : true }
					addOrganizer={ addOrganizer }
				/>
			</div>
		);
	}

	hasOrganizers = () => {
		const { organizers } = this.props;
		return ! isEmpty( organizers );
	};

	normalizeOrganizers = () => {
		const { organizers } = this.props;
		return organizers.map( ( item ) => {
			return ( isNumber( item ) ) ? item : item.id;
		} );
	}
}

const isLoading = ( organizers ) => {
	const results = organizers.filter( isNumber );
	return ! ! results.length;
};
