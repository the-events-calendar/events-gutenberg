/**
 * Internal dependencies
 */
import { actions } from '@moderntribe/tickets/data/blocks/ticket';

describe( 'Gutenberg actions', () => {
	describe( 'Header actions', () => {
		test( 'Set null to remove header', () => {
			expect( actions.setHeader( null ) ).toMatchSnapshot();
		} );

		test( 'Set object into header', () => {
			expect( actions.setHeader( { image: 10 } ) ).toMatchSnapshot();
		} );
	} );

	describe( 'Set shared capacity actions', () => {
		test( 'Set empty value', () => {
			expect( actions.setSharedCapacity( 0 ) ).toMatchSnapshot();
		} );

		test( 'Set a large number', () => {
			expect( actions.setSharedCapacity( 999 ) ).toMatchSnapshot();
		} );
	} );
} );
