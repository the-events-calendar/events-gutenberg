/**
 * Internal Dependencies
 */
import * as options from '../options';

describe( 'Recurrence options', () => {
	describe( 'Recurrence type options', () => {
		test( 'recurrence type rules options', () => {
			expect( options.RECURRENCE_TYPE_RULES_OPTIONS ).toMatchSnapshot();
		} );
	} );

	describe( 'Recurrence frequency options', () => {
		test( 'createNumericalOptions', () => {
			expect( options.createNumericalOptions( 5 ) ).toMatchSnapshot();
		} );

		test( 'daily recurrence frequency options', () => {
			expect( options.DAILY_RECURRENCE_FREQUENCY_OPTIONS ).toMatchSnapshot();
		} );

		test( 'weekly recurrence frequency options', () => {
			expect( options.WEEKLY_RECURRENCE_FREQUENCY_OPTIONS ).toMatchSnapshot();
		} );

		test( 'monthly recurrence frequency options', () => {
			expect( options.MONTHLY_RECURRENCE_FREQUENCY_OPTIONS ).toMatchSnapshot();
		} );

		test( 'yearly recurrence frequency options', () => {
			expect( options.YEARLY_RECURRENCE_FREQUENCY_OPTIONS ).toMatchSnapshot();
		} );
	} );

	describe( 'Series ends options', () => {
		test( 'series ends options', () => {
			expect( options.SERIES_ENDS_OPTIONS ).toMatchSnapshot();
		} );
	} );

	describe( 'Days of the week options', () => {
		test( 'days of the week options', () => {
			expect( options.DAYS_OF_THE_WEEK_OPTIONS ).toMatchSnapshot();
		} );
	} );

	describe( 'Days of the month options', () => {
		test( 'days of the month options', () => {
			expect( options.DAYS_OF_THE_MONTH_OPTIONS ).toMatchSnapshot();
		} );

		test( 'weeks of the month options', () => {
			expect( options.WEEKS_OF_THE_MONTH_OPTIONS ).toMatchSnapshot();
		} );

		test( 'month days options', () => {
			expect( options.MONTH_DAYS_OPTIONS ).toMatchSnapshot();
		} );
	} );

	describe( 'Months of the year options', () => {
		test( 'months of the year options', () => {
			expect( options.MONTHS_OF_THE_YEAR_OPTIONS ).toMatchSnapshot();
		} );
	} );

	describe( 'Recurring multi day options', () => {
		test( 'recurring multi day options', () => {
			expect( options.RECURRING_MULTI_DAY_OPTIONS ).toMatchSnapshot();
		} );
	} );
} );
