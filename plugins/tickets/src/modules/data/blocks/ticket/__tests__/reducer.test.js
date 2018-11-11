/**
 * Internal dependencies
 */
import reducer, { DEFAULT_STATE } from '../reducer';
import * as actions from '../actions';

describe( 'Reducer', () => {
	it( 'should set the default state', () => {
		expect( reducer( undefined, {} ) ).toEqual( DEFAULT_STATE );
	} );

	it( 'should set the header', () => {
		expect( reducer(
			DEFAULT_STATE,
			actions.setTicketsHeader( { header: 1 } ),
		) ).toMatchSnapshot();
	} );

	it( 'should set the is settings open', () => {
		expect( reducer(
			DEFAULT_STATE,
			actions.setTicketsIsSettingsOpen( true ),
		) ).toMatchSnapshot();
	} );

	it( 'should set the is parent block loading', () => {
		expect( reducer(
			DEFAULT_STATE,
			actions.setTicketsIsParentBlockLoading( true ),
		) ).toMatchSnapshot();
	} );

	it( 'should set the is child block selected', () => {
		expect( reducer(
			DEFAULT_STATE,
			actions.setTicketsIsChildBlockSelected( true ),
		) ).toMatchSnapshot();
	} );

	it( 'should set the is parent block selected', () => {
		expect( reducer(
			DEFAULT_STATE,
			actions.setTicketsIsParentBlockSelected( true ),
		) ).toMatchSnapshot();
	} );

	it( 'should set the active child block id', () => {
		expect( reducer(
			DEFAULT_STATE,
			actions.setTicketsActiveChildBlockId( 'modern-tribe' ),
		) ).toMatchSnapshot();
	} );

	it( 'should set the provider', () => {
		expect( reducer(
			DEFAULT_STATE,
			actions.setTicketsProvider( 'provider' ),
		) ).toMatchSnapshot();
	} );

	it( 'should set the shared capacity', () => {
		expect( reducer(
			DEFAULT_STATE,
			actions.setTicketsSharedCapacity( 99 ),
		) ).toMatchSnapshot();
	} );

	it( 'should set the temp shared capacity', () => {
		expect( reducer(
			DEFAULT_STATE,
			actions.setTicketsTempSharedCapacity( 99 ),
		) ).toMatchSnapshot();
	} );
} );
