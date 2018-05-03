/**
 * External dependencies
 */
import { unescape, union, uniqueId, noop } from 'lodash';
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
	const { focus, addOrganizer } = props;

	if ( ! focus ) {
		return null;
	}

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
	const { focus, organizer, onClick } = props;

	if ( ! focus ) {
		return null;
	}

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
class EventOrganizers extends Component {
	constructor( props ) {
		super( ...arguments );

		this.state = {
			overOrganizer: null,
			organizers: [],
			isLoading: false,
		};
		this.unsubscribe = noop;
	}

	componentDidMount() {
		select( STORE_NAME ).fetch();
		this.unsubscribe = store.subscribe( () => {
			const { posts } = store.getState();
			this.setState( { posts } );
		} );
	}

	componentDidUpdate( prevProps, prevState ) {
		const { page } = store.getState();
		select( STORE_NAME ).fetch( { page } );
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	renderOrganizerName( organizer ) {
		if ( ! organizer.title ) {
			return __( '(Untitled)', 'events-gutenberg' );
		}

		return unescape( organizer.title.rendered ).trim();
	}

	renderOrganizerList() {
		const organizers = this.getOrganizers();

		return (
			<ul className={ classNames( 'tribe-editor-organizer-list' ) }>
				{ organizers.map( ( organizer, index ) => this.renderOrganizerListItem( organizer, index + 1 === organizers.length, 0 ) ) }
			</ul>
		);
	}

	renderOrganizerListItem( organizer, isLast, level ) {
		const { focus, removeOrganizer } = this.props;
		const { overOrganizer } = this.state;
		const current = overOrganizer === organizer.id;
		const classes = {
			'tribe-current': focus && current,
		};

		return (
			<li
				className={ classNames( classes ) }
				key={ organizer.id }
				onMouseEnter={ () => {
					this.setState( { overOrganizer: organizer.id } );
				} }
				onMouseLeave={ () => {
					this.setState( { overOrganizer: null } );
				} }
			>
				{ this.renderOrganizerName( organizer ) }
				<OrganizerActions
					focus={ focus && current }
					organizer={ organizer }
					onClick={ () => removeOrganizer( organizer ) }
				/>
			</li>
		);
	}

	render() {
		const { focus, addOrganizer } = this.props;
		const { organizers, isLoading } = this.state;
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
					focus={ hasOrganizers ? focus : true }
					onSelectItem={ addOrganizer }
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

		const content = [
			list,
			actions,
		];

		return content;
	}
}

const applySelect = withSelect( ( select, props ) => {
	const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' );
	const organizers = meta._EventOrganizerID ? meta._EventOrganizerID : [];
	return {
		organizers: organizers,
	};
} );

export default compose(
	applySelect,
)( EventOrganizers );
