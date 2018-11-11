/**
 * Internal dependencies
 */
import reducer, { DEFAULT_STATE } from '../header';
import { actions } from '@moderntribe/tickets/data/blocks/ticket';

describe( 'Header reducer', () => {
	it( 'should set the default state', () => {
		expect( reducer( undefined, {} ) ).toEqual( DEFAULT_STATE );
	} );

	it( 'should set the header', () => {
		expect( reducer(
			DEFAULT_STATE,
			actions.setTicketsHeader( { id: 123, src: 'src', alt: 'alt' } ),
		) ).toMatchSnapshot();
	} );
} );
