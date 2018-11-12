/**
 * Internal dependencies
 */
import { PREFIX_EVENTS_PRO_STORE } from '@moderntribe/events-pro/data/prefix';
import { types } from '@moderntribe/events-pro/data/ui';

describe( '[STORE] - UI types', () => {
	test( 'toggle repeat events block visibility', () => {
		expect( types.TOGGLE_REPEAT_EVENTS_BLOCK_VISIBILITY )
			.toBe( `${ PREFIX_EVENTS_PRO_STORE }/TOGGLE_REPEAT_EVENTS_BLOCK_VISIBILITY` );
	} );

	test( 'toggle rule panel visibility', () => {
		expect( types.TOGGLE_RULE_PANEL_VISIBILITY )
			.toBe( `${ PREFIX_EVENTS_PRO_STORE }/TOGGLE_RULE_PANEL_VISIBILITY` );
	} );

	test( 'hide rule panel', () => {
		expect( types.HIDE_RULE_PANEL )
			.toBe( `${ PREFIX_EVENTS_PRO_STORE }/HIDE_RULE_PANEL` );
	} );

	test( 'toggle rule panel expand', () => {
		expect( types.TOGGLE_RULE_PANEL_EXPAND )
			.toBe( `${ PREFIX_EVENTS_PRO_STORE }/TOGGLE_RULE_PANEL_EXPAND` );
	} );

	test( 'expand rule panel', () => {
		expect( types.EXPAND_RULE_PANEL )
			.toBe( `${ PREFIX_EVENTS_PRO_STORE }/EXPAND_RULE_PANEL` );
	} );

	test( 'toggle exception panel visibility', () => {
		expect( types.TOGGLE_EXCEPTION_PANEL_VISIBILITY )
			.toBe( `${ PREFIX_EVENTS_PRO_STORE }/TOGGLE_EXCEPTION_PANEL_VISIBILITY` );
	} );

	test( 'hide exception panel', () => {
		expect( types.HIDE_EXCEPTION_PANEL )
			.toBe( `${ PREFIX_EVENTS_PRO_STORE }/HIDE_EXCEPTION_PANEL` );
	} );

	test( 'toggle exception panel expand', () => {
		expect( types.TOGGLE_EXCEPTION_PANEL_EXPAND )
			.toBe( `${ PREFIX_EVENTS_PRO_STORE }/TOGGLE_EXCEPTION_PANEL_EXPAND` );
	} );

	test( 'expand exception panel', () => {
		expect( types.EXPAND_EXCEPTION_PANEL )
			.toBe( `${ PREFIX_EVENTS_PRO_STORE }/EXPAND_EXCEPTION_PANEL` );
	} );
} );
