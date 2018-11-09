/**
 * External dependencies
 */
import { some, noop } from 'lodash';
import { race, take, select, call, put } from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';
import { select as wpSelect, subscribe, dispatch as wpDispatch } from '@wordpress/data';
import 'whatwg-fetch';
import { allowEdits, disableEdits } from '@moderntribe/events/data/blocks/datetime/actions';

/**
 * Internal dependencies
 */
import * as recurringTypes from '@moderntribe/events-pro/data/blocks/recurring/types';
import * as actions from '../actions';
import * as selectors from '../selectors';
import watchers, * as sagas from '../sagas';

function mock() {
	return {
		select: jest.fn( () => ( {
			isSavingPost: noop,
			isPublishingPost: noop,
			getCurrentPostId: jest.fn( () => 1 ),
		} ) ),
		subscribe: jest.fn( () => noop ),
		dispatch: jest.fn( () => ( {
			removeNotice: noop,
			createSuccessNotice: noop,
		} ) ),
	};
}

jest.mock( '@wordpress/data', () => mock() );

describe( 'Status sagas', () => {
	describe( 'fetchStatus', () => {
		let _FormData, _Response, append, json;

		function FormDataMock() {
			this.append = append;
		}

		function ResponseMock() {
			this.json = json;
		}

		beforeAll( () => {
			_FormData = global.FormData;
			global.FormData = FormDataMock;
			global.Response = ResponseMock;
			global.tribe_js_config = {
				rest: {
					nonce: {
						queue_status_nonce: 'nonce',
					},
				},
			};
			global.ajaxurl = 'https://cool.com';
		} );

		beforeEach( () => {
			append = jest.fn();
			json = jest.fn();
		} );

		afterAll( () => {
			global.FormData = _FormData;
			global.Response = _Response;
			delete global.tribe_js_config;
			delete global.ajaxurl;
		} );

		it( 'should fetch successfully', () => {
			const gen = sagas.fetchStatus();

			expect( gen.next().value ).toMatchSnapshot();
			expect( append.mock.calls ).toMatchSnapshot();
			expect( gen.next().value ).toMatchSnapshot();
			expect( append.mock.calls ).toMatchSnapshot();
			expect( gen.next().value ).toMatchSnapshot();
			expect( append.mock.calls ).toMatchSnapshot();

			expect( gen.next().value ).toEqual(
				call( global.fetch, global.ajaxurl, {
					method: 'POST',
					credentials: 'same-origin',
					body: new FormData(),
				} )
			);

			const response = new Response();
			expect( gen.next( response ).value ).toEqual(
				call( [ response, 'json' ] )
			);
			expect( gen.next().done ).toBeTruthy();
		} );
		it( 'should handle errors', () => {
			const gen = sagas.fetchStatus();
			gen.next().value;
			expect( gen.throw().value ).toEqual( false );
			expect( gen.next().done ).toBeTruthy();
		} );
	} );

	describe( 'pollUntilSeriesCompleted', () => {
		it( 'should poll if not completed', () => {
			const gen = sagas.pollUntilSeriesCompleted();

			expect( gen.next().value ).toEqual(
				put( disableEdits() )
			);

			expect( gen.next().value ).toEqual(
				call( sagas.fetchStatus )
			);

			const response = { completed: false };
			expect( gen.next( response ).value ).toEqual(
				put( actions.setSeriesQueueStatus( response ) )
			);

			expect( gen.next().value ).toEqual(
				call(
					[ wpDispatch( 'core/editor' ), 'createSuccessNotice' ],
					sagas.NOTICES[ sagas.NOTICE_EDITING_SERIES ],
					{ id: sagas.NOTICE_EDITING_SERIES, isDismissible: false }
				)
			);

			expect( gen.next( false ).value ).toEqual(
				select( selectors.isCompleted )
			);

			expect( gen.next().value ).toEqual(
				call( delay, 1000 )
			);

			expect( gen.next().done ).toBeFalsy();
		} );
		it( 'should exit when completed', () => {
			const gen = sagas.pollUntilSeriesCompleted();

			expect( gen.next().value ).toEqual(
				put( disableEdits() )
			);

			expect( gen.next().value ).toEqual(
				call( sagas.fetchStatus )
			);

			const response = { completed: true };
			expect( gen.next( response ).value ).toEqual(
				put( actions.setSeriesQueueStatus( response ) )
			);

			expect( gen.next().value ).toEqual(
				call(
					[ wpDispatch( 'core/editor' ), 'createSuccessNotice' ],
					sagas.NOTICES[ sagas.NOTICE_EDITING_SERIES ],
					{ id: sagas.NOTICE_EDITING_SERIES, isDismissible: false }
				)
			);

			expect( gen.next( true ).value ).toEqual(
				select( selectors.isCompleted )
			);

			expect( gen.next( true ).value ).toEqual(
				put( allowEdits() )
			);

			expect( gen.next().value ).toEqual(
				call(
					[ wpDispatch( 'core/editor' ), 'removeNotice' ],
					sagas.NOTICE_EDITING_SERIES
				)
			);

			expect( gen.next().done ).toBeTruthy();
		} );
	} );

	describe( 'createWPEditorChannel', () => {
		it( 'should create channel', () => {
			expect( sagas.createWPEditorChannel() ).toMatchSnapshot();
		} );
	} );

	describe( 'actionTaker', () => {
		it( 'just takes actions', () => {
			const gen = sagas.actionTaker();

			expect( gen.next().value ).toEqual(
				take( [ recurringTypes.SYNC_RULES_FROM_DB ] )
			);

			expect( gen.next().done ).toBeTruthy();
		} );
	} );

	describe( 'watchers', () => {
		it( 'should watch for channel or action changes', () => {
			const gen = watchers();

			expect( gen.next().value ).toEqual(
				call( sagas.createWPEditorChannel )
			);

			expect( gen.next( 'Channel' ).value ).toEqual(
				race( [
					take( 'Channel' ),
					call( sagas.actionTaker ),
				] )
			);

			expect( gen.next( 'Channel' ).value ).toEqual(
				call( sagas.pollUntilSeriesCompleted )
			);

			expect( gen.next().done ).toBeFalsy();
		} );
	} );
} );
