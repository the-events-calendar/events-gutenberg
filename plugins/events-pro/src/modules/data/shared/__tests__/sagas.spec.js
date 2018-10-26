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
	let actions, args;

	beforeEach( () => {
		actions = {
			sync: jest.fn(),
			add: jest.fn(),
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
		it( 'should add rule', () => {
			const gen = sagas.handleAddition();
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
			expect( gen.next().value ).toEqual(
				call( momentUtil.toMoment, args.end_date )
			);
		} );
	} );

	describe( 'handleExceptionRemoval', () => {
		it( 'should not hide exception panel', () => {
			const gen = sagas.handleExceptionRemoval();
			expect( gen.next().value ).toEqual(
				select( exception.selectors.getExceptions )
			);
			expect( gen.next( [{ id: 'uniqid' }] ).done ).toEqual( true );
		} );
		it( 'should hide exception panel', () => {
			const gen = sagas.handleExceptionRemoval();
			expect( gen.next().value ).toEqual(
				select( exception.selectors.getExceptions )
			);
			expect( gen.next( [] ).value ).toEqual(
				put( ui.actions.hideExceptionPanel() )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
	describe( 'handleExceptionAddition', () => {
		it( 'should add exception to store', () => {
			const gen = sagas.handleExceptionAddition();
			expect( gen.next().value ).toEqual(
				select( datetime.datetimeSelector )
			);
			const payload = { start: 'start' };
			expect( gen.next( payload ).value ).toEqual(
				put( exception.actions.addException( {
					type: recurring.constants.SINGLE,
					...payload,
				} ) )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
} );
