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
import { query } from '@wordpress/data'
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
	VenueForm,
	SearchPosts,
} from 'elements'

function CreateDropdown( { ...props } ) {
	const { focus, addVenue } = props;

	if ( ! focus  ) {
		return null;
	}

	const icon = (
		<Dashicon icon='plus' />
	)

	const dropdownToggle = ( { onToggle, isOpen } ) => (
		<IconButton
			className='tribe-editor-button'
			label={ __( 'Create Venue' ) }
			onClick={ onToggle }
			icon={ icon }
			aria-expanded={ isOpen }
		/>
	)

	const dropdownContent = ( { onToggle, isOpen, onClose } ) => (
		<VenueForm
			addVenue={ addVenue }
			onClose={ onClose }
		/>
	)

	const content = (
		<Dropdown
			className="tribe-editor-venue-dropdown"
			position="bottom center"
			contentClassName="tribe-editor-dropdown__dialog"
			renderToggle={ dropdownToggle }
			renderContent={ dropdownContent }
		/>
	)

	return content
}

function VenueActions( { ...props } ) {
	const { focus, venue, onClick } = props;

	if ( ! focus  ) {
		return null;
	}

	const icon = (
		<Dashicon icon='no' />
	)

	return (
		<IconButton
			className='tribe-editor-button'
			label={ __( 'Remove Venue' ) }
			onClick={ onClick }
			icon={ icon }
			aria-expanded={ focus }
		/>
	)
}

/**
 * Module Code
 */
class VenueComponent extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	getVenue() {
		if ( ! this.props.venue ) {
			return null;
		}

		const venues = this.props.venue.data;
		if ( ! venues || ! venues.length ) {
			return null;
		}

		return venues[0];
	}

	renderVenueName( venue ) {
		if ( ! venue.title ) {
			return __( '(Untitled Venue)', 'the-events-calendar' );
		}

		return unescape( venue.title.rendered ).trim();
	}

	renderVenue() {
		const venue = this.getVenue();
		const { focus, removeVenue } = this.props;
		const classes = {
			'tribe-current': true
		}

		return (
			<div
				className={ classNames( classes ) }
				key={ venue.id }
			>
				{ this.renderVenueName( venue ) }
			</div>
		);
	}

	render() {
		const { focus, addVenue, removeVenue } = this.props;
		const venue = this.getVenue();
		let block = null;

		if ( this.props.venue.isLoading ) {
			return null
		}

		block = (
			<div className='tribe-editor-venue__actions'>
				<SearchPosts
					key='venue-search-dropdown'
					postType='tribe_venue'
					metaKey='_EventVenueID'
					searchLabel={ __( 'Search for an venue', 'the-events-calendar' ) }
					iconLabel={ __( 'Add existing venue', 'the-events-calendar' ) }
					focus={ focus }
					onSelectItem={ addVenue }
				/>
				<CreateDropdown
					key='venue-create-dropdown'
					focus={ focus }
					addVenue={ addVenue }
				/>
				{ venue &&
					<VenueActions
						key='venue-actions'
						focus={ focus }
						venue={ venue }
						onClick={ () => removeVenue( venue ) }
					/>
				}
			</div>
		)

		if ( venue ) {
			return block
		}

		const content = (
			<Placeholder>
				{ block }
			</Placeholder>
		)

		return content
	}
}

const applyQuery = query( ( select, props ) => {
	const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' )
	const venue = meta._EventVenueID ? meta._EventVenueID : null
	return {
		venue: venue,
	}
} );

const applyWithAPIData = withAPIData( ( props ) => {
	const { venue } = props
	let query = {
		per_page: 1,
		orderby: 'modified',
		status: [ 'draft', 'publish' ],
		order: 'desc',
		include: venue,
	};

	if ( ! venue ) {
		return {
			venue: null,
		}
	}

	return {
		venue: `/wp/v2/tribe_venue?${ stringify( query ) }`,
	};
} );


export default compose(
	applyQuery,
	applyWithAPIData,
)( VenueComponent );
