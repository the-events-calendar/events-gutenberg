/**
 * External dependencies
 */
import { takeEvery, put, select, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

/**
 * Internal Dependencies
 */
import * as types from '../types';
import * as actions from '../actions';
import watchers, * as sagas from '../sagas';
import * as selectors from '../selectors';
import * as utils from '@moderntribe/tickets/data/utils';
import { wpREST } from '@moderntribe/common/utils/api';

jest.mock( '@wordpress/data', () => ( {
	select: ( key ) => {
		if ( key === 'core/editor' ) {
			return {
				getCurrentPostId: () => 10,
				getEditedPostAttribute: ( attr ) => {
					if ( attr === 'date' ) {
						return '2018-11-09T19:48:42';
					}
				},
			};
		}
	},
} ) );

describe( 'Ticket Block sagas', () => {
	describe( 'watchers', () => {
		it( 'should watch actions', () => {
			const gen = watchers();
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKETS_INITIAL_STATE, sagas.setTicketsInitialState )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKET_INITIAL_STATE, sagas.setTicketInitialState )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.FETCH_TICKET, sagas.fetchTicket )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.CREATE_NEW_TICKET, sagas.createNewTicket )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.UPDATE_TICKET, sagas.updateTicket )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.DELETE_TICKET, sagas.deleteTicket )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.FETCH_TICKETS_HEADER_IMAGE, sagas.fetchTicketsHeaderImage )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.UPDATE_TICKETS_HEADER_IMAGE, sagas.updateTicketsHeaderImage )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.DELETE_TICKETS_HEADER_IMAGE, sagas.deleteTicketsHeaderImage )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKET_DETAILS, sagas.setTicketDetails )
			);
			expect( gen.next().value ).toEqual(
				takeEvery( types.SET_TICKET_TEMP_DETAILS, sagas.setTicketTempDetails )
			);
			expect( gen.next().done ).toEqual( true );
		} );
	} );

	describe( 'fetchTicketsHeaderImage', () => {
		it( 'should fetch tickets header image', () => {
			const action = {
				payload: {
					id: 99,
				},
			};
			const gen = cloneableGenerator( sagas.fetchTicketsHeaderImage )( action );

			expect( gen.next().value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( true ) )
			);
			expect( gen.next().value ).toEqual(
				call( wpREST, { path: `media/${ action.payload.id }` } )
			);

			const clone1 = gen.clone();
			const apiResponseBad = {
				response: {
					ok: false,
				},
				data: {},
			};

			expect( clone1.next( apiResponseBad ).value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( false ) )
			);
			expect( clone1.next().done ).toEqual( true );

			const clone2 = gen.clone();
			const apiResponseGood = {
				response: {
					ok: true,
				},
				data: {
					id: 99,
					alt_text: 'tribe',
					media_details: {
						sizes: {
							medium: {
								source_url: '#',
							},
						},
					},
				},
			};

			expect( clone2.next( apiResponseGood ).value ).toEqual(
				put( actions.setTicketsHeaderImage( {
					id: apiResponseGood.data.id,
					alt: apiResponseGood.data.alt_text,
					src: apiResponseGood.data.media_details.sizes.medium.source_url,
				} ) )
			);
			expect( clone2.next().value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( false ) )
			);
			expect( clone2.next().done ).toEqual( true );
		} );
	} );

	describe( 'updateTicketsHeaderImage', () => {
		it( 'should update tickets header image', () => {
			const action = {
				payload: {
					image: {
						id: 99,
						alt: 'tribe',
						sizes: {
							medium: {
								url: '#',
							},
						},
					},
				},
			};
			const gen = cloneableGenerator( sagas.updateTicketsHeaderImage )( action );

			expect( gen.next().value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( true ) )
			);
			expect( gen.next().value ).toEqual(
				call( wpREST, {
					path: `tribe_events/${ 10 }`,
					headers: {
						'Content-Type': 'application/json',
					},
					initParams: {
						method: 'PUT',
						body: JSON.stringify( {
							meta: {
								[ utils.KEY_TICKET_HEADER ]: `${ action.payload.image.id }`,
							},
						} ),
					},
				} )
			);

			const clone1 = gen.clone();
			const apiResponseBad = {
				response: {
					ok: false,
				},
			};

			expect( clone1.next( apiResponseBad ).value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( false ) )
			);
			expect( clone1.next().done ).toEqual( true );

			const clone2 = gen.clone();
			const apiResponseGood = {
				response: {
					ok: true,
				},
			};

			expect( clone2.next( apiResponseGood ).value ).toEqual(
				put( actions.setTicketsHeaderImage( {
					id: action.payload.image.id,
					alt: action.payload.image.alt,
					src: action.payload.image.sizes.medium.url,
				} ) )
			);
			expect( clone2.next().value ).toEqual(
				put( actions.setTicketsIsSettingsLoading( false ) )
			);
			expect( clone2.next().done ).toEqual( true );
		} );
	} );
} );
