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
		expect( selectors.getRSVPBlock( state ) )
			.toEqual( DEFAULT_STATE );
	} );

	it( 'should return the id', () => {
		expect( selectors.getRSVPId( state ) )
			.toBe( DEFAULT_STATE.id );
	} );

	it( 'should return the created', () => {
		expect( selectors.getRSVPCreated( state ) )
			.toBe( DEFAULT_STATE.created );
	} );

	it( 'should return the settings open', () => {
		expect( selectors.getRSVPSettingsOpen( state ) )
			.toBe( DEFAULT_STATE.settingsOpen );
	} );

	it( 'should return the has changes', () => {
		expect( selectors.getRSVPHasChanges( state ) )
			.toBe( DEFAULT_STATE.hasChanges );
	} );

	it( 'should return the is loading', () => {
		expect( selectors.getRSVPIsLoading( state ) )
			.toBe( DEFAULT_STATE.isLoading );
	} );

	it( 'should return the details object', () => {
		expect( selectors.getRSVPDetails( state ) )
			.toBe( DEFAULT_STATE.details );
	} );

	it( 'should return the title', () => {
		expect( selectors.getRSVPTitle( state ) )
			.toBe( DEFAULT_STATE.details.title );
	} );

	it( 'should return the description', () => {
		expect( selectors.getRSVPDescription( state ) )
			.toBe( DEFAULT_STATE.details.description );
	} );

	it( 'should return the capacity', () => {
		expect( selectors.getRSVPCapacity( state ) )
			.toBe( DEFAULT_STATE.details.capacity );
	} );

	it( 'should return the not going responses', () => {
		expect( selectors.getRSVPNotGoingResponses( state ) )
			.toBe( DEFAULT_STATE.details.notGoingResponses );
	} );

	it( 'should return the start date', () => {
		expect( selectors.getRSVPStartDate( state ) )
			.toBe( DEFAULT_STATE.details.startDate );
	} );

	it( 'should return the start date object', () => {
		expect( selectors.getRSVPStartDateObj( state ) )
			.toBe( DEFAULT_STATE.details.startDateObj );
	} );

	it( 'should return the start time', () => {
		expect( selectors.getRSVPStartTime( state ) )
			.toBe( DEFAULT_STATE.details.startTime );
	} );

	it( 'should return the end date', () => {
		expect( selectors.getRSVPEndDate( state ) )
			.toBe( DEFAULT_STATE.details.endDate );
	} );

	it( 'should return the end date object', () => {
		expect( selectors.getRSVPEndDateObj( state ) )
			.toBe( DEFAULT_STATE.details.endDateObj );
	} );

	it( 'should return the end time', () => {
		expect( selectors.getRSVPEndTime( state ) )
			.toBe( DEFAULT_STATE.details.endTime );
	} );

	it( 'should return the temp title', () => {
		expect( selectors.getRSVPTempTitle( state ) )
			.toBe( DEFAULT_STATE.tempDetailstitle );
	} );

	it( 'should return the temp description', () => {
		expect( selectors.getRSVPTempDescription( state ) )
			.toBe( DEFAULT_STATE.tempDetailsdescription );
	} );

	it( 'should return the temp capacity', () => {
		expect( selectors.getRSVPTempCapacity( state ) )
			.toBe( DEFAULT_STATE.tempDetailscapacity );
	} );

	it( 'should return the temp not going responses', () => {
		expect( selectors.getRSVPTempNotGoingResponses( state ) )
			.toBe( DEFAULT_STATE.tempDetailsnotGoingResponses );
	} );

	it( 'should return the temp start date', () => {
		expect( selectors.getRSVPTempStartDate( state ) )
			.toBe( DEFAULT_STATE.tempDetailsstartDate );
	} );

	it( 'should return the temp start date object', () => {
		expect( selectors.getRSVPTempStartDateObj( state ) )
			.toBe( DEFAULT_STATE.tempDetailsstartDateObj );
	} );

	it( 'should return the temp start time', () => {
		expect( selectors.getRSVPTempStartTime( state ) )
			.toBe( DEFAULT_STATE.tempDetailsstartTime );
	} );

	it( 'should return the temp end date', () => {
		expect( selectors.getRSVPTempEndDate( state ) )
			.toBe( DEFAULT_STATE.tempDetailsendDate );
	} );

	it( 'should return the temp end date object', () => {
		expect( selectors.getRSVPTempEndDateObj( state ) )
			.toBe( DEFAULT_STATE.tempDetailsendDateObj );
	} );

	it( 'should return the temp end time', () => {
		expect( selectors.getRSVPTempEndTime( state ) )
			.toBe( DEFAULT_STATE.tempDetailsendTime );
	} );

	it( 'should return the header image object', () => {
		expect( selectors.getRSVPHeaderImage( state ) )
			.toBe( DEFAULT_STATE.headerImage );
	} );

	it( 'should return the header image id', () => {
		expect( selectors.getRSVPHeaderImageId( state ) )
			.toBe( DEFAULT_STATE.headerImage.id );
	} );

	it( 'should return the header image src', () => {
		expect( selectors.getRSVPHeaderImageSrc( state ) )
			.toBe( DEFAULT_STATE.headerImage.src );
	} );

	it( 'should return the header image alt', () => {
		expect( selectors.getRSVPHeaderImageAlt( state ) )
			.toBe( DEFAULT_STATE.headerImage.alt );
	} );
} );
