/**
 * External dependencies
 */
import { get, isFunction, values } from 'lodash';
import { stringify } from 'querystringify';
import { Component } from '@wordpress/element';
import Input from './input';
import { getCountries, getStates, getName } from '../../utils/geo-data';

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
	}

	constructor () {
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
			isValid: false,
		};

		this.fields = {};
	}

	componentDidMount () {
		this.setState( {
			isValid: this.isValid()
		} );
	}

	isCreating () {
		if ( ! this.state.venue ) {
			return false;
		}

		if ( ! isFunction( this.state.venue.state ) ) {
			return false;
		}

		return 'pending' === this.state.venue.state();
	}

	onSubmit () {
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
				_VenueCountry: getName( country, get( window, 'tribe_data_countries', {} ) ) || country,
				_VenueProvince: getName( stateProvince, get( window, 'tribe_data_us_states', {} ) ) || stateProvince,
				_VenueZip: zip,
				_VenuePhone: phone,
				_VenueURL: website,
				_VenueStateProvince: stateProvince,
			}
		} );
	}

	updateVenue ( toSend ) {
		const basePath = wp.api.getPostTypeRoute( this.props.postType );
		const request = wp.apiRequest( {
			path: `/wp/v2/${ basePath }`,
			method: 'POST',
			data: toSend,
		} );

		// Set the venue state
		this.setState( { venue: request } );

		request.done( ( newPost ) => {
			if ( ! newPost.id ) {
				console.warning( 'Invalid creation of venue:', newPost );
			}

			this.props.addVenue( newPost );
			this.props.onClose();
		} ).fail( ( err ) => {
			console.warn( err );
		} );
	}

	saveRef = ( input ) => {
		if ( input ) {
			const { props } = input;
			const { name } = props || {};
			this.fields[ name ] = input;
		}
	}

	isValid () {
		const fields = values( this.fields );
		const results = fields.filter( ( input ) => input.isValid() );

		return fields.length === results.length;
	}

	renderOption ( element ) {
		return ( <option value={element.code} key={element.code}>
			{element.name}
		</option> );
	}

	renderCountry () {
		const { country } = this.state;
		const placeholder = country ? null : (
			<option value="" disabled selected="true">
				Select a country:
			</option>
		);

		return (
			<select
				value={country}
				className='small tribe-venue-select'
				onChange={( event ) => this.setState( { country: event.target.value } )}
			>
				{placeholder}
				{getCountries().map( this.renderOption )}
			</select>
		);
	}

	renderState () {
		const { stateProvince, country } = this.state;
		const states = getStates( country );

		if ( states.length === 0 ) {
			return (
				<Input
					className='medium'
					type='text'
					name='venue[stateProvince]'
					placeholder='State'
					onComplete={() => this.setState( { isValid: this.isValid() } )}
					ref={this.saveRef}
					onChange={( event ) => this.setState( { stateProvince: event.target.value } )}
				/>
			);
		} else {
			delete this.fields[ 'venue[stateProvince]' ];
			return (
				<select
					value={stateProvince}
					onChange={( event ) => this.setState( { stateProvince: event.target.value } )}
					className='medium tribe-venue-select'
				>
					{states.map( this.renderOption )}
				</select>
			);
		}
	}

	render () {

		if ( this.isCreating() ) {
			return [
				<div
					className="tribe-venue-form"
					key='tribe-venue-form'
				>
					<Placeholder key="placeholder">
						<Spinner/>
					</Placeholder>
				</div>
			];
		}

		return [
			<div
				className="tribe-venue-form"
				key='tribe-venue-form'
			>
				<h3 key="tribe-venue-form-title">
					{__( 'Create Venue' )}
				</h3>
				<div className="tribe-venue-fields-container">
					<Input
						type='text'
						name='venue[title]'
						placeholder='Name'
						onComplete={() => this.setState( { isValid: this.isValid() } )}
						ref={this.saveRef}
						onChange={( next ) => this.setState( { title: next.target.value } )}
						validate
					/>
					<Input
						type='text'
						name='venue[address]'
						placeholder='Street Address'
						onComplete={() => this.setState( { isValid: this.isValid() } )}
						ref={this.saveRef}
						onChange={( next ) => this.setState( { address: next.target.value } )}
					/>
					<Input
						type='text'
						name='venue[city]'
						placeholder='City'
						onComplete={() => this.setState( { isValid: this.isValid() } )}
						ref={this.saveRef}
						onChange={( next ) => this.setState( { city: next.target.value } )}
					/>
					<div className="row">
						{this.renderCountry()}
						{this.renderState()}
					</div>
					<div className='row'>
						<Input
							className='small'
							type='text'
							name='venue[zip]'
							placeholder='ZIP'
							onComplete={() => this.setState( { isValid: this.isValid() } )}
							ref={this.saveRef}
							onChange={( next ) => this.setState( { zip: next.target.value } )}
						/>
					</div>
					<Input
						type='phone'
						name='venue[phone]'
						placeholder='Phone number'
						onComplete={() => this.setState( { isValid: this.isValid() } )}
						ref={this.saveRef}
						onChange={( next ) => this.setState( { phone: next.target.value } )}
						validate
					/>
					<Input
						type='url'
						name='venue[url]'
						placeholder='Website'
						onComplete={() => this.setState( { isValid: this.isValid() } )}
						ref={this.saveRef}
						onChange={( next ) => this.setState( { url: next.target.value } )}
						validate
					/>
				</div>
				<button
					type="button"
					className="button-secondary"
					onClick={this.onSubmit}
					disabled={! this.isValid()}
				>
					{__( 'Create Venue', 'the-events-calendar' )}
				</button>
			</div>,
		];
	}
}

export default VenueForm;
