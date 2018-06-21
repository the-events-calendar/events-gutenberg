/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';
import { Component, compose } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon,
	Spinner,
	Placeholder,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	OrganizerForm,
	SearchPosts,
} from 'elements';
import { store, STORE_NAME } from 'data/search/organizer';
import withSaveData from 'editor/hoc/with-save-data';
import { STORE_NAME as DETAILS_STORE } from 'data/details';
import { Item } from './organizer';

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

/**
 * Module Code
 */
class EventOrganizers extends Component {
	static defaultProps = {
		organizers: [],
	};

	static propTypes = {
		organizers: PropTypes.array,
	};

	constructor( props ) {
		super( ...arguments );
		this.state = {
			loading: false,
		};
	}

	renderOrganizerList() {
		const { organizers, removeOrganizer } = this.props;
		return (
			<ul className={ classNames( 'tribe-editor__organizer__list' ) }>
				{ organizers.map( ( id ) => {
					return (
						<Item
							id={ id }
							key={ id }
							onRemoveOrganizer={ () => removeOrganizer( id ) }
						/>
					);
				} ) }
			</ul>
		);
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
		const { focus, organizers, addOrganizer } = this.props;
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
					exclude={ organizers }
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
}

export default compose( [
	withSelect( ( select ) => {
		const { get } = select( DETAILS_STORE );
		return {
			organizers: get( 'organizers' ),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const {
			addOrganizer,
			removeOrganizer,
		} = dispatch( DETAILS_STORE );

		return {
			addOrganizer,
			removeOrganizer,
		};
	} ),
	withSaveData(),
] )( EventOrganizers );
