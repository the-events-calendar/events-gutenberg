/**
 * External dependencies
 */
import { unescape, union } from 'lodash';
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { query } from '@wordpress/data'
import { Component, compose } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon,
	Spinner,
	withAPIData
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	OrganizerForm,
} from 'elements'

function SearchDropdown( { ...props } ) {
	const { focus, addOrganizer } = props;

	if ( ! focus  ) {
		return null;
	}

	const icon = (
		<Dashicon icon='search' />
	)

	const dropdownToggle = ( { onToggle, isOpen } ) => (
		<IconButton
			className='tribe-editor-button'
			label={ __( 'Add existing Organizer' ) }
			onClick={ onToggle }
			icon={ icon }
		/>
	)

	const dropdownContent = () => (
		'Search organizer here!'
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
		/>
	)

	const dropdownContent = () => (
		<OrganizerForm
			addOrganizer={ addOrganizer }
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

/**
 * Module Code
 */
class EventOrganizers extends Component {
	constructor( props ) {
		super( ...arguments );
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
			<ul>
				{ organizers.map( ( organizer, index ) => this.renderOrganizerListItem( organizer, index + 1 === organizers.length, 0 ) ) }
			</ul>
		);
	}

	renderOrganizerListItem( organizer, isLast, level ) {
		return (
			<li key={ organizer.id }>
				<a href={ organizer.link } target="_blank">{ this.renderOrganizerName( organizer ) }</a>
			</li>
		);
	}

	render() {
		const { focus, addOrganizer } = this.props;
		const organizers = this.getOrganizers();
		var list = null

		if ( this.props.organizers.isLoading ) {
			list = (
				<div key='organizer-list'>
					<Spinner key='organizer-spinner' />
				</div>
			);
		} else if ( organizers.length ) {
			list = (
				<div key='organizer-list'>
					{ this.renderOrganizerList() }
				</div>
			);
		}

		const content = [
			list,
			<SearchDropdown
				key='organizer-search-dropdown'
				focus={ focus }
				addOrganizer={ addOrganizer }
			/>,
			<CreateDropdown
				key='organizer-create-dropdown'
				focus={ focus }
				addOrganizer={ addOrganizer }
			/>
		]

		return content
	}
}

const applyQuery = query( ( select, props ) => {
	const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' )
	const organizers = meta._EventOrganizerID ? meta._EventOrganizerID : []
	return {
		organizers: organizers,
	}
} );

const applyWithAPIData = withAPIData( ( props ) => {
	const { organizers } = props
	const query = stringify( {
		per_page: 100,
		orderby: 'modified',
		status: [ 'draft', 'publish' ],
		order: 'desc',
		include: organizers,
	} );

	return {
		organizers: `/wp/v2/tribe_organizer?${ query }`,
	};
} );


export default compose(
	applyQuery,
	applyWithAPIData,
)( EventOrganizers );
