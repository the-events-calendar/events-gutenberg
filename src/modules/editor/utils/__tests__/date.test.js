/**
 * Internal dependencies
 */
import {
	FORMATS,
	TODAY,
	equalDates,
	timezones,
	timezonesAsSelectData,
	toNaturalLanguage,
	rangeToNaturalLanguage,
} from 'utils/date';

import {
	toMoment,
} from 'utils/moment';

jest.mock( 'elements/timezone-picker/element', () => ( {
	getItems: () => [
		{
			options: [
				{
					key: 'America/Argentina/Buenos_Aires',
					text: 'Argentina - Buenos Aires',
				},
			],
		},
		{
			options: [
				{
					key: 'America/Argentina/Catamarca',
					text: 'Argentina - Catamarca',
				},
			],
		},
	],
} ) );

afterAll( () => {
	jest.unmock( 'elements/timezone-picker/element' );
} );

describe( 'Tests for date.js', () => {
	test( 'formats', () => {
		const draft = {
			TIME: 'HH:mm:ss',
			DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
			WP: {
				time: 'g:i a',
				date: 'F j, Y',
				datetime: 'F j, Y g:i a',
				dateNoYear: 'F j',
			},
			DATABASE: {
				date: 'Y-m-d',
				datetime: 'Y-m-d H:i:s',
				time: 'H:i:s',
			},
			TIMEZONE: {
				string: 'UTC',
			},
		};
		expect( FORMATS ).toEqual( draft );
	} );

	test( 'today', () => {
		const now = new Date();
		expect( TODAY ).toBeInstanceOf( Date );
		expect( TODAY ).hasOwnProperty( 'getDay' );
		expect( TODAY.getDay() ).toEqual( now.getDay() );
	} );

	test( 'equalDates', () => {
		expect( equalDates( new Date(), new Date(), new Date(), new Date() ) ).toEqual( true );
		// Falsy tests
		const b = new Date();
		b.setDate( b.getDate() + 1 );
		expect( equalDates( new Date(), b ) ).toEqual( false );
		expect( equalDates( new Date(), new Date(), new Date(), null ) ).toEqual( false );
		expect( equalDates( null, new Date() ) ).toEqual( false );
		expect( equalDates() ).toEqual( false );
	} );

	test( 'timezones', () => {
		const expected = [
			{
				key: 'America/Argentina/Buenos_Aires',
				text: 'Argentina - Buenos Aires',
			},
			{
				key: 'America/Argentina/Catamarca',
				text: 'Argentina - Catamarca',
			},
		];
		expect( timezones() ).toEqual( expected );
	} );

	test( 'timezonesAsSelectData', () => {
		const expected = [
			{
				value: 'America/Argentina/Buenos_Aires',
				label: 'Argentina - Buenos Aires',
			},
			{
				value: 'America/Argentina/Catamarca',
				label: 'Argentina - Catamarca',
			},
		];
		expect( timezonesAsSelectData() ).toEqual( expected );
	} );

	describe( 'toNaturalLanguage', () => {
		it( 'Should return empty string when non parsed', () => {
			expect( toNaturalLanguage( null ) ).toEqual( { moment: null, text: '' } );
			expect( toNaturalLanguage( undefined ) ).toEqual( { moment: null, text: '' } );
			expect( toNaturalLanguage( '' ) ).toEqual( { moment: '', text: '' } );
		} );

		it( 'Should return the parsed date', () => {
			expect( toNaturalLanguage( '2018-05-04 17:00:00' ) )
				.toEqual( {
					moment: toMoment( '2018-05-04 17:00:00' ),
					text: 'May 4 2018 at 5:00 pm',
				} );
			expect( toNaturalLanguage( '2019-12-24 12:00:00' ) )
				.toEqual( {
					moment: toMoment( '2019-12-24 12:00:00' ),
					text: 'Dec 24 2019 at 12:00 pm',
				} );
		} );
	} );

	describe( 'rangeToNaturalLanguage', () => {
		it( 'Should return empty string when range is invalid', () => {
			expect( rangeToNaturalLanguage( null, null ) ).toBe( '' );
			expect( rangeToNaturalLanguage( undefined, undefined ) ).toBe( '' );
			expect( rangeToNaturalLanguage( '', '' ) ).toBe( '' );
		} );

		it( 'Should return only the start date', () => {
			expect( rangeToNaturalLanguage( '2019-12-24 12:00:00' ) )
				.toBe( 'Dec 24 2019 at 12:00 pm' );
			expect( rangeToNaturalLanguage( '2019-12-24 12:00:00', '' ) )
				.toBe( 'Dec 24 2019 at 12:00 pm' );
		} );

		it( 'Should return the range', () => {
			expect( rangeToNaturalLanguage( '2019-12-24 12:00:00', '2019-12-24 17:00:00' ) )
				.toBe( 'Dec 24 2019 at 12:00 pm - Dec 24 2019 at 5:00 pm' );
		} );
	} );
} );
