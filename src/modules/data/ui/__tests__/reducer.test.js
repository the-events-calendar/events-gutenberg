/**
 * External dependencies
 */
import moment from 'moment';

/**
 * Internal dependencies
 */
import reducer, { DEFAULT_STATE } from 'data/ui/reducer';
import { actions } from 'data/ui';

describe( '[STORE] - UI reducer', () => {
	it( 'Should return the default state', () => {
		const current = reducer( undefined, {} );
		expect( current ).toEqual( DEFAULT_STATE );
	} );

	it( 'Should Set the Dashboard date time by open it', () => {
		const current = reducer( {}, actions.openDashboard() );
		const expected = {
			dashboardDateTimeOpen: true,
		};
		expect( current ).toEqual( expected );
	} );

	it( 'Should set the Dashboard date time by closing it', () => {
		const current = reducer( {}, actions.closeDashboard() );
		const expected = {
			dashboardDateTimeOpen: false,
		};
		expect( current ).toEqual( expected );
	} );

	it( 'Should Toggle Dashboard date time', () => {
		const current = reducer( { dashboardDateTimeOpen: false }, actions.toggleDashboard() );
		const expected = {
			dashboardDateTimeOpen: true,
		};
		expect( current ).toEqual( expected );
	} );

	it( 'Should Set visibility month', () => {
		const visibleMonth = moment().startOf( 'month' ).toDate();
		const current = reducer( {}, actions.setVisibleMonth( visibleMonth ) );
		const expected = {
			visibleMonth,
		};
		expect( current ).toEqual( expected );
	} );
} );
