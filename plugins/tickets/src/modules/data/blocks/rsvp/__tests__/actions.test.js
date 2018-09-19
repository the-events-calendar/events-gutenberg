/**
 * Internal dependencies
 */
import { actions } from '@moderntribe/tickets/data/blocks/rsvp';

describe( 'RSVP block actions', () => {
	test( 'create RSVP', () => {
		expect( actions.createRSVP() ).toMatchSnapshot();
	} );

	test( 'delete RSVP', () => {
		expect( actions.deleteRSVP() ).toMatchSnapshot();
	} );

	test( 'set RSVP title', () => {
		expect( actions.setRSVPTitle( 'title' ) ).toMatchSnapshot();
	} );

	test( 'set RSVP description', () => {
		expect( actions.setRSVPDescription( 'description' ) ).toMatchSnapshot();
	} );

	test( 'set RSVP capacity', () => {
		expect( actions.setRSVPCapacity( 20 ) ).toMatchSnapshot();
	} );

	test( 'set RSVP not going responses', () => {
		expect( actions.setRSVPNotGoingResponses( true ) ).toMatchSnapshot();
	} );

	test( 'set RSVP start date', () => {
		expect( actions.setRSVPStartDate( 'January 1, 2018' ) ).toMatchSnapshot();
	} );

	test( 'set RSVP end date', () => {
		expect( actions.setRSVPEndDate( 'January 1, 2018' ) ).toMatchSnapshot();
	} );

	test( 'set RSVP start time', () => {
		expect( actions.setRSVPStartTime( '12:34' ) ).toMatchSnapshot();
	} );

	test( 'set RSVP end time', () => {
		expect( actions.setRSVPEndTime( '12:34' ) ).toMatchSnapshot();
	} );

	test( 'set RSVP settings open', () => {
		expect( actions.setRSVPSettingsOpen( true ) ).toMatchSnapshot();
	} );

	test( 'set RSVP header image', () => {
		expect( actions.setRSVPHeaderImage( '3' ) ).toMatchSnapshot();
	} );
} );
