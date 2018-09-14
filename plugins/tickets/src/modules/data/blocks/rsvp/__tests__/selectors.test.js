/**
 * Internal dependencies
 */
import { selectors } from '@moderntribe/tickets/data/blocks/rsvp';
import { DEFAULT_STATE } from '@moderntribe/tickets/data/blocks/rsvp/reducer';

const state = {
	tickets: {
		blocks: {
			rsvp: DEFAULT_STATE,
		},
	}
};

describe( 'RSVP block selectors', () => {
	it( 'should return the block', () => {
		expect( selectors.getRSVPBlock( state ) ).toEqual( DEFAULT_STATE );
	} );

	it( 'should return the title', () => {
		expect( selectors.getRSVPTitle( state ) ).toBe( DEFAULT_STATE.title );
	} );

	it( 'should return the description', () => {
		expect( selectors.getRSVPDescription( state ) ).toBe( DEFAULT_STATE.description );
	} );

	it( 'should return the capacity', () => {
		expect( selectors.getRSVPCapacity( state ) ).toBe( DEFAULT_STATE.capacity );
	} );

	it( 'should return the enable not going', () => {
		expect( selectors.getRSVPEnableNotGoing( state ) ).toBe( DEFAULT_STATE.enableNotGoing );
	} );

	it( 'should return the start date', () => {
		expect( selectors.getRSVPStartDate( state ) ).toBe( DEFAULT_STATE.startDate );
	} );

	it( 'should return the start time', () => {
		expect( selectors.getRSVPStartTime( state ) ).toBe( DEFAULT_STATE.startTime );
	} );

	it( 'should return the end date', () => {
		expect( selectors.getRSVPEndDate( state ) ).toBe( DEFAULT_STATE.endDate );
	} );

	it( 'should return the end time', () => {
		expect( selectors.getRSVPEndTime( state ) ).toBe( DEFAULT_STATE.endTime );
	} );
} );
