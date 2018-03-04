/**
 * External dependencies
 */
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { isFunction } from 'lodash'
import slug from 'slug'

/**
 * WordPress dependencies
 */
import { Component, compose } from '@wordpress/element';

import {
	Dropdown,
	IconButton,
	Dashicon,
	Spinner,
	Placeholder,
	withAPIData,
	withState
} from '@wordpress/components';

/**
 * Internal dependencies
 */

/**
 * Module Code
 */
const GMAPS_API_KEY = 'AIzaSyDquv6yMOGPHM6-Y7MkI5gv20mCS740M8A'

class MapContainer extends Component {
	static defaultProps = {
		coordinates: undefined,
		zoom: 14,
		address: undefined,
	};

	componentDidMount() {
		const address = this.props.address()
		this.setState( { address: address } )
		this.updateAddress( address )
	}

	constructor() {
		super( ...arguments );

		this.state = this.props

		this.updateAddress = this.updateAddress.bind( this )
	}

	updateAddress( address ) {
		if ( ! address ) {
			this.setState( { coordinates: undefined, address: undefined } )
			return false
		}

		geocodeByAddress( address )
			.then( results => getLatLng( results[0] ) )
			.then( latLng => {
				this.setState( { coordinates: latLng, address: address } )
				this.state.onCoordinatesChange( latLng )
				console.debug( 'Successfully Geocoded Address', latLng, address )
			} )
			.catch( error => {
				console.debug( 'Error on Geocoding Address', error, address )
			} )
	}

	render() {
		const { zoom, coordinates, address } = this.state;

		if ( ! coordinates ) {
			return null
		}

		const addressSlug = slug( isFunction( address ) ? address() : address );

		return (
			<GoogleMap
				key={ `venue-map-${ addressSlug }` }
				defaultZoom={ zoom }
				defaultCenter={ coordinates }
			>
				<Marker
					key={ `map-marker-${ addressSlug }` }
					position={ coordinates }
				/>
			</GoogleMap>
		);
	}
}

export default compose(
	withState( {
		googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${ GMAPS_API_KEY }&v=3.exp&libraries=geometry,drawing,places`,
		loadingElement: ( <Placeholder key="placeholder"><Spinner /></Placeholder> ),
		containerElement: ( <div className='tribe-editor-map__container' /> ),
		mapElement: ( <div className='tribe-editor-map__element' /> ),
	} ),
	withScriptjs,
	withGoogleMap,
)( MapContainer )