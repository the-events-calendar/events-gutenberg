/**
 * External dependencies
 */
import { unescape, union, uniqueId, noop, identity } from 'lodash';
import { stringify } from 'querystringify';
import classNames from 'classnames';

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
	const { organizer, onClick } = props;

	const icon = (
		<Dashicon icon="no" />
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
	constructor( props ) {
		super( ...arguments );

		this.state = {
			overOrganizer: null,
			isLoading: false,
		};
	}

	componentDidMount() {
		select( STORE_NAME ).fetch();
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
					organizer={ organizer }
					onClick={ () => removeOrganizer( organizer ) }
				/>
			</li>
		);
	}

	render() {
		const { focus, addOrganizer } = this.props;
		const { organizers, isLoading } = this.props;
		const hasOrganizers = 0 !== organizers.length;
		let list = null;
		let actions = (
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
					focus={ hasOrganizers ? focus : true }
					addOrganizer={ addOrganizer }
				/>
			</div>
		);

		if ( isLoading ) {
			list = (
				<Placeholder style={ { minHeight: 50 } } key="placeholder">
					<Spinner />
				</Placeholder>
			);
		}

		if ( hasOrganizers ) {
			list = (
				<div key="organizer-list">
					{ this.renderOrganizerList() }
				</div>
			);
		} else {
			actions = (
				<Placeholder style={ { minHeight: 50 } } key="actions-placeholder">
					{ actions }
				</Placeholder>
			);
		}

		return [
			list,
			actions,
		];
	}
}

/*
const applySelect = withSelect( ( select, props ) => {
	const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' );
	const organizers = meta._EventOrganizerID ? meta._EventOrganizerID : [];
	return {
		organizers: organizers.filter( identity ),
	};
} );

export default compose(
	applySelect,
)( EventOrganizers );
*/
