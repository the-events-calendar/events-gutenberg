/**
 * External dependencies
 */
import { isFunction, toString, mapValues } from 'lodash';
import slug from 'slug';

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

import {
	GoogleMap,
} from 'elements';

/**
 * Module Code
 */

const DATA = window.tribe_blocks_editor_google_maps_api;

class VenueMap extends Component {
	static defaultProps = {
		venue: undefined,
		zoom: 14,
	};

	constructor() {
		super( ...arguments );

		this.state = this.props;
		this.getCoordinates = this.getCoordinates.bind( this );
	}

	componentDidMount() {
		this.setState( { coordinates: this.getCoordinates() } );
		this.setState( {
			apiKey: DATA.key,
			zoom: parseInt( DATA.zoom, 10 ),
		} );
	}

	getCoordinates() {
		const { venue } = this.state;
		if ( ! venue ) {
			return undefined;
		}

		return mapValues( { lat: venue.meta._VenueLat, lng: venue.meta._VenueLng }, parseFloat );
	}

	render() {
		const { zoom, apiKey } = this.state;
		const coordinates = this.getCoordinates();

		if ( ! coordinates ) {
			return null;
		}

		return (
			<GoogleMap
				zoom={ zoom }
				size={{ width: 450, height: 353 }}
				latitude={ toString( coordinates.lat ) }
				longitude={ toString( coordinates.lng ) }
				apiKey={ apiKey }
				interactive={ true }
			/>
		);
	}
}

export default VenueMap;