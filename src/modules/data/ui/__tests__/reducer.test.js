/**
 * External dependencies
 */
import moment from 'moment';

/**
 * Internal dependencies
 */
import reducer, { actions } from 'data/ui';

describe( '[STORE] - UI reducer', () => {
	it( 'Should return the default state', () => {
		expect( reducer( undefined, {} ) ).toMatchSnapshot();
	} );

	it( 'Should Set the Dashboard date time by open it', () => {
		const current = reducer( {}, actions.openDashboard() );
		expect( current ).toMatchSnapshot();
	} );

	it( 'Should set the Dashboard date time by closing it', () => {
		const current = reducer( {}, actions.closeDashboard() );
		expect( current ).toMatchSnapshot();
	} );

	it( 'Should Toggle Dashboard date time', () => {
		const current = reducer( { dashboardDateTimeOpen: false }, actions.toggleDashboard() );
		expect( current ).toMatchSnapshot();
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
