/**
 * External dependencies
 */
import { get, values, noop, pick } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/editor';
import {
	Spinner,
	Placeholder,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { Input } from 'elements';
import list, { getCountries, getStates, getCountryCode, getStateCode } from 'utils/geo-data';
import { store, STORE_NAME } from 'data/venue';
import './style.pcss';

export function toFields( venue ) {
	const title = get( venue, 'title', {} );
	const meta = get( venue, 'meta', {} );
	const address = get( meta, '_VenueAddress', '' );
	const city = get( meta, '_VenueCity', '' );
	const country = get( meta, '_VenueCountry', '' );
	const stateProvince = get( meta, '_VenueStateProvince', '' );
	const zip = get( meta, '_VenueZip', '' );
	const phone = get( meta, '_VenuePhone', '' );
	const url = get( meta, '_VenueURL', '' );

	const countryCode = getCountryCode( country );
	return {
		title: get( title, 'rendered', '' ),
		address,
		city,
		country: countryCode,
		zip,
		phone,
		url,
		stateProvince: getStateCode( countryCode, stateProvince ),
	};
}

export function toVenue( fields ) {
	const { title, address, city, country, zip, phone, url, stateProvince } = fields;

	return {
		title,
		status: 'draft',
		meta: {
			_VenueAddress: address,
			_VenueCity: city,
			_VenueCountry: get( list.countries, country, '' ) || country,
			_VenueProvince: get( list.us_states, stateProvince, '' ) || stateProvince,
			_VenueZip: zip,
			_VenuePhone: phone,
			_VenueURL: url,
			_VenueStateProvince: stateProvince,
		},
	}
}

/**
 * Module Code
 */

export default class VenueForm extends Component {
	static defaultProps = {
		postType: 'tribe_venue',
		onSubmit: noop,
	}

	constructor( props ) {
		super( ...arguments );

		this.state = {
			title: '',
			address: '',
			city: '',
			country: '',
			zip: '',
			phone: '',
			url: '',
			stateProvince: '',
			venue: null,
			isValid: this.isValid(),
			...props,
		};
		console.log( this.state );
		this.fields = {};
	}

	componentWillUnmount() {
		const FIELDS = [
			'title', 'address', 'city', 'country', 'zip', 'phone', 'url', 'stateProvince',
		];
		const fields = pick( this.state, FIELDS );
		fields.country = get( list.countries, fields.country, '' ) || fields.country;
		fields.stateProvince = get( list.us_states, fields.stateProvince, '' ) || fields.stateProvince;
		this.props.onSubmit( fields );
	}

	saveRef = ( input ) => {
		if ( input ) {
			const { props } = input;
			const { name } = props || {};
			this.fields[ name ] = input;
		}
	}

	isValid() {
		const fields = values( this.fields );
		const results = fields.filter( ( input ) => input.isValid() );

		return fields.length === results.length;
	}

	renderOption( element ) {
		return ( <option value={ element.code } key={ element.code }>
			{ element.name }
		</option> );
	}

	renderCountry() {
		const { country } = this.state;
		const placeholder = country ? null : (
			<option value="" disabled>
				{ __( 'Country', 'events-gutenberg' ) }
			</option>
		);

		return (
			<select
				value={ country }
				className="small tribe-venue-select"
				onChange={ ( event ) => this.setState( { country: event.target.value } ) }
			>
				{ placeholder }
				{ getCountries().map( this.renderOption ) }
			</select>
		);
	}

	renderState() {
		const { stateProvince, country } = this.state;
		const states = getStates( country );

		if ( states.length === 0 ) {
			return (
				<Input
					className="medium"
					type="text"
					name="venue[stateProvince]"
					placeholder="State"
					onComplete={ () => this.setState( { isValid: this.isValid() } ) }
					ref={ this.saveRef }
					onChange={ ( event ) => this.setState( { stateProvince: event.target.value } ) }
					value={ stateProvince }
				/>
			);
		}
		delete this.fields[ 'venue[stateProvince]' ];
		return (
			<select
				value={ stateProvince }
				onChange={ ( event ) => this.setState( { stateProvince: event.target.value } ) }
				className="medium tribe-venue-select"
			>
				{ states.map( this.renderOption ) }
			</select>
		);
	}

	render() {
		return (
			<div
				className="tribe-venue__form"
				key="tribe-venue-form"
			>
				{ this.renderFields() }
			</div>
		);
	}

	renderFields() {
		const {
			title,
			address,
			city,
			zip,
			phone,
			url,
		} = this.state;
		return (
			<React.Fragment>
				<RichText
					tagName="h3"
					format="string"
					value={ title }
					onChange={ ( value ) => { this.setState( { title: value } ) } }
				/>
				<div className="tribe-venue__fields-container">
					<Input
						type="text"
						name="venue[address]"
						placeholder="Street Address"
						onComplete={ () => this.setState( { isValid: this.isValid() } ) }
						ref={ this.saveRef }
						value={ address }
						onChange={ ( next ) => this.setState( { address: next.target.value } ) }
					/>
					<Input
						type="text"
						name="venue[city]"
						placeholder="City"
						onComplete={ () => this.setState( { isValid: this.isValid() } ) }
						ref={ this.saveRef }
						onChange={ ( next ) => this.setState( { city: next.target.value } ) }
						value={ city }
					/>
					<div className="row">
						{ this.renderCountry() }
						{ this.renderState() }
					</div>
					<div className="row">
						<Input
							className="small"
							type="text"
							name="venue[zip]"
							placeholder="ZIP"
							onComplete={ () => this.setState( { isValid: this.isValid() } ) }
							ref={ this.saveRef }
							onChange={ ( next ) => this.setState( { zip: next.target.value } ) }
							value={ zip }
						/>
					</div>
					<Input
						type="tel"
						name="venue[phone]"
						placeholder="Phone number"
						onComplete={ () => this.setState( { isValid: this.isValid() } ) }
						ref={ this.saveRef }
						onChange={ ( next ) => this.setState( { phone: next.target.value } ) }
						value={ phone }
					/>
					<Input
						type="url"
						name="venue[url]"
						placeholder="Website"
						onComplete={ () => this.setState( { isValid: this.isValid() } ) }
						ref={ this.saveRef }
						onChange={ ( next ) => this.setState( { url: next.target.value } ) }
						value={ url }
					/>
				</div>
			</React.Fragment>
		);
	}
}
