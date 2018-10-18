/**
 * Internal dependencies
 */
import { selectors } from '@moderntribe/events-pro/data/blocks/additional-fields';
import { constants } from '@moderntribe/common/data/plugins';

const { EVENTS_PRO_PLUGIN } = constants;

const state = {
	[ EVENTS_PRO_PLUGIN ]: {
		blocks: {
			additionalFields: {},
		},
	},
};

describe( 'Addditional fields selectors', () => {
	test( 'Events Pro block', () => {
		expect( selectors.getPlugin( state ) ).toEqual( state[ EVENTS_PRO_PLUGIN ] );
	} );

	test( 'Select blocks', () => {
		expect( selectors.getBlocks( state ) ).toEqual( state[ EVENTS_PRO_PLUGIN ].blocks );
	} );

	test( 'Select additional fields', () => {
		expect( selectors.getAdditionalFields( state ) )
			.toEqual( state[ EVENTS_PRO_PLUGIN ].blocks.additionalFields );
	} );
} );
