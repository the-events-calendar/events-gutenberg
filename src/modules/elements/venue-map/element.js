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
	withState,
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
import { mapsAPI } from 'utils/globals';

class VenueMap extends Component {
	static defaultProps = {
		venue: undefined,
		zoom: 14,
	};

	constructor( props ) {
		super( ...arguments );

		this.state = {
			...props,
			coordinates: this.getCoordinates( props.venue ),
			apiKey: mapsAPI.key,
			zoom: parseInt( mapsAPI.zoom, 10 ),
		};
	}

	getCoordinates = ( venue ) => {
		if ( ! venue ) {
			return undefined;
		}
		return mapValues( { lat: venue.meta._VenueLat, lng: venue.meta._VenueLng }, parseFloat );
	}

	render() {
		const { zoom, apiKey, venue } = this.state;
		const coordinates = this.getCoordinates( venue );

		if ( ! coordinates ) {
			return null;
		}

		return (
			<GoogleMap
				zoom={ zoom }
				size={ { width: 450, height: 353 } }
				latitude={ toString( coordinates.lat ) }
				longitude={ toString( coordinates.lng ) }
				apiKey={ apiKey }
				interactive={ true }
			/>
		);
	}
}

export default VenueMap;
