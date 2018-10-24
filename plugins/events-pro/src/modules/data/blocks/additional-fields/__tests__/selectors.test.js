/**
 * Internal dependencies
 */
import { selectors } from '@moderntribe/events-pro/data/blocks/additional-fields';
import { constants } from '@moderntribe/common/data/plugins';
import { DEFAULT_STATE } from '../reducers/field';

const { EVENTS_PRO_PLUGIN } = constants;
const state = {
	[ EVENTS_PRO_PLUGIN ]: {
		blocks: {
			additionalFields: {
				byId: {
					tribe: DEFAULT_STATE,
				},
				allIds: [ 'tribe' ],
			},
		},
	},
};

describe( 'Addditional fields selectors', () => {
	const name = 'tribe';
	let newState = {};
	let additionalFields = {};

	beforeEach( () => {
		newState = { ...state };
		additionalFields = newState[ EVENTS_PRO_PLUGIN ].blocks.additionalFields;
	} );

	test( 'Events Pro block', () => {
		expect( selectors.getPlugin( state ) ).toEqual( state[ EVENTS_PRO_PLUGIN ] );
	} );

	test( 'Select blocks', () => {
		expect( selectors.getBlocks( state ) ).toEqual( state[ EVENTS_PRO_PLUGIN ].blocks );
	} );

	test( 'Select additional fields', () => {
		expect( selectors.getAdditionalFields( state ) )
			.toEqual( additionalFields );
	} );

	test( 'Get block name', () => {
		expect( selectors.getFieldName( state, { name } ) ).toBe( name );
	} );

	test( 'Get all the ids', () => {
		expect( selectors.getIds( state ) )
			.toEqual( additionalFields.allIds );
	} );

	test( 'Get object of ids', () => {
		expect( selectors.getFieldAsObjects( state ) )
			.toEqual( additionalFields.byId );
	} );

	test( 'Get field block', () => {
		expect( selectors.getFieldBlock( state, { name: 'tribe' } ) )
			.toEqual( additionalFields.byId.tribe );
	} );

	test( 'Get field divider list', () => {
		expect( selectors.getFieldDividerList( state, { name: 'tribe' } ) )
			.toEqual( additionalFields.byId.tribe.dividerList );
	} );

	test( 'Get field divider end', () => {
		expect( selectors.getFieldDividerEnd( state, { name: 'tribe' } ) )
			.toEqual( additionalFields.byId.tribe.dividerEnd );
	} );

	test( 'Get field type', () => {
		expect( selectors.getFieldType( state, { name: 'tribe' } ) )
			.toEqual( additionalFields.byId.tribe.type );
	} );

	test( 'Get field value', () => {
		expect( selectors.getFieldValue( state, { name: 'tribe' } ) )
			.toEqual( additionalFields.byId.tribe.type );
	} );

	test( 'Get field is pristine', () => {
		expect( selectors.getFieldIsPristine( state, { name: 'tribe' } ) )
			.toEqual( additionalFields.byId.tribe.isPristine );
	} );

	test( 'Get field options', () => {
		expect( selectors.getFieldOptions( state, { name: 'tribe' } ) )
			.toEqual( additionalFields.byId.tribe.options );
	} );
} );
