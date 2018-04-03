/**
 * External dependencies
 */
import { get, isFunction } from 'lodash';
import { stringify } from 'querystringify';
import { Component } from '@wordpress/element';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
import {
	Spinner,
	Placeholder,
	withAPIData
} from '@wordpress/components';


class VenueForm extends Component {
	static defaultProps = {
		postType: 'tribe_venue',
	};

	constructor() {
		super( ...arguments );
		this.updateVenue = this.updateVenue.bind( this );
		this.onSubmit = this.onSubmit.bind( this );

		this.state = {
			title: null,
			address: '',
			city: '',
			country: '',
			zip: '',
			phone: '',
			url: '',
			stateProvince: '',
			venue: null,
		}
	}

	isCreating() {
		if ( ! this.state.venue ) {
			return false;
		}

		if ( ! isFunction( this.state.venue.state ) ) {
			return false;
		}

		return 'pending' === this.state.venue.state()
	}

	onSubmit() {
		const {
			title,
			address,
			city,
			country,
			zip,
			phone,
			website,
			stateProvince,
		} = this.state;

		this.updateVenue( {
			title: title,
			// For now every Venue goes are publish
			status: 'publish',
			meta: {
				_VenueAddress: address,
				_VenueCity: city,
				_VenueCountry: country,
				_VenueProvince: stateProvince,
				_VenueZip: zip,
				_VenuePhone: phone,
				_VenueURL: website,
				_VenueStateProvince: stateProvince,
			}
		} );
	}

	updateVenue( toSend ) {
		const basePath = wp.api.getPostTypeRoute( this.props.postType )
		const request = wp.apiRequest( {
			path: `/wp/v2/${ basePath }`,
			method: 'POST',
			data: toSend,
		} );

		// Set the venue state
		this.setState( { venue: request } );

		request.done( ( newPost ) => {
			if ( ! newPost.id ) {
				console.warning( 'Invalid creation of venue:', newPost )
			}

			this.props.addVenue( newPost );
			this.props.onClose();
		} ).fail( ( err ) => {
			console.error( err );
		} );
	}

	render() {
		if ( this.isCreating() ) {
			return [
				<div
					className="tribe-venue-form"
					key='tribe-venue-form'
				>
					<Placeholder key="placeholder">
						<Spinner />
					</Placeholder>
				</div>
			];
		}

		return [
			<div
				className="tribe-venue-form"
				key='tribe-venue-form'
			>
				<h3 key="tribe-venue-form-title">{ __( 'Create Venue' ) }</h3>
				<dl>
					<dt>{ __( 'Name:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='venue[title]'
							ref={ ( input ) => this.input = input }
							onChange={ ( next ) => this.setState( { title: next.target.value } ) }
						/>
					</dd>
					<dt>{ __( 'Address:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='venue[address]'
							ref={ ( input ) => this.input = input }
							onChange={ ( next ) => this.setState( { address: next.target.value } ) }
						/>
					</dd>
					<dt>{ __( 'City:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='venue[city]'
							ref={ ( input ) => this.input = input }
							onChange={ ( next ) => this.setState( { city: next.target.value } ) }
						/>
					</dd>
					<dt>{ __( 'Country:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='venue[country]'
							ref={ ( input ) => this.input = input }
							onChange={ ( next ) => this.setState( { country: next.target.value } ) }
						/>
					</dd>
					<dt>{ __( 'State/Province:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='venue[stateProvince]'
							ref={ ( input ) => this.input = input }
							onChange={ ( next ) => this.setState( { stateProvince: next.target.value } ) }
						/>
					</dd>
					<dt>{ __( 'ZIP:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='venue[zip]'
							ref={ ( input ) => this.input = input }
							onChange={ ( next ) => this.setState( { zip: next.target.value } ) }
						/>
					</dd>
					<dt>{ __( 'Phone:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='venue[phone]'
							ref={ ( input ) => this.input = input }
							onChange={ ( next ) => this.setState( { phone: next.target.value } ) }
						/>
					</dd>
					<dt>{ __( 'URL:', 'the-events-calendar' ) } </dt>
					<dd>
						<input
							type='text'
							name='venue[url]'
							ref={ ( input ) => this.input = input }
							onChange={ ( next ) => this.setState( { url: next.target.value } ) }
						/>
					</dd>
				</dl>
				<button
					type="button"
					className="button-secondary"
					onClick={ this.onSubmit }
				>
					{ __( 'Create Venue', 'the-events-calendar' ) }
				</button>
			</div>,
		];
	}
}

export default VenueForm;