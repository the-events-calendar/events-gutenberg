/**
 * Internal dependencies
 */
import { constants } from '@moderntribe/events-pro/data/blocks';

describe( '[STORE] - UI types', () => {
	test( 'recurring', () => {
		expect( constants.RECURRING ).toEqual( 'recurring' );
	} );

	test( 'exception', () => {
		expect( constants.EXCEPTION ).toEqual( 'exception' );
	} );

	test( 'block types', () => {
		expect( constants.BLOCK_TYPES ).toEqual( [ 'recurring', 'exception' ] );
	} );

	test( 'key type', () => {
		expect( constants.KEY_TYPE ).toEqual( 'type' );
	} );

	test( 'key all day', () => {
		expect( constants.KEY_ALL_DAY ).toEqual( 'all_day' );
	} );

	test( 'key multi day', () => {
		expect( constants.KEY_MULTI_DAY ).toEqual( 'multi_day' );
	} );

	test( 'key multi day span', () => {
		expect( constants.KEY_MULTI_DAY_SPAN ).toEqual( 'multi_day_span' );
	} );

	test( 'key start time', () => {
		expect( constants.KEY_START_TIME ).toEqual( 'start_time' );
	} );

	test( 'key end time', () => {
		expect( constants.KEY_END_TIME ).toEqual( 'end_time' );
	} );

	test( 'key start date', () => {
		expect( constants.KEY_START_DATE ).toEqual( 'start_date' );
	} );

	test( 'key start date input', () => {
		expect( constants.KEY_START_DATE_INPUT ).toEqual( '_start_date_input' );
	} );

	test( 'key start date object', () => {
		expect( constants.KEY_START_DATE_OBJ ).toEqual( '_start_date_obj' );
	} );

	test( 'key end date', () => {
		expect( constants.KEY_END_DATE ).toEqual( 'end_date' );
	} );

	test( 'key end date input', () => {
		expect( constants.KEY_END_DATE_INPUT ).toEqual( '_end_date_input' );
	} );

	test( 'key end date object', () => {
		expect( constants.KEY_END_DATE_OBJ ).toEqual( '_end_date_obj' );
	} );

	test( 'key limit', () => {
		expect( constants.KEY_LIMIT ).toEqual( 'limit' );
	} );

	test( 'key limit date input', () => {
		expect( constants.KEY_LIMIT_DATE_INPUT ).toEqual( '_limit_date_input' );
	} );

	test( 'key limit date object', () => {
		expect( constants.KEY_LIMIT_DATE_OBJ ).toEqual( '_limit_date_obj' );
	} );

	test( 'key limit type', () => {
		expect( constants.KEY_LIMIT_TYPE ).toEqual( 'limit_type' );
	} );

	test( 'key between', () => {
		expect( constants.KEY_BETWEEN ).toEqual( 'between' );
	} );

	test( 'key days', () => {
		expect( constants.KEY_DAYS ).toEqual( 'days' );
	} );

	test( 'key week', () => {
		expect( constants.KEY_WEEK ).toEqual( 'week' );
	} );

	test( 'key day', () => {
		expect( constants.KEY_DAY ).toEqual( 'day' );
	} );

	test( 'key month', () => {
		expect( constants.KEY_MONTH ).toEqual( 'month' );
	} );

	test( 'key timezone', () => {
		expect( constants.KEY_TIMEZONE ).toEqual( 'timezone' );
	} );
} );
