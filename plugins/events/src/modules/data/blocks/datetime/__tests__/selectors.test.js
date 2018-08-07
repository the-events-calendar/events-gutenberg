/**
 * Internal dependencies
 */
import { selectors } from '@moderntribe/events/data/blocks/datetime';
import { DEFAULT_STATE } from '@moderntribe/events/data/blocks/datetime/reducers';

const state = {
	blocks: {
		datetime: DEFAULT_STATE,
	},
};

describe( '[STORE] - Datetime selectors', () => {
	it( 'Should return the block', () => {
		expect( selectors.datetimeSelector( state ) ).toEqual( DEFAULT_STATE );
	} );

	it( 'Should return the all day', () => {
		expect( selectors.getAllDay( state ) ).toEqual( DEFAULT_STATE.allDay );
	} );

	it( 'Should return the start date', () => {
		expect( selectors.getStart( state ) ).toEqual( DEFAULT_STATE.start );
	} );

	it( 'Should return the end date', () => {
		expect( selectors.getEnd( state ) ).toEqual( DEFAULT_STATE.end );
	} );

	it( 'Should return the timezone', () => {
		expect( selectors.getTimeZone( state ) ).toEqual( DEFAULT_STATE.timezone );
	} );

	it( 'Should return the multiday', () => {
		expect( selectors.getMultiDay( state ) ).toEqual( DEFAULT_STATE.multiDay );
	} );

	it( 'Should return the date separator', () => {
		expect( selectors.getDateSeparator( state ) ).toEqual( DEFAULT_STATE.dateTimeSeparator );
	} );

	it( 'Should return timee range separator', () => {
		expect( selectors.getTimeSeparator( state ) ).toEqual( DEFAULT_STATE.timeRangeSeparator );
	} );
} );
