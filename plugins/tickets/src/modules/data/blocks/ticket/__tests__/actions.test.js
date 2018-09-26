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
			expect( actions.setTotalSharedCapacity( 0 ) ).toMatchSnapshot();
		} );

		test( 'Set a large number', () => {
			expect( actions.setTotalSharedCapacity( 999 ) ).toMatchSnapshot();
		} );
	} );

	describe( 'Set the status of the settings dashboard', () => {
		test( 'Open the settings dashboard', () => {
			expect( actions.openSettings() ).toMatchSnapshot();
			expect( actions.setSettingsOpen( true ) ).toMatchSnapshot();
		} );

		test( 'Close the settings dashboard', () => {
			expect( actions.closeSettings() ).toMatchSnapshot();
			expect( actions.setSettingsOpen( false ) ).toMatchSnapshot();
		} );
	} );
} );
