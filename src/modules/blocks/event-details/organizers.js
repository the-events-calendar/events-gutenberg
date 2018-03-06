/**
 * External dependencies
 */
import { unescape, union, uniqueId } from 'lodash';
import { stringify } from 'querystringify';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data'
import { Component, compose } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon,
	Spinner,
	Placeholder,
	withAPIData
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	OrganizerForm,
	SearchPosts,
} from 'elements'

function CreateDropdown( { ...props } ) {
	const { focus, addOrganizer } = props;

	if ( ! focus  ) {
		return null;
	}

	const icon = (
		<Dashicon icon='plus' />
	)

	const dropdownToggle = ( { onToggle, isOpen } ) => (
		<IconButton
			className='tribe-editor-button'
			label={ __( 'Create Organizer' ) }
			onClick={ onToggle }
			icon={ icon }
			aria-expanded={ isOpen }
		/>
	)

	const dropdownContent = ( { onToggle, isOpen, onClose } ) => (
		<OrganizerForm
			addOrganizer={ addOrganizer }
			onClose={ onClose }
		/>
	)

	const content = (
		<Dropdown
			className="tribe-editor-organizer-dropdown"
			position="bottom center"
			contentClassName="tribe-editor-dropdown__dialog"
			renderToggle={ dropdownToggle }
			renderContent={ dropdownContent }
		/>
	)

	return content
}

function OrganizerActions( { ...props } ) {
	const { focus, organizer, onClick } = props;

	if ( ! focus  ) {
		return null;
	}

	const icon = (
		<Dashicon icon='no' />
	)

	return (
		<IconButton
			className='tribe-editor-button'
			label={ __( 'Remove Organizer' ) }
			onClick={ onClick }
			icon={ icon }
			aria-expanded={ focus }
			style={{ position: 'absolute', right: 0, top: '-5px' }}
		/>
	)
}

/**
 * Module Code
 */
class EventOrganizers extends Component {
	constructor( props ) {
		super( ...arguments );

		this.state = {
			overOrganizer: null,
		}
	}

	renderOrganizerName( organizer ) {
		if ( ! organizer.title ) {
			return __( '(Untitled)', 'the-events-calendar' );
		}

		return unescape( organizer.title.rendered ).trim();
	}

	getOrganizers( parentId = null ) {
		if ( ! this.props.organizers ) {
			return [];
		}

		const organizers = this.props.organizers.data;
		if ( ! organizers || ! organizers.length ) {
			return [];
		}

		if ( parentId === null ) {
			return organizers;
		}

		return organizers.filter( organizer => organizer.parent === parentId );
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
			'tribe-current': focus && current
		}

		let renderButtons = null;
		return (
			<li
				className={ classNames( classes ) }
				key={ organizer.id }
				onMouseEnter={ () => { this.setState( { overOrganizer: organizer.id } ) } }
				onMouseLeave={ () => { this.setState( { overOrganizer: null } ) } }
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
		const organizers = this.getOrganizers();
		const hasOrganizers = 0 !== organizers.length
		let list = null;
		let actions = (
			<div key='organizer-actions'>
				<SearchPosts
					key='organizer-search-dropdown'
					postType='tribe_organizer'
					metaKey='_EventOrganizerID'
					searchLabel={ __( 'Search for an organizer', 'the-events-calendar' ) }
					iconLabel={ __( 'Add existing Organizer', 'the-events-calendar' ) }
					focus={ hasOrganizers ? focus : true }
					onSelectItem={ addOrganizer }
				/>
				<CreateDropdown
					key='organizer-create-dropdown'
					focus={ hasOrganizers ? focus : true }
					addOrganizer={ addOrganizer }
				/>
			</div>
		)

		if ( this.props.organizers.isLoading ) {
			list = (
				<Placeholder style={{ minHeight: 50 }} key="placeholder">
					<Spinner />
				</Placeholder>
			)
		}

		if ( hasOrganizers ) {
			list = (
				<div key='organizer-list'>
					{ this.renderOrganizerList() }
				</div>
			);
		} else {
			actions = (
				<Placeholder style={{ minHeight: 50 }} key="actions-placeholder">
					{ actions }
				</Placeholder>
			)
		}

		const content = [
			list,
			actions
		]

		return content
	}
}

const applySelect = withSelect( ( select, props ) => {
	const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' )
	const organizers = meta._EventOrganizerID ? meta._EventOrganizerID : []
	return {
		organizers: organizers,
	}
} );

const applyWithAPIData = withAPIData( ( props ) => {
	const { organizers } = props
	let query = {
		per_page: 100,
		orderby: 'modified',
		status: [ 'draft', 'publish' ],
		order: 'desc',
		include: organizers,
	};

	if ( ! organizers || 0 === organizers.length ) {
		return {
			organizers: [],
		}
	}

	return {
		organizers: `/wp/v2/tribe_organizer?${ stringify( query ) }`,
	};
} );


export default compose(
	applySelect,
	applyWithAPIData,
)( EventOrganizers );
