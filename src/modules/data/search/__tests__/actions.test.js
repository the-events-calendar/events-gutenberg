/**
 * External dependencies
 */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */
import { actions, types } from 'data/search';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

describe( '[STORE] - Search actions', () => {
	it( 'Should add a block', () => {
		const expectedAction = {
			type: types.ADD_BLOCK,
			payload: {
				id: 1,
			},
		};
		expect( actions.addBlock( 1 ) ).toEqual( expectedAction );
	} );

	it( 'Should set the term', () => {
		const expectedAction = {
			type: types.SET_TERM,
			payload: {
				id: 1,
				term: 'lorem',
			},
		};
		expect( actions.setTerm( 1, 'lorem' ) ).toEqual( expectedAction );
	} );

	it( 'Should set the results', () => {
		const expectedAction = {
			type: types.SET_RESULTS,
			payload: {
				id: 1,
				results: [ 2 ],
			},
		};
		expect( actions.setResults( 1, [ 2 ] ) ).toEqual( expectedAction );
	} );

	it( 'Should add results', () => {
		const expectedAction = {
			type: types.ADD_RESULTS,
			payload: {
				id: 1,
				results: [ 2 ],
			},
		};
		expect( actions.addResults( 1, [ 2 ] ) ).toEqual( expectedAction );
	} );

	it( 'Should set total pages', () => {
		const expectedAction = {
			type: types.SET_TOTAL_PAGES,
			payload: {
				id: 1,
				totalPages: 10,
			},
		};
		expect( actions.setTotalPages( 1, 10 ) ).toEqual( expectedAction );
	} );

	it( 'Should set the page', () => {
		const expectedAction = {
			type: types.SET_PAGE,
			payload: {
				id: 1,
				page: 2,
			},
		};
		expect( actions.setPage( 1, 2 ) ).toEqual( expectedAction );
	} );

	it( 'Should enable loading', () => {
		const expectedAction = {
			type: types.SET_SEARCH_LOADING,
			payload: {
				id: 1,
				loading: true,
			},
		};
		expect( actions.enableLoading( 1 ) ).toEqual( expectedAction );
	} );

	it( 'Should disable loading', () => {
		const expectedAction = {
			type: types.SET_SEARCH_LOADING,
			payload: {
				id: 1,
				loading: false,
			},
		};
		expect( actions.disableLoading( 1 ) ).toEqual( expectedAction );
	} );

	it( 'Should clear the block', () => {
		const expectedAction = {
			type: types.CLEAR_BLOCK,
			payload: {
				id: 1,
			},
		};
		expect( actions.clearBlock( 1 ) ).toEqual( expectedAction );
	} );

	it( 'Should set the post type', () => {
		const expectedAction = {
			type: types.SET_POST_TYPE,
			payload: {
				id: 1,
				type: 'post',
			},
		};
		expect( actions.setPostType( 1, 'post' ) ).toEqual( expectedAction );
	} );
} );

describe( '[STORE] - Search thunk actions', () => {
	it( 'Should register a block', () => {
		const store = mockStore( {} );
		store.dispatch( actions.registerBlock( 'test', 'post' ) );
		const expectedActions = [
			{
				type: types.ADD_BLOCK,
				payload: {
					id: 'test',
				},
			},
			{
				type: types.SET_POST_TYPE,
				payload: {
					id: 'test',
					type: 'post',
				},
			},
		];
		expect( store.getActions() ).toEqual( expectedActions );
	} );
} );

