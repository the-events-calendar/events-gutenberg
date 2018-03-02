/**
 * External dependencies
 */
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

/**
 * WordPress dependencies
 */
import { query } from '@wordpress/data'
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
class MapContainer extends Component {
	static defaultProps = {
		key: 'AIzaSyDquv6yMOGPHM6-Y7MkI5gv20mCS740M8A',
		center: null,
		zoom: 14,
		address: null,
	};

	componentDidMount() {
		this.props.onRef( this )
	}

	componentWillUnmount() {
		this.props.onRef( undefined )
	}

	constructor() {
		super( ...arguments );

		this.state = this.props

		this.updateAddress = this.updateAddress.bind( this )
		this.updateAddress( this.props.address )
	}

	updateAddress( address ) {
		if ( ! address ) {
			this.setState( { center: null, address: null } )
		}

		geocodeByAddress( address )
			.then( results => getLatLng( results[0] ) )
			.then( latLng => {
				this.setState( { center: latLng, address: address } )
				console.debug( 'Successfully Geocoded Address', latLng, address )
			} )
			.catch( error => {
				console.debug( 'Error on Geocoding Address', error, address )
			} )
	}

	render() {
		const { zoom, center } = this.state;

		if ( ! center ) {
			return null
		}

		return (
			<GoogleMap
				defaultZoom={ zoom }
				defaultCenter={ center }
			>
				<Marker
					position={ center }
				/>
			</GoogleMap>
		);
	}
}

export default compose(
	withState( {
		googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDquv6yMOGPHM6-Y7MkI5gv20mCS740M8A&v=3.exp&libraries=geometry,drawing,places',
		isMarkerShown: false,
		loadingElement: ( <Placeholder key="placeholder"><Spinner /></Placeholder> ),
		containerElement: ( <div className='tribe-editor-map__container' /> ),
		mapElement: ( <div className='tribe-editor-map__element' /> ),
	} ),
	withScriptjs,
	withGoogleMap,
)( MapContainer )