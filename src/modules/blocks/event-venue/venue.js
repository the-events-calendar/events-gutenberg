/**
 * External dependencies
 */
import { unescape, union, uniqueId, trim, isEmpty } from 'lodash';
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

		this.getVenue = this.getVenue.bind( this )
		this.getAddress = this.getAddress.bind( this )
		this.renderVenueName = this.renderVenueName.bind( this )
		this.renderVenue = this.renderVenue.bind( this )
		this.renderActions = this.renderActions.bind( this )
	}

	componentDidMount() {
		this.props.onRef( this )
	}

	componentWillUnmount() {
		this.props.onRef( undefined )
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

	getAddress( venue = null ) {
		// If we don't have a venue we fetch the one in the state
		if ( ! venue ) {
			venue = this.getVenue()
		}

		// if we still don't have venue we don't have an address
		if ( ! venue ) {
			return false
		}

		// Get the meta for us to work with
		const { meta } = venue

		// Validate meta before using it
		if ( isEmpty( meta ) ) {
			return false
		}

		const {
			_VenueAddress,
			_VenueCity,
			_VenueProvince,
			_VenueZip,
			_VenueCountry,
		} = meta

		let address = trim( `${ _VenueAddress } ${ _VenueCity } ${ _VenueProvince } ${ _VenueZip } ${ _VenueCountry }` )

		// If it's an empty string we return boolean
		if ( isEmpty( address ) ) {
			return false
		}

		return address
	}

	renderVenueName( venue = null ) {
		// If we don't have a venue we fetch the one in the state
		if ( ! venue ) {
			venue = this.getVenue()
		}

		// if we still don't have venue we don't have an address
		if ( ! venue ) {
			return false
		}

		// If we don't have a title we say it's untitled
		if ( ! venue.title ) {
			return __( '(Untitled Venue)', 'the-events-calendar' );
		}

		return unescape( venue.title.rendered ).trim();
	}

	renderVenue() {
		const venue = this.getVenue()
		const { focus, removeVenue } = this.props
		const classes = {
			'tribe-current': true
		}

		const address = this.getAddress()
		const mapsUrlArgs = {
			f: 'q',
			source: 's_q',
			geocode: '',
			q: address,
		}
		const mapsUrl = `https://maps.google.com/maps?${ stringify( mapsUrlArgs ) }`

		return (
			<div
				className={ classNames( classes ) }
				key={ venue.id }
			>
				<h4>{ this.renderVenueName() }</h4>
				{ ! isEmpty( address ) &&
					<address className="tribe-events-address">
						<span className="tribe-street-address">{ venue.meta._VenueAddress }</span>
						<br />
						<span className="tribe-locality">{ venue.meta._VenueCity }</span><span className="tribe-delimiter">,</span>&nbsp;
						<abbr className="tribe-region tribe-events-abbr" title={ venue.meta._VenueProvince }>{ venue.meta._VenueProvince }</abbr>&nbsp;
						<span className="tribe-postal-code">{ venue.meta._VenueZip }</span>&nbsp;
						<span className="tribe-country-name">{ venue.meta._VenueCountry }</span>&nbsp;
						{ ! isEmpty( address ) &&
							<a
								className="tribe-events-gmap"
								href={ mapsUrl }
								title={ __( 'Click to view a Google Map', 'the-events-calendar' ) }
								target="_blank"
							>
								{ __( '+ Google Map', 'the-events-calendar' ) }
							</a>
						}
					</address>
				}
			</div>
		);
	}

	renderActions() {
		const { focus, addVenue, removeVenue } = this.props;
		const venue = this.getVenue();

		return (
			<div key='venue-actions' className='tribe-editor-venue__actions'>
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
	}

	render() {
		const { focus, addVenue, removeVenue, venue } = this.props;

		if ( this.getVenue() && ! venue.isLoading ) {
			return [ this.renderVenue(), this.renderActions() ]
		}

		return (
			<Placeholder>
				{ this.renderActions() }
			</Placeholder>
		)
	}
}

const applySelect = withSelect( ( select, props ) => {
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
	applySelect,
	applyWithAPIData,
)( VenueComponent );
