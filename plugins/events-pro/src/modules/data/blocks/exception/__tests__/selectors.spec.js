/**
 * Internal Dependencies
 */
import { constants as pluginsConstants } from '@moderntribe/common/data/plugins';
import { constants as blocksConstants } from '@moderntribe/events-pro/data/blocks';
import * as selectors from '../selectors';

describe( 'Exception Selectors', () => {
	let exception, state, ownProps;
	beforeEach( () => {
		exception = {
			[ blocksConstants.KEY_TYPE ]: 'single',
			[ blocksConstants.KEY_ALL_DAY ]: false,
			[ blocksConstants.KEY_MULTI_DAY ]: true,
			[ blocksConstants.KEY_START_DATE ]: '2018-09-21',
			[ blocksConstants.KEY_START_DATE_INPUT ]: 'September 21, 2018',
			[ blocksConstants.KEY_START_DATE_OBJ ]: new Date( 'September 21, 2018' ),
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
					exception: [ exception ],
				},
			},
		};
		ownProps = {
			index: 0,
		};
	} );

	const keys = Object.keys( selectors );

	keys.forEach( ( key ) => {
		test( key, () => {
			expect( selectors[ key ]( state, ownProps ) ).toMatchSnapshot();
		} );
	} );
} );
