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

	it( 'should return the not going responses', () => {
		expect( selectors.getRSVPNotGoingResponses( state ) ).toBe( DEFAULT_STATE.notGoingResponses );
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

	it( 'should return the temp title', () => {
		expect( selectors.getRSVPTempTitle( state ) ).toBe( DEFAULT_STATE.tempTitle );
	} );

	it( 'should return the temp description', () => {
		expect( selectors.getRSVPTempDescription( state ) ).toBe( DEFAULT_STATE.tempDescription );
	} );

	it( 'should return the temp capacity', () => {
		expect( selectors.getRSVPTempCapacity( state ) ).toBe( DEFAULT_STATE.tempCapacity );
	} );

	it( 'should return the temp not going responses', () => {
		expect( selectors.getRSVPTempNotGoingResponses( state ) ).toBe( DEFAULT_STATE.tempNotGoingResponses );
	} );

	it( 'should return the temp start date', () => {
		expect( selectors.getRSVPTempStartDate( state ) ).toBe( DEFAULT_STATE.tempStartDate );
	} );

	it( 'should return the temp start time', () => {
		expect( selectors.getRSVPTempStartTime( state ) ).toBe( DEFAULT_STATE.tempStartTime );
	} );

	it( 'should return the temp end date', () => {
		expect( selectors.getRSVPTempEndDate( state ) ).toBe( DEFAULT_STATE.tempEndDate );
	} );

	it( 'should return the temp end time', () => {
		expect( selectors.getRSVPTempEndTime( state ) ).toBe( DEFAULT_STATE.tempEndTime );
	} );

	it( 'should return the settings open', () => {
		expect( selectors.getRSVPSettingsOpen( state ) ).toBe( DEFAULT_STATE.settingsOpen );
	} );

	it( 'should return the has changes', () => {
		expect( selectors.getRSVPHasChanges( state ) ).toBe( DEFAULT_STATE.hasChanges );
	} );
} );
