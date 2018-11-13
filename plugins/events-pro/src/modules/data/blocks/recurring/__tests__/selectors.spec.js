/**
 * Internal Dependencies
 */
import { constants as pluginsConstants } from '@moderntribe/common/data/plugins';
import { constants as blocksConstants } from '@moderntribe/events-pro/data/blocks';
import * as selectors from '../selectors';

describe( 'Recurrence selectors', () => {
	let rule, state, ownProps;
	beforeEach( () => {
		rule = {
			[ blocksConstants.KEY_TYPE ]: 'single',
			[ blocksConstants.KEY_ALL_DAY ]: false,
			[ blocksConstants.KEY_MULTI_DAY ]: true,
			[ blocksConstants.KEY_START_DATE ]: '2018-09-21',
			[ blocksConstants.KEY_START_DATE_INPUT]: 'September 21, 2018',
			[ blocksConstants.KEY_START_DATE_OBJ]: new Date( 'September 21, 2018' ),
			[ blocksConstants.KEY_START_TIME ]: '14:53',
			[ blocksConstants.KEY_END_DATE ]: '2019-05-14',
			[ blocksConstants.KEY_END_DATE_INPUT ]: 'May 14, 2019',
			[ blocksConstants.KEY_END_DATE_OBJ ]: new Date( 'May 14, 2019' ),
			[ blocksConstants.KEY_END_TIME ]: '09:43',
			[ blocksConstants.KEY_BETWEEN ]: 1,
			[ blocksConstants.KEY_LIMIT_TYPE ]: 'count',
			[ blocksConstants.KEY_LIMIT ]: 7,
			[ blocksConstants.KEY_LIMIT_DATE_INPUT ]: 'May 14, 2019',
			[ blocksConstants.KEY_LIMIT_DATE_OBJ ]: new Date( 'May 14, 2019' ),
			[ blocksConstants.KEY_DAYS ]: [],
			[ blocksConstants.KEY_WEEK ]: 'first',
			[ blocksConstants.KEY_DAY ]: 1,
			[ blocksConstants.KEY_MONTH ]: [],
			[ blocksConstants.KEY_TIMEZONE ]: 'UTC',
			[ blocksConstants.KEY_MULTI_DAY_SPAN ]: 'next_day',
		};
		state = {
			[ pluginsConstants.EVENTS_PRO_PLUGIN ]: {
				blocks: {
					recurring: [ rule ],
				},
			},
		};
		ownProps = {
			index: 0,
		};
	} );

	test( 'getRules', () => {
		expect( selectors.getRules( state ) ).toMatchSnapshot();
	} );

	test( 'getRulesCount', () => {
		expect( selectors.getRulesCount( state ) ).toEqual( 1 );
	} );

	test( 'hasRules', () => {
		expect( selectors.hasRules( state ) ).toEqual( true );
	} );

	test( 'getIndex', () => {
		expect( selectors.getIndex( state, ownProps ) ).toEqual( ownProps.index );
	} );

	test( 'getRule', () => {
		expect( selectors.getRule( state, ownProps) ).toMatchSnapshot();
	} );

	test( 'getType', () => {
		expect( selectors.getType( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_TYPE ] );
	} );

	test( 'getAllDay', () => {
		expect( selectors.getAllDay( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_ALL_DAY ] );
	} );

	test( 'getMultiDay', () => {
		expect( selectors.getMultiDay( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_MULTI_DAY ] );
	} );

	test( 'getMultiDaySpan', () => {
		expect( selectors.getMultiDaySpan( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_MULTI_DAY_SPAN ] );
	} );

	test( 'getStartDate', () => {
		expect( selectors.getStartDate( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_START_DATE ] );
	} );

	test( 'getStartDateObj', () => {
		expect( selectors.getStartDateObj( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_START_DATE_OBJ ] );
	} );

	test( 'getStartDateInput', () => {
		expect( selectors.getStartDateInput( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_START_DATE_INPUT ] );
	} );

	test( 'getStartTime', () => {
		expect( selectors.getStartTime( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_START_TIME ] );
	} );

	test( 'getStartTimeNoSeconds', () => {
		expect( selectors.getStartTimeNoSeconds( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_START_TIME ].slice( 0, -3 ) );
	} );

	test( 'getEndDate', () => {
		expect( selectors.getEndDate( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_END_DATE ] );
	} );

	test( 'getEndDateObj', () => {
		expect( selectors.getEndDateObj( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_END_DATE_OBJ ] );
	} );

	test( 'getEndDateInput', () => {
		expect( selectors.getEndDateInput( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_END_DATE_INPUT ] );
	} );

	test( 'getEndTime', () => {
		expect( selectors.getEndTime( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_END_TIME ] );
	} );

	test( 'getEndTimeNoSeconds', () => {
		expect( selectors.getEndTimeNoSeconds( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_END_TIME ].slice( 0, -3 ) );
	} );

	test( 'getBetween', () => {
		expect( selectors.getBetween( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_BETWEEN ] );
	} );

	test( 'getLimitType', () => {
		expect( selectors.getLimitType( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_LIMIT_TYPE ] );
	} );

	test( 'getLimit', () => {
		expect( selectors.getLimit( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_LIMIT ] );
	} );

	test( 'getLimitDateObj', () => {
		expect( selectors.getLimitDateObj( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_LIMIT_DATE_OBJ ] );
	} );

	test( 'getLimitDateInput', () => {
		expect( selectors.getLimitDateInput( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_LIMIT_DATE_INPUT ] );
	} );

	test( 'getDays', () => {
		expect( selectors.getDays( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_DAYS ] );
	} );

	test( 'getDay', () => {
		expect( selectors.getDay( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_DAY ] );
	} );

	test( 'getMonth', () => {
		expect( selectors.getMonth( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_MONTH ] );
	} );

	test( 'getWeek', () => {
		expect( selectors.getWeek( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_WEEK ] );
	} );

	test( 'getTimezone', () => {
		expect( selectors.getTimezone( state, ownProps ) )
			.toEqual( rule[ blocksConstants.KEY_TIMEZONE ] );
	} );

	test( 'getTypeOption', () => {
		expect( selectors.getTypeOption( state, ownProps ) ).toMatchSnapshot();
	} );

	test( 'getLimitTypeOption', () => {
		expect( selectors.getLimitTypeOption( state, ownProps ) ).toMatchSnapshot();
	} );
} );
