/**
 * External dependencies
 */
import { unescape, union, uniqueId, noop, identity, isObject, isEmpty, isNumber } from 'lodash';
import { stringify } from 'querystringify';
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
			className="tribe-editor-button"
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
			className="tribe-editor-organizer-dropdown"
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
			className="tribe-editor-button"
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
	}

	constructor( props ) {
		super( ...arguments );
		this.state = {
			loading: isLoading( props.organizers ),
		};
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
		select( STORE_NAME ).fetch();
		select( STORE_NAME ).fetchDetails( this.props.organizers );
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
			<ul className={ classNames( 'tribe-editor-organizer-list' ) }>
				{ organizers.map( ( organizer, index ) => this.renderOrganizerListItem( organizer, index + 1 === organizers.length, 0 ) ) }
			</ul>
		);
	}


	renderOrganizerListItem( organizer, isLast, level ) {
		const { removeOrganizer } = this.props;
		const { overOrganizer } = this.state;
		const current = overOrganizer === organizer.id;
		const classes = {
			'tribe-current': current,
		};

		const { block } = organizer;
		const isFromBlock = block && block === 'individual';

		return (
			<li
				className={ classNames( classes ) }
				key={ organizer.id || organizer }
				onMouseEnter={ () => {
					this.setState( { overOrganizer: organizer.id } );
				} }
				onMouseLeave={ () => {
					this.setState( { overOrganizer: null } );
				} }
			>
				{ this.renderOrganizerName( organizer ) }
				<OrganizerActions
					visible={ ! isFromBlock }
					organizer={ organizer }
					onClick={ () => removeOrganizer( organizer ) }
				/>
			</li>
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
					metaKey="_EventOrganizerID"
					searchLabel={ __( 'Search for an organizer', 'events-gutenberg' ) }
					iconLabel={ __( 'Add existing Organizer', 'events-gutenberg' ) }
					store={ store }
					storeName={ STORE_NAME }
					focus={ true }
					onSelectItem={ addOrganizer }
					searchable={ true }
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

const isLoading = ( organizers ) => {
	const results = organizers.filter( isNumber );
	return ! ! results.length;
};
