/**
 * External Dependencies
 */
import * as selectors from '../selectors';

describe( 'shared selectors', () => {
	let state;
	beforeEach( () => {
		state = {
			type: 'single',
			all_day: false,
			multi_day: false,
			multi_day_span: 'next-day',
			start_date: 'October 25, 2018',
			start_time: '07:30:00',
			end_date: 'October 25, 2018',
			end_time: '08:00:00',
			between: 1,
			limit_type: 'count',
			limit: 7,
			days: [],
			week: 'first',
			day: 1,
			month: [],
			timezone: 'UTC-6',
			_limit_date_input: '',
			_limit_date_obj: {},
			_start_date_input: '',
			_start_date_obj: {},
			_end_date_input: '',
			_end_date_obj: {},
		};
	} );

	const keys = Object.keys( selectors );

	keys.forEach( ( key ) => {
		test( key, () => {
			expect( selectors[ key ]( state ) ).toMatchSnapshot();
		} );
	} );
} );
