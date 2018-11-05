/**
 * External dependencies
 */
import { put, select, call } from 'redux-saga/effects';

/**
 * Internal Dependencies
 */
import * as constants from '@moderntribe/events-pro/data/blocks/constants';
import * as recurringConstants from '@moderntribe/events-pro/data/blocks/recurring/constants';
import { moment as momentUtil, time } from '@moderntribe/common/utils';
import { selectors as datetime } from '@moderntribe/events/data/blocks/datetime';
import * as sagas from '../sagas';

describe( 'Shared recurrence sagas', () => {
	let actions, selectors, args;

	beforeEach( () => {
		actions = {
			sync: jest.fn( obj => obj ),
			add: jest.fn( obj => obj ),
		};
		selectors = {
			getStartTimeNoSeconds: jest.fn( () => '12:00' ),
			getEndTimeNoSeconds: jest.fn( () => '15:00' ),
			getWeek: jest.fn(),
			getMultiDay: jest.fn(),
		};
		args = {
			start_date: '2018-01-01 12:00:00',
			end_date: '2018-01-02 12:00:00',
			all_day: false,
			multi_day: false,
			timezone: 'UTC+0',
		};
	} );

	describe( 'handleAddition', () => {
		const _tempDate = global.Date;
		beforeAll( () => {
			global.Date = class _Date {
				constructor( date ) {
					return date;
				}
			};
		} );

		afterAll( () => {
			global.Date = _tempDate;
		} );
		it( 'should add rule', () => {
			const gen = sagas.handleAddition( { actions } );
			expect( gen.next().value ).toEqual(
				select( datetime.getStart )
			);
			expect( gen.next( args.start_date ).value ).toEqual(
				select( datetime.getEnd )
			);
			expect( gen.next( args.end_date ).value ).toEqual(
				select( datetime.getAllDay )
			);
			expect( gen.next( args.all_day ).value ).toEqual(
				select( datetime.getMultiDay )
			);
			expect( gen.next( args.multi_day ).value ).toEqual(
				select( datetime.getTimeZone )
			);

			expect( gen.next( args.timezone ).value ).toEqual(
				call( momentUtil.toMoment, args.start_date )
			);
			expect( gen.next( args.start_date ).value ).toEqual(
				call( momentUtil.toMoment, args.end_date )
			);

			expect( gen.next( args.end_date ).value ).toEqual(
				call( momentUtil.toDatabaseDate, args.start_date )
			);
			expect( gen.next( args.start_date ).value ).toEqual(
				call( momentUtil.toDatabaseTime, args.start_date )
			);

			expect( gen.next( args.start_date ).value ).toEqual(
				call( momentUtil.toDatabaseDate, args.end_date )
			);
			expect( gen.next( args.end_date ).value ).toEqual(
				call( momentUtil.toDatabaseTime, args.end_date )
			);

			expect( gen.next( args.end_date ).value ).toEqual(
				call( momentUtil.toDate, args.start_date )
			);
			expect( gen.next( args.start_date ).value ).toEqual(
				call( momentUtil.toDate, args.end_date )
			);

			expect( gen.next().value ).toEqual(
				put(
					actions.add( {
						[ constants.KEY_TYPE ]: recurringConstants.SINGLE,
						[ constants.KEY_ALL_DAY ]: args.all_day,
						[ constants.KEY_MULTI_DAY ]: args.multi_day,
						[ constants.KEY_START_DATE ]: args.start_date,
						[ constants.KEY_START_DATE_INPUT ]: args.start_date,
						[ constants.KEY_START_DATE_OBJ ]: new Date( '2018-01-01T12:00:00.000Z' ),
						[ constants.KEY_START_TIME ]: args.start_date,
						[ constants.KEY_END_DATE ]: args.end_date,
						[ constants.KEY_END_DATE_INPUT ]: undefined,
						[ constants.KEY_END_DATE_OBJ ]: new Date( NaN ),
						[ constants.KEY_END_TIME ]: args.end_date,
						[ constants.KEY_BETWEEN ]: 1,
						[ constants.KEY_LIMIT_TYPE ]: recurringConstants.COUNT,
						[ constants.KEY_LIMIT ]: 7,
						[ constants.KEY_LIMIT_DATE_INPUT ]: undefined,
						[ constants.KEY_LIMIT_DATE_OBJ ]: new Date( NaN ),
						[ constants.KEY_DAYS ]: [],
						[ constants.KEY_WEEK ]: recurringConstants.FIRST,
						[ constants.KEY_DAY ]: 1,
						[ constants.KEY_MONTH ]: [],
						[ constants.KEY_TIMEZONE ]: args.timezone,
						[ constants.KEY_MULTI_DAY_SPAN ]: recurringConstants.NEXT_DAY,
					} )
				)
			);
		} );
	} );

	describe( 'handleTimeChange', () => {
		it( 'should handle time change when all-day', () => {
			const action = { payload: {
				[ constants.KEY_END_TIME ]: 'all-day',
			}, index: 0 };
			const gen = sagas.handleTimeChange( { actions, selectors }, action, constants.KEY_END_TIME );

			expect( gen.next().value ).toEqual(
				select( selectors.getMultiDay, action )
			);

			expect( gen.next().value ).toEqual(
				put( actions.sync( 0, {
					[ constants.KEY_ALL_DAY ]: true,
					[ constants.KEY_START_TIME ]: '00:00:00',
					[ constants.KEY_END_TIME ]: '23:59:59',
				} ) )
			);

			expect( gen.next().done ).toEqual( true );
		} );
		describe( 'handle non-multi', () => {
			it( 'should handle start time changes', () => {
				const action = { payload: {
					[ constants.KEY_START_TIME ]: '12:00',
				}, index: 0 };
				const gen = sagas.handleTimeChange( { actions, selectors }, action, constants.KEY_START_TIME );

				expect( gen.next().value ).toEqual(
					select( selectors.getMultiDay, action )
				);

				expect( gen.next().value ).toEqual(
					select( selectors.getEndTimeNoSeconds, action )
				);

				expect( gen.next( '15:00' ).value ).toEqual(
					put( actions.sync( 0, {
						[ constants.KEY_ALL_DAY ]: false,
						[ constants.KEY_START_TIME ]: '12:00:00',
					} ) )
				);

				expect( gen.next().value ).toEqual(
					call( sagas.preventEndTimeBeforeStartTime, { actions }, {
						startTime: action.payload[ constants.KEY_START_TIME ],
						endTime: '15:00',
					}, action )
				);

				expect( gen.next().done ).toEqual( true );
			} );
			it( 'should handle end time changes', () => {
				const action = { payload: {
					[ constants.KEY_END_TIME ]: '12:00',
				}, index: 0 };
				const gen = sagas.handleTimeChange( { actions, selectors }, action, constants.KEY_END_TIME );

				expect( gen.next().value ).toEqual(
					select( selectors.getMultiDay, action )
				);

				expect( gen.next().value ).toEqual(
					select( selectors.getStartTimeNoSeconds, action )
				);

				expect( gen.next( '15:00' ).value ).toEqual(
					put( actions.sync( 0, {
						[ constants.KEY_ALL_DAY ]: false,
						[ constants.KEY_END_TIME ]: '12:00:00',
					} ) )
				);

				expect( gen.next().value ).toEqual(
					call( sagas.preventStartTimeAfterEndTime, { actions }, {
						startTime: '15:00',
						endTime: action.payload[ constants.KEY_END_TIME ],
					}, action )
				);

				expect( gen.next().done ).toEqual( true );
			} );
		} );
		it( 'should handle multi day changes', () => {
			const action = { payload: {
				[ constants.KEY_END_TIME ]: '12:00',
			}, index: 0 };
			const gen = sagas.handleTimeChange( { actions, selectors }, action, constants.KEY_END_TIME );

			expect( gen.next().value ).toEqual(
				select( selectors.getMultiDay, action )
			);

			expect( gen.next( true ).value ).toEqual(
				put( actions.sync( 0, {
					[ constants.KEY_ALL_DAY ]: false,
					[ constants.KEY_END_TIME ]: '12:00:00',
				} ) )
			);

			expect( gen.next().done ).toEqual( true );
		} );
	} );

	describe( 'handleMultiDayChange', () => {
		it( 'should do nothing', () => {
			const gen = sagas.handleMultiDayChange( { actions, selectors }, {
				payload: {
					[ constants.KEY_MULTI_DAY ]: true,
				},
				index: 0,
			}, constants.KEY_MULTI_DAY );

			gen.next().value;

			expect( gen.next().done ).toEqual( true );
		} );
		it( 'should handle when not multi day', () => {
			const startTime = '12:00';
			const endTime = '12:00';
			const action = {
				payload: {
					[ constants.KEY_MULTI_DAY ]: false,
				},
				index: 0,
			};

			const gen = sagas.handleMultiDayChange( { actions, selectors }, action, constants.KEY_MULTI_DAY );

			expect( gen.next().value ).toEqual(
				select( selectors.getStartTimeNoSeconds, action )
			);
			expect( gen.next( startTime ).value ).toEqual(
				select( selectors.getEndTimeNoSeconds, action )
			);
			expect( gen.next( endTime ).value ).toEqual(
				call( sagas.preventEndTimeBeforeStartTime, { actions }, { startTime, endTime }, action )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );

	describe( 'handleWeekChange', () => {
		it( 'should sync week', () => {
			const action = {
				index: 0,
				payload: {
					[ constants.KEY_WEEK ]: 1,
				},
			};
			const gen = sagas.handleWeekChange( { actions, selectors }, action, constants.KEY_WEEK );

			expect( gen.next().value ).toEqual(
				select( selectors.getWeek, action )
			);

			expect( gen.next( false ).value ).toEqual(
				put(
					actions.sync( action.index, {
						[ constants.KEY_WEEK ]: 1,
						[ constants.KEY_DAY ]: 1,
					} )
				)
			);

			expect( gen.next().done ).toBeTruthy();
		} );
	} );

	describe( 'preventEndTimeBeforeStartTime', () => {
		it( 'should adjust time when start and end time are the same', () => {
			const startTime = '12:00';
			const endTime = '12:00';
			const action = {
				payload: {
					[ constants.KEY_MULTI_DAY ]: false,
				},
				index: 0,
			};

			const gen = sagas.preventEndTimeBeforeStartTime( { actions }, { startTime, endTime }, action );

			expect( gen.next( endTime ).value ).toEqual(
				call( time.toSeconds, startTime, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next( 43200 ).value ).toEqual(
				call( time.toSeconds, endTime, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next( 43200 ).value ).toEqual(
				call( time.fromSeconds, 43200, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next( startTime ).value ).toEqual(
				call( time.fromSeconds, 45000, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next( '13:00' ).value ).toEqual(
				put( actions.sync( 0, {
					[ constants.KEY_START_TIME ]: `12:00:00`,
					[ constants.KEY_END_TIME ]: `13:00:00`,
				} ) )
			);
		} );
		it( 'should roll back start time when exceeds day time', () => {
			const startTime = '23:59';
			const endTime = '23:59';
			const action = {
				payload: {
					[ constants.KEY_MULTI_DAY ]: false,
				},
				index: 0,
			};

			const gen = sagas.preventEndTimeBeforeStartTime( { actions }, { startTime, endTime }, action );

			expect( gen.next( endTime ).value ).toEqual(
				call( time.toSeconds, startTime, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next( 86340 ).value ).toEqual(
				call( time.toSeconds, endTime, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next( 86340 ).value ).toEqual(
				call( time.fromSeconds, 82740, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next( startTime ).value ).toEqual(
				call( time.fromSeconds, 84540, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next().value ).toEqual(
				put( actions.sync( 0, {
					[ constants.KEY_START_TIME ]: `12:00:00`,
					[ constants.KEY_END_TIME ]: `13:00:00`,
				} ) )
			);
		} );
	} );
	describe( 'preventStartTimeAfterEndTime', () => {
		it( 'should adjust time when start and end time are the same', () => {
			const startTime = '12:00';
			const endTime = '12:00';
			const action = {
				payload: {
					[ constants.KEY_MULTI_DAY ]: false,
				},
				index: 0,
			};

			const gen = sagas.preventStartTimeAfterEndTime( { actions }, { startTime, endTime }, action );

			expect( gen.next().value ).toEqual(
				call( time.toSeconds, startTime, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next( 43200 ).value ).toEqual(
				call( time.toSeconds, endTime, time.TIME_FORMAT_HH_MM )
			);


			expect( gen.next( 43200 ).value ).toEqual(
				call( time.fromSeconds, 41400, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next( startTime ).value ).toEqual(
				call( time.fromSeconds, 43200, time.TIME_FORMAT_HH_MM )
			);


			expect( gen.next( '11:30' ).value ).toEqual(
				put( actions.sync( 0, {
					[ constants.KEY_START_TIME ]: `11:30:00`,
					[ constants.KEY_END_TIME ]: `12:00:00`,
				} ) )
			);
		} );
		it( 'should handle when start time would be on previous day', () => {
			const startTime = '00:00';
			const endTime = '00:00';
			const action = {
				payload: {
					[ constants.KEY_MULTI_DAY ]: false,
				},
				index: 0,
			};

			const gen = sagas.preventStartTimeAfterEndTime( { actions }, { startTime, endTime }, action );

			expect( gen.next( endTime ).value ).toEqual(
				call( time.toSeconds, startTime, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next( 0 ).value ).toEqual(
				call( time.toSeconds, endTime, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next( 0 ).value ).toEqual(
				call( time.fromSeconds, 0, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next( startTime ).value ).toEqual(
				call( time.fromSeconds, 60, time.TIME_FORMAT_HH_MM )
			);
			expect( gen.next().value ).toEqual(
				put( actions.sync( 0, {
					[ constants.KEY_START_TIME ]: `00:00:00`,
					[ constants.KEY_END_TIME ]: `00:01:00`,
				} ) )
			);
		} );
	} );

	describe( 'handleLimitTypeChange', () => {
		let action, payload;
		beforeEach( () => {
			payload = {};
			action = {
				index: 0,
				payload,
			};
		} );

		it( 'should handle date changes', () => {
			payload[ constants.KEY_LIMIT ] = recurringConstants.DATE;
			const gen = sagas.handleLimitTypeChange( { actions }, action, constants.KEY_LIMIT );

			expect( gen.next().value ).toEqual(
				select( datetime.getStart )
			);

			expect( gen.next( '2018-01-01' ).value ).toEqual(
				call( momentUtil.toMoment, '2018-01-01' )
			);

			expect( gen.next( '2018-01-01' ).value ).toEqual(
				call( momentUtil.toDatabaseDate, '2018-01-01' )
			);

			expect( gen.next().value ).toEqual(
				put( actions.sync( action.index, {
					[ constants.KEY_LIMIT ]: '2018-01-01',
				} ) )
			);

			expect( gen.next().done ).toBeTruthy();
		} );

		it( 'should handle count changes', () => {
			payload[ constants.KEY_LIMIT ] = recurringConstants.COUNT;
			const gen = sagas.handleLimitTypeChange( { actions }, action, constants.KEY_LIMIT );

			expect( gen.next().value ).toEqual(
				put( actions.sync( action.index, {
					[ constants.KEY_LIMIT ]: 1,
				} ) )
			);
			expect( gen.next().done ).toBeTruthy();
		} );

		it( 'should handle never ending changes', () => {
			const gen = sagas.handleLimitTypeChange( { actions }, action, constants.KEY_LIMIT );

			expect( gen.next().value ).toEqual(
				put( actions.sync( action.index, {
					[ constants.KEY_LIMIT ]: null,
				} ) )
			);

			expect( gen.next().done ).toBeTruthy();
		} );
	} );

	describe( 'handleTimezoneChange', () => {
		it( 'should sync timezone', () => {
			const action = {
				index: 0,
				payload: {
					[ constants.KEY_TIMEZONE ]: 'UTC+0',
				},
			};
			const gen = sagas.handleTimezoneChange( { actions }, action, constants.KEY_TIMEZONE );

			expect( gen.next().value ).toEqual(
				put( actions.sync( action.index, {
					[ constants.KEY_TIMEZONE ]: action.payload[ constants.KEY_TIMEZONE ],
				} ) )
			);

			expect( gen.next().done ).toBeTruthy();
		} );
	} );
} );
