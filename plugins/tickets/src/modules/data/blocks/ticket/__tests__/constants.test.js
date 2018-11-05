/**
 * Internal dependencies
 */
import { constants } from '@moderntribe/tickets/data/blocks/ticket';

describe( 'Ticket Constants', () => {
	test( 'tc', () => {
		expect( constants.TC ).toEqual( 'tribe_commerce' );
	} );

	test( 'edd', () => {
		expect( constants.EDD ).toEqual( 'easy_digital_downloads' );
	} );

	test( 'woo', () => {
		expect( constants.WOO ).toEqual( 'wooCommerce' );
	} );

	test( 'tc class', () => {
		expect( constants.TC_CLASS ).toEqual( 'Tribe__Tickets__Commerce__PayPal__Main' );
	} );

	test( 'edd class', () => {
		expect( constants.EDD_CLASS ).toEqual( 'Tribe__Tickets_Plus__Commerce__EDD__Main' );
	} );

	test( 'woo class', () => {
		expect( constants.WOO_CLASS ).toEqual( 'Tribe__Tickets_Plus__Commerce__WooCommerce__Main' );
	} );

	test( 'provider class to constant mapping', () => {
		expect( constants.PROVIDER_CLASS_TO_CONSTANT_MAPPING )
			.toEqual( {
				Tribe__Tickets__Commerce__PayPal__Main: 'tribe_commerce',
				Tribe__Tickets_Plus__Commerce__EDD__Main: 'easy_digital_downloads',
				Tribe__Tickets_Plus__Commerce__WooCommerce__Main: 'wooCommerce',
			} );
	} );

	test( 'provider types', () => {
		expect( constants.PROVIDER_TYPES ).toEqual( [
			'tribe_commerce',
			'easy_digital_downloads',
			'wooCommerce',
		] );
	} );
} );
