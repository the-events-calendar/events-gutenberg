/**
 * Internal dependencies
 */
import { PREFIX_TICKETS_STORE } from '@moderntribe/tickets/data/utils';
import { types } from '@moderntribe/tickets/data/blocks/rsvp';

describe( 'RSVP block types', () => {
	test( 'create RSVP', () => {
		expect( types.CREATE_RSVP ).toBe( `${ PREFIX_TICKETS_STORE }/CREATE_RSVP` );
	} );

	test( 'delete RSVP', () => {
		expect( types.DELETE_RSVP ).toBe( `${ PREFIX_TICKETS_STORE }/DELETE_RSVP` );
	} );

	test( 'set RSVP title', () => {
		expect( types.SET_RSVP_TITLE ).toBe( `${ PREFIX_TICKETS_STORE }/SET_RSVP_TITLE` );
	} );

	test( 'set RSVP description', () => {
		expect( types.SET_RSVP_DESCRIPTION ).toBe( `${ PREFIX_TICKETS_STORE }/SET_RSVP_DESCRIPTION` );
	} );

	test( 'set RSVP capacity', () => {
		expect( types.SET_RSVP_CAPACITY ).toBe( `${ PREFIX_TICKETS_STORE }/SET_RSVP_CAPACITY` );
	} );

	test( 'set RSVP enable not going', () => {
		expect( types.SET_RSVP_ENABLE_NOT_GOING ).toBe( `${ PREFIX_TICKETS_STORE }/SET_RSVP_ENABLE_NOT_GOING` );
	} );

	test( 'set RSVP start date', () => {
		expect( types.SET_RSVP_START_DATE ).toBe( `${ PREFIX_TICKETS_STORE }/SET_RSVP_START_DATE` );
	} );

	test( 'set RSVP end date', () => {
		expect( types.SET_RSVP_END_DATE ).toBe( `${ PREFIX_TICKETS_STORE }/SET_RSVP_END_DATE` );
	} );

	test( 'set RSVP start time', () => {
		expect( types.SET_RSVP_START_TIME ).toBe( `${ PREFIX_TICKETS_STORE }/SET_RSVP_START_TIME` );
	} );

	test( 'set RSVP end time', () => {
		expect( types.SET_RSVP_END_TIME ).toBe( `${ PREFIX_TICKETS_STORE }/SET_RSVP_END_TIME` );
	} );
} );
