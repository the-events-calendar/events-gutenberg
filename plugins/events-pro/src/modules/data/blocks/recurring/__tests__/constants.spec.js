/**
 * Internal Dependencies
 */
import * as constants from '../constants';

describe( 'Recurrence constants', () => {
	describe( 'Recurrence types', () => {
		test( 'daily', () => {
			expect( constants.DAILY ).toEqual( 'daily' );
		} );

		test( 'weekly', () => {
			expect( constants.WEEKLY ).toEqual( 'weekly' );
		} );

		test( 'monthly', () => {
			expect( constants.MONTHLY ).toEqual( 'monthly' );
		} );

		test( 'yearly', () => {
			expect( constants.YEARLY ).toEqual( 'yearly' );
		} );

		test( 'single', () => {
			expect( constants.SINGLE ).toEqual( 'single' );
		} );

		test( 'day label', () => {
			expect( constants.DAILY_LABEL ).toEqual( 'Day' );
		} );

		test( 'week label', () => {
			expect( constants.WEEKLY_LABEL ).toEqual( 'Week' );
		} );

		test( 'month label', () => {
			expect( constants.MONTHLY_LABEL ).toEqual( 'Month' );
		} );

		test( 'year label', () => {
			expect( constants.YEARLY_LABEL ).toEqual( 'Year' );
		} );

		test( 'single label', () => {
			expect( constants.SINGLE_LABEL ).toEqual( 'Single Recurrence' );
		} );

		test( 'recurrence types', () => {
			expect( constants.RECURRENCE_TYPES ).toEqual( [ 'daily', 'weekly', 'monthly', 'yearly', 'single' ] );
		} );
	} );

	describe( 'Series ends types', () => {
		test( 'on', () => {
			expect( constants.ON ).toEqual( 'on' );
		} );

		test( 'after', () => {
			expect( constants.AFTER ).toEqual( 'after' );
		} );

		test( 'never', () => {
			expect( constants.NEVER ).toEqual( 'never' );
		} );

		test( 'on label', () => {
			expect( constants.ON_LABEL ).toEqual( 'On' );
		} );

		test( 'after label', () => {
			expect( constants.AFTER_LABEL ).toEqual( 'After' );
		} );

		test( 'never label', () => {
			expect( constants.NEVER_LABEL ).toEqual( 'Never' );
		} );

		test( 'date', () => {
			expect( constants.DATE ).toEqual( 'date' );
		} );

		test( 'count', () => {
			expect( constants.COUNT ).toEqual( 'count' );
		} );
	} );

	describe( 'Days of the week', () => {
		test( 'sunday', () => {
			expect( constants.SUNDAY ).toEqual( 'sunday' );
		} );

		test( 'monday', () => {
			expect( constants.MONDAY ).toEqual( 'monday' );
		} );

		test( 'tuesday', () => {
			expect( constants.TUESDAY ).toEqual( 'tuesday' );
		} );

		test( 'wednesday', () => {
			expect( constants.WEDNESDAY ).toEqual( 'wednesday' );
		} );

		test( 'thursday', () => {
			expect( constants.THURSDAY ).toEqual( 'thursday' );
		} );

		test( 'friday', () => {
			expect( constants.FRIDAY ).toEqual( 'friday' );
		} );

		test( 'saturday', () => {
			expect( constants.SATURDAY ).toEqual( 'saturday' );
		} );

		test( 'sunday label', () => {
			expect( constants.SUNDAY_LABEL ).toEqual( 'Sunday' );
		} );

		test( 'monday label', () => {
			expect( constants.MONDAY_LABEL ).toEqual( 'Monday' );
		} );

		test( 'tuesday label', () => {
			expect( constants.TUESDAY_LABEL ).toEqual( 'Tuesday' );
		} );

		test( 'wednesday label', () => {
			expect( constants.WEDNESDAY_LABEL ).toEqual( 'Wednesday' );
		} );

		test( 'thursday label', () => {
			expect( constants.THURSDAY_LABEL ).toEqual( 'Thursday' );
		} );

		test( 'friday label', () => {
			expect( constants.FRIDAY_LABEL ).toEqual( 'Friday' );
		} );

		test( 'saturday label', () => {
			expect( constants.SATURDAY_LABEL ).toEqual( 'Saturday' );
		} );

		test( 'sunday abbreviation', () => {
			expect( constants.SUNDAY_ABBR ).toEqual( 'S' );
		} );

		test( 'monday abbreviation', () => {
			expect( constants.MONDAY_ABBR ).toEqual( 'M' );
		} );

		test( 'tuesday abbreviation', () => {
			expect( constants.TUESDAY_ABBR ).toEqual( 'T' );
		} );

		test( 'wednesday abbreviation', () => {
			expect( constants.WEDNESDAY_ABBR ).toEqual( 'W' );
		} );

		test( 'thursday abbreviation', () => {
			expect( constants.THURSDAY_ABBR ).toEqual( 'T' );
		} );

		test( 'friday abbreviation', () => {
			expect( constants.FRIDAY_ABBR ).toEqual( 'F' );
		} );

		test( 'saturday abbreviation', () => {
			expect( constants.SATURDAY_ABBR ).toEqual( 'S' );
		} );

		test( 'sunday checked', () => {
			expect( constants.SUNDAY_CHECKED ).toEqual( 'sundayChecked' );
		} );

		test( 'monday checked', () => {
			expect( constants.MONDAY_CHECKED ).toEqual( 'mondayChecked' );
		} );

		test( 'tuesday checked', () => {
			expect( constants.TUESDAY_CHECKED ).toEqual( 'tuesdayChecked' );
		} );

		test( 'wednesday checked', () => {
			expect( constants.WEDNESDAY_CHECKED ).toEqual( 'wednesdayChecked' );
		} );

		test( 'thursday checked', () => {
			expect( constants.THURSDAY_CHECKED ).toEqual( 'thursdayChecked' );
		} );

		test( 'friday checked', () => {
			expect( constants.FRIDAY_CHECKED ).toEqual( 'fridayChecked' );
		} );

		test( 'saturday checked', () => {
			expect( constants.SATURDAY_CHECKED ).toEqual( 'saturdayChecked' );
		} );

		test( 'days of the week prop keys', () => {
			expect( constants.DAYS_OF_THE_WEEK_PROP_KEYS ).toMatchSnapshot();
		} );

		test( 'days of the week mapping to state', () => {
			expect( constants.DAYS_OF_THE_WEEK_MAPPING_TO_STATE ).toMatchSnapshot();
		} );

		test( 'days of the week mapping from state', () => {
			expect( constants.DAYS_OF_THE_WEEK_MAPPING_FROM_STATE ).toMatchSnapshot();
		} );

		test( 'days of the week prop key mapping from state', () => {
			expect( constants.DAYS_OF_THE_WEEK_PROP_KEY_MAPPING_FROM_STATE ).toMatchSnapshot();
		} );
	} );

	describe( 'Days of the month', () => {
		test( 'days of the month', () => {
			expect( constants.DAYS_OF_THE_MONTH ).toMatchSnapshot();
		} );

		test( 'day', () => {
			expect( constants.DAY ).toEqual( 'day' );
		} );

		test( 'day label', () => {
			expect( constants.DAY_LABEL ).toEqual( 'Day' );
		} );
	} );

	describe( 'Weeks of the month', () => {
		test( 'first', () => {
			expect( constants.FIRST ).toEqual( 'first' );
		} );

		test( 'second', () => {
			expect( constants.SECOND ).toEqual( 'second' );
		} );

		test( 'third', () => {
			expect( constants.THIRD ).toEqual( 'third' );
		} );

		test( 'fourth', () => {
			expect( constants.FOURTH ).toEqual( 'fourth' );
		} );

		test( 'fifth', () => {
			expect( constants.FIFTH ).toEqual( 'fifth' );
		} );

		test( 'last', () => {
			expect( constants.LAST ).toEqual( 'last' );
		} );

		test( 'first label', () => {
			expect( constants.FIRST_LABEL ).toEqual( 'First' );
		} );

		test( 'second label', () => {
			expect( constants.SECOND_LABEL ).toEqual( 'Second' );
		} );

		test( 'third label', () => {
			expect( constants.THIRD_LABEL ).toEqual( 'Third' );
		} );

		test( 'fourth label', () => {
			expect( constants.FOURTH_LABEL ).toEqual( 'Fourth' );
		} );

		test( 'fifth label', () => {
			expect( constants.FIFTH_LABEL ).toEqual( 'Fifth' );
		} );

		test( 'last label', () => {
			expect( constants.LAST_LABEL ).toEqual( 'Last' );
		} );

		test( 'weeks of the month', () => {
			expect( constants.WEEKS_OF_THE_MONTH ).toEqual( [ 'first', 'second', 'third', 'fourth', 'fifth', 'last' ] );
		} );
	} );

	describe( 'Months of the year', () => {
		test( 'january', () => {
			expect( constants.JANUARY ).toEqual( 'january' );
		} );

		test( 'february', () => {
			expect( constants.FEBRUARY ).toEqual( 'february' );
		} );

		test( 'march', () => {
			expect( constants.MARCH ).toEqual( 'march' );
		} );

		test( 'april', () => {
			expect( constants.APRIL ).toEqual( 'april' );
		} );

		test( 'may', () => {
			expect( constants.MAY ).toEqual( 'may' );
		} );

		test( 'june', () => {
			expect( constants.JUNE ).toEqual( 'june' );
		} );

		test( 'july', () => {
			expect( constants.JULY ).toEqual( 'july' );
		} );

		test( 'august', () => {
			expect( constants.AUGUST ).toEqual( 'august' );
		} );

		test( 'september', () => {
			expect( constants.SEPTEMBER ).toEqual( 'september' );
		} );

		test( 'october', () => {
			expect( constants.OCTOBER ).toEqual( 'october' );
		} );

		test( 'november', () => {
			expect( constants.NOVEMBER ).toEqual( 'november' );
		} );

		test( 'december', () => {
			expect( constants.DECEMBER ).toEqual( 'december' );
		} );

		test( 'january label', () => {
			expect( constants.JANUARY_LABEL ).toEqual( 'January' );
		} );

		test( 'february label', () => {
			expect( constants.FEBRUARY_LABEL ).toEqual( 'February' );
		} );

		test( 'march label', () => {
			expect( constants.MARCH_LABEL ).toEqual( 'March' );
		} );

		test( 'april label', () => {
			expect( constants.APRIL_LABEL ).toEqual( 'April' );
		} );

		test( 'may label', () => {
			expect( constants.MAY_LABEL ).toEqual( 'May' );
		} );

		test( 'june label', () => {
			expect( constants.JUNE_LABEL ).toEqual( 'June' );
		} );

		test( 'july label', () => {
			expect( constants.JULY_LABEL ).toEqual( 'July' );
		} );

		test( 'august label', () => {
			expect( constants.AUGUST_LABEL ).toEqual( 'August' );
		} );

		test( 'september label', () => {
			expect( constants.SEPTEMBER_LABEL ).toEqual( 'September' );
		} );

		test( 'october label', () => {
			expect( constants.OCTOBER_LABEL ).toEqual( 'October' );
		} );

		test( 'november label', () => {
			expect( constants.NOVEMBER_LABEL ).toEqual( 'November' );
		} );

		test( 'december label', () => {
			expect( constants.DECEMBER_LABEL ).toEqual( 'December' );
		} );

		test( 'january abbreviation', () => {
			expect( constants.JANUARY_ABBR ).toEqual( 'Jan' );
		} );

		test( 'february abbreviation', () => {
			expect( constants.FEBRUARY_ABBR ).toEqual( 'Feb' );
		} );

		test( 'march abbreviation', () => {
			expect( constants.MARCH_ABBR ).toEqual( 'Mar' );
		} );

		test( 'april abbreviation', () => {
			expect( constants.APRIL_ABBR ).toEqual( 'Apr' );
		} );

		test( 'may abbreviation', () => {
			expect( constants.MAY_ABBR ).toEqual( 'May' );
		} );

		test( 'june abbreviation', () => {
			expect( constants.JUNE_ABBR ).toEqual( 'Jun' );
		} );

		test( 'july abbreviation', () => {
			expect( constants.JULY_ABBR ).toEqual( 'Jul' );
		} );

		test( 'august abbreviation', () => {
			expect( constants.AUGUST_ABBR ).toEqual( 'Aug' );
		} );

		test( 'september abbreviation', () => {
			expect( constants.SEPTEMBER_ABBR ).toEqual( 'Sep' );
		} );

		test( 'october abbreviation', () => {
			expect( constants.OCTOBER_ABBR ).toEqual( 'Oct' );
		} );

		test( 'november abbreviation', () => {
			expect( constants.NOVEMBER_ABBR ).toEqual( 'Nov' );
		} );

		test( 'december abbreviation', () => {
			expect( constants.DECEMBER_ABBR ).toEqual( 'Dec' )
		} );

		test( 'months of the year mapping to state', () => {
			expect( constants.MONTHS_OF_THE_YEAR_MAPPING_TO_STATE ).toMatchSnapshot();
		} );

		test( 'months of the year mapping from state', () => {
			expect( constants.MONTHS_OF_THE_YEAR_MAPPING_FROM_STATE ).toMatchSnapshot();
		} );
	} );

	describe( 'recurring multi day', () => {
		test( 'next day', () => {
			expect( constants.NEXT_DAY ).toEqual( 'next_day' );
		} );

		test( 'second day', () => {
			expect( constants.SECOND_DAY ).toEqual( 'second_day' );
		} );

		test( 'third day', () => {
			expect( constants.THIRD_DAY ).toEqual( 'third_day' );
		} );

		test( 'fourth day', () => {
			expect( constants.FOURTH_DAY ).toEqual( 'fourth_day' );
		} );

		test( 'fifth day', () => {
			expect( constants.FIFTH_DAY ).toEqual( 'fifth_day' );
		} );

		test( 'sixth day', () => {
			expect( constants.SIXTH_DAY ).toEqual( 'sixth_day' );
		} );

		test( 'seventh day', () => {
			expect( constants.SEVENTH_DAY ).toEqual( 'seventh_day' );
		} );

		test( 'next day label', () => {
			expect( constants.NEXT_DAY_LABEL ).toEqual( 'Next day' );
		} );

		test( 'second day label', () => {
			expect( constants.SECOND_DAY_LABEL ).toEqual( '2nd day' );
		} );

		test( 'third day label', () => {
			expect( constants.THIRD_DAY_LABEL ).toEqual( '3rd day' );
		} );

		test( 'fourth day label', () => {
			expect( constants.FOURTH_DAY_LABEL ).toEqual( '4th day' );
		} );

		test( 'fifth day label', () => {
			expect( constants.FIFTH_DAY_LABEL ).toEqual( '5th day' );
		} );

		test( 'sixth day label', () => {
			expect( constants.SIXTH_DAY_LABEL ).toEqual( '6th day' );
		} );

		test( 'seventh day label', () => {
			expect( constants.SEVENTH_DAY_LABEL ).toEqual( '7th day' );
		} );
	} );
} );
