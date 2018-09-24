/**
 * External dependencies
 */
import { takeEvery, put, call, all } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

/**
 * Internal Dependencies
 */
import * as types from '../types';
import * as actions from '../actions';
import watchers, * as sagas from '../sagas';

describe( 'RSVP block sagas', () => {
	describe( 'watchers', () => {
		it( 'should watch actions', () => {
			const gen = watchers();
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_RSVP_HEADER, sagas.setRSVPHeader )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_RSVP_DETAILS, sagas.setRSVPDetails ),
			)
			expect( gen.next().done ).toEqual( true );
		} );
	} );

	describe( 'setRSVPHeader', () => {
		let action;
		beforeEach( () => {
			action = { payload: {
				title: 'title',
				description: 'description',
			} };
		} );

		it( 'should set header state properties', () => {
			const gen = cloneableGenerator( sagas.setRSVPHeader )( action );
			expect( gen.next().value ).toEqual(
				all( [
					put( actions.setRSVPTitle( 'title' ) ),
					put( actions.setRSVPDescription( 'description' ) ),
				] )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );

	describe( 'setRSVPHeader', () => {
		let action;
		beforeEach( () => {
			action = { payload: {
				capacity: '20',
				notGoingResponses: true,
				startDate: 'January 1, 2018',
				startTime: '12:34',
				endDate: 'January 4, 2018',
				endTime: '23:32'
			} };
		} );

		it( 'should set details state properties', () => {
			const gen = cloneableGenerator( sagas.setRSVPDetails )( action );
			expect( gen.next().value ).toEqual(
				all( [
					put( actions.setRSVPCapacity( '20' ) ),
					put( actions.setRSVPNotGoingResponses( true ) ),
					put( actions.setRSVPStartDate( 'January 1, 2018' ) ),
					put( actions.setRSVPStartTime( '12:34') ),
					put( actions.setRSVPEndDate( 'January 4, 2018' ) ),
					put( actions.setRSVPEndTime( '23:32' ) ),
				] )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );
} );
