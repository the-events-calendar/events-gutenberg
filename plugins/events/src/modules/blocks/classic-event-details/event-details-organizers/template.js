/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Dropdown, IconButton, Dashicon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { OrganizerForm, SearchPosts } from '@moderntribe/events/elements';
import EventDetailsOrganizer from './event-details-organizer/event-details-organizer';
import { ORGANIZER } from '@moderntribe/events/editor/post-types';

const CreateDropdown = ( props ) => {
	const dropdownToggle = ( { onToggle, isOpen } ) => (
		<IconButton
			className="tribe-editor__btn"
			label={ __( 'Create Organizer' ) }
			onClick={ onToggle }
			icon={ <Dashicon icon="plus" /> }
			aria-expanded={ isOpen }
		/>
	);

	const dropdownContent = ( { onClose } ) => (
		<OrganizerForm
			addOrganizer={ props.addOrganizer }
			onClose={ onClose }
		/>
	);

	return (
		<Dropdown
			className="tribe-editor__organizer__dropdown"
			position="bottom center"
			contentClassName="tribe-editor-dropdown__dialog"
			renderToggle={ dropdownToggle }
			renderContent={ dropdownContent }
		/>
	);
};

const EventDetailsOrganizers = ( props ) => {
	const addOrganizer = ( id, details ) => {
		const { addOrganizerInClassic, setDetails } = props;
		setDetails( id, details );
		addOrganizerInClassic( id );
	};

	const removeOrganizer = ( id ) => () => {
		const { removeOrganizerInClassic } = props;
		removeOrganizerInClassic( id );
	};

	// TODO: The store should be passed in as a HOC, not directly this way.
	const { organizers, store } = props;

	return (
		<Fragment>
			<div key="organizer-list">
				<ul className={ classNames( 'tribe-editor__organizer__list' ) }>
					{ organizers.map( ( { id, block } ) => (
						<EventDetailsOrganizer
							id={ id }
							block={ block }
							key={ id }
							store={ store }
							postType={ ORGANIZER }
							onRemoveClick={ removeOrganizer( id ) }
						/>
					) ) }
				</ul>
			</div>
			<div key="organizer-actions">
				<SearchPosts
					key="organizer-search-dropdown"
					name="search-organizers-classic"
					postType={ ORGANIZER }
					searchLabel={ __( 'Search for an organizer', 'events-gutenberg' ) }
					iconLabel={ __( 'Add existing Organizer', 'events-gutenberg' ) }
					store={ store }
					onItemSelect={ addOrganizer }
					exclude={ organizers.map( ( { id } ) => id ) }
				/>
				<CreateDropdown
					key="organizer-create-dropdown"
					focus={ true }
					addOrganizer={ addOrganizer }
				/>
			</div>
		</Fragment>
	);
};

EventDetailsOrganizers.propTypes = {
	organizers: PropTypes.array,
}

EventDetailsOrganizers.defaultProps = {
	organizers: [],
};

export default EventDetailsOrganizers;
