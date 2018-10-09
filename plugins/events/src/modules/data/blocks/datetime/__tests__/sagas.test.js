/**
 * External dependencies
 */
import { takeEvery, put, call, select, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

/**
 * Internal Dependencies
 */
import { types, actions, selectors, thunks } from '@moderntribe/events/data/blocks/datetime';
import watchers, {
	onHumanReadableChange,
	setHumanReadableFromDate,
	setHumanReadableLabel,
	resetNaturalLanguageLabel,
} from '@moderntribe/events/data/blocks/datetime/sagas';
import moment from 'moment';
import { toDateTime } from '@moderntribe/common/utils/moment';

describe( 'Event Date time Block sagas', () => {
	describe( 'watchers', () => {
		test( 'watcher actions', () => {
			const gen = watchers();
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_START_DATE_TIME, setHumanReadableFromDate )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_END_DATE_TIME, setHumanReadableFromDate )
			);
			expect( gen.next().value ).toEqual(
				takeLatest( types.SET_NATURAL_LANGUAGE_LABEL, onHumanReadableChange )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );

	describe( 'setHumanReadableLabel', () => {
		test( 'No date provided', () => {
			const gen = setHumanReadableLabel();

			expect( gen.next().value ).toEqual(
				select( selectors.getNaturalLanguageLabel ),
			);

			expect( gen.next().value ).toEqual(
				put( actions.setNaturalLanguageLabel( '' ) ),
			);

			expect( gen.next().done ).toEqual( true );
		} );

		test( 'Custom data is provided', () => {
			const gen = setHumanReadableLabel({
				start: moment( '12-25-2017', 'MM-DD-YYYY' ),
				end: moment( '12-25-2018', 'MM-DD-YYYY' ),
			} );

			expect( gen.next().value ).toEqual(
				select( selectors.getNaturalLanguageLabel ),
			);

			expect( gen.next().value ).toEqual(
				put( actions.setNaturalLanguageLabel( 'Dec 25 2017 at 12:00 am - Dec 25 2018 at 12:00 am' ) ),
			);

			expect( gen.next().done ).toEqual( true );
		} );
	} );

	describe( 'setHumanReadableFromDate', () => {
		test( 'When called from start date', () => {
			const formated = toDateTime( moment( '12-25-2018', 'MM-DD-YYYY' ) );
			const gen = setHumanReadableFromDate( actions.setStartDateTime( formated ) );
			expect( gen.next().value ).toEqual(
				select( selectors.getStart ),
			);

			expect( gen.next().value ).toEqual(
				select( selectors.getEnd ),
			);

			expect( gen.next().value ).toEqual(
				call( setHumanReadableLabel, { end: undefined, start: '2018-12-25 00:00:00' } )
			);

			expect( gen.next().done ).toBe( true );
		} );

		test( 'When called from end date', () => {
			const formated = toDateTime( moment( '12-25-2018', 'MM-DD-YYYY' ) );
			const gen = setHumanReadableFromDate( actions.setEndDateTime( formated ) );
			expect( gen.next().value ).toEqual(
				select( selectors.getStart ),
			);
			expect( gen.next().value ).toEqual(
				select( selectors.getEnd ),
			);
			expect( gen.next().value ).toEqual(
				call( setHumanReadableLabel, { start: undefined, end: '2018-12-25 00:00:00' } )
			);
			expect( gen.next().done ).toBe( true );
		} );
	} );

	describe( 'resetNaturalLanguageLabel', () => {
		test( 'Select values from state', () => {
			const gen = resetNaturalLanguageLabel();
			const start = toDateTime( moment( '12-25-2018 12:30', 'MM-DD-YYYY HH:mm' ) );
			const end = toDateTime( moment( '12-25-2018 14:40', 'MM-DD-YYYY HH:mm' ) );

			expect( gen.next().value ).toEqual(
				select( selectors.getStart )
			);

			expect( gen.next( start ).value ).toEqual(
				select( selectors.getEnd )
			);

			expect( gen.next( end ).value ).toEqual(
				call( setHumanReadableLabel, { start, end } ),
			);

			expect( gen.next().done ).toEqual( true );
		} );

		describe( 'onHumanReadableChange', () => {
			test( 'On change handler when dates are null', () => {
				const gen = onHumanReadableChange();

				expect( gen.next().value ).toEqual( call( delay, 350 ) );

				expect( gen.next().value ).toEqual(
					select( selectors.getNaturalLanguageLabel )
				);

				expect( gen.next().value ).toEqual(
					call( resetNaturalLanguageLabel )
				);

				expect( gen.next().done ).toEqual( true );
			} );

			test( 'On change handler when dates are set', () => {
				const gen = onHumanReadableChange();

				expect( gen.next().value ).toEqual( call( delay, 350 ) );
				const dates = {
					start: moment( '12-25-1995', 'MM-DD-YYYY' ),
					end: moment( '12-25-1995', 'MM-DD-YYYY' ),
				};

				expect( gen.next().value ).toEqual(
					select( selectors.getNaturalLanguageLabel )
				);

				// Test next action individually as for some reason the equal comparission is not
				// Returning true when both functions are the same.
				const nextAction = gen.next( dates.start ).value;
				expect( nextAction ).toHaveProperty( 'PUT' );
				expect( nextAction.PUT ).toHaveProperty( 'action' );
				expect( typeof nextAction.PUT.action ).toEqual( 'function' );

				expect( gen.next().done ).toEqual( true );
			} );
		} );
	} );
} );
