/**
 * Internal dependencies
 */
import { types } from '@@plugins/events/data/ui';

describe( '[STORE] - UI types', () => {
	it( 'Should match the types values', () => {
		expect( types.SET_DASHBOARD_DATE_TIME ).toBe( 'SET_DASHBOARD_DATE_TIME' );
		expect( types.TOGGLE_DASHBOARD_DATE_TIME ).toBe( 'TOGGLE_DASHBOARD_DATE_TIME' );
		expect( types.SET_VISIBLE_MONTH ).toBe( 'SET_VISIBLE_MONTH' );
	} );
} );
