/**
 * External dependencies
 */
import { unescape, isEmpty } from 'lodash';
import { stringify } from 'querystringify';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { store, STORE_NAME } from 'data/venues';

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
	VenueForm,
	SearchPosts,
} from 'elements';

function CreateDropdown( { ...props } ) {
	const { focus, addVenue } = props;

	if ( ! focus ) {
		return null;
	}

	const icon = (
		<Dashicon icon="plus" />
	);

	const dropdownToggle = ( { onToggle, isOpen } ) => (
		<IconButton
			className="tribe-editor-button"
			label={ __( 'Create Venue' ) }
			onClick={ onToggle }
			icon={ icon }
			aria-expanded={ isOpen }
		/>
	);

	const dropdownContent = ( { onToggle, isOpen, onClose } ) => (
		<VenueForm
			addVenue={ addVenue }
			onClose={ onClose }
		/>
	);

	const content = (
		<Dropdown
			className="tribe-editor-venue-dropdown"
			position="bottom center"
			contentClassName="tribe-editor-dropdown__dialog"
			renderToggle={ dropdownToggle }
			renderContent={ dropdownContent }
		/>
	);

	return content;
}

function VenueActions( { ...props } ) {
	const { focus, onClick } = props;

	if ( ! focus ) {
		return null;
	}

	const icon = (
		<Dashicon icon="no" />
	);

	return (
		<IconButton
			className="tribe-editor-button"
			label={ __( 'Remove Venue' ) }
			onClick={ onClick }
			icon={ icon }
			aria-expanded={ focus }
		/>
	);
}

/**
 * Module Code
 */
export default class VenueDetails extends Component {
	constructor( props ) {
		super( ...arguments );

		this.state = {
			isLoading: false,
		};
	}

	render() {
		const { venue } = this.props;
		const { isLoading } = this.state;

		if ( isLoading ) {
			return (
				<Placeholder key="loading">
					<Spinner />
				</Placeholder>
			);
		}

		if ( venue ) {
			return [ this.renderVenue(), this.renderActions() ];
		}

		return (
			<Placeholder key="actions">
				{ this.renderActions() }
			</Placeholder>
		);
	}

	renderVenue = () => {
		const { venue } = this.props;
		const classes = {
			'tribe-current': true,
		};

		return (
			<div
				className={ classNames( classes ) }
				key={ venue.id }
			>
				{ this.renderVenueName() }
				{ this.renderAddress() }
				{ this.renderPhone() }
				{ this.renderURL() }
			</div>
		);
	}

	renderVenueName() {
		return (
			<h4>{ this.getVenueName() }</h4>
		);
	}

	getVenueName( venue = this.props.venue  ) {
		// if we still don't have venue we don't have an address
		if ( ! venue ) {
			return false;
		}

		// If we don't have a title we say it's untitled
		if ( ! venue.title ) {
			return __( '(Untitled Venue)', 'events-gutenberg' );
		}

		return unescape( venue.title.rendered ).trim();
	}

	renderAddress() {
		const address = this.props.getAddress();
		if ( isEmpty( address ) ) {
			return null;
		}

		const { venue } = this.props;
		const { meta } = venue;

		return (
			<address className="tribe-events-address">
				<span className="tribe-street-address">{ meta._VenueAddress }</span>
				<br/>
				<span className="tribe-locality">{ meta._VenueCity }</span><span className="tribe-delimiter">,</span>&nbsp;
				<abbr className="tribe-region tribe-events-abbr" title={ meta._VenueProvince }>{ meta._VenueProvince }</abbr>&nbsp;
				<span className="tribe-postal-code">{ meta._VenueZip }</span>&nbsp;
				<span className="tribe-country-name">{ meta._VenueCountry }</span>&nbsp;
				{ this.renderGoogleMapLink() }
			</address>
		);
	}

	renderGoogleMapLink() {
		const address = this.props.getAddress();
		const mapsUrlArgs = {
			f: 'q',
			source: 's_q',
			geocode: '',
			q: address,
		};
		const mapsUrl = `https://maps.google.com/maps?${ stringify( mapsUrlArgs ) }`;
		const { showMapLink } = this.props;

		if ( ! showMapLink ) {
			return null;
		}

		return (
			<a
				className="tribe-events-gmap"
				href={ mapsUrl }
				title={ __( 'Click to view a Google Map', 'events-gutenberg' ) }
				target="_blank"
			>
				{ __( '+ Google Map', 'events-gutenberg' ) }
			</a>
		);
	}

	renderPhone() {
		const { venue } = this.props;

		if ( isEmpty( venue.meta._VenuePhone ) ) {
			return null;
		}

		return (
			<p className="tribe-editor__meta-field">
				<strong>{ __( 'Phone: ', 'events-gutenberg' ) }</strong><br/>
				<span>{ venue.meta._VenuePhone }</span>
			</p>
		)
	}

	renderURL() {
		const { venue } = this.props;
		if ( isEmpty( venue.meta._VenueURL ) ) {
			return null;
		}

		return (
			<p className="tribe-editor__meta-field">
				<strong>{ __( 'Website: ', 'events-gutenberg' ) }</strong><br/>
				<span>{ venue.meta._VenueURL }</span>
			</p>
		);
	}

	renderActions = () => {
		const { focus, addVenue, removeVenue, venue } = this.props;

		return (
			<div key="venue-actions" className="tribe-editor-venue-actions">
				<SearchPosts
					key="venue-search-dropdown"
					postType="tribe_venue"
					metaKey="_EventVenueID"
					searchLabel={ __( 'Search for an venue', 'events-gutenberg' ) }
					iconLabel={ __( 'Add existing venue', 'events-gutenberg' ) }
					focus={ focus }
					onSelectItem={ addVenue }
					store={ store }
					storeName={ STORE_NAME }
					searchable
				/>
				<CreateDropdown
					key="venue-create-dropdown"
					focus={ focus }
					addVenue={ addVenue }
				/>
				{ venue &&
				<VenueActions
					key="venue-actions"
					focus={ focus }
					venue={ venue }
					onClick={ () => removeVenue( venue ) }
				/>
				}
			</div>
		);
	}
}
