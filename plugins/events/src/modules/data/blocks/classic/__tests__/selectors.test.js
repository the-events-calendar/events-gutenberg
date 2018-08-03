/**
 * Internal dependencies
 */
import { selectors } from 'data/blocks/classic';
import { DEFAULT_STATE } from 'data/blocks/classic/reducers';

const state = {
	blocks: {
		classic: DEFAULT_STATE,
	},
};

describe( '[STORE] - Classic selectors', () => {
	it( 'Should return the block', () => {
		expect( selectors.classicSelector( state ) ).toEqual( DEFAULT_STATE );
	} );

	it( 'Should return the details title', () => {
		expect( selectors.detailsTitleSelector( state ) ).toBe( DEFAULT_STATE.detailsTitle );
	} );

	it( 'Should return the organizer title', () => {
		expect( selectors.organizerTitleSelector( state ) ).toBe( DEFAULT_STATE.organizerTitle );
	} );
} );
