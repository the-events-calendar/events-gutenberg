/**
 * Internal Dependencies
 */
import { PREFIX_EVENTS_PRO_STORE } from '@moderntribe/events-pro/data/prefix';
import * as types from '../types';

describe( 'Recurrence types', () => {
	test( 'add rule field', () => {
		expect( types.ADD_RULE_FIELD ).toEqual( `${ PREFIX_EVENTS_PRO_STORE }/ADD_RULE_FIELD` );
	} );

	test( 'add rule', () => {
		expect( types.ADD_RULE ).toEqual( `${ PREFIX_EVENTS_PRO_STORE }/ADD_RULE` );
	} );

	test( 'remove rule field', () => {
		expect( types.REMOVE_RULE_FIELD ).toEqual( `${ PREFIX_EVENTS_PRO_STORE }/REMOVE_RULE_FIELD` );
	} );

	test( 'remove rule', () => {
		expect( types.REMOVE_RULE ).toEqual( `${ PREFIX_EVENTS_PRO_STORE }/REMOVE_RULE` );
	} );

	test( 'edit rule', () => {
		expect( types.EDIT_RULE ).toEqual( `${ PREFIX_EVENTS_PRO_STORE }/EDIT_RULE` );
	} );

	test( 'sync rules from database', () => {
		expect( types.SYNC_RULES_FROM_DB ).toEqual( `${ PREFIX_EVENTS_PRO_STORE }/SYNC_RULES_FROM_DB` );
	} );
} );
