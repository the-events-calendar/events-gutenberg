/**
 * External dependencies
 */
import React from 'react';

const { apiRequest } = wp;

/**
 * Wordpress dependencies
 */
import {
	Component,
	createHigherOrderComponent,
} from '@wordpress/element';

export default ( args ) => createHigherOrderComponent( ( WrappedComponent ) => {
	return class Details extends Component {
		constructor( props ) {
			super( ...arguments );
			this.state = {
				isLoading: true,
				data: {},
				params: {
					method: 'GET',
					...args( props ),
				},
			};

			this.unmounting = false;
		}

		componentDidMount() {
			const { params } = this.state;
			apiRequest( params ).then( this.saveData );
		}

		componentWillUnmount() {
			this.unmounting = true;
		}

		saveData = ( body ) => {
			if ( this.unmounting ) {
				return;
			}

			this.setState( {
				data: body,
				isLoading: false,
			} );
		};

		render() {
			return <WrappedComponent { ...this.props } { ...this.state } />;
		}
	};
}, 'withRequest' );
