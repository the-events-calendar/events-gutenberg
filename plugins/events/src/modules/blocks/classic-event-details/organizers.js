/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	OrganizerForm,
	SearchPosts,
} from '@moderntribe/events/elements';
import { actions, selectors } from '@moderntribe/events/data/blocks/organizers';
import { actions as detailsActions } from '@moderntribe/events/data/details';
import { Item } from './organizer';
import { ORGANIZER } from '@moderntribe/events/editor/post-types';

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

class EventOrganizers extends Component {
	static defaultProps = {
		organizers: [],
	};

	static propTypes = {
		organizers: PropTypes.array,
	};

	constructor( props ) {
		super( ...arguments );
	}

	renderOrganizerList() {
		const { organizers, store } = this.props;
		return (
			<ul className={ classNames( 'tribe-editor__organizer__list' ) }>
				{ organizers.map( ( { id, block } ) => {
					return (
						<Item
							id={ id }
							block={ block }
							key={ id }
							store={ store }
							postType={ ORGANIZER }
							onRemoveOrganizer={ this.removeOrganizer( id ) }
						/>
					);
				} ) }
			</ul>
		);
	}

	removeOrganizer = ( id ) => () => {
		const { removeOrganizerInClassic } = this.props;
		removeOrganizerInClassic( id );
	};

	render() {
		return [ this.renderList(), this.renderActions() ];
	}

	renderList() {
		return (
			<div key="organizer-list">
				{ this.renderOrganizerList() }
			</div>
		);
	}

	renderActions() {
		const { organizers, store } = this.props;
		return (
			<div key="organizer-actions">
				<SearchPosts
					key="organizer-search-dropdown"
					name="search-organizers-classic"
					postType={ ORGANIZER }
					searchLabel={ __( 'Search for an organizer', 'events-gutenberg' ) }
					iconLabel={ __( 'Add existing Organizer', 'events-gutenberg' ) }
					store={ store }
					onSelectItem={ this.onCreate }
					exclude={ organizers.map( ( { id } ) => id ) }
				/>
				<CreateDropdown
					key="organizer-create-dropdown"
					focus={ true }
					addOrganizer={ this.onCreate }
				/>
			</div>
		);
	}

	onCreate = ( id, details ) => {
		const { addOrganizerInClassic, setDetails } = this.props;
		setDetails( id, details );
		addOrganizerInClassic( id );
	}
}

const mapStateToProps = ( state ) => ( {
	organizers: selectors.getMappedOrganizers( state ),
} );

const mapDispatchToProps = ( dispatch ) => {
	return {
		...bindActionCreators( actions, dispatch ),
		...bindActionCreators( detailsActions, dispatch ),
	};
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)( EventOrganizers );
